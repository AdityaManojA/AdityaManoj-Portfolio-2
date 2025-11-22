import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data';
import ScrollReveal from './ScrollReveal';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(PROJECTS_DATA.map(p => p.category))];
  
  const filteredProjects = filter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  return (
    <div className="section-container">
      <ScrollReveal>
        <span className="section-sub-header">Selected Work</span>
        <h2 className="section-title">Featured Projects.</h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="filter-container">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setFilter(cat)}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.1}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-image-wrapper">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image" 
                />
                
                {/* Hover Action Button */}
                <div className="project-actions">
                  <div className="view-btn-icon">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <span className="project-cat">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                </div>
                
                <p className="project-desc">{project.description}</p>
                
                {/* --- UPDATED TAGS SECTION --- */}
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag flex items-center gap-2">
                      {/* Icon Image */}
                      <img 
                        src={tag.icon} 
                        alt={tag.name} 
                        className="w-4 h-4 object-contain" 
                      />
                      {/* Tag Name */}
                      <span>{tag.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Projects;