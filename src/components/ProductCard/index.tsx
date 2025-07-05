import styled from 'styled-components';
import { FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesProvider';
import type { Product } from '../../types/product';

type ProductCardProps = {
  product: Omit<Product, 'image' | 'images'> & { image: string };
};

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div<{ $image: string }>`
  height: 200px;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  .favorite-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 3.6rem;
    height: 3.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    color: #9ca3af;
    
    &:hover {
      transform: scale(1.1);
      color: #ef4444;
    }
    
    &[data-favorite="true"] {
      color: #ef4444;
    }
  }
`;

const ProductInfo = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const PriceContainer = styled.div`
  margin-top: auto;
`;

const CurrentPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 0.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const OriginalPrice = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: line-through;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin: 0.8rem 0;
  color: #f59e0b;
  font-size: 1.4rem;
`;

const RatingText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  margin-left: 0.4rem;
  font-size: 1.2rem;
`;

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1.4rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 1.3rem;
  }
`;

export default function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isProductFavorite = isFavorite(String(product.id));
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProductFavorite) {
      removeFromFavorites(String(product.id));
    } else {
      addToFavorites(product);
    }
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Card>
      <Link to={`/products/${product.id}`}>
        <ProductImage $image={product.image}>
          <button 
            className="favorite-button" 
            onClick={handleFavoriteClick}
            data-favorite={isProductFavorite}
            aria-label={isProductFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <FiHeart size={20} fill={isProductFavorite ? 'currentColor' : 'none'} />
          </button>
        </ProductImage>
      </Link>
      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <Rating>
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i} 
              fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} 
              color={i < Math.floor(product.rating) ? '#f59e0b' : '#e2e8f0'}
            />
          ))}
          <RatingText>{product.rating.toFixed(1)}</RatingText>
        </Rating>
        <PriceContainer>
          <CurrentPrice>{formatPrice(product.price)}</CurrentPrice>
          {product.originalPrice && (
            <OriginalPrice>{formatPrice(product.originalPrice)}</OriginalPrice>
          )}
        </PriceContainer>
        <AddToCartButton>
          <FiShoppingCart /> Adicionar ao Carrinho
        </AddToCartButton>
      </ProductInfo>
    </Card>
  );
}
