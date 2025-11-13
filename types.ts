
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
