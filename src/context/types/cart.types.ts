import type { CartItem, Coupon } from '../../types';

export interface CartContextType {
  items: CartItem[];
  coupon: Coupon | null;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  totalItems: number;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

export interface CartProviderProps {
  children: React.ReactNode;
}
