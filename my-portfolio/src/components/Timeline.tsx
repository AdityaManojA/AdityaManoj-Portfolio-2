import { TIMELINE_DATA } from '../data';
import ScrollReveal from './ScrollReveal';

export default function Timeline() {
  return (
    <div className="section-container relative z-10" style={{ maxWidth: '72rem', margin: '0 auto', paddingBottom: '4rem' }}>
      <ScrollReveal>
        <div className="section-kicker-header" style={{ marginBottom: '3rem' }}>
          <span className="section-index-tag">05 · CAREER TRAJECTORY & EXPERIENCE</span>
          <h2 className="editorial-section-title">My Journey & Systems Impact</h2>
          <p className="editorial-section-subtitle">
            Production software engineering, cloud infrastructure orchestration, interactive graphics runtimes, and autonomous AI agents.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Timeline Spine Container */}
      <div className="timeline-track-container">
        {/* Continuous Central/Left Spine Line */}
        <div className="timeline-central-spine" aria-hidden="true" />

        <div className="timeline-entries-list">
          {TIMELINE_DATA.map((item, index) => (
            <div key={index} className="timeline-entry-row">
              {/* Timeline Marker Node */}
              <div className="timeline-marker-wrapper">
                <div className="timeline-marker-dot">
                  <div className="timeline-marker-core" />
                </div>
              </div>

              {/* Timeline Card */}
              <ScrollReveal delay={0.08 * (index % 3)} className="timeline-card-wrapper">
                <div className="timeline-card">
                  {/* Meta Bar: Company + Year */}
                  <div className="timeline-card-meta">
                    <div className="timeline-company-badge">
                      <span className="company-icon-svg" aria-hidden="true">
                        {item.type === 'education' ? (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          </svg>
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                          </svg>
                        )}
                      </span>
                      <span className="company-name">{item.company}</span>
                    </div>
                    <span className="timeline-year-pill">{item.year}</span>
                  </div>

                  {/* Role Title */}
                  <h3 className="timeline-role-title">{item.title}</h3>

                  {/* Impact Description */}
                  <p className="timeline-desc">{item.description}</p>

                  {/* Location & Context */}
                  <div className="timeline-card-footer">
                    <span className="timeline-location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {item.location}
                    </span>
                    <span className="timeline-type-pill">{item.type === 'education' ? 'Academic Program' : 'Production Systems'}</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}