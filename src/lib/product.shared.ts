export const fallbackImage =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80";

export type AdminProduct = {
  id: string;
  title: string;
  category: string;
  collection: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  details: string[];
  specs: { label: string; value: string }[];
  delivery: string;
  customization: string;
  isActive: boolean;
  videoUrl: string;
  duration: string;
  updatedAt: string;
};
