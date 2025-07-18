import { useState, useEffect } from 'react';
import type { Coupon, Product } from '@/types';

type CartItem = {
  id: string;
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  rating: number;
  category: string;
  inStock: boolean;
};

type CartState = {
  items: CartItem[];
  total: number;
  itemCount: number;
  coupon: Coupon | null;
  subtotal: number;
  discount: number;
  shipping: number;
};

const CART_STORAGE_KEY = 'tech_gamer_cart';

function getInitialCart(): CartState {
  if (typeof window === 'undefined') {
    return { 
      items: [], 
      total: 0, 
      itemCount: 0, 
      coupon: null, 
      subtotal: 0, 
      discount: 0, 
      shipping: 0 
    };
  }
  
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  return savedCart ? JSON.parse(savedCart) : { 
    items: [], 
    total: 0, 
    itemCount: 0, 
    coupon: null, 
    subtotal: 0, 
    discount: 0, 
    shipping: 0 
  };
}

export function useCart() {
  const [cart, setCart] = useState<CartState>(getInitialCart);

  // Atualiza o localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.items.find(item => item.productId === product.id);
      let items: CartItem[];
      
      if (existingItem) {
        items = prev.items.map(item =>
          item.productId === product.id 
            ? { 
                ...item, 
                quantity: item.quantity + quantity 
              }
            : item
        );
      } else {
        // Cria um novo item no carrinho com o ID do produto como string
        const newItem: CartItem = {
          id: `item-${product.id}-${Date.now()}`, // ID único para o item no carrinho
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          quantity,
          rating: product.rating,
          category: product.category,
          inStock: product.inStock,
        };
        items = [...prev.items, newItem];
      }
      
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const total = subtotal - prev.discount + prev.shipping;
      
      return {
        ...prev,
        items,
        subtotal,
        total,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const items = prev.items.filter(item => item.productId !== productId);
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const total = subtotal - prev.discount + prev.shipping;
      
      return {
        ...prev,
        items,
        subtotal,
        total,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      
      const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const total = subtotal - prevCart.discount + prevCart.shipping;
      
      return {
        ...prevCart,
        items: updatedItems,
        subtotal,
        total,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
      coupon: null,
      subtotal: 0,
      discount: 0,
      shipping: 0
    });
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const applyCoupon = (code: string): boolean => {
    // Simula a aplicação de um cupom
    if (code === 'DESCONTO10') {
      const discount = cart.subtotal * 0.1; // 10% de desconto
      setCart(prev => ({
        ...prev,
        coupon: { 
          code, 
          discount,
          type: 'percentage',
          minPurchase: 0
        },
        discount,
        total: prev.subtotal - discount + prev.shipping
      }));
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCart(prev => ({
      ...prev,
      coupon: null,
      discount: 0,
      total: prev.subtotal + prev.shipping
    }));
  };

  return {
    ...cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    totalItems: cart.itemCount
  };
}
