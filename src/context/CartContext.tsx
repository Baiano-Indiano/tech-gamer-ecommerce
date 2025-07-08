import { createContext, useContext } from 'react';
import type { CartContextType } from './cart.types';

/**
 * Contexto do carrinho de compras
 * Fornece acesso ao estado e às ações do carrinho em toda a aplicação
 */
export const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Hook personalizado para acessar o contexto do carrinho
 * @returns O contexto do carrinho
 * @throws {Error} Se o hook for usado fora de um CartProvider
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
