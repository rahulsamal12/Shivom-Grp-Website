// Common Response Types
export interface ListResponse<T> {
  success: boolean;
  message?: string;
  data: T[];
}

export interface SingleResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Entity Types
export interface IPage {
  _id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  bannerImage?: string;
  sections: Array<{
    sectionKey: string;
    heading: string;
    subHeading?: string;
    description?: string;
    image?: string;
    buttonText?: string;
    buttonLink?: string;
    order: number;
  }>;
}

export interface ISlider {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image: string;
  mobileImage?: string;
  order: number;
}

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description: string;
  category: string;
  location?: string;
  clientName?: string;
  projectDate?: string;
  featuredImage: string;
  gallery: string[];
  isFeatured: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author?: string;
  category: string;
  featuredImage: string;
  tags?: string[];
  isFeatured: boolean;
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface IEvent {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  shortDescription?: string;
  description: string;
  image: string;
  status?: string;
  createdAt?: string;
  location?: string;
  eventDate?: string;
  endDate?: string;
  featuredImage?: string;
  gallery?: string[];
  isFeatured?: boolean;
}

export interface IAward {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  year?: string;
  image: string;
  type: 'award' | 'certification';
  issuedBy?: string;
  certificateNumber?: string;
  order: number;
}

export interface ITestimonial {
  _id: string;
  name: string;
  designation?: string;
  company?: string;
  content: string;
  image?: string;
  rating?: number;
  order: number;
}

export interface ITeam {
  _id: string;
  name: string;
  designation: string;
  department?: string;
  position?: string;
  bio?: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  order: number;
}

export interface ICareer {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  isActive: boolean;
  division?: 'group' | 'enterprise' | 'solar' | 'concrete';
  createdAt?: string;
}

export interface IClient {
  _id: string;
  name: string;
  logo: string;
  website?: string;
  order: number;
}

export interface ISolarProduct {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description: string;
  category: string;
  featuredImage: string;
  specifications: Array<{ label: string; value: string }>;
  features: string[];
  isFeatured: boolean;
}

export interface ISolarPromotion {
  _id: string;
  title: string;
  description: string;
  image: string;
  validUntil: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface IContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ICareerApplicationPayload {
  name: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resumeUrl: string;
}
