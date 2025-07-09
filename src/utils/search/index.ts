export * from './highlight';

type DebouncedFunction<T extends unknown[]> = {
  (...args: T): void;
  cancel: () => void;
};

/**
 * Debounce function for search input with cancel support
 */
export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = function (this: unknown, ...args: T) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, delay);
  };

  debouncedFunction.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debouncedFunction;
}

/**
 * Formats price with currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

/**
 * Detects if the device is mobile
 */
export const isMobile = (): boolean => {
  return window.innerWidth <= 768;
};
