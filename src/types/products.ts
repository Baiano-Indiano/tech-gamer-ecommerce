export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description?: string;
  inStock?: boolean;
  rating: number;
  reviewCount?: number;
  brand?: string;
  features?: string[];
  specifications?: Record<string, string>;
  image: string;
  images?: string[];
}
