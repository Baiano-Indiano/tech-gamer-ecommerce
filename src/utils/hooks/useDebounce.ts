import { useState, useEffect } from 'react';

/**
 * Hook que retorna um valor que só é atualizado após um atraso
 * @param value Valor a ser debounced
 * @param delay Atraso em milissegundos
 * @returns Valor debounced
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
