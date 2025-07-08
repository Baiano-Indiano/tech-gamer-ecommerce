import { createContext } from 'react';
import type { CartItem, Coupon } from '../types';

/**
 * Tipo que define o formato do contexto do carrinho
 */
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

/**
 * Contexto do carrinho de compras
 */
export const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Props para o componente CartProvider
 */
export interface CartProviderProps {
  children: React.ReactNode;
}

// Mock de cupons disponíveis (em um app real, isso viria de uma API)
export const AVAILABLE_COUPONS: (Coupon & { description: string })[] = [
  {
    code: 'TECH10',
    type: 'percentage',
    discount: 10,
    description: '10% de desconto em todo o carrinho',
    minPurchase: 0,
  },
  {
    code: 'FREEGRATIS',
    type: 'shipping',
    discount: 0,
    description: 'Frete grátis em compras acima de R$ 200,00',
    minPurchase: 200,
  },
  {
    code: 'TECHSALE',
    type: 'percentage',
    discount: 20,
    description: '20% de desconto em produtos selecionados',
    minPurchase: 100,
  },
];
