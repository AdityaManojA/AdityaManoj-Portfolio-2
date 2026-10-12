import { useState, useEffect, useRef } from 'react';

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
  const snapTimeoutRef = useRef<number | null>(null);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;
      if (scrollableDistance <= 0) return;

      const stagePinnedTop = Math.max(76, windowHeight * 0.5 - 280);
      const scrolledPastPin = stagePinnedTop - rect.top;

      // Track whether user is actively browsing within the pinned sticky track
      const isInsideTrack = scrolledPastPin >= -40 && scrolledPastPin <= scrollableDistance + 40;

      // Track progress 0 to 1
      const p = Math.max(0, Math.min(1, scrolledPastPin / scrollableDistance));

      // Discrete step threshold switching
      let nextIndex = 0;
      if (p >= 0.78) {
        nextIndex = 2;
      } else if (p >= 0.40) {
        nextIndex = 1;
      } else {
        nextIndex = 0;
      }

      setActiveIndex(nextIndex);

      // Snap scroll to target card position once user stops scrolling
      if (snapTimeoutRef.current) {
        window.clearTimeout(snapTimeoutRef.current);
      }

      // DO NOT snap if user is on the 3rd card moving forward, or 1st card moving upward:
      // This allows free, zero-delay exit directly into the next section!
      if (nextIndex === 2 && p >= 0.80) {
        return;
      }
      if (nextIndex === 0 && p <= 0.12) {
        return;
      }

      if (isInsideTrack && !isSnappingRef.current) {
        snapTimeoutRef.current = window.setTimeout(() => {
          const trackAbsoluteTop = track.getBoundingClientRect().top + window.scrollY;
          const snapTargets = [0.05, 0.55, 0.95];
          const targetScroll = trackAbsoluteTop - stagePinnedTop + snapTargets[nextIndex] * scrollableDistance;

          // Only snap if user stopped away from the snap center
          if (Math.abs(window.scrollY - targetScroll) > 35) {
            isSnappingRef.current = true;
            window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
            setTimeout(() => {
              isSnappingRef.current = false;
            }, 450);
          }
        }, 120);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (snapTimeoutRef.current) window.clearTimeout(snapTimeoutRef.current);
    };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    const track = trackRef.current;
    if (!track) return;

    const windowHeight = window.innerHeight;
    const scrollableDistance = track.offsetHeight - windowHeight;
    const trackAbsoluteTop = track.getBoundingClientRect().top + window.scrollY;
    const stagePinnedTop = Math.max(76, windowHeight * 0.5 - 280);

    const snapTargets = [0.05, 0.55, 0.95];
    const targetP = snapTargets[index] ?? 0;
    const targetScroll = trackAbsoluteTop - stagePinnedTop + targetP * scrollableDistance;

    isSnappingRef.current = true;
    window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
    setTimeout(() => {
      isSnappingRef.current = false;
    }, 450);
  };

  return (
    <div className="flagship-sticky-track" ref={trackRef}>
      <div className="flagship-sticky-stage">
        {/* Pinned Showcase Header Bar & Tab Pills */}
        <div className="flagship-stage-header">
          <div className="flagship-header-row">
            <div>
              <span className="section-index-tag">01 · FLAGSHIP PRODUCTION DEPLOYMENTS</span>
              <h2 className="editorial-section-title">Architectural Showcases</h2>
              <p className="editorial-section-subtitle">
                Engineered with production-grade verification, sub-second edge performance, and multi-mode autonomy.
              </p>
            </div>

            <div className="flagship-stage-nav" role="tablist" aria-label="Flagship projects navigation">
              {FLAGSHIP_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  onClick={() => handleTabClick(idx)}
                  className={`flagship-stage-tab ${idx === activeIndex ? 'active' : ''}`}
                >
                  <span className="stage-tab-index">0{idx + 1}</span>
                  <span className="stage-tab-title">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Physical Card Deck Viewport */}
        <div className="flagship-deck-viewport">
          {FLAGSHIP_ITEMS.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            const isPrevious = idx < activeIndex;
            const isNext = idx > activeIndex;

            let cardStatusClass = "flagship-deck-card";
            if (isCurrent) cardStatusClass += " current";
            else if (isPrevious) cardStatusClass += " shuffled-back";
            else if (isNext) cardStatusClass += " waiting-in-deck";

            return (
              <div 
                key={item.id} 
                className={cardStatusClass}
                aria-hidden={!isCurrent}
              >
                {/* Left Column: Technical Dossier */}
                <div className="flagship-stage-content">
                  <div className="flagship-stage-meta">
                    <span className="flagship-tag">{item.caseTag}</span>
                  </div>

                  <h3 className="flagship-title">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flagship-title-link"
                      tabIndex={isCurrent ? 0 : -1}
                    >
                      {item.title}
                      <span className="flagship-title-arrow">↗</span>
                    </a>
                  </h3>

                  <p className="flagship-desc">
                    {item.desc}
                  </p>

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

                {/* Right Column: High-Fidelity Browser Window Stage */}
                <div className="flagship-stage-visual">
                  <div className="browser-mockup-frame">
                    {/* Browser Header Bar */}
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

                    {/* Viewport Image Link */}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="browser-viewport-link"
                      tabIndex={isCurrent ? 0 : -1}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="browser-screen-img"
                      />
                      <div className="browser-screen-glare" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
