import { Project } from '../data';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="project-card group">
      <div className="project-image-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
        />
        <div className="project-actions">
           <div className="view-btn-icon">
             <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;