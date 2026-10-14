import { useEffect, useRef, useState } from 'react';
import type { Project } from '../data';
import { SKILLS_DATA } from '../data';

interface ProjectCardProps {
  project: Project;
  onOpenHandbook?: () => void;
}

// Band of the viewport where a case file counts as "in focus": from 12% below the top edge
// down to 60% (just past centre). The file pops up as it scrolls into the band and drops back
// into the folder as it leaves near the top. Only touch / phone layouts use it (see App.css);
// desktop mice keep the hover version.
const FOCUS_BAND = '-12% 0px -40% 0px';

const ProjectCard = ({ project, onOpenHandbook }: ProjectCardProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [inFocus, setInFocus] = useState(false);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    // Observe the folder (not the file sheet itself), so the pop's own movement can't flip it.
    const observer = new IntersectionObserver(([entry]) => setInFocus(entry.isIntersecting), {
      rootMargin: FOCUS_BAND,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const hasLink = Boolean(project.link || project.isHandbook);

  const cardInner = (
    <>
      <div className="project-image-wrapper" ref={imageRef}>
        <div className="folder-tab">
          <span className="folder-tab-badge">CASE FILE</span>
          <span className="folder-tab-id">#{String(project.id).padStart(2, '0')}</span>
        </div>
        <div className="folder-file-container">
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
          />
        </div>
        <div className="folder-pocket-lip" />
        {hasLink && (
          <div className="project-actions">
             <div className="view-btn-icon">
               <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
             </div>
          </div>
        )}
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
    </>
  );

  if (hasLink) {
    return (
      <a 
        href={project.link} 
        onClick={handleClick}
        target={project.isHandbook ? undefined : "_blank"} 
        rel={project.isHandbook ? undefined : "noopener noreferrer"}
        className={`project-card group ${inFocus ? 'is-in-focus' : ''}`}
      >
        {cardInner}
      </a>
    );
  }

  return (
    <div 
      className={`project-card group is-static ${inFocus ? 'is-in-focus' : ''}`}
    >
      {cardInner}
    </div>
  );
};

export default ProjectCard;