import type { Project } from '../data';
import { SKILLS_DATA } from '../data';

const ProjectCard = ({ project }: { project: Project }) => {
  
  // Helper function to find icon for a specific tag
  const getSkillIcon = (tagName: string) => {
    const allSkills = SKILLS_DATA.flatMap(category => category.skills);
    const skill = allSkills.find(s => 
      s.name.toLowerCase() === tagName.toLowerCase() || 
      s.name.toLowerCase().startsWith(tagName.toLowerCase()) ||
      (tagName.toLowerCase() === 'react' && s.name === 'React.js')
    );
    return skill ? skill.icon : null;
  };

  return (
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="project-card group" // Removed 'block text-left' as CSS handles it
    >
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
          {project.tags.map((tag, index) => {
            const iconUrl = getSkillIcon(tag);
            return (
              <span key={index} className="tag">
                {iconUrl && (
                  <img 
                    src={iconUrl} 
                    alt="" 
                    className="w-3 h-3 object-contain" 
                    style={{ minWidth: '12px' }} 
                  />
                )}
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;