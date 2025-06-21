export interface Command {
  command: string;
  output: string | JSX.Element;
  timestamp: Date;
}

export interface PortfolioData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  bio: string;
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    databases: string[];
  };
  projects: {
    name: string;
    description: string;
    tech: string[];
    github?: string;
    demo?: string;
  }[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
}