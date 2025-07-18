import React, { useCallback } from 'react';
import { FiHeart } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';
import { useFavorites } from '../../context/providers/FavoritesProvider/FavoritesProvider';
import type { Product } from '../../types/product';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const Button = styled.button<{ $isFavorite: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isFavorite, theme }) => 
    $isFavorite ? theme.colors.primary : theme.colors.gray};
  transition: all 0.2s ease;
  border-radius: 50%;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    animation: ${pulse} 0.5s ease-in-out;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface FavoriteButtonProps {
  product: Product;
  size?: number;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  product, 
  size = 24, 
  className = '' 
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites, isLoading } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }, [isProductFavorite, product, addToFavorites, removeFromFavorites, isLoading]);

  return (
    <Button 
      className={className}
      onClick={handleClick}
      $isFavorite={isProductFavorite}
      disabled={isLoading}
      aria-label={isProductFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      title={isProductFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <FiHeart size={size} fill={isProductFavorite ? 'currentColor' : 'none'} />
    </Button>
  );
};

export default FavoriteButton;
