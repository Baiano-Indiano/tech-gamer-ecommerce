import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = T | ((val: T) => T);

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: { serialize?: (value: T) => string; deserialize?: (value: string) => T } = {}
): [T, (value: SetValue<T>) => void] {
  const { 
    serialize = JSON.stringify, 
    deserialize = JSON.parse 
  } = options;

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  
  // Use an effect to set the initial value from localStorage
  // This avoids hydration issues with SSR
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsed = deserialize(item);
          setStoredValue(parsed);
        }
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
      }
    }
  }, [key, deserialize]);
  
  // Get from local storage then parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keep working
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key, deserialize]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Save to state
        setStoredValue(valueToStore);
        
        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serialize(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, serialize]
  );

  // Sync changes across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        setStoredValue(deserialize(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, deserialize]);

  // Initial read from localStorage - only on mount
  useEffect(() => {
    const value = readValue();
    // Only update if the value is different to prevent unnecessary re-renders
    setStoredValue(prev => {
      // Only update if the value is actually different
      return JSON.stringify(prev) === JSON.stringify(value) ? prev : value;
    });
  // We only want this to run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  return [storedValue, setValue];
}
