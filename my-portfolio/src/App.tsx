import { useState, useEffect, useMemo } from 'react';
import newProfilePic from '../Images/Aditya.jpeg';
import './App.css';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
}

const profilePic = newProfilePic;
const footerImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCZR0qY4ZcmpegAjitD_84MLI8L1ZCTBMF5wyUTA5-sxGsZ_d6wcl-t3ClbHUEJ-t2wOOgxq6jxuPcRe7CqrjF9fmNQLh1IvHeFSKo4EQmk5ekKXRzSxABCHm0R_Zssr_gXrFIj49jY2uoYshNHfx0zraub7M-WCV1OHEncf_QXae3Wxq9-73XGT8zbJ854qbMctr2SNbASo1wlp4OF17t3Ez45QO4jhRt7ZD0y7Rc8HvEptOXfP7p-cPnHFs0wfJxZMj5mwwStLVw";
const projectPlaceholder = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/aditya-manoj-a-0a930b256/",
  github: "https://github.com/AdityaManoja",
  email: "mailto:adityamanoja@gmail.com"
};

const mockProjects: Project[] = [
  {
    id: 1,
    title: "DeX",
    category: "Projects",
    year: "2025",
    description: "A blockchain-based education app integrating AI and blockchain technology to provide a decentralized, reward-based learning platform.",
    tags: ["Blockchain", "AI", "Decentralized", "Education"],
    image: projectPlaceholder
  },
  {
    id: 2,
    title: "Class-Vision",
    category: "CS Projects",
    year: "2024",
    description: "A machine learning based system that uses facial recognition to gauge student attention and rate the class effectiveness in real-time.",
    tags: ["Machine Learning", "Facial Recognition", "Python", "Computer Vision"],
    image: projectPlaceholder
  },
  {
    id: 3,
    title: "Meat Spoilage Detection",
    category: "CS Projects",
    year: "2024",
    description: "A hardware-based, no-contact meat spoilage detection system that uses IoT sensors to assess whether meat has spoiled.",
    tags: ["IoT", "Hardware", "C++", "Sensors"],
    image: projectPlaceholder
  },
  {
    id: 4,
    title: "Flashcard Learning Pal",
    category: "Website Designs",
    year: "2023",
    description: "A web-based interactive learning tool designed to help students memorize concepts effectively.",
    tags: ["JavaScript", "HTML", "CSS"],
    image: projectPlaceholder
  },
];

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
      aria-label="Scroll to top"
    >
      <svg className="scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('theme');
    if (storedMode) return storedMode === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleMode = () => setIsDarkMode(!isDarkMode);

  return (
    <button 
      onClick={toggleMode}
      className="toggle-btn"
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="toggle-thumb">
        <img 
          src={profilePic} 
          alt="Toggle Theme" 
          className="toggle-img"
        />
      </div>
    </button>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="project-card group">
      <div className="project-image-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
        />
      </div>
      <div className="project-content">
        <div className="project-meta">
          <span className="project-cat">{project.category}</span>
          <span className="project-year">{project.year}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Website Designs', 'Design Images', 'Projects', 'CS Projects'];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return mockProjects;
    return mockProjects.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="section-container">
      <h2 className="section-header">Selected Work</h2>
      
      <div className="filter-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found in this category.</p>
        </div>
      )}
    </section>
  );
};

