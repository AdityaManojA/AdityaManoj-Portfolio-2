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
};

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
