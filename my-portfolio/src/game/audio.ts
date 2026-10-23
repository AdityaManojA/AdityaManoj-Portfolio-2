import { ART, asset } from './assets';

// Front-end audio: the looping menu theme and short UI effects.
//
// Browsers refuse to start sound before the visitor interacts with the page. The intro is
// skipped with a key press or tap, which counts as that interaction, so music starts there. If the
// intro runs out on its own, music waits for the next key press or tap instead.

const MUSIC_VOLUME = 0.054; // 45% of the original 0.12: the theme sits under the UI, as in the game's front end.

export type Sfx = 'move' | 'tick' | 'accept' | 'back' | 'termMove' | 'termSelect' | 'termSearch' | 'termBoot';

const SFX_FILES: Record<Sfx, string> = {
  move: 'nfsmw/sfx/move.mp3',
  tick: 'nfsmw/sfx/tick.mp3',
  accept: 'nfsmw/sfx/accept.mp3',
  back: 'nfsmw/sfx/back.mp3',
  termMove: 'nfsmw/sfx/term-move.mp3',
  termSelect: 'nfsmw/sfx/term-select.mp3',
  termSearch: 'nfsmw/sfx/term-search.mp3',
  termBoot: 'nfsmw/sfx/term-boot.mp3',
};

// The effects were cut from recordings at very different levels (peaks from -7 to -27 dBFS), and
// the quietest (move) was lost under the music. Each gets its own gain so every effect peaks near
// -9 dBFS: clearly over the theme, still a subtle click rather than a blast. Gain = 10^((-9 - peak) / 20),
// peaks measured with ffmpeg volumedetect. Applied in Web Audio, so the files are never re-encoded.
const SFX_GAIN: Record<Sfx, number> = {
  move: 4.5, //        peak -22.1 dB
  tick: 1.9, //        peak -14.5 dB
  accept: 2.0, //      peak -15.0 dB
  back: 1.45, //       peak -12.3 dB
  termMove: 1.5, //    peak -12.4 dB
  termSelect: 7.9, //  peak -27.0 dB
  termSearch: 1.15, // peak -10.1 dB
  termBoot: 0.8, //    peak  -7.3 dB
};

const PREFS_KEY = 'nfsmw-audio';

interface Prefs { music: boolean; sfx: boolean }

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return { music: true, sfx: true, ...JSON.parse(raw) };
  } catch { /* storage blocked: fall back to defaults */ }
  return { music: true, sfx: true };
}

const prefs = loadPrefs();
const listeners = new Set<() => void>();

function savePrefs() {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch { /* ignore */ }
  listeners.forEach(fn => fn());
}

let music: HTMLAudioElement | null = null;
let musicWanted = false; // the front end has asked for music (intro finished)

function ensureMusic() {
  if (!music) {
    music = new Audio(ART.theme);
    music.loop = true;
    music.volume = MUSIC_VOLUME;
    music.preload = 'auto';
  }
  return music;
}

function tryPlayMusic() {
  if (!musicWanted || !prefs.music || document.hidden) return;
  ensureMusic().play().catch(() => {
    // Autoplay blocked: start on the next interaction ('click', which phones accept for sound;
    // a touch's pointerdown is not).
    const resume = () => {
      window.removeEventListener('keydown', resume);
      window.removeEventListener('click', resume);
      tryPlayMusic();
    };
    window.addEventListener('keydown', resume, { once: true });
    window.addEventListener('click', resume, { once: true });
  });
}

// Don't play to an empty room: pause while the tab is in the background.
document.addEventListener('visibilitychange', () => {
  if (document.hidden) music?.pause();
  else tryPlayMusic();
});

// Effects play through Web Audio: each file is fetched and decoded once, then every press is a
// cheap buffer source with no start-up latency. The context can only start after an interaction,
// so it is created lazily and resumed on the first key press or tap.
let ctx: AudioContext | null = null;
const buffers = new Map<Sfx, AudioBuffer>();
const pending = new Map<Sfx, Promise<ArrayBuffer>>();

function context() {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

async function decode(name: Sfx) {
  const c = context();
  if (!c || buffers.has(name)) return;
  const raw = pending.get(name) ?? fetch(asset(SFX_FILES[name])).then(r => r.arrayBuffer());
  pending.set(name, raw);
  const data = await raw;
  if (buffers.has(name)) return;
  buffers.set(name, await c.decodeAudioData(data.slice(0)));
}

export const audio = {
  startMusic() {
    musicWanted = true;
    audio.unlock();
    tryPlayMusic();
  },
  stopMusic() {
    musicWanted = false;
    music?.pause();
  },
  /** Download the effects during the intro; decoding happens once audio is unlocked. */
  preloadSfx() {
    (Object.keys(SFX_FILES) as Sfx[]).forEach(name => {
      if (!pending.has(name)) pending.set(name, fetch(asset(SFX_FILES[name])).then(r => r.arrayBuffer()));
    });
  },
  /** Called on the intro skip (a user gesture): start the audio context and decode effects. */
  unlock() {
    if (!context()) return;
    (Object.keys(SFX_FILES) as Sfx[]).forEach(name => { decode(name).catch(() => {}); });
  },
  play(name: Sfx) {
    if (!prefs.sfx) return;
    const c = context();
    const buf = buffers.get(name);
    if (!c) return;
    if (!buf) { decode(name).catch(() => {}); return; }
    const src = c.createBufferSource();
    const gain = c.createGain();
    src.buffer = buf;
    gain.gain.value = SFX_GAIN[name];
    src.connect(gain).connect(c.destination);
    src.start();
  },
  get prefs(): Readonly<Prefs> { return prefs; },
  setMusic(on: boolean) {
    prefs.music = on;
    savePrefs();
    if (on) tryPlayMusic(); else music?.pause();
  },
  setSfx(on: boolean) {
    prefs.sfx = on;
    savePrefs();
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  },
};
