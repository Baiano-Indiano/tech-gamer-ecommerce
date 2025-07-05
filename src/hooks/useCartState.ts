import { useState, useCallback, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { CartItem, Coupon } from '../types';
import { AVAILABLE_COUPONS } from '../context/cart.types';
import { useLocalStorage } from './useLocalStorage';

const SHIPPING_COST = 15.0;
const FREE_SHIPPING_THRESHOLD = 250.0;
const CART_STORAGE_KEY = 'tech_gamer_cart';
const COUPON_STORAGE_KEY = 'tech_gamer_coupon';

interface StoredCart {
  items: CartItem[];
  timestamp: number;
}

export const useCartState = () => {
  // Usar o hook useLocalStorage para persistir o carrinho
  const [storedCart, setStoredCart] = useLocalStorage<StoredCart>(
    CART_STORAGE_KEY,
    { items: [], timestamp: Date.now() }
  );
  
  // Usar o hook useLocalStorage para persistir o cupom
  const [storedCoupon, setStoredCoupon] = useLocalStorage<Coupon | null>(
    COUPON_STORAGE_KEY,
    null
  );
  
  const [items, setItems] = useState<CartItem[]>(storedCart.items);
  const [coupon, setCoupon] = useState<Coupon | null>(storedCoupon);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Efeito para sincronização inicial
  useEffect(() => {
    if (!isInitialized) {
      setItems(storedCart.items);
      setCoupon(storedCoupon);
      setIsInitialized(true);
    }
  }, [isInitialized, storedCart.items, storedCoupon]);
  
  // Efeito para atualizar o localStorage quando items mudarem
  useEffect(() => {
    if (isInitialized) {
      setStoredCart(prev => {
        // Só atualiza se os itens forem diferentes
        if (JSON.stringify(prev.items) !== JSON.stringify(items)) {
          return {
            ...prev,
            items,
            timestamp: Date.now()
          };
        }
        return prev;
      });
    }
  }, [items, isInitialized, setStoredCart]);
  
  // Efeito para atualizar o localStorage quando o coupon mudar
  useEffect(() => {
    if (isInitialized) {
      setStoredCoupon(prevCoupon => {
        // Só atualiza se o cupom for diferente
        return JSON.stringify(prevCoupon) === JSON.stringify(coupon) ? prevCoupon : coupon;
      });
    }
  }, [coupon, isInitialized, setStoredCoupon]);
  
  // Limpar carrinho antigo após 7 dias (executa apenas uma vez na montagem)
  useEffect(() => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    if (storedCart.timestamp && storedCart.timestamp < oneWeekAgo) {
      setStoredCart({ items: [], timestamp: Date.now() });
      setStoredCoupon(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const discount = useMemo(() => {
    if (!coupon) return 0;
    
    if (coupon.type === 'percentage') {
      return (subtotal * coupon.discount) / 100;
    } else if (coupon.type === 'fixed') {
      return coupon.discount;
    }
    return 0;
  }, [coupon, subtotal]);

  const shipping = useMemo(() => {
    if (subtotal - discount >= FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    return SHIPPING_COST;
  }, [subtotal, discount]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount + shipping);
  }, [subtotal, discount, shipping]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const addToCart = useCallback((product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let newItems;
      
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`${product.name} atualizado no carrinho!`);
      } else {
        newItems = [...prevItems, { ...product, quantity }];
        toast.success(`${product.name} adicionado ao carrinho!`);
      }
      
      // Feedback tátil
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate?.(50);
      }
      
      return newItems;
    });
  }, []);

  const removeFromCart = useCallback((productId: number, productName?: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast.info(`${productName || 'Item'} removido do carrinho`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) {
      const itemToRemove = items.find(item => item.id === productId);
      removeFromCart(productId, itemToRemove?.name);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    
    // Feedback visual para atualização de quantidade
    const updatedItem = items.find(item => item.id === productId);
    if (updatedItem) {
      toast.info(`Quantidade de ${updatedItem.name} atualizada para ${quantity}`);
    }
  }, [items, removeFromCart]);

  const clearCart = useCallback((showToast = true) => {
    setItems([]);
    setCoupon(null);
    setStoredCoupon(null);
    setStoredCart({ items: [], timestamp: Date.now() });
    
    if (showToast) {
      toast.info('Carrinho limpo com sucesso!');
    }
  }, [setStoredCoupon, setStoredCart]);

  const applyCoupon = useCallback((code: string): boolean => {
    const couponToApply = AVAILABLE_COUPONS.find(
      c => c.code.toUpperCase() === code.toUpperCase()
    );

    if (couponToApply) {
      if (subtotal >= (couponToApply.minPurchase || 0)) {
        setCoupon(couponToApply);
        setStoredCoupon(couponToApply);
        toast.success(`Cupom ${couponToApply.code} aplicado com sucesso!`);
        return true;
      } else {
        toast.error(`Valor mínimo de R$ ${couponToApply.minPurchase} para usar este cupom`);
        return false;
      }
    }
    
    toast.error('Cupom inválido ou expirado');
    return false;
  }, [subtotal, setStoredCoupon]);

  const removeCoupon = useCallback(() => {
    if (coupon) {
      toast.info(`Cupom ${coupon.code} removido`);
    }
    setCoupon(null);
    setStoredCoupon(null);
  }, [coupon, setStoredCoupon]);

  return {
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
};
