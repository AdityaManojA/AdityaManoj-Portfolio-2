import { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../data';
import ProjectCard from './ProjectCard';
import ScrollReveal from './ScrollReveal';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Dynamically generate categories from the data
  const categories = ['All', ...Array.from(new Set(PROJECTS_DATA.map(project => project.category)))];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="section-container">
      <ScrollReveal>
        <h2 className="section-header">Selected Work</h2>
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <div className="filter-container">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.1}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found in this category.</p>
        </div>
      )}
    </section>
  );
};

export default Projects;