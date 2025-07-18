import { useState, useCallback, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContext';
import type { FavoritesProviderProps, FavoritesContextType } from './types';
import type { Product } from '@/types';

/**
 * Provedor de favoritos
 * Gerencia o estado dos produtos favoritos do usuário
 */
export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Carrega os favoritos do localStorage ao inicializar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        localStorage.removeItem('favorites');
      }
    }
  }, []);

  // Salva os favoritos no localStorage sempre que houver alteração
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      localStorage.removeItem('favorites');
    }
  }, [favorites]);

  const addToFavorites = useCallback((product: Product) => {
    setFavorites(prevFavorites => {
      // Verifica se o produto já está nos favoritos
      if (prevFavorites.some(item => item.id === product.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, product];
    });
  }, []);

  const removeFromFavorites = useCallback((productId: number) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(product => product.id !== productId)
    );
  }, []);

  const isFavorite = useCallback((productId: number) => {
    return favorites.some(product => product.id === productId);
  }, [favorites]);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prevFavorites => {
      if (isFavorite(product.id)) {
        return prevFavorites.filter(p => p.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  }, [isFavorite]);

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
