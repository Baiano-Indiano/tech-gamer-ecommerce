export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  discount?: number;
  originalPrice?: number;
}

export interface WishlistItem extends Omit<Product, 'inStock' | 'rating' | 'reviews'> {
  productId: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
  type: 'visa' | 'mastercard' | 'amex' | 'elo' | 'hipercard';
}
