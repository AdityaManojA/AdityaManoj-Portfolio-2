import { ART, asset, loadGlyphs } from './assets';
import { GALLERY, PROFILE, PROJECTS, SKILLS } from './content';

// Nothing in the front end should pop in. Images are fetched and decoded before the screen that
// shows them can open, at their original quality:
//   critical() runs as the intro starts: menu art, ink, every game glyph, avatar.
//   idle()     starts during the intro and keeps going in idle time: every project portrait, gallery render
//              and skill logo, so the Blacklist, My Cars and Challenge Series open fully drawn.

// Keeping the Image objects alive keeps them in the page's list of available images, so every later
// <img> with the same URL is served from memory whatever the host's cache headers say.
const warmed = new Map<string, HTMLImageElement>();

function warm(src: string, priority: 'high' | 'low' = 'low') {
  if (warmed.has(src)) return Promise.resolve();
  const img = new Image();
  warmed.set(src, img);
  img.decoding = 'async';
  (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = priority;
  img.src = src;
  // decode() keeps the bitmap ready, so first paint of the screen doesn't stall on decoding.
  // Older browsers lack it; the fetch alone still warms the cache there.
  if (typeof img.decode !== 'function') return Promise.resolve();
  return img.decode().catch(() => { /* missing or blocked: the screen will just load it */ });
}

export function critical() {
  [ART.scene, ART.poster, ART.ink, asset(PROFILE.avatar), asset(PROJECTS[0].image), asset(GALLERY[0].image)]
    .forEach(src => warm(src, 'high'));
  loadGlyphs();
  // Fonts download on first use; ask for every face now so no screen opens with a font swap.
  if (typeof document !== 'undefined' && document.fonts?.load) {
    ['700 1em UnifrakturCook', '600 1em Saira', '700 1em Saira', '800 1em Saira', 'italic 800 1em Saira', '400 1em Michroma']
      .forEach(face => { document.fonts.load(face).catch(() => {}); });
  }
}

const idleCallback: (fn: () => void) => void =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? fn => window.requestIdleCallback(fn, { timeout: 2000 })
    : fn => setTimeout(fn, 200);

export function idle() {
  const queue = [
    ...PROJECTS.map(p => asset(p.image)),
    ...GALLERY.map(g => asset(g.image)),
    ...SKILLS.flatMap(g => g.items.map(s => s.icon)),
  ];
  // A few at a time so the warm-up never competes with what's on screen.
  const step = () => {
    const batch = queue.splice(0, 4);
    if (!batch.length) return;
    Promise.all(batch.map(src => warm(src))).then(() => idleCallback(step));
  };
  idleCallback(step);
}
