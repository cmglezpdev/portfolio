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

export interface Experience {
  company: string;
  period: string;
  current: boolean;
  context: string;
  roles: { title: string; period: string }[];
  description: string;
  points: string[];
  tags: string[];
  caseStudy?: string;
}

export interface EarlierExperience {
  company: string;
  title: string;
  period: string;
  description: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  headline: string;
  summary: string;
  status: string;
  visual: 'nativo' | 'linkseek' | 'proxy' | 'agents';
  image: string | null;
  featured: boolean;
  tags: string[];
  links: Link[];
  sourceNote: string;
  overview: string;
  problem: string;
  contributions: string[];
  decisions: { title: string; text: string }[];
  outcome: string;
  next: string;
}

export interface AdditionalWork {
  name: string;
  description: string;
  tag: string;
  url: string;
}
