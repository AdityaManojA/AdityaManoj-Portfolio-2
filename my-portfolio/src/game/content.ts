// Portfolio content. Generated once from the old site's data module, then maintained by hand.
// Every screen reads from here; nothing else in the app hard-codes portfolio text.

export interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
}

export interface Experience {
  period: string;
  role: string;
  org: string;
  location: string;
  description: string;
  type: 'work' | 'education';
}

export interface Service { title: string; description: string }
export interface SkillGroup { category: string; items: { name: string; icon: string }[] }
export interface GalleryItem { title: string; type: string; image: string }

export const PROFILE = {
  name: 'Aditya Manoj',
  title: 'Full-Stack Developer & Systems Engineer',
  summary: 'Full-Stack & Systems Engineer. Architect of ALFRED. Building high-throughput web applications, interactive 3D runtimes, and sovereign AI models.',
  avatar: 'media/profile/pfpchibi.webp',
  photo: 'media/profile/pfp.webp',
};

export const LINKS = {
  "email": "mailto:adityamanoja@gmail.com",
  "linkedin": "https://www.linkedin.com/in/aditya-manoj-a-0a930b256/",
  "github": "https://github.com/AdityaManoja",
  "cv": "cv.pdf"
};

// Ordered by the old site's ranking; the Blacklist counts down from the end, so PROJECTS[0] is #1.
export const PROJECTS: Project[] = [
  {
    "title": "SoloDesk — Freelancer Business Operations Suite",
    "category": "Projects",
    "year": "2026",
    "description": "Full-scale business operations suite for independent contractors and freelancers. Engineered with real-time client & project management, automated milestone invoice generation, conflict-aware daily scheduling, interactive focus tracking, client activity audit timelines, and calendar ecosystem sync.",
    "tags": [
      "React",
      "Vite",
      "Firebase",
      "TypeScript",
      "Tailwind CSS"
    ],
    "image": "media/projects/solodesk.webp",
    "link": "https://taskflow-solodesk.web.app/",
    "github": "https://github.com/AdityaManojA/SoloDesk"
  },
  {
    "title": "TaskFlow — Gamified Habit & Quest Tracker PWA",
    "category": "Projects",
    "year": "2026",
    "description": "A calm, gamified task and daily habit management Progressive Web Application (PWA) built with zero runtime dependencies. Features natural language quick-entry, 6-tier quest priority workflows, streak & EXP mechanics, integrated focus timers, Google Calendar & ICS synchronization, and an interactive companion (Mochi).",
    "tags": [
      "PWA",
      "JavaScript",
      "Firebase",
      "HTML5",
      "CSS3"
    ],
    "image": "media/projects/taskflow.webp",
    "link": "https://taskflow-dailytracker.web.app/",
    "github": "https://github.com/AdityaManojA/TaskFlow"
  },
  {
    "title": "ThreadPath Collective",
    "category": "Projects",
    "year": "2025",
    "description": "A full-featured e-commerce storefront for a sustainable cultural streetwear brand based in Canada. Integrates product catalogs, category filtering, and a modern UI that blends heritage textile aesthetics with contemporary web design.",
    "tags": [
      "React",
      "Tailwind CSS",
      "AWS",
      "GCP",
      "Framer"
    ],
    "image": "media/projects/threadpath.webp",
    "link": "https://threadpathcollective.ca/"
  },
  {
    "title": "Pixel Spaces — 3D Visualisation Studio",
    "category": "Projects",
    "year": "2026",
    "description": "Bespoke high-performance web platform for an architectural visualisation and interior design studio operating across Kerala and Muscat. Engineered with an interactive HTML5 canvas pixel-resolve hero stage, CSS sticky stacking service decks, Sharp automated image optimization pipelines, and Firebase Firestore/Auth review moderation.",
    "tags": [
      "React",
      "Vite",
      "Tailwind CSS",
      "Firebase",
      "Canvas"
    ],
    "image": "media/projects/pixel-spaces.webp",
    "link": "https://pixelspaces.web.app/"
  },
  {
    "title": "IndZita Biotech",
    "category": "Projects",
    "year": "2026",
    "description": "Dual-engine 3D molecular visualization suite and interactive computational biology platform. Features Catmull-Rom spline interpolation and Euler kinematics on HTML5 Canvas alongside Spline 3D runtimes, a Hooke's-law spring-damped ASCII genomic canvas locked at 60 FPS, interactive real-time thermal PCR Virtual Lab simulation, and sub-second edge delivery via Vite + Firebase.",
    "tags": [
      "Canvas",
      "React",
      "TypeScript",
      "Vite",
      "Firebase"
    ],
    "image": "media/projects/indzita.webp",
    "link": "https://indzita-biotech-007.web.app/#overview"
  },
  {
    "title": "ALFRED — MARK-VIII (Wayne Protocol Edition)",
    "category": "Projects",
    "year": "2026",
    "description": "Autonomous multimodal AI desktop assistant & tactical terminal built for complete digital sovereignty. Features native bidirectional audio streaming (Gemini 3.1 Flash Live & local Ollama/LM Studio), real-time RapidOCR visual grounding (<150ms), 30+ auto-discovered OS automation tools, encrypted AES-256 mobile remote telemetry, and tactical PyQt6 HUD.",
    "tags": [
      "Python",
      "PyQt6",
      "Gemini Live",
      "Local LLMs",
      "PyTorch"
    ],
    "image": "media/projects/alfred.webp",
    "link": "https://github.com/AdityaManojA/ALFRED-MK"
  },
  {
    "title": "GLIA — High-Throughput Event OS & PWA",
    "category": "Projects",
    "year": "2025",
    "description": "Mission-critical, offline-first Progressive Web Application (PWA) engineered to withstand high-concurrency event operations with zero downtime. Orchestrated 1.2M+ real-time Firebase Firestore reads, 2,275+ cryptographic QR food coupon validations, bi-directional reactive synchronization, and live multi-track venue logistics for international delegates from MIT, Cambridge, and RIKEN.",
    "tags": [
      "React",
      "Firebase",
      "PWA",
      "Google Maps API"
    ],
    "image": "media/projects/glia.webp",
    "link": "https://ian2025.in/"
  },
  {
    "title": "The Whisky Business",
    "category": "Projects",
    "year": "2025",
    "description": "An artisanal coffee and cookie brand web platform featuring an extensive digital customer loyalty program, interactive menu showcases, and seamless reward redemption for visitors at Sobha City Mall, Thrissur.",
    "tags": [
      "React",
      "Tailwind CSS",
      "AWS",
      "GCP",
      "Framer"
    ],
    "image": "media/projects/whisky.webp",
    "link": "https://thewhiskeybusiness-3e639.web.app/"
  },
  {
    "title": "Rochas Cafe",
    "category": "Website Designs",
    "year": "2025",
    "description": "Artisanal specialty coffee & patisserie web showcase. Engineered with responsive layout architecture, dynamic product carousels, smooth interactive navigation, fluid aesthetic styling, and high-performance CDN deployment.",
    "tags": [
      "React",
      "JavaScript",
      "CSS3",
      "HTML5"
    ],
    "image": "media/projects/rochas.webp",
    "link": "https://rochascafe.netlify.app/#"
  },
  {
    "title": "SBAFA Financial Enclave",
    "category": "Projects",
    "year": "2026",
    "description": "Zero-knowledge, offline-first personal financial enclave PWA. Features Dexie.js (IndexedDB) local persistence with reactive Firebase Firestore bi-directional sync for 1,000+ ledger records, an on-device sandboxed PDF statement ingestion engine (pdfjs-dist & regex OCR for HDFC/Federal/SBI), automated OAuth2 Gmail pipeline, WebAuthn biometric passkeys, and native iOS segmented glassmorphic design.",
    "tags": [
      "PWA",
      "IndexedDB",
      "Firebase",
      "TypeScript",
      "HTML5"
    ],
    "image": "media/projects/sbafa.webp",
    "link": "https://sbafa-ft.web.app/landing"
  },
  {
    "title": "Travel Animator",
    "category": "Projects",
    "year": "2025",
    "description": "Developed at Lascade for over 1,000,000+ creators and travelers. Built intuitive 3D route animation pipelines, interactive map plotting, custom 3D vehicle assets, and HD/4K video export across iOS and Android.",
    "tags": [
      "Android",
      "iOS",
      "React Native",
      "Google Maps API"
    ],
    "image": "media/projects/travel.webp",
    "link": "https://travelanimator.com/"
  },
  {
    "title": "Prompt-Ops Blueprints & AI Dataset Engine",
    "category": "CS Projects",
    "year": "2026",
    "description": "Comprehensive repository of daily-trained AI datasets, fine-tuning blueprints, and token-optimized pipelines ready for immediate zero-shot, few-shot, and fine-tuning workloads across open-source and proprietary foundation models.",
    "tags": [
      "Python",
      "PyTorch",
      "AI Acceleration",
      "GitHub Actions"
    ],
    "image": "media/projects/promptops-graphic.svg",
    "link": "https://github.com/AdityaManojA/prompt-ops-blueprints"
  },
  {
    "title": "Retro QR Crafter",
    "category": "CS Projects",
    "year": "2025",
    "description": "A fun, 8-bit themed web utility for bulk generating and scanning QR codes. Features Excel file processing and dual-mode camera/file scanning.",
    "tags": [
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "Netlify"
    ],
    "image": "media/projects/qrgen.webp",
    "link": "https://text-based-qr.netlify.app/"
  },
  {
    "title": "CSV to JSON Converter",
    "category": "CS Projects",
    "year": "2025",
    "description": "A serverless web utility designed for developers to seamlessly parse structured CSV data into formatted JSON. Features custom delimiters, regex parsing logic, and dark mode UI.",
    "tags": [
      "JavaScript",
      "HTML",
      "Tailwind CSS",
      "Netlify"
    ],
    "image": "media/projects/csvtojson.webp",
    "link": "https://csv-to-jsonconv.netlify.app/"
  },
  {
    "title": "Meat Spoilage Detection",
    "category": "CS Projects",
    "year": "2024",
    "description": "A hardware-based, no-contact meat spoilage detection system that uses IoT sensors to assess whether meat has spoiled.",
    "tags": [
      "IoT",
      "Hardware",
      "C++",
      "Sensors"
    ],
    "image": "media/projects/meat.webp",
    "link": "https://github.com/AdityaManojA/Meat-Spoilage-detection-IOT"
  },
  {
    "title": "Flashcard Learning Pal",
    "category": "Website Designs",
    "year": "2023",
    "description": "A web-based interactive learning tool designed to help students memorize concepts effectively.",
    "tags": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "image": "media/projects/flashcard.webp",
    "link": "https://github.com/AdityaManojA/Flashcard-Learning-Pal"
  },
  {
    "title": "8-Bit-O-Matic",
    "category": "CS Projects",
    "year": "2024",
    "description": "A pixel art creator that transforms uploaded images into retro 8-bit style masterpieces. Supports both 16-color and black & white pixelation modes.",
    "tags": [
      "Python",
      "Flask",
      "HTML5",
      "CSS"
    ],
    "image": "media/projects/8bit.webp",
    "link": "https://eight-bit-o-matic.onrender.com/"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    "period": "2025 – 2026",
    "role": "Lead Architect & AI Systems Engineer",
    "org": "ALFRED Tactical Terminal",
    "location": "Open Source / Autonomous Systems",
    "description": "Architected ALFRED Mark-VIII, an autonomous multimodal voice, vision, and system-control desktop executive assistant operating on dual-backend sovereignty (Google Gemini 3.1 Flash Live & local Ollama/LM Studio/vLLM). Engineered high-framerate PyQt6 tactical HUD (22ms frame locked), Sentry Mode v2 dual-mode surveillance engine with numeric privacy ledger, custom OpenWakeWord ONNX acoustic model training, and 30+ auto-discovered OS automation tools.",
    "type": "work"
  },
  {
    "period": "Jan 2026 – Present",
    "role": "Full-Stack PWA & Security Systems Engineer",
    "org": "SBAFA Financial Enclave",
    "location": "Remote",
    "description": "Architected a zero-knowledge, offline-first PWA for SBAFA Financial Enclave utilizing Dexie.js (IndexedDB) and Firebase Firestore, orchestrating bi-directional reactive synchronization and conflict-free cross-device data reconciliation for 1,000+ ledger records. Engineered an on-device sandboxed PDF statement ingestion engine (pdfjs-dist & regex OCR for HDFC/Federal/SBI) and automated weekly OAuth2 Gmail pipeline with WebAuthn biometric passkeys.",
    "type": "work"
  },
  {
    "period": "Jul 2026 – Sep 2026",
    "role": "Lead Frontend & Graphics Engineer",
    "org": "IndZita Biotech",
    "location": "Remote",
    "description": "Architected a dual-engine 3D molecular visualization suite implementing Catmull-Rom spline interpolation & spherical Euler kinematics on HTML5 Canvas alongside Spline 3D runtimes. Synthesized a Hooke's-law spring-damped ASCII genomic canvas locked at 60 FPS and engineered a real-time thermal PCR Virtual Lab simulator, deployed via Vite and Firebase Hosting.",
    "type": "work"
  },
  {
    "period": "Apr 2026 – Jun 2026",
    "role": "Frontend & DevOps Engineer (Contract)",
    "org": "Threadpath Collective",
    "location": "Remote",
    "description": "Engineered responsive inventory tracking interface using React and Framer Motion with dynamic coordinate layouts. Managed production deployments using AWS Cloud Functions and Amazon CloudFront (CDN) for low-latency global delivery.",
    "type": "work"
  },
  {
    "period": "Jan 2025 – Aug 2025",
    "role": "Product Development Engineer",
    "org": "Lascade",
    "location": "Kochi, Kerala, India (On-site)",
    "description": "Engineered consumer mobile applications across Android and iOS, software design, and full-stack systems at Lascade—developing the 'Travel Animator' 3D route animation platform (1M+ users).",
    "type": "work"
  },
  {
    "period": "Aug 2024 – Jan 2025",
    "role": "Lead Developer (Technical Trainee)",
    "org": "Rajiv Gandhi Centre for Biotechnology",
    "location": "Thiruvananthapuram, India",
    "description": "Built and deployed a high-performance Progressive Web App (PWA) managing on-ground logistics for international neuroscience conference. Automated workflows handling 1.2M Firestore reads and 2,275+ authenticated coupon scans with zero manual errors at 100% uptime.",
    "type": "work"
  },
  {
    "period": "Mar 2024 – Sep 2024",
    "role": "Software Engineering Intern",
    "org": "Flipkart",
    "location": "Bengaluru, India",
    "description": "Earned 6-month internship through a hackathon placement. Contributed to full-stack features on the Flipkart consumer app across frontend and backend layers. Deployed and managed services on Microsoft Azure and Google Cloud Platform (GCP).",
    "type": "work"
  },
  {
    "period": "Sep 2023 – Mar 2024",
    "role": "Cloud Operations Intern",
    "org": "Codelattice Digital Solutions",
    "location": "Calicut, India",
    "description": "Hands-on cloud operations managing AWS core services (EC2, RDS, S3, CloudWatch) for provisioning and monitoring workloads. Wrote Bash and Python scripts for operational automation across Unix-based environments and supported MERN-stack apps.",
    "type": "work"
  },
  {
    "period": "2020 – 2024",
    "role": "B.Tech, Computer Science & Engineering",
    "org": "Jyothi Engineering College",
    "location": "Thrissur, Kerala",
    "description": "Graduated with strong foundations in full-stack software development, cloud infrastructure, DevOps pipelines, and applied AI systems.",
    "type": "education"
  }
];

