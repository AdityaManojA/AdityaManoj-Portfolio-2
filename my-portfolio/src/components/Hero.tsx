import DarkModeToggle from './DarkModeToggle';
import { SOCIAL_LINKS, PROJECTS_DATA } from '../data';
import ProjectCard from './ProjectCard';
import ScrollReveal from './ScrollReveal';

const Hero = () => {
  // Get the first 3 projects for the featured section
  const featuredProjects = PROJECTS_DATA.slice(0, 3);

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      url: SOCIAL_LINKS.linkedin,
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      url: SOCIAL_LINKS.github,
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'Email', 
      url: SOCIAL_LINKS.email,
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
  ];

  return (
    <>
      <ScrollReveal>
        <div className="hero-container">
            <div className="hero-row">
            <h1 className="hero-text">Hello</h1>
            <DarkModeToggle />
            <h1 className="hero-text">I'm Aditya.</h1>
          </div>
          <div className="hero-row">
            <h1 className="hero-text">I design &</h1>
          </div>
          <div className="hero-row">
            <h1 className="hero-text">develop</h1>
            <h1 className="hero-text">stuff</h1>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className="hero-desc">
          I develop because I can have my creative freedom to create client required product with my personal expertise and design.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="social-pills">
          {socialLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.url}
              target={link.name === 'Email' ? undefined : "_blank"}
              rel={link.name === 'Email' ? undefined : "noreferrer"}
              className="pill-link"
            >
              <span className="pill-text">{link.name}</span>
              <span className="pill-icon">{link.icon}</span>
            </a>
          ))}
        </div>
      </ScrollReveal>

      {/* Featured Projects Section */}
      <section className="section-container" style={{ marginTop: '4rem' }}>
        <ScrollReveal delay={0.3}>
          <h2 className="section-title" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>
            Featured Work
          </h2>
        </ScrollReveal>
        
        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={0.4 + (index * 0.1)}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;