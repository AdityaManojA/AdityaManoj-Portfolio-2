import { useEffect } from 'react';

// The full set of NFS: Most Wanted front-end effects (public/sfx): eight interface sounds spread
// across different kinds of action so no single one carries the whole site. One delegated listener
// on the document covers every button, link and card, so components don't need to know about sound.
//
// Hover: "termMove" on the nav and filter pills, "tick" over cards, "move" on anything else.
// Click: "termSelect" switches page, "termSearch" filters projects, "termBoot" opens a panel,
// "back" closes one, and "accept" is everything else.

export type Sfx = 'move' | 'tick' | 'accept' | 'back' | 'termMove' | 'termSelect' | 'termSearch' | 'termBoot';

const SFX_FILES: Record<Sfx, string> = {
  move: 'move',
  tick: 'tick',
  accept: 'accept',
  back: 'back',
  termMove: 'term-move',
  termSelect: 'term-select',
  termSearch: 'term-search',
  termBoot: 'term-boot',
};
const SFX = Object.keys(SFX_FILES) as Sfx[];

// Per-file gain levels each effect to a peak near -9 dBFS (peaks measured with ffmpeg
// volumedetect, same table as the NFS menu branch). VOLUME then holds them all at 30% so the
// sound stays in the background.
const GAIN: Record<Sfx, number> = {
  move: 4.5, //        peak -22.1 dB
  tick: 1.9, //        peak -14.5 dB
  accept: 2.0, //      peak -15.0 dB
  back: 1.45, //       peak -12.3 dB
  termMove: 1.5, //    peak -12.4 dB
  termSelect: 7.9, //  peak -27.0 dB
  termSearch: 1.15, // peak -10.1 dB
  termBoot: 0.8, //    peak  -7.3 dB
};
const VOLUME = 0.3;

const CARD_TARGETS = '.project-card, .flagship-strip, .explore-card, .garage-card';
const NAV_TARGETS = '.desktop-nav a, .desktop-nav button, .mobile-nav-link';
const FILTER_TARGETS = '.filter-btn';
const HOVER_TARGETS = `a[href], button, [role="button"], summary, label[for], ${CARD_TARGETS}`;
const CLOSE_TARGETS = '[aria-label^="Close" i], [aria-label^="Dismiss" i], .garage-close, [aria-controls][aria-expanded="true"]';
const OPEN_TARGETS = '[aria-label^="Open" i], [aria-controls][aria-expanded="false"]';

let ctx: AudioContext | null = null;
const buffers = new Map<Sfx, AudioBuffer>();
const decoding = new Map<Sfx, Promise<unknown>>();
const raw = new Map<Sfx, Promise<ArrayBuffer>>();

const fetchRaw = (name: Sfx) => {
  let p = raw.get(name);
  if (!p) {
    p = fetch(`${import.meta.env.BASE_URL}sfx/${SFX_FILES[name]}.mp3`).then(r => r.arrayBuffer());
    raw.set(name, p);
  }
  return p;
};

// On/off switch (SoundToggle in the header). On by default; only an explicit choice is stored.
const PREF_KEY = 'ui-sounds';
let enabled = (() => {
  try {
    return localStorage.getItem(PREF_KEY) !== 'off';
  } catch {
    return true;
  }
})();
const listeners = new Set<() => void>();

// Browsers only let an AudioContext start after a click, tap or key press, so the context is
// created on the first such gesture and the effects are decoded then. Hover sounds begin after it.
function unlock() {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx = new Ctor();
    const c = ctx;
    SFX.forEach(name => {
      decoding.set(name, fetchRaw(name)
        .then(data => c.decodeAudioData(data.slice(0)))
        .then(buf => { buffers.set(name, buf); })
        .catch(() => {}));
    });
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
}

export const uiSound = {
  get enabled() {
    return enabled;
  },
  setEnabled(on: boolean) {
    enabled = on;
    try {
      localStorage.setItem(PREF_KEY, on ? 'on' : 'off');
    } catch {
      // Storage unavailable (private mode): the choice just isn't remembered.
    }
    listeners.forEach(fn => fn());
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  play: (name: Sfx) => play(name, true),
};

// wait: a click on the very first gesture lands before the effects are decoded and the context has
// resumed, so click sounds wait the few milliseconds for that. Hover sounds just skip instead.
function play(name: Sfx, wait = false) {
  const buf = buffers.get(name);
  if (!enabled || !ctx) return;
  if (ctx.state !== 'running' || !buf) {
    if (wait) Promise.all([decoding.get(name), ctx.resume()]).then(() => play(name)).catch(() => {});
    return;
  }
  const src = ctx.createBufferSource();
  const gain = ctx.createGain();
  src.buffer = buf;
  gain.gain.value = GAIN[name] * VOLUME;
  src.connect(gain).connect(ctx.destination);
  src.start();
}

const isEnabled = (el: Element) => !el.matches(':disabled, [aria-disabled="true"]');

function hoverSound(el: Element): Sfx {
  if (el.matches(NAV_TARGETS) || el.matches(FILTER_TARGETS)) return 'termMove';
  if (el.matches(CARD_TARGETS)) return 'tick';
  return 'move';
}

function clickSound(el: Element): Sfx {
  if (el.matches(CLOSE_TARGETS)) return 'back';
  if (el.matches(NAV_TARGETS)) return 'termSelect';
  if (el.matches(FILTER_TARGETS)) return 'termSearch';
  if (el.matches(OPEN_TARGETS)) return 'termBoot';
  return 'accept';
}

export default function useUiSounds() {
  useEffect(() => {
    SFX.forEach(name => { fetchRaw(name).catch(() => {}); });

    // Hover: once per element entered, mouse only (a tap would otherwise "hover" and click at once).
    let hovered: Element | null = null;
    let lastHoverAt = 0;
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const el = (e.target as Element).closest?.(HOVER_TARGETS) ?? null;
      if (el === hovered) return;
      hovered = el;
      if (!el || !isEnabled(el)) return;
      const now = performance.now();
      if (now - lastHoverAt < 90) return; // sweeping across a row of pills shouldn't machine-gun
      lastHoverAt = now;
      play(hoverSound(el));
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.(HOVER_TARGETS);
      // data-own-sfx: the element plays its own click sound (the sound toggle confirms "on" itself)
      if (!el || !isEnabled(el) || el.hasAttribute('data-own-sfx')) return;
      play(clickSound(el), true);
    };

    document.addEventListener('pointerdown', unlock, true);
    document.addEventListener('keydown', unlock, true);
    document.addEventListener('pointerover', onOver, true);
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('pointerdown', unlock, true);
      document.removeEventListener('keydown', unlock, true);
      document.removeEventListener('pointerover', onOver, true);
      document.removeEventListener('click', onClick, true);
    };
  }, []);
}
