import { createContext, useContext } from 'react';
import type { FavoritesContextType } from './types';

/**
 * Contexto de favoritos
 * Fornece acesso ao estado e às ações de favoritos em toda a aplicação
 */
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * Hook personalizado para acessar o contexto de favoritos
 * @returns O contexto de favoritos
 * @throws {Error} Se o hook for usado fora de um FavoritesProvider
 */
export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
