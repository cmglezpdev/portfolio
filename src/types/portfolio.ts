export interface Link {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  email: string;
  location: string;
  description: string;
  portrait: string | null;
  socials: Link[];
}

export interface EmploymentPeriod {
  start: string;
  end?: string;
}

export interface Experience {
  company: string;
  logo: string;
  period: EmploymentPeriod;
  current: boolean;
  context?: string;
  roles: {
    title: string;
    period: EmploymentPeriod;
    description: string;
    points: string[];
    tags: string[];
    caseStudy?: string;
  }[];
}

export interface EarlierExperience {
  company: string;
  logo: string;
  title: string;
  period: EmploymentPeriod;
  description: string;
  points: string[];
  tags: string[];
}

export interface ProjectImage {
  src: string;
  description: string;
}

interface ProjectDetails {
  slug: string;
  name: string;
  category: string;
  headline: string;
  summary: string;
  status: string;
  visual: 'nativo' | 'linkseek' | 'proxy' | 'agents';
  images: ProjectImage[];
  featured: boolean;
  tags: string[];
  links: Link[];
  sourceNote: string;
  overview: string;
  decisions: { title: string; text: string }[];
}

export type Project = ProjectDetails & (
  | { format?: undefined; howItWorks: string[] }
  | { format: 'case-study'; problem: string; contributions: string[]; outcome: string; next: string }
);

export interface AdditionalWork {
  name: string;
  description: string;
  tag: string;
  url?: string;
}
