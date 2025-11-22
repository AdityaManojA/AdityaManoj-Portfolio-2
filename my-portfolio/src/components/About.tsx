const About = () => {
  return (
    <div className="section-container">
      <span className="section-sub-header">About Me</span>
      <h2 className="section-title">Converting pure ideas into designs.</h2>
      
      <div className="about-grid">
        {/* Bio */}
        <div className="about-card bio-card">
          <h3 className="skill-card-title" style={{ marginBottom: '1rem' }}>Who am I?</h3>
          <div className="section-text" style={{ marginBottom: 0 }}>
            <p>
              Hi there, I'm <strong>Aditya Manoj</strong>. I'm a CS student studying Engineering (B.Tech), passionate about coding, design, and creative projects.
            </p>
            <br/>
            <p>
              I blend technical expertise with artistic vision. Whether it's building decentralized apps or sculpting 3D models, I am a quick learner with a knack for bringing abstract ideas to life.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="about-card stats-card">
          <div className="stat-row">
            <div className="stat-item">
              <div className="stat-number">46</div>
              <div className="stat-label">Repositories</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1+</div>
              <div className="stat-label">Year Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Passion</div>
            </div>
          </div>
        </div>

        {/* What I Do */}
        <div className="about-card what-i-do-card">
          <h3 className="skill-card-title">What I Do</h3>
          <div className="do-grid">
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <div className="do-title">Coding</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              <div className="do-title">3D Artistry</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <div className="do-title">Video Editing</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              <div className="do-title">Webflow</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;