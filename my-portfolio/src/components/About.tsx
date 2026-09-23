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
              Hi there, I'm <strong>Aditya Manoj</strong>. I'm a <strong>Full-Stack Developer & Systems Engineer</strong> specializing in modern web applications, high-throughput Progressive Web Apps (PWAs), interactive frontend architectures, and robust backend services.
            </p>
            <br/>
            <p>
              I build scalable, responsive web experiences using React, Next.js, TypeScript, and HTML5 Canvas, backed by resilient cloud APIs (Node.js, Python, Firebase, AWS, GCP). I also train AI models, <a href="https://github.com/AdityaManojA/prompt-ops-blueprints" target="_blank" rel="noopener noreferrer" className="text-[#FF9F68] hover:underline font-semibold">making them easy to access</a> and integrate into real-world web applications.
            </p>
            <br/>
            <p>
              With strong foundations across both frontend finesse and backend systems engineering, I turn pure ideas into intuitive, production-grade digital platforms with sub-second performance.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal className="about-card stats-card" delay={0.1}>
          <div className="stat-row">
            <div className="stat-item">
              <div className="stat-number">47+</div>
              <div className="stat-label">Repositories</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Production Delivery</div>
            </div>
          </div>
        </ScrollReveal>

        {/* What I Do */}
        <ScrollReveal className="about-card what-i-do-card" delay={0.2}>
          <h3 className="skill-card-title">What I Do</h3>
          <div className="do-grid">
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <div className="do-title">Full-Stack Web & PWAs</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <div className="do-title">Frontend & 3D UI</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
              <div className="do-title">Backend & Cloud APIs</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <div className="do-title">AI & Systems Tuning</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;