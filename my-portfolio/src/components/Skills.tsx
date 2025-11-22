import { SKILLS_DATA } from '../data';
import ScrollReveal from './ScrollReveal';

const Skills = () => {
  return (
    <div className="section-container">
      <ScrollReveal>
        <span className="section-sub-header">My Arsenal</span>
        <h2 className="section-title">Skills & Tools.</h2>
      </ScrollReveal>

      <div className="skills-bento">
        {SKILLS_DATA.map((category, index) => (
          <ScrollReveal key={index} className="skill-card" delay={index * 0.1}>
            <div className="skill-card-header">
              <h3 className="skill-card-title">{category.title}</h3>
              <div className="skill-card-line"></div>
            </div>
            <div className="skill-tags-container">
              {category.skills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  <img src={skill.icon} alt={skill.name} className="skill-icon" />
                  {skill.name}
                </span>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Skills;