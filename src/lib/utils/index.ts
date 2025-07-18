import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Product } from '@/features/products/types';

/**
 * Combina classes CSS com suporte a condições e mesclagem de classes do Tailwind
 * @param inputs Classes CSS a serem combinadas
 * @returns String de classes CSS combinadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um valor numérico para moeda brasileira (BRL)
 * @param value Valor numérico a ser formatado
 * @returns String formatada como moeda brasileira
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Calcula o preço com desconto
 * @param price Preço original
 * @param discount Porcentagem de desconto (0-100)
 * @returns Preço com desconto
 */
export const calculateDiscount = (price: number, discount: number): number => {
  return price - (price * discount) / 100;
};

/**
 * Filtra produtos com base em critérios
 */
export const filterProducts = (
  products: Product[], 
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    brands?: string[];
    search?: string;
  }
): Product[] => {
  return products.filter((product) => {
    // Filtro por categoria
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Filtro por preço mínimo
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    
    // Filtro por preço máximo
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }
    
    // Filtro por marcas
    if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }
    
    // Filtro por busca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (
        !product.name.toLowerCase().includes(searchLower) &&
        !product.description.toLowerCase().includes(searchLower) &&
        !product.brand.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    
    return true;
  });
};

/**
 * Ordena produtos com base em um critério
 */
export const sortProducts = (
  products: Product[], 
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' = 'newest'
): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    default:
      return sorted;
  }
};

/**
 * Gera um ID único
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Função de debounce para otimizar chamadas de eventos
 */
export const debounce = <F extends (...args: unknown[]) => unknown>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<F>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
