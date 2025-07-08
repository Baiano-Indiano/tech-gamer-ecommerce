import { createContext } from 'react';
import type { FavoritesContextType } from './types';

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

export type { FavoritesContextType } from './types';
