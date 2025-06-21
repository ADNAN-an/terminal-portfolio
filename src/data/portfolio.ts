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
      name: "DonorNation",
      description: "End-of-year project from my 3rd year of Software Engineering. DonorNation, is a         blood donation platform.",
      tech: ["Laravel", "PHP", "mySQL", "GMaps API"],
    },
    {
      name: "iElect",
      description: "A voting platform with MetaMask authentication for secure and transparent      participation in the democratic process.",
      tech: ["DJANGO", "Python", "TailwindCSS", "PostgreSQL", "MetaMask"],
      // github: "https://github.com/alexthompson/ai-content-gen",
      // demo: "https://ai-content-gen.com"
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
      company: "",
      position: "Full Stack Intern",
      duration: "2022 - Present",
      description: "Lead development of enterprise applications serving 100K+ users. Architect scalable systems and mentor junior developers."
    },
    {
      company: "SNRT",
      position: "Full Stack and data Intern",
      duration: "2020 - 2022",
      description: "Built core product features from scratch, implemented CI/CD pipelines, and improved application performance by 40%."
    },
    {
      company: "Tangier Med Zones",
      position: "Full Stack Intern",
      duration: "07/2023 - 08/2023",
      description: "Completed a 1-month internship at TMZ (Tangier Free Zones), which was my first experience in the professional environment."
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