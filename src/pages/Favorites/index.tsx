import React from 'react';
import styled from 'styled-components';
import { useFavorites } from '../../context/providers/FavoritesProvider/FavoritesProvider';
import ProductCard from '../../components/ProductCard';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => `${theme.colors.gray}10`};
  border-radius: 0.5rem;
  margin-top: 2rem;

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.gray};
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.gray};
    margin-bottom: 1.5rem;
    max-width: 400px;
  }
`;

const FavoritesPage: React.FC = () => {
  const { favorites, isLoading } = useFavorites();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Container>
        <div>Carregando...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
          Voltar
        </BackButton>
        <Title>
          <FiHeart />
          Meus Favoritos
        </Title>
      </Header>
      {favorites.length === 0 ? (
        <EmptyState>
          <FiHeart size={48} />
          <h3>Sua lista de favoritos está vazia</h3>
          <p>Adicione produtos aos seus favoritos para encontrá-los facilmente mais tarde.</p>
        </EmptyState>
      ) : (
        <ProductsGrid>
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsGrid>
      )}
    </Container>
  );
};

export default FavoritesPage;
