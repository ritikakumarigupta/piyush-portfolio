export type Category = string;

export interface VideoProject {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  audioUrl?: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
  viewsCount?: number;
  date?: string;
  description: string;
  editingStyle?: string;
  toolsUsed?: string[];
  clientName?: string;
  client?: string;
  results?: string;
  isFeatured?: boolean;
  featured?: boolean;
  isPublished?: boolean;
  sortOrder?: number;
  tags?: string[];
  createdAt?: string;
}

export interface SiteStats {
  videosEdited: string;
  totalViews: string;
  clientsCount: string;
  engagement: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  project: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface SiteSettings {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroBio: string;
  availabilityText: string;
  aboutBio: string;
  aboutPhilosophy: string;
  aboutQuote: string;
  contactEmail: string;
  instagramUrl: string;
  linkedinUrl: string;
  behanceUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  iconName: string;
}