// Mock data for Rohit Patil's Portfolio
import myImage from "../assets/my.jpeg";
import cv from "../assets/cv.pdf";

export const personalInfo = {
  name: "ROHIT PATIL",
  title: "Full Stack Developer",
  tagline: "Building Scalable Web Applications",
  email: "rohit.a.patil214@gmail.com",
  phone: "+91 7498817455",
  location: "Pune, India",
  linkedIn: "https://linkedin.com/in/rohit-patil213",
  github: "https://github.com/rohitpatil45",
  resumeUrl: cv,
  profileImage: myImage,
  about: "I'm a Full Stack Developer who transforms ideas into polished, interactive web experiences. From crafting smooth React interfaces to building robust backend APIs, I love every step of the development process. Whether I'm debugging complex issues, optimizing performance, or exploring the latest in TypeScript and modern frameworks—I'm driven by the challenge of creating applications that truly make an impact. Let's build something exceptional."
};

export const skills = [
  { name: "React", category: "Frontend", level: 90 },
  { name: "JavaScript", category: "Frontend", level: 85 },
  { name: "HTML5/CSS3", category: "Frontend", level: 90 },
  { name: "Node.js", category: "Backend", level: 80 },
  { name: "Express.js", category: "Backend", level: 80 },
  { name: "MongoDB", category: "Database", level: 75 },
  { name: "MySQL", category: "Database", level: 75 },
  { name: "RESTful APIs", category: "Backend", level: 85 },
  { name: "TypeScript", category: "Backend", level: 65 },
  { name: "Git & GitHub", category: "Tools", level: 85 },
  { name: "Java", category: "Languages", level: 70 },
  { name: "OpenAI API", category: "AI/ML", level: 75 }
];

export const projects = [
  {
    id: 1,
    title: "SigmaGPT - AI Chat Application",
    description: "Custom AI chatbot using OpenAI APIs to generate context-aware responses with prompt handling and secure API calls.",
    technologies: ["React", "OpenAI API", "Node.js", "Express"],
    features: [
      "Context-aware AI responses",
      "Secure API integration",
      "Modular UI flow",
      "Async programming"
    ],
    image: "https://images.unsplash.com/photo-1645947091786-4399f228f5f0?w=1200&q=80",
    demoLink: "#",
    githubLink: "https://github.com/rohitpatil45",
    bgColor: "#DC143C"
  },
  {
    id: 2,
    title: "Wanderllast - MERN Stack Platform",
    description: "Full-stack accommodation platform with authentication, listing CRUD operations, validation, and comprehensive error handling.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    features: [
      "User authentication & authorization",
      "Listing CRUD operations",
      "Input validation",
      "Clean architecture design"
    ],
    image: "https://images.unsplash.com/photo-1591439657848-9f4b9ce436b9?w=1200&q=80",
    demoLink: "#",
    githubLink: "https://github.com/rohitpatil45",
    bgColor: "#8B0000"
  },
  {
    id: 3,
    title: "WeatherNow - Real-Time Forecasts",
    description: "Real-time weather application with dynamic data rendering, location-based results, and responsive UI design.",
    technologies: ["React", "Weather API", "CSS3", "JavaScript"],
    features: [
      "Real-time weather data",
      "Location-based search",
      "Responsive design",
      "API error handling"
    ],
    image: "https://images.unsplash.com/photo-1566915896913-549d796d2166?w=1200&q=80",
    demoLink: "#",
    githubLink: "https://github.com/rohitpatil45",
    bgColor: "#FF1744"
  },
  {
    id: 4,
    title: "Restaurant Website",
    description: "Interactive restaurant website featuring menu browsing, order flow, and responsive styling with enhanced DOM manipulation.",
    technologies: ["HTML5", "CSS3", "JavaScript", "DOM"],
    features: [
      "Interactive menu browsing",
      "Simple order flow",
      "Responsive styling",
      "DOM manipulation"
    ],
    image: "https://images.unsplash.com/photo-1733412505442-36cfa59a4240?w=1200&q=80",
    demoLink: "#",
    githubLink: "https://github.com/rohitpatil45",
    bgColor: "#DC143C"
  }
];

export const experience = [
  {
    id: 1,
    company: "BHSSYEN Internship Program 2025",
    position: "Associate Intern",
    duration: "Aug 2025 - Oct 2025",
    description: "Learning Oracle Cloud Applications, Transactional Business Analytics, and AI features. Gained exposure to enterprise workflows and improved ability to learn new tools quickly.",
    responsibilities: [
      "Oracle Cloud Applications",
      "Transactional Business Analytics",
      "Enterprise workflow automation",
      "Professional mentorship"
    ]
  },
  {
    id: 2,
    company: "CODSOFT",
    position: "Web Development Intern",
    duration: "Oct 2024 - Nov 2024",
    description: "Worked on frontend and backend tasks using HTML, CSS, JavaScript, and Node.js. Gained hands-on experience in responsive UI, API integration, and debugging.",
    responsibilities: [
      "Frontend development with React",
      "Backend API integration",
      "Responsive UI design",
      "Debugging and testing"
    ]
  }
];

export const education = {
  degree: "B.E in Computer Science And Engineering",
  institution: "ICEM Indira College of Engineering and Management",
  location: "Pune",
  duration: "Oct 2022 - Present",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Web Technologies"
  ]
};

export const volunteer = [
  {
    role: "Overall Volunteer | Sports Event Coordinator",
    duration: "Dec 2023 - Mar 2025",
    description: "Led planning and execution of sports events. Coordinated with teams and faculty to ensure smooth operations."
  },
  {
    role: "Volunteer | National Service Scheme (NSS)",
    duration: "July 2023 - Mar 2025",
    description: "Actively participated in community service initiatives and promoted leadership and social responsibility."
  }
];