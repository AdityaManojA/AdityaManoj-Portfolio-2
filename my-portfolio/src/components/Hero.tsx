import DarkModeToggle from './DarkModeToggle';
import { SOCIAL_LINKS, PROJECTS_DATA } from '../data';
import ProjectCard from './ProjectCard';
import ScrollReveal from './ScrollReveal';

const Hero = () => {
  const featuredProjects = PROJECTS_DATA.slice(0, 3);

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
          I make stuff because I can have my creative freedom to create client based product with my personal expertise and design.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="social-pills">
          {[
            { name: 'LinkedIn', url: SOCIAL_LINKS.linkedin },
            { name: 'GitHub', url: SOCIAL_LINKS.github },
            { name: 'Email', url: SOCIAL_LINKS.email },
          ].map((link) => (
            <a 
              key={link.name} 
              href={link.url}
              target={link.name === 'Email' ? undefined : "_blank"}
              rel={link.name === 'Email' ? undefined : "noreferrer"}
              className="pill-link"
            >
              {link.name}
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