import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { mockProducts } from '../../data/mockProducts';
import ProductList from './components/ProductList';
import ProductFilters from './components/ProductFilters';
import { ProductsContainer, PageHeader } from './Products.styles';

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const FilterSelect = styled.select`
  padding: 0.8rem 1.2rem;
  margin-bottom: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ClearFiltersButton = styled.button`
  margin-top: 1.6rem;
  padding: 0.8rem 1.6rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export default function Products() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState('relevance');
  
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  
  // Extrair categorias únicas dos produtos
  const categories = useMemo(() => {
    const uniqueCategories = new Set(mockProducts.map(p => p.category));
    return Array.from(uniqueCategories);
  }, []);
  
  // Filtrar produtos por categoria e/ou termo de busca
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesCategory = !activeCategory || product.category === activeCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery);
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);
  
  // Verificar se não há resultados
  const noResults = filteredProducts.length === 0;

  // Ordenar produtos
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  // Obter título da página com base nos filtros
  const getPageTitle = () => {
    if (searchQuery) {
      return `Resultados para: "${searchQuery}"`;
    }
    if (activeCategory) {
      return `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`;
    }
    return 'Todos os Produtos';
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleClearFilters = () => {
    setActiveCategory('');
    setSortBy('relevance');
  };

  return (
    <ProductsContainer>
      <PageHeader>
        <div>
          <PageTitle>{getPageTitle()}</PageTitle>
          <PageDescription>
            {noResults 
              ? 'Nenhum produto encontrado. Tente ajustar sua busca ou filtros.'
              : `Mostrando ${filteredProducts.length} produtos`}
          </PageDescription>
        </div>
      </PageHeader>

      <ProductFilters 
        categories={categories}
        onFilterChange={handleCategoryChange}
        activeCategory={activeCategory}
      />
      
      <FilterSelect 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
        aria-label="Ordenar por"
      >
        <option value="relevance">Relevância</option>
        <option value="price-asc">Menor Preço</option>
        <option value="price-desc">Maior Preço</option>
        <option value="rating">Melhor Avaliados</option>
      </FilterSelect>

      {noResults ? (
        <NoResults>
          <p>Não encontramos produtos com os filtros selecionados.</p>
          <ClearFiltersButton onClick={handleClearFilters}>
            Limpar Filtros
          </ClearFiltersButton>
        </NoResults>
      ) : (
        <ProductList products={sortedProducts} />
      )}
    </ProductsContainer>
  );
}
