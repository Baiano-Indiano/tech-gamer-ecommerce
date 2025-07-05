import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CategoriesContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 2rem;
  text-align: center;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const CategoryCard = styled(Link)`
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryImage = styled.div<{ bgImage: string }>`
  height: 180px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-color: #f1f5f9;
`;

const CategoryInfo = styled.div`
  padding: 1.25rem;
`;

const CategoryName = styled.h3`
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const CategoryDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const CategoryCount = styled.span`
  display: inline-block;
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
`;

// Dados de exemplo das categorias
const categories = [
  {
    id: 1,
    name: 'Processadores',
    slug: 'processadores',
    description: 'Os melhores processadores para seu computador',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f1725510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    productCount: 24
  },
  {
    id: 2,
    name: 'Placas de Vídeo',
    slug: 'placas-de-video',
    description: 'Alta performance para jogos e edição',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6701?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    productCount: 18
  },
  {
    id: 3,
    name: 'Memórias RAM',
    slug: 'memorias-ram',
    description: 'Aumente o desempenho do seu PC',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6701?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    productCount: 32
  },
  {
    id: 4,
    name: 'Armazenamento',
    slug: 'armazenamento',
    description: 'SSDs e HDs para todas as necessidades',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6701?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    productCount: 27
  },
  {
    id: 5,
    name: 'Placas-mãe',
    slug: 'placas-mae',
    description: 'A base para o seu computador',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6701?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    productCount: 15
  },
  {
    id: 6,
    name: 'Fontes',
    slug: 'fontes',
    description: 'Energia estável para seu PC',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6701?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    productCount: 12
  }
];

const Categories = () => {
  return (
    <CategoriesContainer>
      <PageTitle>Nossas Categorias</PageTitle>
      
      <CategoriesGrid>
        {categories.map(category => (
          <CategoryCard key={category.id} to={`/produtos?categoria=${category.slug}`}>
            <CategoryImage bgImage={category.image} />
            <CategoryInfo>
              <CategoryName>{category.name}</CategoryName>
              <CategoryDescription>{category.description}</CategoryDescription>
              <CategoryCount>{category.productCount} produtos</CategoryCount>
            </CategoryInfo>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </CategoriesContainer>
  );
};

export default Categories;
