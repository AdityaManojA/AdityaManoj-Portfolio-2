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
              Hi there, I'm <strong>Aditya Manoj</strong>. I'm a Software Development Engineer (SDE 1 & 2) at <strong>Cisco Systems India</strong>, specializing in cloud-native infrastructure, distributed systems, high availability, and enterprise networking.
            </p>
            <br/>
            <p>
              I bridge physical silicon, bare-metal server engineering, and Linux kernel internals with modern multi-cloud automation (AWS/Azure/GCP), Kubernetes orchestration, SRE observability (Prometheus/Loki/Grafana), and resilient full-stack systems.
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
              <div className="stat-number">99.99%</div>
              <div className="stat-label">SRE Mindset</div>
            </div>
          </div>
        </ScrollReveal>

        {/* What I Do */}
        <ScrollReveal className="about-card what-i-do-card" delay={0.2}>
          <h3 className="skill-card-title">What I Do</h3>
          <div className="do-grid">
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              <div className="do-title">Cloud Native & K8s</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <div className="do-title">SRE & Observability</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
              <div className="do-title">Bare-Metal & Networks</div>
            </div>
            <div className="do-item">
              <svg className="do-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <div className="do-title">Full-Stack & Applied AI</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;