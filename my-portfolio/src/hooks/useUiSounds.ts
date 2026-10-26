import { useEffect } from 'react';

// Interface sounds borrowed from the NFS: Most Wanted front end (public/sfx): a soft "move" when
// the mouse lands on something clickable, a "tick" over case files, "accept" on a click and "back"
// on anything that closes. One delegated listener on the document covers every button, link and
// card, so components don't need to know about sound.

type Sfx = 'move' | 'tick' | 'accept' | 'back';

const SFX: Sfx[] = ['move', 'tick', 'accept', 'back'];

// Per-file gain levels each effect to a peak near -9 dBFS (peaks measured with ffmpeg
// volumedetect, same table as the NFS menu branch). MASTER pulls the lot down a little, since
// here there is no music underneath and hover sounds repeat often.
const GAIN: Record<Sfx, number> = { move: 4.5, tick: 1.9, accept: 2.0, back: 1.45 };
const MASTER = 0.6;

const HOVER_TARGETS = 'a[href], button, [role="button"], summary, label[for], .project-card';
const FILE_TARGETS = '.project-card';
const CLOSE_TARGETS = '[aria-label^="Close" i], [aria-label^="Dismiss" i], .garage-close';

let ctx: AudioContext | null = null;
const buffers = new Map<Sfx, AudioBuffer>();
const decoding = new Map<Sfx, Promise<unknown>>();
const raw = new Map<Sfx, Promise<ArrayBuffer>>();

const fetchRaw = (name: Sfx) => {
  let p = raw.get(name);
  if (!p) {
    p = fetch(`${import.meta.env.BASE_URL}sfx/${name}.mp3`).then(r => r.arrayBuffer());
    raw.set(name, p);
  }
  return p;
};

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
  gain.gain.value = GAIN[name] * MASTER;
  src.connect(gain).connect(ctx.destination);
  src.start();
}

const isEnabled = (el: Element) => !el.matches(':disabled, [aria-disabled="true"]');

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
      if (now - lastHoverAt < 45) return; // sweeping across a row of pills shouldn't machine-gun
      lastHoverAt = now;
      play(el.matches(FILE_TARGETS) ? 'tick' : 'move');
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.(HOVER_TARGETS);
      // data-own-sfx: the element plays its own click sound (the sound toggle confirms "on" itself)
      if (!el || !isEnabled(el) || el.hasAttribute('data-own-sfx')) return;
      play(el.matches(CLOSE_TARGETS) ? 'back' : 'accept', true);
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
