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
  about: string;
  interests: string;
  socials: SocialLinks;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  achievements: string[];
  /** NEW: school seal shown beside the entry on the Background page */
  logo?: string;
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

/* ---------- NEW: Background page (work history) ---------- */

export interface ExperienceRole {
  title: string;
  /** Display text, e.g. "Aug 2026 – Present" */
  period: string;
  bullets: string[];
}

export interface Experience {
  id: string;
  organization: string;
  logo: string;
  /** Shows the green "Present" badge */
  current?: boolean;
  /** Newest role first. Two roles = a promotion shown under one company. */
  roles: ExperienceRole[];
  stack: string[];
  /** Optional link to a related project */
  project?: { label: string; href: string };
}

/* ---------- NEW: Gear page ---------- */

export interface GearItem {
  id: string;
  /** Small label above the name, e.g. "Main monitor" */
  category: string;
  name: string;
  /** Optional photo under /public/gear_img. Missing = neutral placeholder. */
  image?: string;
}

export interface PortfolioData {
  profile: Profile;
  education: Education[];
  certifications: Certification[];
  expertise: Expertise;
  projects: Project[];
  services: Service[];
  process: ProcessStep[];
  /** NEW */
  experience: Experience[];
  /** NEW */
  gear: GearItem[];
}
