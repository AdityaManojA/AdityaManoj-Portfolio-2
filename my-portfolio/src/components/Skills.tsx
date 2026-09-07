import React, { useState } from 'react';
import { SKILLS_DATA } from '../data';
import ScrollReveal from './ScrollReveal';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...SKILLS_DATA.map(c => c.title)];

  const filteredData = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(c => c.title === selectedCategory);

  return (
    <div className="section-container" id="skills">
      <ScrollReveal>
        <span className="section-sub-header">My Arsenal</span>
        <h2 className="section-title">Skills, Systems & Tools.</h2>
      </ScrollReveal>

      {/* Category Pills */}
      <div className="skills-filter-bar">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`skills-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
            {cat !== 'All' && (
              <span className="skills-filter-count">
                {SKILLS_DATA.find(c => c.title === cat)?.skills.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="skills-bento">
        {filteredData.map((category, index) => (
          <div key={category.title} className="skill-card">
            <div className="skill-card-header">
              <div className="flex items-center justify-between">
                <h3 className="skill-card-title">{category.title}</h3>
                <span className="skill-card-badge">{category.skills.length}</span>
              </div>
              <div className="skill-card-line"></div>
            </div>
            <div className="skill-tags-container">
              {category.skills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="skill-icon"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span>{skill.name}</span>
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