export const SERVICES: Service[] = [
  {
    "title": "Full-Stack Web & Applications",
    "description": "End-to-end custom web and mobile applications using React, Next.js, TypeScript, Node.js, Python, FastAPI, and responsive modern CSS. Architecture built for speed, security, and developer ergonomics."
  },
  {
    "title": "High-Throughput PWAs & Real-Time Sync",
    "description": "Offline-first Progressive Web Apps capable of handling millions of real-time database reads (Firebase Firestore, Dexie.js IndexedDB), cryptographic QR verification, and zero-downtime operations."
  },
  {
    "title": "Interactive Frontend & 3D Web",
    "description": "Math-driven 2D/3D visual experiences on HTML5 Canvas and Spline 3D runtimes. Catmull-Rom spline interpolation, Euler kinematics, physics-based spring simulations, and smooth 60 FPS mobile rendering."
  },
  {
    "title": "Cloud-Native Infrastructure & APIs",
    "description": "Robust backend APIs and microservices deployed across AWS, GCP, and Azure. Containerization with Docker and Kubernetes, Helm charts, and GitOps deployments for high availability."
  },
  {
    "title": "Applied AI & Model Integration",
    "description": "Training and fine-tuning AI models, token-optimized pipelines, and dataset engineering (Prompt-Ops Blueprints). Seamlessly integrating model inference into real-world full-stack products."
  },
  {
    "title": "High Availability & Systems Engineering",
    "description": "Resilient backend services, zero-downtime rolling deployments, multi-cloud automated failover, load balancing (ALB/NLB), and edge caching via global CDNs."
  },
  {
    "title": "Production Observability & Metrics",
    "description": "Unified telemetry and monitoring with Prometheus, Grafana, and Loki. Distributed tracing, error budgets, and health check pipelines ensuring optimal application performance."
  },
  {
    "title": "Networking & Edge Delivery",
    "description": "Enterprise L2/L3 routing, 802.1Q VLAN segmentation, network security, reverse proxies (NGINX/Apache), and CloudFront edge caching for sub-second global asset delivery."
  },
  {
    "title": "Autonomous AI Agents & Tactical Systems",
    "description": "Architecting autonomous multimodal desktop agents with bidirectional streaming audio/vision (Gemini Flash Live), offline open-weight LLMs (Ollama, LM Studio, vLLM), OpenWakeWord ONNX transfer training, deep OS automation, and encrypted AES-256 mobile remote telemetry."
  }
];

