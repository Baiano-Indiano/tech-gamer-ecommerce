import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import { formatDate } from '../../utils/formatters/date';
import styled from 'styled-components';
import type { Product, Review } from '../../types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  background: white;
  border-radius: 8px;
  padding: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
`;

const Gallery = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
`;

const Thumbnail = styled.img<{ $isActive: boolean }>`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : 'transparent')};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.7)};
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const ProductInfo = styled.div``;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Brand = styled.span`
  display: block;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 1.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const RatingStars = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const RatingAverage = styled.span`
  font-size: 1.4rem;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const PriceContainer = styled.div`
  margin: 2rem 0;
`;

const CurrentPrice = styled.span`
  font-size: 3.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.gray};
  text-decoration: line-through;
  margin-left: 1rem;
`;

const Installments = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  margin: 2rem 0;
`;

const Features = styled.ul`
  margin: 2rem 0;
  padding-left: 2rem;
`;

const Feature = styled.li`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Actions = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuantityInput = styled.input`
  width: 50px;
  height: 40px;
  border: none;
  text-align: center;
  font-size: 1.6rem;
  -moz-appearance: textfield;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Benefits = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem 0;
  border-top: 1px solid #e5e7eb;
`;

const Benefit = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BenefitIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.4rem;
`;

const BenefitText = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Tabs = styled.div`
  margin-top: 4rem;
`;

const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 1.2rem 2rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`;

const TabContent = styled.div`
  padding: 2rem 0;
  font-size: 1.6rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const ReviewItem = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ReviewAuthor = styled.span`
  font-weight: 600;
`;

const ReviewDate = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.4rem;
`;

const ReviewRating = styled.div`
  color: #f59e0b;
  margin: 0.5rem 0;
`;

const ReviewText = styled.p`
  margin: 0;
`;

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart }) => {
  const [currentImage, setCurrentImage] = useState(product.images?.[0] || product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FiStar key={i} fill={i < Math.floor(rating) ? '#f59e0b' : 'none'} />
      ));
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <FiArrowLeft /> Voltar
      </BackButton>
      
      <ProductContainer>
        <Gallery>
          <MainImage src={currentImage} alt={product.name} />
          {product.images && product.images.length > 1 && (
            <Thumbnails>
              {product.images.map((img, index) => (
                <Thumbnail
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  $isActive={currentImage === img}
                  onClick={() => setCurrentImage(img)}
                />
              ))}
            </Thumbnails>
          )}
        </Gallery>

        <ProductInfo>
          <Title>{product.name}</Title>
          {product.brand && <Brand>Marca: {product.brand}</Brand>}
          
          <Rating>
            <RatingStars>
              {renderStars(product.rating)}
            </RatingStars>
            <RatingAverage>{product.rating.toFixed(1)}/5.0</RatingAverage>
          </Rating>

          <PriceContainer>
            <CurrentPrice>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(product.price)}
            </CurrentPrice>
            {product.originalPrice && (
              <OriginalPrice>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.originalPrice)}
              </OriginalPrice>
            )}
            <Installments>
              Em até 10x de{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(product.price / 10)}{' '}
              sem juros
            </Installments>
          </PriceContainer>

          <Description>{product.description}</Description>

          {product.specifications && (
            <Features>
              {Object.entries(product.specifications).map(([key, value]) => (
                <Feature key={key}>
                  <strong>{key}:</strong> {value}
                </Feature>
              ))}
            </Features>
          )}

          <Actions>
            <Quantity>
              <QuantityButton onClick={decrementQuantity}>-</QuantityButton>
              <QuantityInput
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
            </Quantity>
            <AddToCartButton onClick={handleAddToCart}>
              <FiShoppingCart /> Adicionar ao Carrinho
            </AddToCartButton>
          </Actions>

          <Benefits>
            <Benefit>
              <BenefitIcon>
                <FiTruck />
              </BenefitIcon>
              <BenefitText>Frete grátis em compras acima de R$ 299,00</BenefitText>
            </Benefit>
            <Benefit>
              <BenefitIcon>
                <FiShield />
              </BenefitIcon>
              <BenefitText>Garantia de 1 ano</BenefitText>
            </Benefit>
          </Benefits>
        </ProductInfo>
      </ProductContainer>

      <Tabs>
        <TabHeader>
          <TabButton 
            $active={activeTab === 'description'}
            onClick={() => setActiveTab('description')}
          >
            Descrição
          </TabButton>
          <TabButton 
            $active={activeTab === 'specifications'}
            onClick={() => setActiveTab('specifications')}
          >
            Especificações
          </TabButton>
          <TabButton 
            $active={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
          >
            Avaliações ({product.reviews?.length || 0})
          </TabButton>
        </TabHeader>

        <TabContent style={{ display: activeTab === 'description' ? 'block' : 'none' }}>
          <p>{product.description}</p>
        </TabContent>

        <TabContent style={{ display: activeTab === 'specifications' ? 'block' : 'none' }}>
          {product.specifications ? (
            <ul>
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma especificação disponível.</p>
          )}
        </TabContent>

        <TabContent style={{ display: activeTab === 'reviews' ? 'block' : 'none' }}>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review: Review) => (
              <ReviewItem key={review.id}>
                <ReviewHeader>
                  <ReviewAuthor>{review.user}</ReviewAuthor>
                  <ReviewDate>{formatDate(new Date(review.date))}</ReviewDate>
                </ReviewHeader>
                <ReviewRating>
                  {renderStars(review.rating)}
                </ReviewRating>
                <ReviewText>{review.comment}</ReviewText>
              </ReviewItem>
            ))
          ) : (
            <p>Nenhuma avaliação disponível. Seja o primeiro a avaliar!</p>
          )}
        </TabContent>
      </Tabs>
    </Container>
  );
};

export default ProductDetails;
