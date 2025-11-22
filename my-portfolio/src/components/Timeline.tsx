import React from 'react';
import { TIMELINE_DATA } from '../data';
import ScrollReveal from './ScrollReveal';

const Timeline = () => {
  return (
    <div className="section-container relative" style={{ overflow: 'hidden' }}>
      
      {/* Ambient Background (Keep your existing blobs) */}
      <div className="ambient-bg-container">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
      </div>

      <div className="relative z-10">
        
        {/* FIX: Centered Header Wrapper */}
        <div className="timeline-header-center">
          <ScrollReveal>
            <span className="section-sub-header center-text">Journey</span>
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
                  {/* The Year is now a background watermark style */}
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
    </div>
  );
};

export default Timeline;