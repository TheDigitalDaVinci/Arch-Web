export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  area: string;
  style: string;
  year: string;
  image: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  image: string;
  project: string;
}

export interface Render360Item {
  title?: string;
  url: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  icon: string;
  features: string[];
  heroImage?: string;
  photos?: string[];
  videos?: string[];
  render360Url?: string;
  render360List?: Render360Item[];
}

export interface Statistic {
  value: number;
  suffix: string;
  label: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  specs: string[];
  color: string;
  image: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Award {
  id: string;
  title: string;
  year: string;
  organization: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
}

export interface ExpertiseCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}
