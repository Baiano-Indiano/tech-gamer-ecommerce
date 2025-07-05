export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  category: string;
  brand?: string;
  inStock: boolean;
  fastDelivery?: boolean;
  freeShipping?: boolean;
  description?: string;
  specifications?: Record<string, string>;
  reviews?: Review[];
  relatedProducts?: number[];
};

export type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type WishlistItem = Product & {
  addedAt: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: number;
};

export type FilterOption = {
  id: string;
  name: string;
  value: string;
  count: number;
};

export type FilterGroup = {
  id: string;
  name: string;
  type: 'checkbox' | 'radio' | 'range';
  options: FilterOption[];
};

export type Coupon = {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed' | 'shipping';
  minPurchase?: number;
  validUntil?: string;
};

export type Address = {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
};

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
};
