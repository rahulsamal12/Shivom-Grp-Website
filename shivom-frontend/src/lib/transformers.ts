import { 
  IProject, IBlog, IEvent, IAward, ISlider, ITestimonial, ITeam, 
  ICareer, ISolarProduct, ISolarPromotion, IClient, IPage 
} from '@/types';

const BASE_UPLOAD_URL = 'https://apishivom.visital.co.in';

export const resolveImageUrl = (path: string | undefined | null, fallback: string): string => {
  if (!path) return fallback;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath.startsWith('/uploads/')) {
    return `${BASE_UPLOAD_URL}${cleanPath}`;
  }
  return path;
};

export const transformSlider = (data: Partial<ISlider>): ISlider => ({
  _id: data._id || Math.random().toString(),
  title: data.title || '',
  subtitle: data.subtitle || '',
  description: data.description || '',
  buttonText: data.buttonText || '',
  buttonLink: data.buttonLink || '',
  image: resolveImageUrl(data.image, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'),
  mobileImage: resolveImageUrl(data.mobileImage || data.image, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'),
  order: data.order || 0,
});

export const transformProject = (data: Partial<IProject>): IProject => {
  const defaultImg = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800';
  const resolvedFeatured = resolveImageUrl(data.featuredImage, defaultImg);
  
  return {
    _id: data._id || '',
    title: data.title || 'Untitled Project',
    slug: data.slug || '',
    shortDescription: data.shortDescription || '',
    description: data.description || '',
    category: data.category || 'General',
    location: data.location || '',
    clientName: data.clientName || '',
    projectDate: data.projectDate || '',
    featuredImage: resolvedFeatured,
    gallery: Array.isArray(data.gallery) 
      ? data.gallery.map(img => resolveImageUrl(img, defaultImg)) 
      : [resolvedFeatured],
    isFeatured: !!data.isFeatured,
    order: data.order || 0,
    metaTitle: data.metaTitle || data.title,
    metaDescription: data.metaDescription || data.shortDescription,
  };
};

export const transformBlog = (data: Partial<IBlog>): IBlog => ({
  _id: data._id || '',
  title: data.title || 'Untitled Post',
  slug: data.slug || '',
  excerpt: data.excerpt || '',
  content: data.content || '',
  author: data.author || 'Admin',
  category: data.category || 'News',
  featuredImage: resolveImageUrl(data.featuredImage, 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800'),
  tags: Array.isArray(data.tags) ? data.tags : [],
  isFeatured: !!data.isFeatured,
  publishedAt: data.publishedAt || new Date().toISOString(),
  metaTitle: data.metaTitle || data.title,
  metaDescription: data.metaDescription || data.excerpt,
});

export const transformEvent = (data: Partial<IEvent> & { image?: string; shortDescription?: string }): IEvent => {
  const defaultImg = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800';
  const imgUrl = data.featuredImage || data.image;
  const resolvedFeatured = resolveImageUrl(imgUrl, defaultImg);

  return {
    _id: data._id || '',
    title: data.title || 'Upcoming Event',
    slug: data.slug || '',
    excerpt: data.shortDescription || data.excerpt || '',
    description: data.description || '',
    image: resolvedFeatured,
    status: data.status || 'active',
    createdAt: data.createdAt || '',
    location: data.location || '',
    eventDate: data.eventDate || data.createdAt || '',
    endDate: data.endDate || '',
    featuredImage: resolvedFeatured,
    gallery: Array.isArray(data.gallery) 
      ? data.gallery.map((img: string) => resolveImageUrl(img, defaultImg)) 
      : [resolvedFeatured],
    isFeatured: !!data.isFeatured,
  };
};

export const transformAward = (data: Partial<IAward> & { issuer?: string; createdAt?: string }): IAward => ({
  _id: data._id || '',
  title: data.title || 'Award',
  slug: data.slug || '',
  description: data.description || '',
  year: data.year || (data.createdAt ? new Date(data.createdAt).getFullYear().toString() : '2024'),
  image: resolveImageUrl(data.image, 'https://dummyimage.com/150x150/ffffff/0072bc.png&text=Award'),
  type: data.type || 'award',
  issuedBy: data.issuer || data.issuedBy || '',
  certificateNumber: data.certificateNumber || '',
  order: data.order || 0,
});

export const transformTestimonial = (data: Partial<ITestimonial> & { clientName?: string; companyName?: string; message?: string }): ITestimonial => ({
  _id: data._id || '',
  name: data.clientName || data.name || 'Client',
  designation: data.designation || '',
  company: data.companyName || data.company || '',
  content: data.message || data.content || '',
  image: resolveImageUrl(data.image, 'https://dummyimage.com/150x150/ffffff/0072bc.png&text=Avatar'),
  rating: data.rating || 5,
  order: data.order || 0,
});

export const transformTeam = (data: Partial<ITeam> & { department?: string; position?: string }): ITeam => ({
  _id: data._id || '',
  name: data.name || 'Team Member',
  designation: data.designation || 'Staff',
  department: data.department || '',
  position: data.position || '',
  bio: data.bio || '',
  image: resolveImageUrl(data.image, 'https://dummyimage.com/180x180/ffffff/0b1f4d.png&text=Avatar'),
  linkedin: data.linkedin || '',
  twitter: data.twitter || '',
  order: data.order || 0,
});

export const transformCareer = (data: Partial<ICareer> & { jobTitle?: string; jobType?: string; status?: string; createdAt?: string; division?: 'group' | 'enterprise' | 'solar' | 'concrete' }): ICareer => ({
  _id: data._id || '',
  title: data.jobTitle || data.title || 'Position Available',
  slug: data.slug || '',
  department: data.department || '',
  location: data.location || 'Remote',
  type: (data.jobType || data.type || 'Full-time') as 'Full-time' | 'Part-time' | 'Contract' | 'Internship',
  experience: data.experience || '',
  description: data.description || '',
  requirements: Array.isArray(data.requirements) ? data.requirements : [],
  responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
  isActive: data.status === 'active' || (data.isActive !== undefined ? data.isActive : true),
  division: data.division,
  createdAt: data.createdAt,
});

export const transformClient = (data: Partial<IClient> & { websiteUrl?: string }): IClient => ({
  _id: data._id || '',
  name: data.name || 'Client Name',
  logo: resolveImageUrl(data.logo, 'https://dummyimage.com/260x140/ffffff/0072bc.png&text=Client'),
  website: data.websiteUrl || data.website || '',
  order: data.order || 0,
});

export const transformSolarProduct = (data: Partial<ISolarProduct> & { title?: string; gallery?: string[] }): ISolarProduct => {
  const defaultImg = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800';
  const resolvedFeatured = resolveImageUrl(data.featuredImage, defaultImg);

  return {
    _id: data._id || '',
    name: data.title || data.name || 'Solar Product',
    slug: data.slug || '',
    shortDescription: data.shortDescription || '',
    description: data.description || '',
    category: data.category || 'Product',
    featuredImage: resolvedFeatured,
    specifications: Array.isArray(data.specifications) 
      ? data.specifications.map((s: { name?: string; label?: string; value?: string }) => ({ label: s.name || s.label || '', value: s.value || '' })) 
      : [],
    features: Array.isArray(data.features) ? data.features : [],
    isFeatured: !!data.isFeatured,
  };
};

export const transformSolarPromotion = (data: Partial<ISolarPromotion> & { heading?: string; internalName?: string; buttonText?: string; buttonLink?: string; endDate?: string }): ISolarPromotion => ({
  _id: data._id || '',
  title: data.heading || data.internalName || data.title || 'Promotion',
  description: data.description || '',
  image: resolveImageUrl(data.image, 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800'),
  validUntil: data.endDate || data.validUntil || '',
  ctaText: data.buttonText || data.ctaText || 'Learn More',
  ctaLink: data.buttonLink || data.ctaLink || '',
});

export const transformPage = (data: Partial<IPage>): IPage => ({
  _id: data._id || '',
  slug: data.slug || '',
  title: data.title || 'Page',
  metaTitle: data.metaTitle || '',
  metaDescription: data.metaDescription || '',
  bannerImage: resolveImageUrl(data.bannerImage, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'),
  sections: Array.isArray(data.sections) ? data.sections.map(s => ({
    sectionKey: s.sectionKey || '',
    heading: s.heading || '',
    subHeading: s.subHeading || '',
    description: s.description || '',
    image: resolveImageUrl(s.image, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'),
    buttonText: s.buttonText || '',
    buttonLink: s.buttonLink || '',
    order: s.order || 0
  })) : [],
});
