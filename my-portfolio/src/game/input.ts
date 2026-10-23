import { useEffect, useRef, useSyncExternalStore } from 'react';
import type { TouchEvent as ReactTouchEvent, WheelEvent as ReactWheelEvent } from 'react';

// Keyboard model, mirroring the PC version's front end:
//   arrows  navigate        Enter / Space  accept        Esc / Backspace  back
//   digits  screen actions shown in the bottom key prompts ([1] Game Stats, [3] Showcase, ...)
export type Action = 'left' | 'right' | 'up' | 'down' | 'accept' | 'back' | '1' | '2' | '3' | 'q';

const KEYMAP: Record<string, Action> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
  Enter: 'accept',
  ' ': 'accept',
  Escape: 'back',
  Backspace: 'back',
  '1': '1',
  '2': '2',
  '3': '3',
  q: 'q',
  Q: 'q',
};

export type KeyHandlers = Partial<Record<Action, () => void>>;

// While a dialog (ATTENTION, save/load) is open, only the dialog's own handlers receive keys.
let openModals = 0;
export const modalLock = {
  acquire() { openModals += 1; },
  release() { openModals = Math.max(0, openModals - 1); },
};

/**
 * Binds keyboard actions for the mounted screen. Only one screen is mounted at a time, so the
 * handlers of whatever is on screen are the only ones listening.
 */
export function useKeys(handlers: KeyHandlers, enabled = true, isModal = false) {
  const ref = useRef(handlers);
  useEffect(() => { ref.current = handlers; });

  useEffect(() => {
    if (!enabled) return;
    // React flushes effects synchronously for key input, so a screen opened by Enter can mount
    // its listener while that same Enter is still dispatching. Ignore anything older than us.
    const mountedAt = performance.now();
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.timeStamp < mountedAt) return;
      if (openModals > 0 && !isModal) return;
      const action = KEYMAP[e.key];
      // Holding an arrow scrolls like the game; holding Enter or Esc must not chain through menus.
      if (e.repeat && action !== 'left' && action !== 'right' && action !== 'up' && action !== 'down') return;
      const fn = action && ref.current[action];
      if (!fn) return;
      e.preventDefault();
      fn();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled, isModal]);
}

/**
 * Vertical swipe and scroll-wheel stepping, for lists you flip through like a feed (the Blacklist):
 * swipe up or scroll down = next (+1), swipe down or scroll up = previous (-1). Returns handlers to
 * spread on the screen's root element. A trackpad fires a stream of wheel events with inertia, so
 * one gesture moves one step and the next step waits for a short pause.
 */
export function useSwipe(onStep: (dir: 1 | -1) => void) {
  const step = useRef(onStep);
  useEffect(() => { step.current = onStep; });
  const touch = useRef<{ x: number; y: number } | null>(null);
  const wheel = useRef({ acc: 0, lockedUntil: 0 });

  return {
    onWheel: (e: ReactWheelEvent) => {
      if (openModals > 0 || e.ctrlKey) return; // ctrl+wheel is zoom
      const w = wheel.current;
      const now = performance.now();
      if (now < w.lockedUntil) { w.lockedUntil = now + 250; return; } // still the same flick
      w.acc += e.deltaY;
      if (Math.abs(w.acc) < 40) return;
      step.current(w.acc > 0 ? 1 : -1);
      w.acc = 0;
      w.lockedUntil = now + 450;
    },
    onTouchStart: (e: ReactTouchEvent) => {
      const t = e.touches[0];
      touch.current = e.touches.length === 1 ? { x: t.clientX, y: t.clientY } : null;
    },
    onTouchEnd: (e: ReactTouchEvent) => {
      const start = touch.current;
      touch.current = null;
      if (!start || openModals > 0) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      // A deliberate vertical swipe; taps and sideways drags fall through to the buttons.
      if (Math.abs(dy) < 50 || Math.abs(dy) < Math.abs(dx) * 1.2) return;
      step.current(dy < 0 ? 1 : -1);
    },
  };
}

// Whether the visitor is on a touch screen, so on-screen help can say "tap" or "click / Enter".
const coarse = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  ? window.matchMedia('(pointer: coarse)')
  : null;
const subscribeCoarse = (fn: () => void) => {
  coarse?.addEventListener('change', fn);
  return () => coarse?.removeEventListener('change', fn);
};
export function useTouchScreen() {
  return useSyncExternalStore(subscribeCoarse, () => coarse?.matches ?? false);
}
