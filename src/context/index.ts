// Re-exporta o contexto, provider e hooks do carrinho
export { CartContext, useCart } from './CartContext';
export { CartProvider } from './CartProvider';

// Exporta os tipos
export type { CartContextType, CartProviderProps } from './cart.types';

// Exporta os cupons disponíveis
export { AVAILABLE_COUPONS } from './cart.types';
