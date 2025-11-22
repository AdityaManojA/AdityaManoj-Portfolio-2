import { SKILLS_DATA } from '../data';

const Skills = () => {
  return (
    <div className="section-container">
      <span className="section-sub-header">My Arsenal</span>
      <h2 className="section-title">Skills & Tools.</h2>

      <div className="skills-bento">
        {SKILLS_DATA.map((category, index) => (
          <div key={index} className="skill-card">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;