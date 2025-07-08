import React from 'react';
import { CartContext, type CartProviderProps } from './cart.types';
import { useCartState } from '../hooks/useCartState';
import { useCart } from './CartContext';

/**
 * Provider do carrinho de compras que fornece o estado e as ações do carrinho
 * para toda a aplicação.
 */
const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const cart = useCartState();
  
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
