import { PortfolioData } from '../types/terminal';

export const portfolioData: PortfolioData = {
  name: "Adnan Anjar",
  title: "Full Stack Developer",
  email: "adnan.anjar2002@gmail.com",
  phone: "+212 649819318",
  location: "Tangier, MA",
  website: "https://alexthompson.dev",
  github: "https://github.com/ADNAN-an",
  linkedin: "https://linkedin.com/in/adnan-anjar",
  bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. I love creating beautiful, functional software that solves real-world problems.",
  
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "Go", "Rust"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "Django", "FastAPI"],
    tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase"]
  },

  projects: [
    {
      name: "TaskFlow Pro",
      description: "A comprehensive project management platform with real-time collaboration, built with React, Node.js, and WebSocket technology.",
      tech: ["React", "Node.js", "PostgreSQL", "Socket.io", "Tailwind CSS"],
      github: "https://github.com/alexthompson/taskflow-pro",
      demo: "https://taskflow-pro.vercel.app"
    },
    {
      name: "AI Content Generator",
      description: "An intelligent content creation tool powered by OpenAI API, featuring custom templates and workflow automation.",
      tech: ["Next.js", "OpenAI API", "Prisma", "tRPC", "Stripe"],
      github: "https://github.com/alexthompson/ai-content-gen",
      demo: "https://ai-content-gen.com"
    },
    {
      name: "EcoTracker",
      description: "Mobile-first web app for tracking personal carbon footprint with gamification elements and social features.",
      tech: ["React Native", "Firebase", "Chart.js", "PWA"],
      github: "https://github.com/alexthompson/eco-tracker"
    }
  ],

  experience: [
    {
      company: "TechCorp Solutions",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      description: "Lead development of enterprise applications serving 100K+ users. Architect scalable systems and mentor junior developers."
    },
    {
      company: "StartupXYZ",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      description: "Built core product features from scratch, implemented CI/CD pipelines, and improved application performance by 40%."
    },
    {
      company: "WebAgency Inc",
      position: "Frontend Developer",
      duration: "2019 - 2020",
      description: "Developed responsive websites and web applications for various clients using modern JavaScript frameworks."
    }
  ],

  education: [
    {
      institution: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      year: "2019"
    }
  ]
};