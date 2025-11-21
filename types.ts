
export interface Review {
  name: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string; // Comma separated
  ogImage?: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  shortDescription: string;
  longDescription: string;
  duration: number; // in days
  price: number;
  imageUrl: string;
  gallery: string[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  activities: string[];
  difficulty: 'Intermediate' | 'Advanced' | 'Expert';
  route: string;
  routeCoordinates: [number, number][];
  reviews: Review[];
  seo?: SEOConfig;
}

export interface Departure {
  id: string;
  tripId: string;
  startDate: string;
  endDate: string;
  slots: number;
  status: 'Available' | 'Sold Out' | 'Limited';
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  content: string; // Could be markdown-like text
  seo?: SEOConfig;
}

export interface GalleryPhoto {
    id: string;
    imageUrl: string;
    caption: string;
    category: 'Landscapes' | 'Riders' | 'Culture' | 'Behind the Scenes';
}

export interface InstagramPost {
    id: string;
    imageUrl: string;
    type: 'photo' | 'reel';
    likes: number;
    comments: number;
}

export interface GoogleReview {
    id: string;
    authorName: string;
    rating: number;
    text: string;
    profilePhotoUrl: string;
    isFeatured: boolean;
}

export interface ItineraryQuery {
    id: string;
    tripId: string;
    tripTitle: string;
    name: string;
    whatsappNumber: string;
    planningTime: string;
    date: string;
}

export interface ColorSet {
  primary: string;
  primaryDark: string;
  accentGold: string;
  background: string;
  foreground: string;
  card: string;
  mutedForeground: string;
  border: string;
}

export interface ThemeColors {
  light: ColorSet;
  dark: ColorSet;
}

export interface ThemeOption {
  name: string;
  colors: ThemeColors;
}

// --- CMS / Builder Types ---

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string; // Markdown
  imageUrl?: string;
  isVisible: boolean;
  seo?: SEOConfig;
}

export type HomePageSection = 'HERO' | 'ADVENTURES' | 'DEPARTURES' | 'CUSTOMIZE' | 'WHY_CHOOSE_US' | 'ROOTS' | 'REVIEWS' | 'BLOG' | 'GALLERY' | 'INSTAGRAM';

export interface SectionConfig {
    id: HomePageSection;
    isVisible: boolean;
    label: string; // For Admin UI
}

export interface SiteContent {
    heroTitle: string;
    heroSubtitle: string;
    adventuresTitle: string;
    adventuresSubtitle: string;
    departuresTitle: string;
    customizeTitle: string;
    customizeSubtitle: string;
    rootsTitle: string;
    rootsBody: string;
    rootsButton: string;
    blogTitle: string;
    galleryTitle: string;
    gallerySubtitle: string;
    instagramTitle: string;
    instagramSubtitle: string;
    instagramUrl: string;
    googleReviewsUrl: string;
    adminWhatsappNumber: string;
    logoUrl: string;
    activeTheme: string;
    customThemeColors: ThemeColors;
    // New Fields for Builder
    homePageLayout: SectionConfig[];
    // Global SEO
    globalSeo?: SEOConfig;
}