const SkillsSection = () => (
  <div className="section-container">
    <span className="section-sub-header">My Arsenal</span>
    <h2 className="section-title">Skills & Tools.</h2>

    <div className="space-y-12">
      <div className="skills-group">
        <h3 className="skills-title">Programming Languages</h3>
        <div className="skills-list">
          {["Java", "JavaScript", "HTML", "CSS", "React.js", "React Native", "Python", "C", "C++", "C#", "Dart", "SQL", "PHP"].map(skill => (
             <span key={skill} className="skill-pill">{skill}</span>
          ))}
        </div>
      </div>

      <div className="skills-group">
        <h3 className="skills-title">Frameworks & Libraries</h3>
        <div className="skills-list">
          {["Flutter", "Node.js", "Tailwind CSS"].map(skill => (
             <span key={skill} className="skill-pill">{skill}</span>
          ))}
        </div>
      </div>

      <div className="skills-group">
        <h3 className="skills-title">Design & Dev Tools</h3>
        <div className="skills-list">
          {["VS Code", "Blender 3D", "Unity", "Adobe Premiere", "Illustrator", "After Effects", "Photoshop", "SketchUp"].map(skill => (
             <span key={skill} className="skill-pill">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AboutSection = () => (
  <div className="section-container">
    <span className="section-sub-header">About Me</span>
    <h2 className="section-title">Converting pure ideas into designs.</h2>
    
    <div className="section-text">
      <p>Hi there, I'm Aditya Manoj 👋. I'm a CS student studying Engineering (B.Tech), passionate about coding, design, and creative projects.</p>
      <br />
      <p>I am a coder, Webflow designer, 3D artist, video editor, and a quick learner with a knack for bringing ideas to life.</p>
    </div>

    <div>
      <h3 className="skills-title">Hobbies & Interests</h3>
      <ul className="hobbies-list">
        {["Coding", "Gaming", "3D Artistry", "Abstract Renders", "Filming", "Making Websites", "Working with Clients"].map(hobby => (
          <li key={hobby} className="hobby-item">
            <span className="hobby-dot"></span>
            {hobby}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ContactSection = () => (
   <div className="section-container contact-container">
      <h2 className="section-title">Let's work together.</h2>
      <p className="section-text">
        Have a project in mind? I'm currently available for freelance work.
      </p>
      <a href={SOCIAL_LINKS.email} className="contact-btn">
        Get in Touch
      </a>
   </div>
)

const DetailedFooter = () => {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto">
        <div className="footer-card">
          <div className="footer-content">
            <div className="footer-left">
              <img alt="Illustration" className="footer-img" src={footerImage} />
              <div>
                <h2 className="footer-title">Say hello!</h2>
                <p className="footer-text">
                  I'd love to hear from you and always welcome any feedback — please don't hesitate to get in touch!
                </p>
              </div>
            </div>
            <div className="footer-right">
              <div className="social-icons-footer">
                <a aria-label="GitHub" className="footer-icon" href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">
                  <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                </a>
                <a aria-label="LinkedIn" className="footer-icon" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">
                  <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
                <a aria-label="Email" className="footer-icon" href={SOCIAL_LINKS.email}>
                  <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
              </div>
              <a className="say-hey-btn" href={SOCIAL_LINKS.email}>Say hey!</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SimpleFooter = () => (
  <footer className="simple-footer">
     <p className="simple-footer-text">© 2025 Portfolio. All rights reserved.</p>
  </footer>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const renderContent = () => {
    switch (activeTab) {
      case 'Projects':
        return <ProjectsSection />;
      case 'Skills':
        return <SkillsSection />;
      case 'About':
        return <AboutSection />;
      case 'Contact':
        return <ContactSection />;
      case 'Home':
      default:
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

            {/* About Peek removed as requested */}
          </>
        );
    }
  };

  return (
    <div className="app-container">
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <button onClick={() => setIsMenuOpen(false)} className="close-menu-btn">
             <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          {['Home', 'Projects', 'Skills', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => { setActiveTab(item); setIsMenuOpen(false); }}
              className={`mobile-nav-link ${activeTab === item ? 'active' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <header className="app-header">
        <button onClick={() => setActiveTab('Home')} className="logo-btn">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </button>

        <div className="nav-actions">
           <div className="desktop-nav">
             {['Home', 'Projects', 'Skills', 'About', 'Contact'].map((item) => (
               <button 
                 key={item}
                 onClick={() => setActiveTab(item)}
                 className={`nav-link ${activeTab === item ? 'active' : ''}`}
               >
                 {item}
               </button>
             ))}
           </div>

           <div className="social-links-header">
              <a aria-label="GitHub" className="header-icon" href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">
                 <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
              </a>
              <a aria-label="LinkedIn" className="header-icon" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">
                 <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
               <a aria-label="Email" className="header-icon" href={SOCIAL_LINKS.email}>
                 <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
           </div>

          <button onClick={() => setIsMenuOpen(true)} className="menu-toggle-btn">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>
      </header>

      <main className="main-content">
        {renderContent()}
      </main>

      {activeTab === 'Home' ? <DetailedFooter /> : <SimpleFooter />}
      
      <ScrollToTop />

    </div>
  );
}