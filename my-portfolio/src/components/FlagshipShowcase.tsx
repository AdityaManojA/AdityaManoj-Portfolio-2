import { useState, useEffect, useRef, type TouchEvent } from 'react';
import SwipeDots from './SwipeDots';

interface FlagshipProject {
  id: number;
  caseTag: string;
  title: string;
  link?: string;
  domain?: string;
  image: string;
  desc: string;
  metrics: { label: string; val: string }[];
  tags: string[];
}

const FLAGSHIP_ITEMS: FlagshipProject[] = [
  {
    id: 8,
    caseTag: 'CASE 01 · E-COMMERCE & CLOUD ARCHITECTURE',
    title: 'ThreadPath Collective',
    link: 'https://threadpathcollective.ca/',
    domain: 'threadpathcollective.ca',
    image: './ProjectImages/Threadpath.png',
    desc: 'Bespoke full-featured e-commerce platform and inventory tracking system for a sustainable Canadian cultural streetwear label. Built with dynamic coordinate layouts, responsive catalog filtering, Framer Motion transitions, and low-latency global delivery orchestrated via AWS Cloud Functions and Amazon CloudFront CDN.',
    metrics: [
      { label: 'Global Edge CDN', val: 'Amazon CloudFront & S3' },
      { label: 'Motion Engine', val: 'Framer Motion + React' }
    ],
    tags: ['React', 'Tailwind CSS', 'AWS', 'CloudFront', 'Framer Motion', 'TypeScript']
  },
  {
    id: 21,
    caseTag: 'CASE 02 · FREELANCE OPERATIONS & PWA',
    title: 'TerraCove',
    link: 'https://terracove.web.app/',
    domain: 'terracove.web.app',
    image: './ProjectImages/TerraCove.png',
    desc: 'A calm, all-in-one workspace for independent professionals, from the first brief to the final invoice. Unifies clients, projects, tasks, notes and a calendar with approvals, reports & invoicing and data connections, behind Google sign-in, an installable PWA shell and a sandboxed local demo workspace.',
    metrics: [
      { label: 'Workspace', val: 'Clients · Projects · Invoices' },
      { label: 'Try It', val: 'Sandboxed Local Demo Mode' }
    ],
    tags: ['PWA', 'JavaScript', 'Firebase', 'Google OAuth', 'HTML5', 'CSS3']
  },
  {
    id: 18,
    caseTag: 'CASE 03 · CANVAS 2D & EDITORIAL SSG',
    title: 'Pixel Spaces',
    link: 'https://pixelspaces.web.app/',
    domain: 'pixelspaces.web.app',
    image: './ProjectImages/Pixel Spaces.png',
    desc: 'Bespoke high-performance web platform for an international architectural visualisation and interior design studio. Engineered with an interactive HTML5 Canvas pixel-resolve hero stage, CSS sticky stacking service decks, Sharp automated multi-resolution WebP pipeline, and Firebase Firestore review moderation.',
    metrics: [
      { label: 'Interactive Hero', val: 'HTML5 Canvas Pixel-Resolve' },
      { label: 'Asset Pipeline', val: 'Node.js + Sharp WebP' }
    ],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Firebase', 'Canvas', 'TypeScript', 'Node.js']
  }
];

// Phones tall enough to fit a pinned card: the stage pins and vertical scroll pans the cards
// sideways (see CSS). Shorter phones keep the plain swipe carousel.
const MOBILE_PIN = '(max-width: 767px) and (min-height: 640px)';

// Maps scroll progress to a card position that rests on each card and eases between them:
// card i is centred over the middle of its scroll segment, matching the snap anchors.
const panPosition = (p: number, count: number) => {
  const q = Math.max(0, Math.min(count - 1, p * count - 0.5));
  const i = Math.floor(q);
  const t = Math.max(0, Math.min(1, (q - i - 0.2) / 0.6));
  const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  return Math.min(count - 1, i + eased);
};

