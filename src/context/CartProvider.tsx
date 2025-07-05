import React from 'react';
import { CartContext, type CartProviderProps } from './cart.types';
import { useCartState } from '../hooks/useCartState';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const cart = useCartState();
  
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};
