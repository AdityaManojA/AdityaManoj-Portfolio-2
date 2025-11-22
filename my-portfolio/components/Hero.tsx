import DarkModeToggle from './DarkModeToggle';
import { SOCIAL_LINKS } from '../data';

const Hero = () => {
  return (
    <>
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

      <p className="hero-desc">
        I'm passionate about my work because I believe that good design can make a real difference in the world — it can help businesses attract new customers, build stronger relationships, and create a more positive brand image.
      </p>

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
    </>
  );
};

export default Hero;