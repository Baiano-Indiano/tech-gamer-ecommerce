import { useCallback } from 'react';
import { useCart } from '../context';

export const useCartActions = () => {
  const { addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleAddToCart = useCallback((productId: string, quantity: number = 1) => {
    addToCart({ productId, quantity });
  }, [addToCart]);

  const handleRemoveFromCart = useCallback((productId: string) => {
    removeFromCart(productId);
  }, [removeFromCart]);

  const handleUpdateQuantity = useCallback((productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  }, [updateQuantity]);

  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    clearCart,
  };
};
