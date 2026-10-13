import { useState, useEffect, useRef } from 'react';
import SwipeDots from './SwipeDots';

interface FlagshipProject {
  id: number;
  caseTag: string;
  title: string;
  link: string;
  domain: string;
  image: string;
  desc: string;
  metrics: { label: string; val: string }[];
  tags: string[];
}

const FLAGSHIP_ITEMS: FlagshipProject[] = [
  {
    id: 17,
    caseTag: 'CASE 01 · NEXT.JS 16 & FASTAPI',
    title: 'Clardentity',
    link: 'https://clardentity.ai/',
    domain: 'clardentity.ai',
    image: './ProjectImages/Clardentity Learning and Development International.png',
    desc: 'An AI thinking companion and multi-mode reasoning engine that fact-checks its own answers across eight thinking modes. Splits answers into individual claims and cross-checks against uploaded documents and the live web with claim-level confidence scoring.',
    metrics: [
      { label: 'PWA Installable', val: 'iOS & Android' },
      { label: 'E2E Suite', val: '600+ Playwright Tests' }
    ],
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Python', 'FastAPI', 'Celery', 'PostgreSQL', 'Supabase', 'Redis']
  },
  {
    id: 18,
    caseTag: 'CASE 02 · CANVAS 2D & EDITORIAL SSG',
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
  },
  {
    id: 13,
    caseTag: 'CASE 03 · COMPUTATIONAL BIOLOGY & 3D SPLINES',
    title: 'IndZita Biotech',
    link: 'https://indzita-biotech-007.web.app/#overview',
    domain: 'indzita-biotech-007.web.app',
    image: './ProjectImages/Indzita.png',
    desc: 'Dual-engine 3D molecular visualization suite and interactive computational biology platform. Features Catmull-Rom spline interpolation and Euler kinematics on HTML5 Canvas alongside Spline 3D runtimes, a Hooke\'s-law spring-damped ASCII genomic canvas locked at 60 FPS, interactive real-time thermal PCR Virtual Lab simulation, and sub-second edge delivery via Vite + Firebase.',
    metrics: [
      { label: 'Kinematics Engine', val: 'Catmull-Rom & Euler 60FPS' },
      { label: 'Virtual Simulation', val: 'Interactive PCR Lab' }
    ],
    tags: ['Canvas', 'React', 'TypeScript', 'Vite', 'Firebase', 'Spline 3D']
  }
];

export default function FlagshipShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const snapRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

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
      const geo = getPinGeometry();
      if (!geo) return;
      const { track, scrollable, pinTop } = geo;
      const p = Math.max(0, Math.min(1, (pinTop - track.getBoundingClientRect().top) / scrollable));
      const steps = p * FLAGSHIP_ITEMS.length;
      FLAGSHIP_ITEMS.forEach((_, i) => {
        track.style.setProperty(`--fill-${i}`, String(Math.max(0, Math.min(1, steps - i))));
      });

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
    };
  }, []);

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

      <div className="flagship-gallery swipe-track" ref={galleryRef}>
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
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flagship-title-link"
                      tabIndex={isActive ? 0 : -1}
                    >
                      {item.title}
                      <span className="flagship-title-arrow">↗</span>
                    </a>
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
                      <div className="browser-url-pill">
                        <svg className="browser-lock-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span className="browser-url-text">{item.domain}</span>
                      </div>
                    </div>

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
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <SwipeDots targetRef={galleryRef} count={FLAGSHIP_ITEMS.length} label="flagship project" />

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
