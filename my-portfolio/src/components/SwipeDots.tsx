import { useEffect, useState, type RefObject } from 'react';

interface SwipeDotsProps {
  targetRef: RefObject<HTMLElement | null>;
  count: number;
  label: string;
  /** Controlled position, for tracks that are moved by something other than their own scroll */
  active?: number;
  /** Replaces the default jump-to-card behaviour when a dot is tapped */
  onSelect?: (index: number) => void;
}

/**
 * Position indicator for a horizontal swipe track (see .swipe-track in App.css).
 * The swiping itself is native CSS scroll-snap; this only follows the track's scroll
 * position and lets a tap on a dot jump to that card. Hidden where the track isn't a carousel.
 */
export default function SwipeDots({ targetRef, count, label, active: controlled, onSelect }: SwipeDotsProps) {
  const [scrolled, setActive] = useState(0);
  const active = controlled ?? scrolled;

  useEffect(() => {
    const track = targetRef.current;
    if (!track) return;

    const onScroll = () => {
      const centre = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [targetRef]);

  const goTo = (i: number) => {
    if (onSelect) {
      onSelect(i);
      return;
    }
    const track = targetRef.current;
    const child = track?.children[i] as HTMLElement | undefined;
    if (!track || !child) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({
      left: child.offsetLeft - (track.clientWidth - child.offsetWidth) / 2,
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="swipe-dots" role="group" aria-label={`${label} position`}>
      <div className="swipe-dots-row">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`swipe-dot ${i === active ? 'is-active' : ''}`}
            aria-label={`Show ${label} ${i + 1} of ${count}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
          >
            <span />
          </button>
        ))}
      </div>
      <span className="swipe-dots-count" aria-live="polite">
        {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </span>
    </div>
  );
}
