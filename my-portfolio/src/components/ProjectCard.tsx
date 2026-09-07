import type { Project } from '../data';
import { SKILLS_DATA } from '../data';

interface ProjectCardProps {
  project: Project;
  onOpenHandbook?: () => void;
}

const ProjectCard = ({ project, onOpenHandbook }: ProjectCardProps) => {
  
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (project.isHandbook) {
      e.preventDefault();
      if (onOpenHandbook) {
        onOpenHandbook();
      }
    }
  };

  return (
    <a 
      href={project.link} 
      onClick={handleClick}
      target={project.isHandbook ? undefined : "_blank"} 
      rel={project.isHandbook ? undefined : "noopener noreferrer"}
      className={`project-card group ${project.isHandbook ? 'handbook-card-highlight' : ''}`}
    >
      <div className="project-image-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
        />
        {project.isHandbook && (
          <div className="handbook-pill-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Interactive Handbook
          </div>
        )}
        <div className="project-actions">
           <div className="view-btn-icon">
             {project.isHandbook ? (
               <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                 Read
                 <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
               </span>
             ) : (
               <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
             )}
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