export default function FlagshipShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const snapRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [pinnedMobile, setPinnedMobile] = useState(() => window.matchMedia(MOBILE_PIN).matches);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_PIN);
    const onChange = () => setPinnedMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Scroll position inside the pinned track drives which panel is open.
  // The stage is only sticky on large screens (see CSS); elsewhere every card is stacked open.
  const getPinGeometry = () => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return null;
    const style = getComputedStyle(stage);
    if (style.position !== 'sticky') return null;
    const scrollable = track.offsetHeight - stage.offsetHeight;
    if (scrollable <= 0) return null;
    return { track, scrollable, pinTop: parseFloat(style.top) || 0 };
  };

  useEffect(() => {
    const update = () => {
      const gallery = galleryRef.current;
      const root = document.documentElement;
      const geo = getPinGeometry();
      if (!geo) {
        if (gallery) gallery.style.transform = '';
        root.classList.remove('flagship-pinned');
        return;
      }
      const { track, scrollable, pinTop } = geo;
      const raw = (pinTop - track.getBoundingClientRect().top) / scrollable;
      const p = Math.max(0, Math.min(1, raw));
      // Phones: while the stage is stuck on screen, hide the corner buttons (see CSS).
      root.classList.toggle('flagship-pinned', window.matchMedia(MOBILE_PIN).matches && raw > -0.02 && raw < 1);
      const steps = p * FLAGSHIP_ITEMS.length;
      FLAGSHIP_ITEMS.forEach((_, i) => {
        track.style.setProperty(`--fill-${i}`, String(Math.max(0, Math.min(1, steps - i))));
      });

      // Phones: pan the cards sideways with the vertical scroll instead of opening panels.
      if (gallery && window.matchMedia(MOBILE_PIN).matches) {
        const cards = gallery.children as HTMLCollectionOf<HTMLElement>;
        const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0;
        const pos = panPosition(p, FLAGSHIP_ITEMS.length);
        gallery.style.transform = `translate3d(${-pos * step}px, 0, 0)`;
        const next = Math.round(pos);
        if (next !== activeRef.current) {
          activeRef.current = next;
          setActiveIndex(next);
        }
        return;
      }
      if (gallery) gallery.style.transform = '';

      // Hysteresis: only switch once the scroll is clearly past a boundary, so small
      // movements around the edge don't flip panels back and forth.
      const current = activeRef.current;
      const SLACK = 0.12;
      let next = current;
      if (steps >= current + 1 + SLACK || steps < current - SLACK) {
        next = Math.max(0, Math.min(FLAGSHIP_ITEMS.length - 1, Math.floor(steps)));
      }
      if (next !== current) {
        activeRef.current = next;
        setActiveIndex(next);
      }
    };

    // Native scroll-snap anchors at the centre of each project's scroll segment.
    // CSS gives them scroll-margin-top equal to the stage's pin offset, so snapping to
    // an anchor lands the pinned stage exactly on that project.
    const placeSnaps = () => {
      const geo = getPinGeometry();
      snapRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.top = geo ? `${((i + 0.5) / FLAGSHIP_ITEMS.length) * geo.scrollable}px` : '0px';
      });
      update();
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', placeSnaps);
    placeSnaps();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', placeSnaps);
      document.documentElement.classList.remove('flagship-pinned');
    };
  }, []);

  // Phones: a sideways swipe on the pinned cards jumps to the next / previous card.
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const onGalleryTouchStart = (e: TouchEvent) => {
    swipeStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onGalleryTouchEnd = (e: TouchEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || !pinnedMobile) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const next = Math.max(0, Math.min(FLAGSHIP_ITEMS.length - 1, activeRef.current + (dx < 0 ? 1 : -1)));
    if (next !== activeRef.current) goTo(next);
  };

  const goTo = (idx: number) => {
    const geo = getPinGeometry();
    if (!geo) {
      activeRef.current = idx;
      setActiveIndex(idx);
      return;
    }
    const { track, scrollable, pinTop } = geo;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const p = (idx + 0.5) / FLAGSHIP_ITEMS.length;
    window.scrollTo({ top: trackTop - pinTop + p * scrollable, behavior: 'smooth' });
  };

  return (
    <div className="flagship-track" ref={trackRef}>
      {FLAGSHIP_ITEMS.map((item, idx) => (
        <span
          key={item.id}
          className="flagship-snap"
          aria-hidden="true"
          ref={(el) => {
            snapRefs.current[idx] = el;
          }}
        />
      ))}
    <div className="flagship-showcase" ref={stageRef}>
      <div className="flagship-header-row">
        <div>
          <span className="section-index-tag">01 · FLAGSHIP PRODUCTION DEPLOYMENTS</span>
          <h2 className="editorial-section-title">Architectural Showcases</h2>
          <p className="editorial-section-subtitle">
            Engineered with production-grade verification, sub-second edge performance, and multi-mode autonomy.
          </p>
        </div>
        <span className="flagship-hint" aria-hidden="true">Scroll to explore ↓</span>
      </div>

      <div
        className="flagship-gallery swipe-track"
        ref={galleryRef}
        onTouchStart={onGalleryTouchStart}
        onTouchEnd={onGalleryTouchEnd}
      >
        {FLAGSHIP_ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <article
              key={item.id}
              className={`flagship-panel ${isActive ? 'is-active' : ''}`}
            >
              {/* Collapsed strip: visible only while another panel is open */}
              <button
                type="button"
                className="flagship-strip"
                onClick={() => goTo(idx)}
                aria-expanded={isActive}
                aria-label={`Show ${item.title}`}
                tabIndex={isActive ? -1 : 0}
              >
                <img src={item.image} alt="" className="flagship-strip-bg" />
                <span className="flagship-strip-index">0{idx + 1}</span>
                <span className="flagship-strip-title">{item.title}</span>
              </button>

              {/* Expanded case study */}
              <div className="flagship-panel-body" aria-hidden={!isActive}>
                <div className="flagship-stage-content">
                  <div className="flagship-stage-meta">
                    <span className="flagship-panel-index">0{idx + 1}</span>
                    <span className="flagship-tag">{item.caseTag}</span>
                  </div>

                  <h3 className="flagship-title">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flagship-title-link"
                        tabIndex={isActive ? 0 : -1}
                      >
                        {item.title}
                        <span className="flagship-title-arrow">{'↗︎'}</span>
                      </a>
                    ) : (
                      <span className="flagship-title-static">
                        {item.title}
                      </span>
                    )}
                  </h3>

                  <p className="flagship-desc">{item.desc}</p>

                  <div className="flagship-metrics-callout">
                    {item.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="callout-pill">
                        <span className="callout-pill-label">{m.label}</span>
                        <span className="callout-pill-val">{m.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flagship-tags">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flagship-stage-visual">
                  <div className="browser-mockup-frame">
                    <div className="browser-header-bar">
                      <div className="browser-controls">
                        <span className="browser-dot close" />
                        <span className="browser-dot min" />
                        <span className="browser-dot max" />
                      </div>
                      {item.domain && (
                        <div className="browser-url-pill">
                          <svg className="browser-lock-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          <span className="browser-url-text">{item.domain}</span>
                        </div>
                      )}
                    </div>

                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="browser-viewport-link"
                        tabIndex={isActive ? 0 : -1}
                      >
                        <img src={item.image} alt={item.title} className="browser-screen-img" />
                        <div className="browser-screen-glare" />
                      </a>
                    ) : (
                      <div className="browser-viewport-link browser-viewport-static">
                        <img src={item.image} alt={item.title} className="browser-screen-img" />
                        <div className="browser-screen-glare" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <SwipeDots
        targetRef={galleryRef}
        count={FLAGSHIP_ITEMS.length}
        label="flagship project"
        active={pinnedMobile ? activeIndex : undefined}
        onSelect={pinnedMobile ? goTo : undefined}
      />

      <div className="flagship-progress" aria-hidden="true">
        {FLAGSHIP_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            tabIndex={-1}
            className={`flagship-progress-step ${idx === activeIndex ? 'is-active' : ''}`}
            onClick={() => goTo(idx)}
          >
            <span className="flagship-progress-label">0{idx + 1} · {item.title}</span>
            <span className="flagship-progress-bar">
              <span className="flagship-progress-fill" style={{ transform: `scaleX(var(--fill-${idx}, 0))` }} />
            </span>
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}
