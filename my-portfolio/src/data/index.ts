import profilePic from './Images/Aditya.jpeg';

export const IMAGES = {
  profile: profilePic,
  footer: "./ProjectImages/pfpchibi.jpg",
  placeholder: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
};

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/aditya-manoj-a-0a930b256/",
  github: "https://github.com/AdityaManoja",
  email: "mailto:adityamanoja@gmail.com",
  cv: "/cv.pdf"
};

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
    id: 9,
    title: "Travel Animator",
    category: "Projects",
    year: "2025",
    description: "Developed at Lascade for over 1,000,000+ creators and travelers. Built intuitive 3D route animation pipelines, interactive map plotting, custom 3D vehicle assets, and HD/4K video export across iOS and Android.",
    tags: ["Android", "iOS", "React Native", "Google Maps API"],
    image: "./ProjectImages/Travel.png",
    link: "https://travelanimator.com/"
  },
  {
    id: 8,
    title: "ThreadPath Collective",
    category: "Projects",
    year: "2025",
    description: "A full-featured e-commerce storefront for a sustainable cultural streetwear brand based in Canada. Integrates product catalogs, category filtering, and a modern UI that blends heritage textile aesthetics with contemporary web design.",
    tags: ["React", "Tailwind CSS", "AWS", "GCP", "Framer"],
    image: "./ProjectImages/Threadpath.png",
    link: "https://threadpathcollective.ca/"
  },
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
    id: 11,
    title: "The Whiskey Business",
    category: "Projects",
    year: "2025",
    description: "An artisanal coffee and cookie brand web platform featuring an extensive digital customer loyalty program, interactive menu showcases, and seamless reward redemption for visitors at Sobha City Mall, Thrissur.",
    tags: ["React", "Tailwind CSS", "AWS", "GCP", "Framer"],
    image: "./ProjectImages/Whisky.png",
    link: "https://thewhiskeybusiness-3e639.web.app/"
  },
  {
    id: 10,
    title: "ethKochi",
    category: "Website Designs",
    year: "2025",
    description: "Official portal for ethKochi — an Ethereum hackathon in God's Own Country. Designed with a quirky meme-inspired cyber aesthetic, dynamic countdown timer, background audio/video loops, and live conference registration.",
    tags: ["Next.js", "React", "Tailwind CSS", "Ethereum"],
    image: "./ProjectImages/ethkochi.png",
    link: "https://ethkochi.in/"
  },
  {
    id: 7,
    title: "Kofe Cafe",
    category: "Website Designs",
    year: "2025",
    description: "A retro-themed cafe landing page with bold typography and warm aesthetics. Features an animated menu showcase, smooth scroll interactions, and a hand-crafted visual identity inspired by vintage coffee culture.",
    tags: ["React", "JavaScript", "CSS", "Vercel"],
    image: "./ProjectImages/KofeCafe.png",
    link: "https://project-i79fi.vercel.app/"
  },
  {
    id: 2,
    title: "Retro QR Crafter",
    category: "CS Projects",
    year: "2025",
    description: "A fun, 8-bit themed web utility for bulk generating and scanning QR codes. Features Excel file processing and dual-mode camera/file scanning.",
    tags: ["JavaScript", "Tailwind CSS", "HTML5", "Netlify"],
    image: "./ProjectImages/Qrgen.png",
    link: "https://text-based-qr.netlify.app/"
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
    id: 6,
    title: "8-Bit-O-Matic",
    category: "CS Projects",
    year: "2024",
    description: "A pixel art creator that transforms uploaded images into retro 8-bit style masterpieces. Supports both 16-color and black & white pixelation modes.",
    tags: ["Python", "Flask", "HTML5", "CSS"],
    image: "./ProjectImages/8bit.png",
    link: "https://eight-bit-o-matic.onrender.com/"
  }
];

export const GALLERY_DATA = [
  { 
    id: 1, 
    title: "Neon Cyberpunk City", 
    type: "3D Render", 
    image: "./ProjectImages/g2.jpg" 
  },
  { 
    id: 2, 
    title: "Abstract Fluid Simulation", 
    type: "3D Render", 
    image: "./ProjectImages/g3.jpg" 
  },
  { 
    id: 3, 
    title: "Minimalist Architecture", 
    type: "3D Render", 
    image: "./ProjectImages/g4.jpg" 
  },
  { 
    id: 4, 
    title: "Cinematic Event Reel", 
    type: "Video Edit", 
    image: "./ProjectImages/g5.jpg" 
  },
  { 
    id: 5, 
    title: "Product Visualization", 
    type: "3D Render", 
    image: "./ProjectImages/g6.jpg" 
  },
  { 
    id: 6, 
    title: "Gaming Assets", 
    type: "3D Modeling", 
    image: "./ProjectImages/g7.jpg" 
  },
];

