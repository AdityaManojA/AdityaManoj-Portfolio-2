import type { Project } from '../data';
import { SKILLS_DATA } from '../data';

const ProjectCard = ({ project }: { project: Project }) => {
  
  // Smart Lookup: Find the icon that matches the tag name
  const getSkillIcon = (tagName: string) => {
    // Flatten all skills into one array to search easily
    const allSkills = SKILLS_DATA.flatMap(category => category.skills);
    
    // Flexible matching: exact match or starts with (e.g. "React" matches "React.js")
    const skill = allSkills.find(s => {
      const t = tagName.toLowerCase();
      const n = s.name.toLowerCase();
      return n === t || n.startsWith(t) || t.startsWith(n);
    });

    return skill ? skill.icon : null;
  };

  return (
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="project-card group"
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
                    style={{ display: 'inline-block', marginRight: '0.35rem', verticalAlign: 'middle' }} 
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