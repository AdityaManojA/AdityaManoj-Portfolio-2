import profilePic from './Images/Aditya.jpeg';
export const IMAGES = {

  profile: profilePic, 
  footer: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZR0qY4ZcmpegAjitD_84MLI8L1ZCTBMF5wyUTA5-sxGsZ_d6wcl-t3ClbHUEJ-t2wOOgxq6jxuPcRe7CqrjF9fmNQLh1IvHeFSKo4EQmk5ekKXRzSxABCHm0R_Zssr_gXrFIj49jY2uoYshNHfx0zraub7M-WCV1OHEncf_QXae3Wxq9-73XGT8zbJ854qbMctr2SNbASo1wlp4OF17t3Ez45QO4jhRt7ZD0y7Rc8HvEptOXfP7p-cPnHFs0wfJxZMj5mwwStLVw",
  placeholder: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
};

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/aditya-manoj-a-0a930b256/",
  github: "https://github.com/AdityaManoja",
  email: "mailto:adityamanoja@gmail.com"
};

export const GALLERY_DATA = [
  { 
    id: 1, 
    title: "Neon Cyberpunk City", 
    type: "3D Render", 
    image: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 2, 
    title: "Abstract Fluid Simulation", 
    type: "3D Render", 
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 3, 
    title: "Minimalist Architecture", 
    type: "3D Render", 
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 4, 
    title: "Cinematic Event Reel", 
    type: "Video Edit", 
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 5, 
    title: "Product Visualization", 
    type: "3D Render", 
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 6, 
    title: "Gaming Assets", 
    type: "3D Modeling", 
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80" 
  },
];

export const TIMELINE_DATA = [
  { 
    year: "2025", 
    title: "Full Stack Engineer", 
    description: "Architected the IAN-2025 Event OS, handling 1.2 million database reads and zero downtime for global delegates.", 
    location: "Freelance" 
  },
  { 
    year: "2024", 
    title: "Freelance Developer & Designer", 
    description: "Started working with international clients on web development, 3D modeling, and automated video editing tools.", 
    location: "Remote" 
  },
  { 
    year: "2023", 
    title: "Tech Lead - College Projects", 
    description: "Led development for 'Class-Vision' and 'Meat Spoilage Detection' systems using Python and IoT.", 
    location: "Jyothi Engineering College" 
  },
  { 
    year: "2022", 
    title: "B.Tech in Computer Science", 
    description: "Began engineering journey, focusing on software development and creative technologies.", 
    location: "Kerala, India" 
  },
];

export const SERVICES_DATA = [
  { 
    title: "Web Development", 
    description: "Custom, high-performance websites and web apps using React, Tailwind, and Firebase.", 
    icon: "code" 
  },
  { 
    title: "3D Modeling & Art", 
    description: "Creating high-fidelity 3D assets, abstract renders, and visualizers for games or brands.", 
    icon: "cube" 
  },
  { 
    title: "Event Tech Solutions", 
    description: "End-to-end digital infrastructure for conferences: registration, QR scanning, and analytics.", 
    icon: "server" 
  },
  { 
    title: "Video Editing", 
    description: "Professional editing for tech showcases, reels, and promotional content.", 
    icon: "video" 
  },
];
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "IAN-2025 Event Management System",
    category: "Projects",
    year: "2025",
    description: "1.2 Million Database Reads. 2,275 Meals. Zero Downtime. A full-scale Event Operating System (PWA) built for the XLIII Annual Meeting of the Indian Academy of Neurosciences. Features real-time scheduling, digital QR food coupons, and live logistics for global delegates from MIT, Cambridge, and Riken.",
    tags: ["React", "Firebase", "PWA", "Google Maps API"],
    image: "./ProjectImages/GLIA.png",
    link: "https://ian2025.in/"
  },
  {
    id: 2,
    title: "Retro QR Crafter",
    category: "CS Projects",
    year: "2025",
    description: "A fun, 8-bit themed web utility for bulk generating and scanning QR codes. Features Excel file processing for bulk generation, dual-mode camera/file scanning, and zip file exports—all processed securely client-side.",
    tags: ["JavaScript", "Tailwind CSS", "HTML5", "Netlify"],
    image: "./ProjectImages/Qrgen.png",
    link: "https://text-based-qr.netlify.app/"
  },
  {
    id: 3,
    title: "Meat Spoilage Detection",
    category: "CS Projects",
    year: "2024",
    description: "A hardware-based, no-contact meat spoilage detection system that uses IoT sensors to assess whether meat has spoiled.",
    tags: ["IoT", "Hardware", "C++", "Sensors"],
    image: "./ProjectImages/Meat.jpeg",
    link: "https://github.com/AdityaManojA/Meat-Spoilage-detection-IOT"
  },
  {
    id: 4,
    title: "Flashcard Learning Pal",
    category: "Website Designs",
    year: "2023",
    description: "A web-based interactive learning tool designed to help students memorize concepts effectively.",
    tags: ["JavaScript", "HTML", "CSS"],
    image: "./ProjectImages/Flashcard.png",
    link: "https://github.com/AdityaManojA/Flashcard-Learning-Pal"
  },
  {
    id: 5,
    title: "CSV to JSON Converter",
    category: "CS Projects",
    year: "2025",
    description: "A serverless web utility designed for developers to seamlessly parse structured CSV data into formatted JSON. Features custom delimiters, regex parsing logic, and dark mode UI.",
    tags: ["JavaScript", "HTML", "Tailwind CSS", "Netlify"],
    image: "./ProjectImages/CsvtoJson.png",
    link: "https://csv-to-jsonconv.netlify.app/"
  },
  {
  id: 6, 
    title: "8-Bit-O-Matic",
    category: "CS Projects", 
    year: "2024",
    description: "A pixel art creator that transforms uploaded images into retro 8-bit style masterpieces. Supports both 16-color and black & white pixelation modes. Built with Python (Flask) and Pillow for image processing.",
    tags: ["Python", "Flask", "HTML5", "CSS"],
    image: "./ProjectImages/8bit.png", 
    link: "https://eight-bit-o-matic.onrender.com/"
  },
];

export const SKILLS_DATA = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
    ]
  },
  {
    title: "Frontend & Web",
    skills: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" }
    ]
  },
  {
    title: "Mobile & Frameworks",
    skills: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ]
  },
  {
    title: "Design & Creative",
    skills: [
      { name: "Blender 3D", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
      { name: "Adobe Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
      { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
      { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
      { name: "SketchUp", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketchup/sketchup-original.svg" }
    ]
  },
  {
    title: "Tools & Engines",
    skills: [
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
    ]
  }
];