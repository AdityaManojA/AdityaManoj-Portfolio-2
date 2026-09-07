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
  isHandbook?: boolean;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 100,
    title: "The DevOps, SRE & Cloud Infrastructure Handbook",
    category: "Projects",
    year: "2026",
    description: "An exhaustive technical engineering reference authored by Aditya Manoj. Bridges bare-metal silicon (IPMI, RAID, BIOS/C-states), Cisco networking (VLANs, LACP), and Linux kernel internals (clone, namespaces, cgroups, OverlayFS) with Kubernetes control plane orchestration, Prometheus-Loki-Grafana observability, and 20 low-level interview deep-dives.",
    tags: ["Kubernetes", "SRE", "Linux Kernel", "Terraform", "Prometheus", "Cisco"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    link: "#handbook",
    isHandbook: true
  },
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
    description: "Progressed from Intern to SDE 1 to SDE 2 at Cisco within large-scale enterprise networking and cloud infrastructure. Engineered backend services and operational automation on AWS (EC2, Lambda, CloudWatch, S3) and Apache/NGINX systems. Spearheaded containerized CI/CD pipelines, high-availability service deployments, Cisco L2/L3 networking configurations, and mentored incoming engineering cohorts.", 
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
    title: "Cloud Native & Kubernetes Orchestration", 
    description: "End-to-end Kubernetes cluster architecture, microservices containerization, Helm charts, and GitOps deployments via ArgoCD. Zero-downtime rolling, canary, and blue-green delivery with HPA/VPA autoscaling.", 
    icon: "kubernetes" 
  },
  { 
    title: "SRE & Observability Architecture", 
    description: "Production telemetry stacks with Prometheus, Loki, and Grafana. SLI/SLO design, error budget governance, distributed tracing with OpenTelemetry, and incident response frameworks using USE and RED methodologies.", 
    icon: "chart" 
  },
  { 
    title: "Infrastructure as Code & CI/CD", 
    description: "Deterministic infrastructure automation with Terraform/OpenTofu and Ansible. DAG-based CI/CD workflows, state locking with DynamoDB, supply chain security, and container image signing with Cosign.", 
    icon: "terminal" 
  },
  { 
    title: "Bare-Metal, Linux & High Availability", 
    description: "3-node quorum clusters with Raft consensus, split-brain mitigation, Keepalived VRRP floating VIPs, Out-of-Band IPMI/iDRAC management, RAID/ZFS topologies, and low-latency Linux kernel C-state tuning.", 
    icon: "server" 
  },
  { 
    title: "Enterprise Networking & Edge Delivery", 
    description: "Cisco Catalyst switching, L2/L3 routing, 802.1Q VLAN segmentation, LACP EtherChannel bonding, AWS ALB (L7) and NLB (L4) traffic routing, and CloudFront global CDN edge caching.", 
    icon: "network" 
  },
  { 
    title: "GPU Infrastructure & AI Acceleration", 
    description: "NVIDIA driver integration, CUDA toolkit configuration, NVIDIA Container Toolkit (nvidia-ctk), and GPU Operator deployment for accelerated AI model serving with PyTorch, vLLM, and Triton.", 
    icon: "cpu" 
  },
  { 
    title: "Full-Stack Engineering", 
    description: "Custom, high-performance web & mobile applications using React, React Native, TypeScript, Node.js, Python, FastAPI, and Django with responsive UI/UX.", 
    icon: "code" 
  },
  { 
    title: "PWAs & High-Scale Event Tech", 
    description: "High-reliability Progressive Web Apps handling millions of real-time database reads, digital QR verification, and 100% uptime event logistics.", 
    icon: "zap" 
  }
];

export const SKILLS_DATA = [
  {
    title: "Cloud Native & Orchestration",
    skills: [
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "containerd", icon: "https://raw.githubusercontent.com/cncf/artwork/master/projects/containerd/icon/color/containerd-icon-color.svg" },
      { name: "Helm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/helm/helm-original.svg" },
      { name: "ArgoCD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-plain.svg" },
      { name: "Cilium / eBPF", icon: "https://raw.githubusercontent.com/cilium/cilium/main/Documentation/images/logo-solo.svg" }
    ]
  },
  {
    title: "SRE & Observability",
    skills: [
      { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
      { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
      { name: "Grafana Loki", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
      { name: "OpenTelemetry", icon: "https://raw.githubusercontent.com/cncf/artwork/master/projects/opentelemetry/icon/color/opentelemetry-icon-color.svg" },
      { name: "SLIs / SLOs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg" }
    ]
  },
  {
    title: "Infrastructure as Code & CI/CD",
    skills: [
      { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
      { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
      { name: "Bash Scripting", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
      { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Apache", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
      { name: "NGINX", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" }
    ]
  },
  {
    title: "Systems, Linux & Hardware",
    skills: [
      { name: "Linux Kernel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Ubuntu Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg" },
      { name: "SUSE SLES / MicroOS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/suse/suse-original.svg" },
      { name: "IPMI / iDRAC / iLO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg" },
      { name: "RAID & ZFS Storage", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg" },
      { name: "VRRP Quorum HA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg" }
    ]
  },
  {
    title: "Enterprise Networking & Edge",
    skills: [
      { name: "Cisco Networking", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cisco.svg" },
      { name: "802.1Q VLANs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg" },
      { name: "LACP EtherChannel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg" },
      { name: "AWS ALB / NLB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "CloudFront CDN", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "CoreDNS", icon: "https://raw.githubusercontent.com/cncf/artwork/master/projects/coredns/icon/color/coredns-icon-color.svg" }
    ]
  },
  {
    title: "Cloud Hyperscalers",
    skills: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Google Cloud (GCP)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" }
    ]
  },
  {
    title: "GPU Acceleration & AI Stacks",
    skills: [
      { name: "NVIDIA Container Toolkit", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nvidia.svg" },
      { name: "CUDA", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nvidia.svg" },
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" }
    ]
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
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
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
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
    title: "Tools & Ecosystem",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
      { name: "IoT & Hardware", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
      { name: "Google Maps API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" }
    ]
  }
];