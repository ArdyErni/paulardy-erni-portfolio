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
  currentExperienceId: string;
  greeting: string;
  availability: string;
  facts: LabelValue[];
  photos: PortfolioPhoto[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  achievements: string[];
  /** Optional thesis contribution or other supporting academic detail. */
  description?: string;
  /** Optional academic technologies and tools. */
  stack?: string[];
  /** School seal shown beside the entry on the Background page. */
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

/* ---------- Background page (work history) ---------- */

export interface ExperienceRole {
  title: string;
  /** Display text, e.g. "Aug 2026 – Present" */
  period: string;
  bullets: string[];
  /** Role-specific badges; omitted or empty stacks use organization technologies. */
  stack?: string[];
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
}

/* ---------- Gear page ---------- */

export interface GearItem {
  id: string;
  /** Small label above the name, e.g. "Main monitor" */
  category: string;
  name: string;
  /** Asset path under public; missing images use the existing placeholder. */
  image?: string;
  description?: string;
  specifications?: LabelValue[];
}

export interface PortfolioData {
  contact: ContactContent;
  site: SiteContent;
  about: AboutContent;
  labels: PortfolioLabels;
  profile: Profile;
  education: Education[];
  certifications: Certification[];
  expertise: Expertise;
  projects: Project[];
  services: Service[];
  process: ProcessStep[];
  experience: Experience[];
  gear: GearItem[];
}

export interface LabelValue { label: string; value: string; }

export interface ContactFieldContent {
  label: string;
  required: string;
  tooLong: string;
  invalid: string;
}

export interface ContactContent {
  title: string;
  description: string;
  send: string;
  sending: string;
  close: string;
  successTitle: string;
  successDescription: string;
  sendAnother: string;
  error: string;
  rateLimited: string;
  invalid: string;
  honeypotLabel: string;
  emailSubject: string;
  fields: Record<"name" | "email" | "message", ContactFieldContent>;
}
export interface PortfolioPhoto { src: string; alt: string; }
export interface SiteContent {
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  favicon: string;
  brand: string;
  brandSuffix: string;
  loadingText: string;
  footerCredit: string;
}
export interface AboutContent {
  title: string;
  paragraphs: string[];
  principles: { icon: string; title: string; description: string }[];
  quote: string;
  focus: string;
}
export type PortfolioLabel =
  | "profile"
  | "background"
  | "projects"
  | "gear"
  | "viewProjects"
  | "downloadResume"
  | "contactMe"
  | "more"
  | "aboutMe"
  | "shufflePhotos"
  | "shuffleHint"
  | "portraitAlt"
  | "goToProfile"
  | "mainNavigation"
  | "github"
  | "linkedin"
  | "email"
  | "website"
  | "backgroundDescription"
  | "present"
  | "certifications"
  | "earned"
  | "projectsHeading"
  | "automationWorkflow"
  | "viewDetails"
  | "viewDetailsHint"
  | "closeProject"
  | "problem"
  | "solution"
  | "impact"
  | "highlights"
  | "features"
  | "viewCode"
  | "code"
  | "liveDemo"
  | "demo"
  | "featuredProject"
  | "gearDescription"
  | "productImage"
  | "currentFocus"
  | "tools"
  | "contributions"
  | "education"
  | "educationDescription"
  | "academicSnapshot"
  | "degree"
  | "institution"
  | "duration"
  | "emptyCertifications"
  | "verifiedCredentials"
  | "credentialsDescription"
  | "verifiedEducation"
  | "resumeHeading"
  | "resumeDescription"
  | "focus"
  | "services"
  | "servicesDescription"
  | "deliverables"
  | "technologies"
  | "processHeading"
  | "processDescription"
  | "contactHeading"
  | "contactDescription"
  | "searchPlaceholder"
  | "searchProjects"
  | "clearSearch"
  | "filterProjects"
  | "all"
  | "noProjects"
  | "noQueryCategory"
  | "noQuery"
  | "noCategory"
  | "clearFilters";
export type PortfolioLabels = Record<PortfolioLabel, string>;
