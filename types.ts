export interface Review {
  name: string;
  rating: number; // 1-5
  comment: string;
  date: string;
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
}