import styled from 'styled-components';
import { FiClock, FiPercent } from 'react-icons/fi';

const DealsContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #1e293b;
  margin: 0;
`;

const TimeLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fef2f2;
  color: #b91c1c;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 500;
  
  svg {
    margin-right: 0.25rem;
  }
`;

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const DealCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const DiscountBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: #ef4444;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 1;
`;

const ProductImage = styled.div<{ bgImage: string }>`
  height: 200px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-color: #f1f5f9;
  position: relative;
`;

const ProductInfo = styled.div`
  padding: 1.25rem;
`;

const ProductCategory = styled.span`
  display: inline-block;
  color: #64748b;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
  font-weight: 600;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e40af;
`;

const OriginalPrice = styled.span`
  font-size: 0.95rem;
  color: #94a3b8;
  text-decoration: line-through;
`;

const Discount = styled.span`
  background-color: #dbeafe;
  color: #1e40af;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
`;

const AddToCartButton = styled.button`
  width: 100%;
  background-color: #1e40af;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1e3a8a;
  }
`;

// Dados de exemplo das ofertas
const deals = [
  {
    id: 1,
    name: 'Placa de Vídeo RTX 3080',
    category: 'Placas de Vídeo',
    originalPrice: 8999.90,
    currentPrice: 7299.90,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6701',
  },
  {
    id: 2,
    name: 'Processador Intel i9-12900K',
    category: 'Processadores',
    originalPrice: 4299.90,
    currentPrice: 3699.90,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f1725510',
  },
  {
    id: 3,
    name: 'Monitor Gamer 27" 144Hz',
    category: 'Monitores',
    originalPrice: 2499.90,
    currentPrice: 1999.90,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1546538915-a9e2c8d1a40e',
  },
  {
    id: 4,
    name: 'Teclado Mecânico RGB',
    category: 'Periféricos',
    originalPrice: 699.90,
    currentPrice: 499.90,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
  },
];

const Deals = () => {
  // Calcular tempo restante para o fim da oferta (24h a partir de agora)
  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 24);
  
  const formatTimeLeft = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Oferta encerrada';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `Acaba em ${hours}h ${minutes}m`;
  };

  return (
    <DealsContainer>
      <PageHeader>
        <div>
          <h2>Ofertas Especiais - Até 70% OFF</h2>
          <PageTitle />
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
            Aproveite nossas ofertas por tempo limitado
          </p>
        </div>
        <TimeLeft>
          <FiClock />
          {formatTimeLeft(endTime)}
        </TimeLeft>
      </PageHeader>
      
      <DealsGrid>
        {deals.map(deal => (
          <DealCard key={deal.id}>
            <ProductImage bgImage={deal.image}>
              <DiscountBadge>
                <FiPercent size={14} />
                {deal.discount}% OFF
              </DiscountBadge>
            </ProductImage>
            <ProductInfo>
              <ProductCategory>{deal.category}</ProductCategory>
              <ProductName>{deal.name}</ProductName>
              <PriceContainer>
                <CurrentPrice>
                  {deal.currentPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </CurrentPrice>
                <OriginalPrice>
                  {deal.originalPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </OriginalPrice>
                <Discount>Economize {deal.discount}%</Discount>
              </PriceContainer>
              <AddToCartButton>Adicionar ao Carrinho</AddToCartButton>
            </ProductInfo>
          </DealCard>
        ))}
      </DealsGrid>
    </DealsContainer>
  );
};

export default Deals;
