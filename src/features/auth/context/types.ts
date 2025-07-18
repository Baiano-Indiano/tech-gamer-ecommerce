import type { Product } from '../../../types/product';

export type FavoritesContextType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  isLoading: boolean;
};

export type FavoritesProviderProps = {
  children: React.ReactNode;
};
