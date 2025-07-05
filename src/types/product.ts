export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  inStock: boolean;
  rating: number;
  reviewCount?: number;
  brand?: string;
  features: string[];
  specifications?: Record<string, string>;
  // Para compatibilidade com diferentes componentes
  image?: string;
  images?: string[];
}

export interface ProductCardProps {
  product: Omit<Product, 'images'> & { image: string };
}

export interface ProductDetailProps {
  product: Omit<Product, 'image'> & { images: string[] };
}
