import { useState, useMemo } from 'react';
import { CartContext } from '../CartContext';
import { AVAILABLE_COUPONS } from '../../constants/coupons';
import type { CartItem, Coupon } from '../../types';
import type { CartProviderProps } from '../types/cart.types';

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  // Calcula o subtotal do carrinho
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [items]);

  // Calcula o desconto com base no cupom aplicado
  const discount = useMemo(() => {
    if (!coupon) return 0;
    
    if (coupon.type === 'percentage') {
      return (subtotal * coupon.discount) / 100;
    } else if (coupon.type === 'fixed') {
      return coupon.discount;
    }
    return 0;
  }, [coupon, subtotal]);

  // Calcula o frete (exemplo simples)
  const shipping = useMemo(() => {
    if (coupon?.type === 'shipping') return 0;
    return subtotal > 200 ? 0 : 20; // Frete grátis para compras acima de R$200
  }, [subtotal, coupon]);

  // Calcula o total
  const total = useMemo(() => {
    return subtotal - discount + shipping;
  }, [subtotal, discount, shipping]);

  // Total de itens no carrinho
  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  // Adiciona um item ao carrinho
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove um item do carrinho
  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Atualiza a quantidade de um item no carrinho
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Limpa o carrinho
  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  // Aplica um cupom de desconto
  const applyCoupon = (code: string): boolean => {
    const couponToApply = AVAILABLE_COUPONS.find(
      coupon => coupon.code === code.trim().toUpperCase()
    );
    
    if (couponToApply) {
      setCoupon(couponToApply);
      return true;
    }
    
    return false;
  };

  // Remove o cupom aplicado
  const removeCoupon = () => {
    setCoupon(null);
  };

  const value = {
    items,
    coupon,
    subtotal,
    discount,
    shipping,
    total,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
