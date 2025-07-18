import React from 'react';
import { useAuth } from '../../../context/providers/AuthProvider/useAuth';
import styled from 'styled-components';
import { FiHeart, FiShoppingCart, FiTrash2, FiPlus } from 'react-icons/fi';
import { useCart } from '../../../context/providers/CartProvider/useCart';
import { formatCurrency } from '../../../utils/formatters/currency';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  description?: string;
}

export const Wishlist: React.FC = () => {
  const { user, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();

  // Mock data - in a real app, this would come from the user's wishlist
  const mockWishlist: WishlistItem[] = [
    {
      id: '1',
      name: 'PlayStation 5',
      price: 4499.99,
      originalPrice: 4999.99,
      image: '/images/ps5.jpg',
      category: 'Consoles',
      inStock: true,
      rating: 4.8,
      reviews: 124,
      description: 'O mais novo console da Sony com SSD ultrarrápido',
    },
    {
      id: '2',
      name: 'Xbox Series X',
      price: 4299.99,
      originalPrice: 4599.99,
      image: 'https://via.placeholder.com/200',
      category: 'Consoles',
      inStock: true,
      rating: 4.7,
      reviews: 98,
      description: 'O console mais poderoso da Microsoft',
    },
    {
      id: '3',
      name: 'Nintendo Switch OLED',
      price: 2899.99,
      originalPrice: 2999.99,
      image: 'https://via.placeholder.com/200',
      category: 'Consoles',
      inStock: false,
      rating: 4.9,
      reviews: 156,
      description: 'Versão OLED do console híbrido da Nintendo',
    },
    {
      id: '4',
      name: 'Controle DualSense - Preto',
      price: 499.99,
      originalPrice: 549.99,
      image: 'https://via.placeholder.com/200',
      category: 'Acessórios',
      inStock: true,
      rating: 4.8,
      reviews: 42875,
    },
  ];

  const handleAddToCart = (product: WishlistItem) => {
    const cartItem = {
      id: parseInt(product.id, 10), // Convertendo string para número para o carrinho
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      inStock: product.inStock,
      rating: product.rating,
    };
    
    addToCart(cartItem);
    
    if (removeFromWishlist) {
      removeFromWishlist(product.id);
    }
  };

  const handleClearWishlist = () => {
    if (confirm('Tem certeza que deseja limpar sua lista de desejos?')) {
      // Implementar lógica para limpar a lista de desejos
      mockWishlist.length = 0; // Apenas para demonstração
    }
  };

  const handleMoveAllToCart = () => {
    mockWishlist.forEach(item => {
      if (item.inStock) {
        const cartItem = {
          id: parseInt(item.id, 10), // Convertendo string para número para o carrinho
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          inStock: item.inStock,
          rating: item.rating,
        };
        
        addToCart(cartItem);
        
        if (removeFromWishlist) {
          removeFromWishlist(item.id);
        }
      }
    });
  };

  // Usando a função formatCurrency do módulo de utilitários

  if (!user) return null;

  return (
    <Container>
      <Header>
        <div>
          <h2>Lista de Desejos</h2>
          <p>{mockWishlist.length} itens na lista de desejos</p>
        </div>
        {mockWishlist.length > 0 && (
          <ButtonGroup>
            <Button $variant="outline" onClick={handleClearWishlist}>
              <FiTrash2 /> Limpar Lista
            </Button>
            <Button 
              $variant="primary" 
              onClick={handleMoveAllToCart}
              disabled={!mockWishlist.some(item => item.inStock)}
            >
              <FiShoppingCart /> Adicionar Todos ao Carrinho
            </Button>
          </ButtonGroup>
        )}
      </Header>

      {mockWishlist.length === 0 ? (
        <EmptyState>
          <FiHeart size={48} />
          <h3>Sua lista de desejos está vazia</h3>
          <p>Adicione itens à sua lista de desejos para vê-los aqui</p>
          <Button onClick={() => window.location.href = '/produtos'}>
            Ver Produtos
          </Button>
        </EmptyState>
      ) : (
        <WishlistGrid>
          {mockWishlist.map((item) => (
            <WishlistItem key={item.id}>
              <ItemImage>
                <img src={item.image} alt={item.name} />
                {!item.inStock && <OutOfStockLabel>Esgotado</OutOfStockLabel>}
              </ItemImage>
              
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                
                <Rating>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} $filled={i < Math.floor(item.rating)}>
                      {i < Math.floor(item.rating) ? '★' : '☆'}
                    </Star>
                  ))}
                  <ReviewCount>({item.reviews.toLocaleString()})</ReviewCount>
                </Rating>
                
                <PriceContainer>
                  <CurrentPrice>{formatCurrency(item.price)}</CurrentPrice>
                  {item.originalPrice && item.originalPrice > 0 && (
                    <OriginalPrice>
                      {formatCurrency(item.originalPrice)}
                    </OriginalPrice>
                  )}
                </PriceContainer>
                
                <Actions>
                  <Button 
                    $variant="primary" 
                    $fullWidth 
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                  >
                    <FiShoppingCart /> Adicionar ao Carrinho
                  </Button>
                  <Button 
                    $variant="outline" 
                    $fullWidth
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <FiTrash2 /> Remover
                  </Button>
                </Actions>
                
                {!item.inStock && (
                  <StockAlert>
                    <FiPlus /> Me avise quando chegar
                  </StockAlert>
                )}
              </ItemDetails>
            </WishlistItem>
          ))}
        </WishlistGrid>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
  gap: 1rem;

  h2 {
    margin: 0 0 0.25rem;
    font-size: 1.5rem;
    color: #111827;
  }

  p {
    margin: 0;
    color: #6b7280;
    font-size: 0.9375rem;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'outline' | 'text'; $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${({ $variant }) => ($variant === 'outline' ? '#d1d5db' : 'transparent')};
  background: ${({ $variant }) => {
    if ($variant === 'primary') return '#2563eb';
    if ($variant === 'text') return 'transparent';
    return '#f3f4f6';
  }};
  color: ${({ $variant }) => {
    if ($variant === 'primary') return '#fff';
    if ($variant === 'text') return '#2563eb';
    return '#4b5563';
  }};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  &:hover {
    background: ${({ $variant }) => {
      if ($variant === 'primary') return '#1d4ed8';
      if ($variant === 'text') return '#eff6ff';
      return '#e5e7eb';
    }};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    width: 100%;
    
    button {
      flex: 1;
      min-width: 100%;
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1.5rem;
  background: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 0.5rem;

  svg {
    color: #9ca3af;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: #111827;
    font-size: 1.125rem;
  }

  p {
    margin: 0 0 1.5rem;
    color: #6b7280;
    max-width: 28rem;
  }
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const WishlistItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s;
  background: #fff;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const ItemImage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #f9fafb;
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
  }
`;

const OutOfStockLabel = styled.span`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const ItemDetails = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ItemName = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.4;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const Star = styled.span<{ $filled: boolean }>`
  color: ${({ $filled }) => ($filled ? '#f59e0b' : '#d1d5db')};
  font-size: 0.875rem;
  margin-right: 0.125rem;
`;

const ReviewCount = styled.span`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
`;

const PriceContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`;

const OriginalPrice = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
  text-decoration: line-through;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const StockAlert = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.5rem;
  background: transparent;
  border: 1px dashed #d1d5db;
  border-radius: 0.375rem;
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #eff6ff;
    border-color: #93c5fd;
  }
  
  svg {
    font-size: 1rem;
  }
`;
