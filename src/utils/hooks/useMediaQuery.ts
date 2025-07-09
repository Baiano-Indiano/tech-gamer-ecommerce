import { useState, useEffect } from 'react';

/**
 * Hook que detecta se a viewport corresponde a uma media query
 * @param query Media query a ser verificada (ex: '(min-width: 768px)')
 * @returns true se a media query for correspondida, false caso contrário
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};
