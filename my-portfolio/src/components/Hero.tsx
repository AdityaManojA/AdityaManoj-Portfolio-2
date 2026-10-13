import { useRef, useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { SOCIAL_LINKS, PROJECTS_DATA } from '../data';
import ProjectCard from './ProjectCard';
import ScrollReveal from './ScrollReveal';
import ExploreModal from './ExploreModal';

import FlagshipShowcase from './FlagshipShowcase';
import HeroBackdrop from './HeroBackdrop';
import LandingGuide from './LandingGuide';
import SwipeDots from './SwipeDots';
import { RotatingWord, CountUp } from './HeroMotion';


const PROOF_STATS = [
  { to: 48, suffix: '+', label: 'Public Repositories' },
  { to: 1.2, decimals: 1, suffix: 'M+', label: 'Firestore Reads (GLIA)' },
  // Latency stays static: counting it upward would read as getting slower.
  { to: 150, prefix: '<', suffix: 'ms', label: 'RapidOCR & Audio Latency', still: true },
  { to: 600, suffix: '+', label: 'E2E Tests (Clardentity)' },
];

// Kept deliberately short: one line of context and the core tools per area.
// The full breakdown lives on the Skills tab.
const CAPABILITIES = [
  {
    title: 'Frontend & Graphics',
    summary: 'Production web apps with canvas and 3D graphics.',
    stack: ['React 19', 'Next.js 16', 'TypeScript', 'Canvas 2D', 'Spline 3D', 'PWA'],
  },
  {
    title: 'AI Agents & Multimodal',
    summary: 'Desktop agents with live voice and on-device vision.',
    stack: ['Gemini Live', 'Claude', 'Ollama', 'Whisper', 'ONNX', 'PyQt6'],
  },
  {
    title: 'Backend & Data',
    summary: 'Async APIs, task queues and vector search.',
    stack: ['FastAPI', 'Node.js', 'Celery', 'PostgreSQL', 'pgvector', 'Redis'],
  },
  {
    title: 'SRE & Infrastructure',
    summary: 'Linux internals up to Kubernetes. Author of the SRE Handbook.',
    stack: ['Linux', 'cgroups', 'Kubernetes', 'Prometheus', 'Grafana', 'AWS'],
  },
];

interface HeroProps {
  onOpenHandbook?: () => void;
  onNavigateTab?: (tab: string) => void;
}

const Hero = ({ onOpenHandbook, onNavigateTab }: HeroProps) => {
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const caseFilesRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);

  // Curated systems for the Uniform Folder Drawer (ALFRED, The Whiskey Business, ThreadPath Collective)
  const selectedSystems = [16, 11, 8]
    .map(id => PROJECTS_DATA.find(p => p.id === id))
    .filter(Boolean) as typeof PROJECTS_DATA;

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      url: SOCIAL_LINKS.linkedin,
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      url: SOCIAL_LINKS.github,
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'Email', 
      url: SOCIAL_LINKS.email,
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    { 
      name: 'Resume', 
      url: SOCIAL_LINKS.cv,
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      )
    },
  ];

  return (
    <div className="anti-slop-landing">
      <LandingGuide />
      {/* 1. Executive Editorial Hero */}
      <section className="hero-editorial-section">
        <HeroBackdrop />
        <ScrollReveal delay={0.08}>
          <div className="hero-container">
            <div className="hero-row">
              <h1 className="hero-text">Hello</h1>
              <DarkModeToggle />
              <h1 className="hero-text">I'm Aditya.</h1>
            </div>
            <div className="hero-row">
              <h1 className="hero-text">I design &</h1>
            </div>
            <div className="hero-row">
              <h1 className="hero-text">develop</h1>
              <h1 className="hero-text hero-text-accent">
                <RotatingWord words={['systems', 'products', 'agents', 'runtimes']} />
              </h1>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <p className="hero-desc-editorial">
            Full-Stack & Systems Engineer. Architect of{' '}
            <a
              href="https://github.com/AdityaManojA/ALFRED-MK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline font-semibold"
            >
              ALFRED
            </a>
            . Building high-throughput web applications, interactive 3D runtimes, and{' '}
            <a
              href="https://github.com/AdityaManojA/prompt-ops-blueprints"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline font-semibold"
            >
              sovereign AI models
            </a>
            .
          </p>
        </ScrollReveal>

        {/* Action Pills */}
        <ScrollReveal delay={0.24}>
          <div className="hero-actions-container">
            <div className="social-pills">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.url}
                  target={link.name === 'Email' ? undefined : "_blank"}
                  rel={link.name === 'Email' ? undefined : "noreferrer"}
                  className="pill-link"
                >
                  <span className="pill-text">{link.name}</span>
                  <span className="pill-icon">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Verifiable Proof Telemetry Strip */}
        <ScrollReveal delay={0.32}>
          <div className="proof-telemetry-strip">
            {PROOF_STATS.map((stat, i) => (
              <div key={stat.label} className="proof-stat-group">
                {i > 0 && <div className="proof-stat-divider" />}
                <div className="proof-stat-item">
                  <span className="proof-stat-value">
                    {stat.still ? (
                      `${stat.prefix}${stat.to}${stat.suffix}`
                    ) : (
                      <CountUp to={stat.to} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
                    )}
                  </span>
                  <span className="proof-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="hero-scroll-cue" aria-hidden="true">
          <span className="hero-scroll-cue-line" />
          <span className="hero-scroll-cue-text">Scroll</span>
        </div>
      </section>

      {/* 2. Flagship Systems Dossier (Expanding Panel Gallery) */}
      <section className="section-container" style={{ marginTop: '3.5rem' }}>
        <FlagshipShowcase />
      </section>

      {/* 3. Selected Systems Drawer (Curated Case Files) */}
      <section className="section-container" style={{ marginTop: '2.5rem' }}>
        <ScrollReveal delay={0.1}>
          <div className="section-kicker-header">
            <span className="section-index-tag">02 · SELECTED SYSTEMS DRAWER</span>
            <h2 className="editorial-section-title">Specialized Engineering Case Files</h2>
            <p className="editorial-section-subtitle">
              Sovereign multimodal desktop agents, computational biology suites, and mission-critical event PWAs.
            </p>
          </div>
        </ScrollReveal>

        <div className="projects-grid swipe-track" ref={caseFilesRef}>
          {selectedSystems.map((project, index) => (
            <ScrollReveal key={project.id} delay={0.15 + (index * 0.08)}>
              <ProjectCard project={project} onOpenHandbook={onOpenHandbook} />
            </ScrollReveal>
          ))}
        </div>
        <SwipeDots targetRef={caseFilesRef} count={selectedSystems.length} label="case file" />
      </section>

      {/* 4. Capability Overview: four areas, one line each, core tools as chips */}
      <section className="section-container" style={{ marginTop: '5.5rem' }}>
        <ScrollReveal delay={0.1}>
          <div className="section-kicker-header capability-header">
            <div>
              <span className="section-index-tag">03 · TECHNICAL CAPABILITY MATRIX</span>
              <h2 className="editorial-section-title">Engineering Competencies & Stack Depth</h2>
              <p className="editorial-section-subtitle">
                Four areas I work across, from canvas runtimes to Linux internals.
              </p>
            </div>
            {onNavigateTab && (
              <button type="button" className="capability-more-link" onClick={() => onNavigateTab('Skills')}>
                Full skills breakdown <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </ScrollReveal>

        <div className="capability-grid swipe-track" ref={capabilitiesRef}>
          {CAPABILITIES.map((cap, idx) => (
            <ScrollReveal key={cap.title} delay={0.12 + idx * 0.07}>
              <article className="capability-card">
                <span className="capability-index">0{idx + 1}</span>
                <h3 className="capability-title">{cap.title}</h3>
                <p className="capability-summary">{cap.summary}</p>
                <ul className="capability-stack" aria-label={`${cap.title} tools`}>
                  {cap.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <SwipeDots targetRef={capabilitiesRef} count={CAPABILITIES.length} label="capability" />
      </section>

      {/* 5. Author Spotlight & Direct Action Station */}
      <section className="section-container" style={{ marginTop: '5.5rem', marginBottom: '2rem' }}>
        <ScrollReveal delay={0.1}>
          <div className="handbook-spotlight-card">
            <div className="handbook-spotlight-content">
              <div className="handbook-spotlight-kicker">04 · TECHNICAL PUBLICATION</div>
              <h3 className="handbook-spotlight-title">The DevOps, SRE & Cloud Infrastructure Handbook</h3>
              <p className="handbook-spotlight-desc">
                An exhaustive technical reference authored by Aditya Manoj. Bridges bare-metal silicon (IPMI, RAID, BIOS C-states), Cisco networking, and Linux kernel internals with production Kubernetes orchestration, Prometheus observability, and 20 architectural interview deep-dives.
              </p>
              <div className="handbook-actions">
                <button
                  onClick={onOpenHandbook}
                  className="editorial-action-btn primary"
                  aria-label="Open The DevOps, SRE & Cloud Infrastructure Handbook"
                >
                  <span>Read The Handbook</span>
                  <span className="btn-arrow">→</span>
                </button>
                {onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab('Projects')}
                    className="editorial-action-btn secondary"
                    aria-label="View all selected works"
                  >
                    <span>View All 16+ Projects</span>
                    <span className="btn-arrow">↗</span>
                  </button>
                )}
                <button
                  onClick={() => setIsExploreModalOpen(true)}
                  className="editorial-action-btn ghost"
                  aria-label="Open exploration modal"
                >
                  <span>Quick Navigation Directory</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Explore More Popup Modal */}
      <ExploreModal
        isOpen={isExploreModalOpen}
        onClose={() => setIsExploreModalOpen(false)}
        onSelectOption={(tab) => {
          setIsExploreModalOpen(false);
          if (onNavigateTab) {
            onNavigateTab(tab);
          }
        }}
      />
    </div>
  );
};

export default Hero;