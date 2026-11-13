import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type TouchEvent } from 'react';
import type { Project } from '../data';
import { QUOTES } from '../data/quotes';
import { RESULTS } from '../data/results';

interface Props {
  /** The project to show, or null when the popup is closed. */
  project: Project | null;
  name: string;
  subtitle: string;
  image: string;
  video: string | null;
  /** True when the media is a phone capture, which is shown taller. */
  tall: boolean;
  /** Where this project sits in the list, as "3 / 12". */
  position: string;
  onClose: () => void;
  /** Move to the next (1) or previous (-1) project. */
  onStep: (direction: 1 | -1) => void;
}

/** The screenshot with the preview video over it, and a loading line until one is showing. */
function Media({ name, image, video }: { name: string; image: string; video: string | null }) {
  const [imageReady, setImageReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const loading = video ? !videoReady : !imageReady;

  return (
    <>
      <img src={image} alt={`${name} screenshot`} onLoad={() => setImageReady(true)} onError={() => setImageReady(true)} />
      {video && (
        <video
          className={videoReady ? 'on' : undefined}
          src={video}
          muted
          loop
          autoPlay
          playsInline
          aria-hidden="true"
          onPlaying={() => setVideoReady(true)}
          // If the preview cannot load, stop waiting and leave the screenshot.
          onError={() => setVideoReady(true)}
        />
      )}
      {loading && <span className="pop-load" aria-hidden="true" />}
    </>
  );
}

/**
 * The project popup: the preview playing on a loop, what the project achieved, and the way
 * to the live site. A sheet from the bottom on a phone, a centred panel elsewhere.
 *
 * On touch: swipe down to close, swipe left or right for the next or previous project.
 * With a keyboard: Esc closes, the arrow keys step through the projects.
 */
export default function ProjectPopup({ project, name, subtitle, image, video, tall, position, onClose, onStep }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number; at: number; axis: '' | 'x' | 'y' } | null>(null);
  // True once a touch has turned into a swipe, so the tap that ends it opens nothing.
  const swiped = useRef(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (project) {
      // Clear whatever the last swipe left behind.
      el.style.transition = '';
      el.style.transform = '';
      if (!el.open) el.showModal();
      el.scrollTop = 0;
    } else if (el.open) {
      el.close();
    }
  }, [project]);

  const onTouchStart = (e: TouchEvent) => {
    swiped.current = false;
    if (e.touches.length !== 1) return;
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, at: performance.now(), axis: '' };
  };

  const onTouchMove = (e: TouchEvent) => {
    const el = dialog.current;
    const start = touch.current;
    if (!el || !start) return;
    const dx = e.touches[0].clientX - start.x;
    const dy = e.touches[0].clientY - start.y;
    if (!start.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      start.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      // An upward drag, or any drag once the sheet has been scrolled, is ordinary scrolling.
      if (start.axis === 'y' && (dy < 0 || el.scrollTop > 0)) {
        touch.current = null;
        return;
      }
      el.style.transition = 'none';
    }
    swiped.current = true;
    el.style.transform = start.axis === 'x' ? `translateX(${(dx * 0.6).toFixed(1)}px)` : `translateY(${Math.max(0, dy).toFixed(1)}px)`;
  };

  const onTouchEnd = (e: TouchEvent) => {
    const el = dialog.current;
    const start = touch.current;
    touch.current = null;
    if (!el || !start || !start.axis) return;
    // A swipe does not always end in a click, so the guard must not outlive this gesture.
    window.setTimeout(() => (swiped.current = false), 350);
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    const quick = performance.now() - start.at < 260;
    el.style.transition = 'transform 0.26s cubic-bezier(0.2, 0.8, 0.2, 1)';
    if (start.axis === 'y' && (dy > 120 || (quick && dy > 45))) {
      // Let the sheet finish leaving before the dialog closes.
      el.style.transform = 'translateY(100%)';
      window.setTimeout(onClose, 200);
      return;
    }
    el.style.transform = '';
    if (start.axis === 'x' && (Math.abs(dx) > 70 || (quick && Math.abs(dx) > 35))) onStep(dx < 0 ? 1 : -1);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') onStep(1);
    if (e.key === 'ArrowLeft') onStep(-1);
  };

  // The tap that ends a swipe must not follow the link under the finger.
  const onClickCapture = (e: MouseEvent) => {
    if (!swiped.current) return;
    swiped.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  const results = project ? (RESULTS[project.id] ?? []) : [];
  const quote = project ? QUOTES.find((q) => q.id === project.id) : undefined;
  const mediaClass = tall ? 'pop-im tall' : 'pop-im';

  return (
    <dialog
      ref={dialog}
      className="pop"
      aria-label={project ? name : undefined}
      // Esc and the browser's own dismissal arrive here.
      onClose={onClose}
      onClickCapture={onClickCapture}
      // A click on the dimmed area around the panel lands on the dialog itself.
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      {project && (
        // The key restarts the fade, the loading line and the video for each project.
        <div className="pop-in" key={project.id}>
          <span className="pop-grab" aria-hidden="true" />
          <button type="button" className="pop-x" onClick={onClose} aria-label="Close">
            ×
          </button>
          {project.link ? (
            <a className={mediaClass} href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name}`}>
              <Media name={name} image={image} video={video} />
            </a>
          ) : (
            <div className={mediaClass}>
              <Media name={name} image={image} video={video} />
            </div>
          )}
          <div className="pop-b">
            <div className="pop-h">
              <div>
                <h2>{name}</h2>
                <p className="sf">{subtitle}</p>
              </div>
              <span className="mu">{project.year}</span>
            </div>
            {results.length > 0 && (
              <dl className="pop-r">
                {results.map(([figure, label]) => (
                  <div key={label}>
                    <dt className="sf">{figure}</dt>
                    <dd className="mu">{label}</dd>
                  </div>
                ))}
              </dl>
            )}
            {quote && (
              <figure className="pop-q">
                <blockquote className="sf">“{quote.text}”</blockquote>
                <figcaption className="mu">{quote.client}</figcaption>
              </figure>
            )}
            <p className="pop-d mu">{project.description}</p>
            <div className="pop-f">
              {project.link && (
                <a className="cta" href={project.link} target="_blank" rel="noopener noreferrer">
                  Visit site ↗
                </a>
              )}
              <div className="pop-n">
                <button type="button" onClick={() => onStep(-1)} aria-label="Previous project">
                  ‹
                </button>
                <span className="mu">{position}</span>
                <button type="button" onClick={() => onStep(1)} aria-label="Next project">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
