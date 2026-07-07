export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  website: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  introduction: string;
  location: string;
  avatar: string;
  resume: string;
  techStack: string[];
  currentFocus: string[];
  quickFacts: string[];
  socials: SocialLinks;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  achievements: string[];
}

export interface Certification {
  name: string;
  logo: string;
  issuer?: string;
  date?: string;
  credentialUrl?: string;
}

export interface ExpertiseCategory {
  name: string;
  items: string[];
}

export interface Philosophy {
  title: string;
  description: string;
}

export interface Expertise {
  featuredProject: string;
  categories: ExpertiseCategory[];
  philosophy: Philosophy;
}

export interface ProjectLinks {
  github: string;
  live: string;
}

export interface Project {
  id: string;
  featured: boolean;
  title: string;
  summary: string;
  description: string;
  problem?: string;
  solution?: string;
  highlights?: string[];
  features?: string[];
  impact?: string[];
  categories: string[];
  techStack: string[];
  status: string;
  thumbnail: string;
  gallery: string[];
  links: ProjectLinks;
}

export interface Service {
  title: string;
  description: string;
  deliverables: string[];
  technologies: string[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  profile: Profile;
  education: Education[];
  certifications: Certification[];
  expertise: Expertise;
  projects: Project[];
  services: Service[];
  process: ProcessStep[];
}
