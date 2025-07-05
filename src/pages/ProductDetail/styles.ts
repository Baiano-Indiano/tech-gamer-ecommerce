import styled, { keyframes } from 'styled-components';

// Estilos compartilhados
export const ProductDetailContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductGallery = styled.div`
  position: relative;
`;

export const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #f8fafc;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  overflow: hidden;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

export const MainImage = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 400px;
  background-image: url(${props => props.bgImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f8fafc;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export const Thumbnails = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

export const Thumbnail = styled.div<{ bgImage: string; isActive: boolean }>`
  min-width: 80px;
  height: 80px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  border: 2px solid ${props => props.isActive ? '#3b82f6' : '#e2e8f0'};
  border-radius: 0.25rem;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductInfo = styled.div``;

export const ProductTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$isFavorite ? '#ef4444' : '#9ca3af'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${props => props.$isFavorite ? '#dc2626' : '#6b7280'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
  font-weight: 500;
`;

export const ReviewCount = styled.span`
  color: #64748b;
  font-size: 0.9rem;
`;

export const PriceContainer = styled.div`
  margin: 1.5rem 0;
`;

export const Price = styled.span`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-right: 0.75rem;
`;

export const OriginalPrice = styled.span`
  font-size: 1.25rem;
  color: #64748b;
  text-decoration: line-through;
  margin-right: 0.75rem;
  display: block;
`;

export const DiscountBadge = styled.span`
  background-color: #dcfce7;
  color: #166534;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-left: 1rem;
`;

export const ProductDescription = styled.p`
  color: #475569;
  line-height: 1.6;
  margin: 1.5rem 0;
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  
  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    color: #334155;
    
    &::before {
      content: '✓';
      color: #22c55e;
      margin-right: 0.5rem;
      font-weight: bold;
    }
  }
`;

export const ProductFeatures = styled.div`
  margin: 2rem 0;
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }
`;

export const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  
  button {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 1.25rem;
    color: #334155;
    cursor: pointer;
    
    &:hover {
      background-color: #e2e8f0;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  span {
    min-width: 2.5rem;
    text-align: center;
    font-size: 1.125rem;
    font-weight: 500;
  }
`;

export const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background-color: #3b82f6;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 1.5rem;
  
  &:hover {
    background-color: #2563eb;
  }
  
  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const BenefitsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    svg {
      color: #3b82f6;
      font-size: 1.5rem;
      flex-shrink: 0;
    }
    
    p {
      margin: 0;
      font-size: 0.9rem;
      color: #475569;
    }
  }
`;

// Estilos para estados de carregamento e erro
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: ${spin} 1s ease-in-out infinite;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: #dc2626;
  background-color: #fef2f2;
  border-radius: 0.5rem;
  margin: 2rem 0;
  
  svg {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      background-color: #2563eb;
    }
  }
`;
