// Auth
export { AuthProvider } from '@/features/auth/context';
export { AuthContext } from '@/features/auth/context';
export { useAuth } from '@/features/auth/context';
export type { AuthContextType, User } from '@/features/auth/context';

// Cart
export { CartProvider, CartContext, useCart } from '@/features/cart/context';
export type { CartContextType } from '@/features/cart/context';

// Favorites
export { FavoritesProvider, FavoritesContext, useFavorites } from '@/features/favorites/context';
export type { FavoritesContextType } from '@/features/favorites/context';

// Theme
export { ThemeProvider, useTheme } from '@/theme/context';
export type { Theme } from '@/theme/context';
