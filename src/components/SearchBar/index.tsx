import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { KeyboardEvent, FormEvent, MouseEvent as ReactMouseEvent } from 'react';
import { FiSearch, FiX, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import type { Product } from '../../types/product';
import { mockProducts } from '../../constants/mockProducts';
import { debounce } from '../../utils/searchUtils';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  placeholder?: string;
  autoFocus?: boolean;
  debounceTime?: number;
  minQueryLength?: number;
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SearchContainer = styled.div<{ $isFocused: boolean }>`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  transition: all 0.2s ease;
  
  ${({ $isFocused }) => $isFocused && `
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
    border-radius: 0.5rem;
  `}
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => typeof theme.colors.gray === 'string' ? theme.colors.gray : theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s ease;
  
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 3rem;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  outline: none;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ClearButton = styled(SearchButton)`
  right: 3rem;
  width: 2.5rem;
`;

const SuggestionsList = styled.ul<{ $visible: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  max-height: 20rem;
  overflow-y: auto;
  margin: 0;
  padding: 0.5rem 0;
  background: ${({ theme }) => typeof theme.colors.gray === 'string' ? theme.colors.gray : theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  list-style: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(-8px)')};
  transition: all 0.2s ease;
  z-index: 50;
  animation: ${fadeIn} 0.2s ease-out;
`;

const SuggestionItem = styled.li<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.1s;
  background: ${({ $isActive, theme }) => 
    $isActive ? (typeof theme.colors.gray === 'string' ? theme.colors.gray : theme.colors.gray[100]) : 'transparent'};
  
  &:hover {
    background: ${({ theme }) => typeof theme.colors.gray === 'string' ? theme.colors.gray : theme.colors.gray[100]};
  }
`;

const SuggestionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuggestionTitle = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const SuggestionCategory = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 0.25rem;
`;

const LoadingIndicator = styled.div`
  position: absolute;
  right: 3.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.secondary};
`;

const ErrorMessage = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  className = '',
  isLoading = false,
  error = null,
  placeholder = 'Buscar produtos...',
  autoFocus = false,
  debounceTime = 300,
  minQueryLength = 2,
}) => {
  const navigate = useNavigate();
  
  // State
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [isComposing, setIsComposing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const suggestionsListRef = useRef<HTMLUListElement>(null);
  
  // Generate a unique ID for ARIA attributes
  const searchId = useMemo(() => `search-${Math.random().toString(36).substr(2, 9)}`, []);
  
  // Highlight matching text in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.substring(0, index)}
        <strong>{text.substring(index, index + query.length)}</strong>
        {text.substring(index + query.length)}
      </>
    );
  };

  // Check if device is mobile
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Handle search with debouncing
  const searchProducts = useCallback((searchQuery: string) => {
    if (searchQuery.length >= minQueryLength) {
      // Simulate API call delay
      const timer = setTimeout(() => {
        // In a real app, this would be an API call
        const filtered = mockProducts.filter(
          product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        // Sort by relevance (exact matches first)
        filtered.sort((a, b) => {
          const aNameMatch = a.name.toLowerCase().startsWith(searchQuery.toLowerCase());
          const bNameMatch = b.name.toLowerCase().startsWith(searchQuery.toLowerCase());
          
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;
          return 0;
        });
        
        setSuggestions(filtered);
        setShowSuggestions(true);
      }, 200);
      
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [minQueryLength]);

  // Memoize the debounced search function
  const debouncedSearch = useMemo(
    () => debounce(searchProducts, debounceTime),
    [searchProducts, debounceTime]
  );

  // Update search when query changes
  useEffect(() => {
    debouncedSearch(query);
    setActiveSuggestion(-1);
    
    // Cleanup debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);
  
  // Focus the input when autoFocus prop changes
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  // Clear search and focus input
  const clearSearch = useCallback(() => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, []);

  // Handle click outside to close suggestions
  const handleClickOutside = useCallback((event: globalThis.MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  }, []);
  
  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: globalThis.KeyboardEvent) => {
    // Cmd+K or Ctrl+K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      inputRef.current?.focus();
    }
    
    // Escape to clear search or close suggestions
    if (e.key === 'Escape') {
      if (query) {
        clearSearch();
      } else {
        setShowSuggestions(false);
      }
    }
  }, [query, clearSearch]);

  // Set up event listeners
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);
  
  // Auto-scroll active suggestion into view
  useEffect(() => {
    if (activeSuggestion >= 0 && suggestionsListRef.current) {
      const activeElement = suggestionsListRef.current.querySelector('[aria-selected="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeSuggestion]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((product: Product) => {
    setQuery(product.name);
    setShowSuggestions(false);
    
    if (onSearch) {
      onSearch(product.name);
    }
    
    navigate(`/products?search=${encodeURIComponent(product.name)}`);
    
    // Move focus back to input
    setTimeout(() => {
      inputRef.current?.blur();
    }, 0);
  }, [navigate, onSearch]);

  // Handle form submission
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
      // If there's an active suggestion, use that
      const selectedProduct = suggestions[activeSuggestion];
      handleSuggestionClick(selectedProduct);
    } else {
      // Otherwise use the raw query
      if (onSearch) {
        onSearch(query);
      }
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
    
    // Blur the input on submit
    inputRef.current?.blur();
  }, [query, activeSuggestion, suggestions, onSearch, navigate, handleSuggestionClick]);

  // Handle keyboard navigation
  const handleInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    // Skip if composing (IME input)
    if (isComposing) return;
    
    // Handle keyboard navigation only when suggestions are shown
    if (showSuggestions && suggestions.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveSuggestion(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          setActiveSuggestion(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          break;
          
        case 'Home':
          e.preventDefault();
          setActiveSuggestion(0);
          break;
          
        case 'End':
          e.preventDefault();
          setActiveSuggestion(suggestions.length - 1);
          break;
          
        case 'Enter':
          e.preventDefault();
          if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
            handleSuggestionClick(suggestions[activeSuggestion]);
          } else {
            handleSubmit(e as unknown as FormEvent);
          }
          break;
          
        case 'Tab':
          // Allow default tab behavior
          setShowSuggestions(false);
          break;
          
        default:
          break;
      }
    } else if (e.key === 'Enter' && query.trim()) {
      // Handle enter when no suggestions are shown but there's a query
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  }, [activeSuggestion, handleSuggestionClick, handleSubmit, isComposing, query, showSuggestions, suggestions]);

  // Handle input focus
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (query.length >= minQueryLength) {
      setShowSuggestions(true);
    }
  }, [query.length, minQueryLength]);

  // Handle input blur with a small delay
  const handleBlur = useCallback(() => {
    // Small delay to allow click events to process
    setTimeout(() => {
      setIsFocused(false);
      // Don't hide suggestions if clicking on a suggestion
      if (!searchRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
      }
    }, 200);
  }, []);

  // Handle IME composition events
  const handleComposition = useCallback((composing: boolean) => {
    setIsComposing(composing);
  }, []);

  // Handle click on suggestion item
  const handleSuggestionInteraction = useCallback((e: ReactMouseEvent | React.KeyboardEvent, product: Product) => {
    e.preventDefault();
    handleSuggestionClick(product);
  }, [handleSuggestionClick]);

  return (
    <SearchContainer
      ref={searchRef}
      className={className}
      $isFocused={isFocused}
    >
      <SearchForm
        onSubmit={handleSubmit}
        role="search"
        aria-label="Buscar produtos"
      >
        <SearchInput
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleInputKeyDown}
          onCompositionStart={() => handleComposition(true)}
          onCompositionEnd={() => handleComposition(false)}
          placeholder={placeholder}
          aria-label="Buscar produtos"
          aria-expanded={showSuggestions}
          aria-owns={searchId ? `${searchId}-suggestions` : undefined}
          aria-activedescendant={
            activeSuggestion >= 0
              ? `${searchId}-suggestion-${activeSuggestion}`
              : undefined
          }
          role="combobox"
          autoComplete="off"
          spellCheck="false"
          aria-autocomplete="list"
          aria-controls={searchId ? `${searchId}-suggestions` : undefined}
        />

        {isLoading && (
          <LoadingIndicator>
            <FiLoader className="animate-spin" />
          </LoadingIndicator>
        )}

        {query && (
          <ClearButton
            type="button"
            onClick={clearSearch}
            aria-label="Limpar busca"
          >
            <FiX />
          </ClearButton>
        )}

        <SearchButton
          type="submit"
          disabled={!query.trim()}
          aria-label="Buscar"
        >
          <FiSearch />
        </SearchButton>
      </SearchForm>

      <SuggestionsList
        id={searchId ? `${searchId}-suggestions` : undefined}
        $visible={showSuggestions && suggestions.length > 0}
        role="listbox"
        ref={suggestionsListRef}
      >
        {suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={suggestion.id}
            id={`${searchId}-suggestion-${index}`}
            role="option"
            aria-selected={index === activeSuggestion}
            $isActive={index === activeSuggestion}
            onMouseDown={(e) => handleSuggestionInteraction(e, suggestion)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSuggestionInteraction(e, suggestion);
              }
            }}
            tabIndex={-1}
          >
            <SuggestionContent>
              <SuggestionTitle>
                {highlightMatch(suggestion.name, query)}
              </SuggestionTitle>
              <SuggestionCategory>
                {suggestion.category}
              </SuggestionCategory>
            </SuggestionContent>
          </SuggestionItem>
        ))}
      </SuggestionsList>

      {error && (
        <ErrorMessage role="alert">
          {error}
        </ErrorMessage>
      )}

      {!isMobile() && query.length === 0 && (
        <div className="mt-2 text-xs text-gray-500">
          Pressione <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded">K</kbd> para buscar
        </div>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
