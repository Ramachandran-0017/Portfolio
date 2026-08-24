import type { Project, TimelineItem } from "../types/portfolio";

export const profile = {
  name: "Ramachandran G",
  title: "Software Developer",
  eyebrow: "SOFTWARE • WEB • MOBILE • ENGINEERING",
  headline: "I build software that feels as good as it works.",
  summary:
    "Aspiring software developer with hands-on experience across Java, Spring Boot, React, REST APIs, SQL, web development and Flutter. I enjoy turning ideas into polished, practical products with clean interfaces and reliable engineering.",
  email: "rahulda053@gmail.com",
  github: "https://github.com/Ramachandran-0017",
  linkedin: "https://www.linkedin.com/in/ramachandran-g-618b37251",
  resume: "/resume.pdf",
};

export const roles = [
  "Software Developer",
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "Mobile Developer",
];

export const skills = {
  "Languages": ["Java", "JavaScript", "SQL"],
  "Frontend": ["React", "HTML5", "CSS3", "Bootstrap"],
  "Backend": ["Spring Boot", "RESTful APIs"],
  "Databases": ["PostgreSQL", "MySQL", "SQL"],
  "Tools & Practices": ["Git", "GitHub", "Postman", "Agile / Scrum basics"],
  "Mobile": ["Flutter", "Android Application Development"],
};

export const projects: Project[] = [
  {
    title: "Employee Management System",
    description:
      "A full-stack employee management application with a Spring Boot REST API, React frontend and PostgreSQL/MySQL database.",
    problem:
      "Create a structured way to manage employees and common CRUD workflows through a modern web application.",
    features: ["CRUD operations", "Form validation", "Role-based views", "REST API integration"],
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "MySQL"],
    category: "Full Stack",
    github: "https://github.com/Ramachandran-0017/Employee-Management-System",
    accent: "cyan",
  },
  {
    title: "Watch Store",
    description:
      "A responsive e-commerce website for browsing and purchasing watches with product listings and a clean shopping interface.",
    problem:
      "Build a responsive storefront experience that makes products easy to browse and the interface simple to use.",
    features: ["Responsive product layout", "Shopping interface", "Mobile-friendly design", "Clean UI"],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "Frontend",
    demo: "https://ramachandran-0017.github.io/RH-Watch-Website/",
    github: "https://github.com/Ramachandran-0017",
    accent: "violet",
  },
  {
    title: "Genshin Impact Landing Page",
    description:
      "A responsive gaming landing and information page showcasing game features and characters with a visual-first interface.",
    problem:
      "Turn content about a game into an engaging responsive landing experience with clear visual hierarchy.",
    features: ["Responsive landing page", "Character showcase", "Feature sections", "Bootstrap components"],
    technologies: ["HTML5", "CSS3", "Bootstrap 5"],
    category: "Frontend",
    demo: "https://ramachandran-0017.github.io/Genshin-impact-Website/",
    github: "https://github.com/Ramachandran-0017",
    accent: "emerald",
  },
  {
    title: "AC Services Business Website",
    description:
      "A responsive business website for an AC services provider with service listings, company information and an accessible interface.",
    problem:
      "Give a service business a clear online presence where visitors can quickly understand the services offered.",
    features: ["Service listings", "Business information", "Responsive layout", "Accessible UI"],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "Frontend",
    demo: "https://ramachandran-0017.github.io/AC-Services-Website/",
    github: "https://github.com/Ramachandran-0017",
    accent: "amber",
  },
];

export const timeline: TimelineItem[] = [
  {
    date: "JAN 2023 — FEB 2024",
    title: "Flutter Developer Intern",
    organization: "Hackwit Technologies Pvt Ltd — Chennai",
    description:
      "Built a full-featured sports e-commerce mobile application, integrated REST APIs for real-time data and authentication, created reusable UI components, collaborated on API contracts, and tested the application across Android devices.",
    tags: ["Flutter", "REST APIs", "UI/UX", "Android", "Integration"],
  },
  {
    date: "2021 — 2025",
    title: "Bachelor of Technology — Information Technology",
    organization: "Sathyabama Institute of Science and Technology — Chennai",
    description:
      "Developed a broad software foundation through academic work and practical projects across programming, web development, databases and application engineering.",
    tags: ["B.Tech", "Information Technology", "Software Development"],
  },
  {
    date: "NOW",
    title: "Building for Software Engineering Roles",
    organization: "Projects • Learning • Practice",
    description:
      "Continuing to strengthen Java, Spring Boot, React, SQL, software engineering fundamentals and problem solving while building practical projects for real-world use cases.",
    tags: ["Java", "Spring Boot", "React", "SQL", "Problem Solving"],
  },
];

export const certifications = [
  "Java Full Stack Development — Code 99 IT Academy",
  "Android Application Development using Flutter — September 2023",
];

export const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Resume", "resume"],
  ["Contact", "contact"],
] as const;
