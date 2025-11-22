import React from 'react';
import { TIMELINE_DATA } from '../data';
import ScrollReveal from './ScrollReveal';

const Timeline = () => {
  return (
    // 1. OUTER WRAPPER: Spans the full width of the browser
    <section className="relative w-full py-20 overflow-hidden">
      
      {/* 2. BACKGROUND: Positioned absolutely within the full-width wrapper */}
      <div className="ambient-bg-container">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
      </div>

      {/* 3. INNER CONTAINER: Centered and constrained width for content */}
      <div className="section-container relative z-10 mx-auto max-w-6xl px-4">
        
        {/* Header */}
        <div className="timeline-header-center mb-16 text-center">
          <ScrollReveal>
            <span className="section-sub-header block">Journey</span>
            <h2 className="section-title">My Path So Far.</h2>
          </ScrollReveal>
        </div>
      
        <div className="timeline-container">
          {TIMELINE_DATA.map((item, index) => (
            <div key={index} className="timeline-item-wrapper">
              <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                
                {/* Dot */}
                <ScrollReveal delay={0.2} threshold={0.5}>
                  <div className="timeline-dot-wrapper">
                    <div className="timeline-dot"></div>
                    <div className="timeline-dot-pulse"></div>
                  </div>
                </ScrollReveal>

                {/* Card */}
                <ScrollReveal 
                  className="timeline-content-card" 
                  delay={index * 0.1}
                  threshold={0.2}
                >
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.description}</p>
                  
                  <div className="timeline-footer">
                    <svg className="loc-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="timeline-loc">{item.location}</span>
                  </div>
                </ScrollReveal>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;