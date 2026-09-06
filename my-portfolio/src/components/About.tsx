import ScrollReveal from './ScrollReveal';

const About = () => {
  return (
    <div className="section-container">
      <ScrollReveal>
        <span className="section-sub-header">About Me</span>
        <h2 className="section-title">Converting pure ideas into designs.</h2>
      </ScrollReveal>
      
      <div className="about-grid">
        {/* Bio */}
        <ScrollReveal className="about-card bio-card">
          <h3 className="skill-card-title" style={{ marginBottom: '1rem' }}>Who am I?</h3>
          <div className="section-text" style={{ marginBottom: 0 }}>
            <p>
              Hi there, I'm <strong>Aditya Manoj</strong>. I'm a CS Grad (B.Tech), passionate about coding, design, and creative projects.
            </p>
            <br/>
            <p>
              I blend technical expertise with artistic vision. Whether it's building functional apps or developing Services, I am a quick learner with a knack for bringing abstract ideas to life.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal className="about-card stats-card" delay={0.1}>
          <div className="stat-row">
            <div className="stat-item">
              <div className="stat-number">47</div>
              <div className="stat-label">Repositories</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Passion</div>
            </div>
          </div>
        </ScrollReveal>

        {/* What I Do */}
        <ScrollReveal className="about-card what-i-do-card" delay={0.2}>
          <h3 className="skill-card-title">What I Do</h3>
          <div className="do-grid">
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <div className="do-title">Full-Stack</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              <div className="do-title">Cloud Stacks</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <div className="do-title">DevOps & CI/CD</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <div className="do-title">Applied AI</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;