export const TIMELINE_DATA = [
  { 
    year: "Mar 2025 – Present", 
    title: "Software Development Engineer (SDE 1 & 2)", 
    description: "Progressed from Intern to SDE 1 to SDE 2 at Cisco within large-scale networking and cloud infrastructure. Built and maintained backend services and automation tooling using AWS (EC2, Lambda, CloudWatch) and Apache web infrastructure. Enhanced containerized CI/CD deployment workflows and mentored incoming interns.", 
    location: "Cisco Systems India · Bengaluru" 
  },
  { 
    year: "Apr 2026 – Jun 2026", 
    title: "Frontend & DevOps Engineer (Contract)", 
    description: "Engineered responsive inventory tracking interface using React and Framer Motion with dynamic coordinate layouts. Managed production deployments using AWS Cloud Functions and Amazon CloudFront (CDN) for low-latency global delivery.", 
    location: "Threadpath Collective · Remote" 
  },
  { 
    year: "Jan 2025 – Aug 2025", 
    title: "Product Development Engineer", 
    description: "Engineered consumer mobile applications across Android and iOS, software design, and full-stack systems at Lascade—developing the 'Travel Animator' 3D route animation platform (1M+ users).", 
    location: "Lascade · Kochi, Kerala, India (On-site)" 
  },
  { 
    year: "Aug 2024 – Jan 2025", 
    title: "Lead Developer (Technical Trainee)", 
    description: "Built and deployed a high-performance Progressive Web App (PWA) managing on-ground logistics for international neuroscience conference. Automated workflows handling 1.2M Firestore reads and 2,275+ authenticated coupon scans with zero manual errors at 100% uptime.", 
    location: "Rajiv Gandhi Centre for Biotechnology · Thiruvananthapuram" 
  },
  { 
    year: "Mar 2024 – Sep 2024", 
    title: "Software Engineering Intern", 
    description: "Earned 6-month internship through a hackathon placement. Contributed to full-stack features on the Flipkart consumer app across frontend and backend layers. Deployed and managed services on Microsoft Azure and Google Cloud Platform (GCP).", 
    location: "Flipkart · Bengaluru" 
  },
  { 
    year: "Sep 2023 – Mar 2024", 
    title: "Cloud Operations Intern", 
    description: "Hands-on cloud operations managing AWS core services (EC2, RDS, S3, CloudWatch) for provisioning and monitoring workloads. Wrote Bash and Python scripts for operational automation across Unix-based environments and supported MERN-stack apps.", 
    location: "Codelattice Digital Solutions · Calicut" 
  },
  { 
    year: "2020 – 2024", 
    title: "B.Tech, Computer Science & Engineering", 
    description: "Graduated with strong foundations in full-stack software development, cloud infrastructure, DevOps pipelines, and applied AI systems.", 
    location: "Jyothi Engineering College · Thrissur, Kerala" 
  },
];

export const SERVICES_DATA = [
  { 
    title: "Full-Stack Engineering", 
    description: "Custom, high-performance web & mobile applications using React, React Native, TypeScript, Node.js, Python, FastAPI, and Django.", 
    icon: "code" 
  },
  { 
    title: "Cloud Stacks & DevOps", 
    description: "Multi-cloud stacks across AWS (EC2, S3, RDS, CloudWatch, Lambda), Azure, GCP, and Firebase. Docker containerization, automated CI/CD pipelines, and CloudFront CDN delivery.", 
    icon: "server" 
  },
  { 
    title: "Applied AI & ML Pipelines", 
    description: "End-to-end machine learning and computer vision pipelines using Python, TensorFlow, and OpenCV for facial recognition, preprocessing, and automation.", 
    icon: "cube" 
  },
  { 
    title: "PWAs & High-Scale Event Tech", 
    description: "High-reliability Progressive Web Apps handling millions of real-time database reads, digital QR verification, and zero-downtime event logistics.", 
    icon: "server" 
  },
];

export const SKILLS_DATA = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
      { name: "Apache", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
      { name: "Firebase Hosting", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" }
    ]
  },
  {
    title: "Frontend & Web",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }
    ]
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ]
  },
  {
    title: "Data & Applied AI",
    skills: [
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Firestore", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ]
  },
  {
    title: "Mobile & Frameworks",
    skills: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { name: "iOS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
      { name: "PWA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" }
    ]
  },
  {
    title: "Design & Creative",
    skills: [
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Framer", icon: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg" },
      { name: "Blender 3D", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
      { name: "Adobe Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
      { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
      { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
      { name: "SketchUp", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketchup/sketchup-original.svg" }
    ]
  },
  {
    title: "Tools & Infrastructure",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
      { name: "IoT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
      { name: "Hardware", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg" },
      { name: "Sensors", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
      { name: "Google Maps API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
      { name: "Ethereum", icon: "https://www.vectorlogo.zone/logos/ethereum/ethereum-icon.svg" },
      { name: "Web3", icon: "https://www.vectorlogo.zone/logos/ethereum/ethereum-icon.svg" }
    ]
  }
];