export const SKILLS: SkillGroup[] = [
  {
    "category": "Autonomous AI & Multimodal Agents",
    "items": [
      {
        "name": "PyQt6",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qt/qt-original.svg"
      },
      {
        "name": "Gemini Live",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
      },
      {
        "name": "Local LLMs",
        "icon": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/ollama.svg"
      },
      {
        "name": "ONNX Runtime",
        "icon": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/onnx.svg"
      },
      {
        "name": "OpenWakeWord",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
      },
      {
        "name": "RapidOCR",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg"
      }
    ]
  },
  {
    "category": "Frontend & Web",
    "items": [
      {
        "name": "React",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
      },
      {
        "name": "Next.js",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
      },
      {
        "name": "Vite",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
      },
      {
        "name": "HTML5",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
      },
      {
        "name": "CSS3",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
      },
      {
        "name": "Tailwind CSS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
      },
      {
        "name": "Canvas",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
      }
    ]
  },
  {
    "category": "Backend & Databases",
    "items": [
      {
        "name": "Node.js",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "FastAPI",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
      },
      {
        "name": "Django",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
      },
      {
        "name": "Express",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
      },
      {
        "name": "IndexedDB",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
      },
      {
        "name": "Dexie.js",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
      },
      {
        "name": "MongoDB",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
      },
      {
        "name": "MySQL",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
      },
      {
        "name": "Firestore",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
      }
    ]
  },
  {
    "category": "Programming Languages",
    "items": [
      {
        "name": "TypeScript",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
      },
      {
        "name": "JavaScript",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
      },
      {
        "name": "Python",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
      },
      {
        "name": "Go",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg"
      },
      {
        "name": "C++",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
      },
      {
        "name": "C",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
      },
      {
        "name": "Java",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
      },
      {
        "name": "C#",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
      },
      {
        "name": "SQL",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
      }
    ]
  },
  {
    "category": "Mobile & Frameworks",
    "items": [
      {
        "name": "React Native",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
      },
      {
        "name": "Flutter",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
      },
      {
        "name": "Android",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg"
      },
      {
        "name": "iOS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
      },
      {
        "name": "PWA",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg"
      },
      {
        "name": "Flask",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg"
      }
    ]
  },
  {
    "category": "Cloud Hyperscalers",
    "items": [
      {
        "name": "AWS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "Azure",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"
      },
      {
        "name": "Google Cloud (GCP)",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg"
      },
      {
        "name": "Firebase",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
      },
      {
        "name": "Vercel",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"
      }
    ]
  },
  {
    "category": "Cloud Native & Containers",
    "items": [
      {
        "name": "Kubernetes",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
      },
      {
        "name": "Docker",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
      },
      {
        "name": "containerd",
        "icon": "https://raw.githubusercontent.com/cncf/artwork/master/projects/containerd/icon/color/containerd-icon-color.svg"
      },
      {
        "name": "Helm",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/helm/helm-original.svg"
      },
      {
        "name": "ArgoCD",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-plain.svg"
      },
      {
        "name": "Cilium / eBPF",
        "icon": "https://raw.githubusercontent.com/cilium/cilium/main/Documentation/images/logo-solo.svg"
      }
    ]
  },
  {
    "category": "Infrastructure as Code & CI/CD",
    "items": [
      {
        "name": "Terraform",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg"
      },
      {
        "name": "Ansible",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg"
      },
      {
        "name": "Bash Scripting",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg"
      },
      {
        "name": "GitHub Actions",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
      },
      {
        "name": "Apache",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg"
      },
      {
        "name": "NGINX",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"
      }
    ]
  },
  {
    "category": "SRE & Observability",
    "items": [
      {
        "name": "Prometheus",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg"
      },
      {
        "name": "Grafana",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg"
      },
      {
        "name": "Grafana Loki",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg"
      },
      {
        "name": "OpenTelemetry",
        "icon": "https://raw.githubusercontent.com/cncf/artwork/master/projects/opentelemetry/icon/color/opentelemetry-icon-color.svg"
      },
      {
        "name": "SLIs / SLOs",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg"
      }
    ]
  },
  {
    "category": "GPU Acceleration & AI Stacks",
    "items": [
      {
        "name": "NVIDIA Container Toolkit",
        "icon": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nvidia.svg"
      },
      {
        "name": "CUDA",
        "icon": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nvidia.svg"
      },
      {
        "name": "PyTorch",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg"
      },
      {
        "name": "TensorFlow",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
      },
      {
        "name": "OpenCV",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg"
      }
    ]
  },
  {
    "category": "Systems, Linux & Hardware",
    "items": [
      {
        "name": "Linux Kernel",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
      },
      {
        "name": "Ubuntu Server",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg"
      },
      {
        "name": "SUSE SLES / MicroOS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/suse/suse-original.svg"
      },
      {
        "name": "IPMI / iDRAC / iLO",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg"
      },
      {
        "name": "RAID & ZFS Storage",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg"
      },
      {
        "name": "VRRP Quorum HA",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg"
      }
    ]
  },
  {
    "category": "Enterprise Networking & Edge",
    "items": [
      {
        "name": "Cisco Networking",
        "icon": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cisco.svg"
      },
      {
        "name": "802.1Q VLANs",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg"
      },
      {
        "name": "LACP EtherChannel",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg"
      },
      {
        "name": "AWS ALB / NLB",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "CloudFront CDN",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "CoreDNS",
        "icon": "https://raw.githubusercontent.com/cncf/artwork/master/projects/coredns/icon/color/coredns-icon-color.svg"
      }
    ]
  },
  {
    "category": "Design & Creative",
    "items": [
      {
        "name": "Figma",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
      },
      {
        "name": "Framer",
        "icon": "https://www.vectorlogo.zone/logos/framer/framer-icon.svg"
      },
      {
        "name": "Blender 3D",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg"
      },
      {
        "name": "Photoshop",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg"
      },
      {
        "name": "Adobe Illustrator",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg"
      },
      {
        "name": "After Effects",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg"
      },
      {
        "name": "Premiere Pro",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg"
      },
      {
        "name": "SketchUp",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketchup/sketchup-original.svg"
      }
    ]
  },
  {
    "category": "Tools & Ecosystem",
    "items": [
      {
        "name": "Git",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
      },
      {
        "name": "GitHub",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
      },
      {
        "name": "VS Code",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
      },
      {
        "name": "Unity",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg"
      },
      {
        "name": "IoT & Hardware",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg"
      },
      {
        "name": "Google Maps API",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
      }
    ]
  }
];

// Titles describe what each render shows.
export const GALLERY: GalleryItem[] = [
  { title: 'Pixel Runner', type: 'Pixel Art', image: 'media/gallery/g2.webp' },
  { title: 'Retro Vending Machine', type: 'Illustration', image: 'media/gallery/g3.webp' },
  { title: 'Neon Portal', type: '3D Render', image: 'media/gallery/g4.webp' },
  { title: 'Ember Katana', type: '3D Render', image: 'media/gallery/g5.webp' },
  { title: 'Chrome Planets', type: '3D Render', image: 'media/gallery/g6.webp' },
  { title: 'Neon Court', type: '3D Render', image: 'media/gallery/g7.webp' },
];
