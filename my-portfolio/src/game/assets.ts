import { useSyncExternalStore } from 'react';

// Resolves a file in public/ against Vite's base URL, so paths keep working when the build is
// served from a sub-folder.
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const ART = {
  intro: asset('nfsmw/intro.mp4'),
  /** The in-game main menu scene: M3 GTR parked in the Rockport yard, bottom UI faded to ink. */
  scene: asset('nfsmw/main-menu.webp'),
  /** Box-art poster, used until the scene frame is supplied. */
  poster: asset('nfsmw/background.webp'),
  theme: asset('nfsmw/menu-theme.mp3'),
  /** Pre-rendered ink splatter (was a live SVG turbulence filter). */
  ink: asset('nfsmw/ink.webp'),
  /** The game's loading lamps. */
  lamps: asset('nfsmw/loading-lamps.webp'),
};

// The game's own glyphs, cut from in-game captures (media-src/game-captures/) as white masks, so
// they can be tinted like the drawn ones. Where a glyph exists here it replaces the drawn icon.
export const GAME_ICONS = {
  career: 'career',
  challenge: 'challenge',
  raceevents: 'raceevents',
  milestones: 'milestones',
  tradepaint: 'tradepaint',
  stopwatch: 'stopwatch',
  roadblock: 'roadblock',
  spikestrip: 'spikestrip',
  speedtrap: 'speedtrap',
  warning: 'warning',
  rpdbadge: 'rpdbadge',
  // From live play captures (media-src/game-captures/live/).
  quickrace: 'quickrace',
  online: 'online',
  addcar: 'addcar',
  audio: 'audio',
  player: 'player',
  gearstick: 'gearstick',
} as const;

/** Every glyph file, for preloading. */
export const GLYPH_FILES: string[] = Object.values(GAME_ICONS);

// Glyphs are fetched once into in-memory blob URLs. CSS masks then point at memory, so they never
// go back to the network (or wait on a host's cache headers) when a screen opens.
const glyphBlobs = new Map<string, string>();
const glyphListeners = new Set<() => void>();
let glyphVersion = 0;

export function glyphUrl(file: string) {
  return glyphBlobs.get(file) ?? asset(`nfsmw/icons/${file}.webp`);
}

export function loadGlyphs() {
  if (typeof URL.createObjectURL !== 'function' || typeof fetch !== 'function') return;
  GLYPH_FILES.forEach(file => {
    if (glyphBlobs.has(file)) return;
    fetch(asset(`nfsmw/icons/${file}.webp`))
      .then(r => (r.ok ? r.blob() : Promise.reject()))
      .then(blob => {
        glyphBlobs.set(file, URL.createObjectURL(blob));
        glyphVersion += 1;
        glyphListeners.forEach(fn => fn());
      })
      .catch(() => { /* keep the plain URL */ });
  });
}

/** Re-renders a glyph once its in-memory copy is ready. */
export function useGlyphVersion() {
  return useSyncExternalStore(
    fn => { glyphListeners.add(fn); return () => { glyphListeners.delete(fn); }; },
    () => glyphVersion,
  );
}

// Probe once whether the scene frame exists. Screens read the answer through useSceneArt(), which
// also tells the layout which side the car is on (scene: left, as in the game; poster: right).
let sceneReady: boolean | null = null;
const listeners = new Set<() => void>();
const probe = new Image();
probe.onload = () => { sceneReady = true; listeners.forEach(fn => fn()); };
probe.onerror = () => { sceneReady = false; listeners.forEach(fn => fn()); };
probe.src = ART.scene;

const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
const snapshot = () => sceneReady;

/** The menu background in use: the game scene when present, otherwise the poster. */
export function useSceneArt() {
  const ready = useSyncExternalStore(subscribe, snapshot);
  return { src: ready ? ART.scene : ART.poster, isScene: ready === true };
}
