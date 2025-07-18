import type { Product } from '@/types';

/**
 * Tipo que define o formato do contexto de favoritos
 */
export interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
}

/**
 * Props para o componente FavoritesProvider
 */
export interface FavoritesProviderProps {
  children: React.ReactNode;
}
