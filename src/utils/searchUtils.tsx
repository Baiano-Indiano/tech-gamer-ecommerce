import React from 'react';

interface StyleProps {
  background: string;
  color: string;
  fontWeight: number;
  textDecoration: string;
  textUnderlineOffset: string;
  textDecorationThickness: string;
  textDecorationColor: string;
}

const highlightStyle: StyleProps = {
  background: 'transparent',
  color: 'inherit',
  fontWeight: 600,
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
  textDecorationThickness: '2px',
  textDecorationColor: 'currentColor',
};

/**
 * Highlights matching text in search results
 */
export const highlightMatch = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;
  
  try {
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      const isMatch = regex.test(part);
      return isMatch ? (
        <span key={index} style={highlightStyle}>
          {part}
        </span>
      ) : part;
    });
  } catch {
    // Fallback if regex fails
    return text;
  }
};

/**
 * Detects if the device is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

interface DebouncedFunction<T extends unknown[]> {
  (...args: T): void;
  cancel: () => void;
}

/**
 * Debounce function for search input with cancel support
 */
export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): DebouncedFunction<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  const debounced = ((...args: T) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  }) as DebouncedFunction<T>;
  
  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  
  return debounced;
};

/**
 * Formats price with currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};
