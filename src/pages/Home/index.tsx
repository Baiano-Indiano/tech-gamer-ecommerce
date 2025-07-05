import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard';
import type { Product } from '../../types/product';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  color: white;
  padding: 6rem 5%;
  text-align: center;
  width: 100%;
  max-width: 100vw;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  left: 0;
  right: 0;
  margin: 0;
  
  @media (min-width: 768px) {
    padding: 8rem 5%;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 1.6rem;
  font-weight: 800;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 4.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.6rem;
  max-width: 800px;
  margin: 0 auto 3.2rem;
  line-height: 1.6;
  opacity: 0.9;
  padding: 0 1.6rem;
  
  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 4rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background-color: white;
  color: #2563eb;
  padding: 1.2rem 2.4rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.8rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SectionContainer = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 6rem auto;
  padding: 0 5%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 1200px) {
    padding: 0 5%;
  }
  
  @media (max-width: 768px) {
    padding: 0 2.4rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1.6rem;
  }
`;

const FeaturedSection = styled(SectionContainer)``;

const SectionTitle = styled.h2`
  font-size: 3.2rem;
  margin-bottom: 3.2rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2.4rem;
  width: 100%;
  padding: 0 1.6rem;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 0 1.2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.4rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2.4rem;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1.6rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1.2rem;
  }
`;

const CategoryCard = styled(Link)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 350px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryImage = styled.div`
  height: 180px;
  width: 100%;
  background-color: #e2e8f0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const CategoryInfo = styled.div`
  padding: 1.6rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`;

const CategoryDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.4rem;
  margin-bottom: 1.6rem;
`;

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
}

const HomeContent = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Hardware',
      description: 'Processadores, placas de vídeo e mais',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      slug: 'hardware',
    },
    {
      id: 2,
      name: 'Periféricos',
      description: 'Teclados, mouses e headsets',
      image: 'https://images.unsplash.com/photo-1552089123-2d26226fc2b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      slug: 'perifericos',
    },
    {
      id: 3,
      name: 'Notebooks',
      description: 'Notebooks gamer e para trabalho',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      slug: 'notebooks',
    },
  ];

  const featuredProducts: (Omit<Product, 'images'> & { image: string })[] = [
    {
      id: '1',
      name: 'RTX 3080 Ti',
      price: 7999.99,
      originalPrice: 8999.99,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.8,
      inStock: true,
      features: ['Placa de vídeo NVIDIA GeForce RTX 3080 Ti', 'Memória GDDR6X de 12 GB', 'Taxa de transferência de 19 Gbps'],
      category: 'Hardware',
      description: 'Placa de vídeo NVIDIA GeForce RTX 3080 Ti, com memória GDDR6X de 12 GB e taxa de transferência de 19 Gbps',
    },
    {
      id: '2',
      name: 'Teclado Mecânico RGB',
      price: 599.99,
      originalPrice: 799.99,
      image: 'https://images.unsplash.com/photo-1552089123-2d26226fc2b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      rating: 4.6,
      inStock: true,
      features: ['Teclado mecânico com switches Kailh Blue', 'Iluminação RGB personalizável', 'Construção em alumínio'],
      category: 'Periféricos',
      description: 'Teclado mecânico com switches Kailh Blue, iluminação RGB personalizável e construção em alumínio',
    },
    {
      id: '3',
      name: 'Notebook Gamer',
      price: 8999.99,
      originalPrice: 9999.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      rating: 4.9,
      inStock: true,
      features: ['Processador Intel Core i7-11800H', 'Placa de vídeo NVIDIA GeForce RTX 3070', 'Memória RAM de 16 GB'],
      category: 'Notebooks',
      description: 'Notebook gamer com processador Intel Core i7-11800H, placa de vídeo NVIDIA GeForce RTX 3070 e memória RAM de 16 GB',
    },
    {
      id: '4',
      name: 'Mouse Gamer',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
      rating: 4.7,
      inStock: true,
      features: ['Sensor óptico de 16.000 DPI', 'Iluminação RGB personalizável', 'Construção em plástico'],
      category: 'Periféricos',
      description: 'Mouse gamer com sensor óptico de 16.000 DPI, iluminação RGB personalizável e construção em plástico',
    },
  ];

  return (
    <>
      <HeroSection>
        <HeroTitle>As Melhores Ofertas em Tecnologia</HeroTitle>
        <HeroSubtitle>
          Encontre os melhores produtos de tecnologia com os melhores preços do mercado
        </HeroSubtitle>
        <CTAButton to="/products">
          Ver Produtos <FiArrowRight />
        </CTAButton>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>Produtos em Destaque</SectionTitle>
        <Grid>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </FeaturedSection>

      <FeaturedSection>
        <SectionTitle>Categorias em Destaque</SectionTitle>
        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryCard key={category.id} to={`/produtos?categoria=${category.slug}`}>
              <CategoryImage style={{ backgroundImage: `url(${category.image})` }} />
              <CategoryInfo>
                <CategoryTitle>{category.name}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
              </CategoryInfo>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </FeaturedSection>
    </>
  );
};

const Home = () => {
  return <HomeContent />;
};

export default Home;
