import { useEffect, useRef } from 'react';

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

/**
 * Binds keyboard actions for the mounted screen. Only one screen is mounted at a time, so the
 * handlers of whatever is on screen are the only ones listening.
 */
export function useKeys(handlers: KeyHandlers, enabled = true) {
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
  }, [enabled]);
}
