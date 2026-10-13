import { useEffect, type RefObject } from 'react';

const CLOSE_DISTANCE = 110; // px dragged down before release closes
const CLOSE_VELOCITY = 0.6; // px/ms flick that closes regardless of distance

/**
 * Swipe-down-to-close for a modal sheet on touch screens. The sheet follows the finger,
 * then either closes or springs back. A drag only starts when the touched content is
 * already scrolled to the top, so it never fights normal scrolling inside the modal.
 */
export function useSwipeToClose(ref: RefObject<HTMLElement | null>, onClose: () => void, enabled: boolean) {
  useEffect(() => {
    const sheet = ref.current;
    if (!sheet || !enabled) return;

    let startY = 0;
    let startX = 0;
    let startT = 0;
    let dy = 0;
    let tracking = false;
    let dragging = false;

    const scrolledFromTop = (target: EventTarget | null) => {
      let el = target as HTMLElement | null;
      while (el && el !== sheet.parentElement) {
        if (el.scrollTop > 0 && el.scrollHeight > el.clientHeight) return true;
        el = el.parentElement;
      }
      return false;
    };

    const reset = () => {
      sheet.style.transition = 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)';
      sheet.style.transform = '';
    };

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1 || scrolledFromTop(e.target)) return;
      tracking = true;
      dragging = false;
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      startT = performance.now();
      dy = 0;
    };

    const onMove = (e: TouchEvent) => {
      if (!tracking) return;
      const moveY = e.touches[0].clientY - startY;
      const moveX = e.touches[0].clientX - startX;
      if (!dragging) {
        // Commit only to a clearly downward, mostly vertical gesture.
        if (moveY > 8 && Math.abs(moveY) > Math.abs(moveX) * 1.5) {
          dragging = true;
          sheet.style.transition = 'none';
        } else if (Math.abs(moveX) > 8 || moveY < -8) {
          tracking = false;
          return;
        } else {
          return;
        }
      }
      dy = Math.max(0, moveY);
      sheet.style.transform = `translateY(${dy}px)`;
      e.preventDefault();
    };

    const onEnd = () => {
      if (!tracking) return;
      tracking = false;
      if (!dragging) return;
      const velocity = dy / Math.max(1, performance.now() - startT);
      if (dy > CLOSE_DISTANCE || velocity > CLOSE_VELOCITY) {
        sheet.style.transition = 'transform 0.25s ease-in';
        sheet.style.transform = 'translateY(100%)';
        window.setTimeout(onClose, 200);
      } else {
        reset();
      }
    };

    sheet.addEventListener('touchstart', onStart, { passive: true });
    sheet.addEventListener('touchmove', onMove, { passive: false });
    sheet.addEventListener('touchend', onEnd);
    sheet.addEventListener('touchcancel', onEnd);
    return () => {
      sheet.removeEventListener('touchstart', onStart);
      sheet.removeEventListener('touchmove', onMove);
      sheet.removeEventListener('touchend', onEnd);
      sheet.removeEventListener('touchcancel', onEnd);
      sheet.style.transition = '';
      sheet.style.transform = '';
    };
  }, [ref, onClose, enabled]);
}
