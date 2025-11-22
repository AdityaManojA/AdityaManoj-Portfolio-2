import { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../data';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Website Designs', 'Design Images', 'Projects', 'CS Projects'];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="section-container">
      <h2 className="section-header">Selected Work</h2>
      
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

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
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