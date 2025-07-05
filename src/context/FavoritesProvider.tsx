import { useState, useEffect, useCallback } from 'react';
// import { useAuth } from './useAuth'; // Temporariamente desativado até ser necessário
import { FavoritesContext } from './FavoritesContext';
import type { FavoritesProviderProps } from './types';
import type { Product } from '../types/product';

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const { user } = useAuth(); // Temporariamente desativado até ser necessário

  // Carregar favoritos do localStorage quando o componente montar
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Salvar favoritos no localStorage quando houver mudanças
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Erro ao salvar favoritos:', error);
      }
    }
  }, [favorites, isLoading]);

  const isFavorite = useCallback((productId: string) => {
    return favorites.some(product => product.id === productId);
  }, [favorites]);

  const addToFavorites = useCallback((product: Product) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.some(p => p.id === product.id)) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  }, []);

  const removeFromFavorites = useCallback((productId: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(product => product.id !== productId)
    );
  }, []);

  return (
    <FavoritesContext.Provider 
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        isLoading
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// O hook useFavorites foi movido para src/context/hooks/useFavorites.ts

export default FavoritesProvider;
