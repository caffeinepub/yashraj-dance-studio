export interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  course?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  schedule: string;
  highlights: string[];
  accent: "cyan" | "purple" | "gradient";
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  alt: string;
  caption?: string;
  category: "performance" | "training" | "event" | "studio";
}

export interface ContactInfo {
  phone: string[];
  email: string;
  address: string;
  city: string;
  hours: { day: string; time: string }[];
  mapEmbedUrl?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
