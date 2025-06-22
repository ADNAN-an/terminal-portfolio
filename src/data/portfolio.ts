import { PortfolioData } from '../types/terminal';

export const portfolioData: PortfolioData = {
  name: "Adnan Anjar",
  title: "Software Engineering Student | Full Stack Developer",
  email: "adnan.anjar2002@gmail.com",
  phone: "+212 649819318",
  location: "Tangier, Morocco",
  website: "https://adnan-anjar.dev", // Update with your actual domain
  github: "https://github.com/ADNAN-an",
  linkedin: "https://linkedin.com/in/adnan-anjar",
  bio: "5th-year Software Engineering student specializing in full-stack development, data analysis, and data science. Seeking final year internship (PFE) opportunities to apply technical skills in challenging, innovative projects with significant technical and operational impact.",
  
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C/C++", "C#", "R"],
    frameworks: ["React", "Next.js", "Angular", "Django", "Laravel", "Spring Boot", ".NET", "React Native", "Flutter"],
    tools: ["Git", "Docker", "Kubernetes", "Jenkins", "Azure", "Power BI", "Tableau", "Hadoop", "Spark", "Jira", "Trello", "Odoo"],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "Oracle DB", "SQL Server", "Neo4j", "Supabase"]
  },

  projects: [
    {
      name: "Okiru",
      description: "Collaboration platform connecting startups with freelancers, featuring modern full-stack architecture and real-time communication capabilities.",
      tech: ["TypeScript", "Next.js", "Prisma", "Supabase"],
      github: "https://github.com/ADNAN-an/okiru" // Add if available
    },
    {
      name: "iElect",
      description: "Blockchain-based voting platform with MetaMask authentication ensuring secure and transparent democratic participation through decentralized technology.",
      tech: ["Django", "Python", "PostgreSQL", "MetaMask", "Web3"],
      github: "https://github.com/ADNAN-an/ielect" // Add if available
    },
    {
      name: "DonorNation",
      description: "Blood donation management platform connecting donors with healthcare facilities, featuring location-based matching and appointment scheduling.",
      tech: ["Laravel", "PHP", "MySQL", "Google Maps API"],
      github: "https://github.com/ADNAN-an/donornation" // Add if available
    },
    {
      name: "SNRT Data Collection System",
      description: "Enterprise data aggregation system with comprehensive back-office dashboard for SNRT applications, enabling real-time monitoring and analytics.",
      tech: ["Spring Boot", "Angular", "Power BI", "Java"],
    }
  ],

  experience: [
    {
      company: "SNRT (Société Nationale de Radiodiffusion et de Télévision)",
      position: "Full Stack Development Intern",
      duration: "Jul 2024 - Sep 2024",
      description: "Designed and developed a comprehensive data collection system for SNRT applications with integrated back-office dashboard for visualization and management using Spring Boot, Angular, and Power BI for advanced analytics."
    },
    {
      company: "Tanger Med Zones (TMZ)",
      position: "Software Development Intern",
      duration: "Jul 2023 - Aug 2023",
      description: "Built a complete support ticket management application using Laravel and MySQL, implementing user authentication, ticket tracking, and administrative dashboard functionality."
    },
    {
      company: "RMA Insurance Company",
      position: "Operations Intern",
      duration: "Aug 2019 - Sep 2019",
      description: "Managed cash operations, billing processes, and administrative tasks while gaining exposure to enterprise software systems and customer service operations."
    }
  ],

  education: [
    {
      institution: "École Marocaine des Sciences d'Ingénieurs",
      degree: "Software Engineering (5th Year)",
      year: "2024-2025"
    },
    {
      institution: "École Marocaine des Sciences d'Ingénieurs",
      degree: "Computer Science & Networks Engineering",
      year: "2020-2024"
    }
  ],

  certifications: [
    {
      name: "IBM Data Science Professional Certificate",
      issuer: "IBM",
      year: "2024"
    },
    {
      name: "Oracle Database Administration (DBA)",
      issuer: "Oracle",
      year: "2024"
    }
  ]
};