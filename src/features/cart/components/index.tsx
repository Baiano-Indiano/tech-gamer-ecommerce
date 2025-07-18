import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiMinus, FiTrash2, FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
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
  margin-right: 2rem;
`;

const CartTitle = styled.h1`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.text};
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CartItemCard = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 150px 150px 50px;
  gap: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    grid-template-areas:
      "image name"
      "price price"
      "quantity remove";
    gap: 1rem;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 4px;
  background: #f9fafb;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-area: image;
    width: 80px;
    height: 80px;
  }
`;

const ItemInfo = styled.div`
  @media (max-width: 768px) {
    grid-area: name;
  }
`;

const ItemName = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemBrand = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const ItemPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    grid-area: price;
  }
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-area: quantity;
  }
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.text};
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 32px;
  text-align: center;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  -moz-appearance: textfield;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  padding: 0.5rem;

  @media (max-width: 768px) {
    grid-area: remove;
    justify-self: end;
  }
`;

const CartEmpty = styled.div`
  text-align: center;
  padding: 4rem 0;
`;

const CartEmptyIcon = styled.div`
  font-size: 6rem;
  color: #e5e7eb;
  margin-bottom: 2rem;
`;

const CartEmptyText = styled.p`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 2rem;
`;

const ContinueShopping = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  font-size: 1.4rem;
`;

const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray};
`;

const SummaryValue = styled.span<{ bold?: boolean }>`
  font-weight: ${({ bold }) => (bold ? '600' : '400')};
  color: ${({ theme, bold }) => (bold ? theme.colors.text : 'inherit')};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1.4rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 2rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const CouponInput = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const CouponField = styled.input`
  flex: 1;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px 0 0 4px;
  font-size: 1.4rem;
`;

const ApplyCouponButton = styled.button`
  padding: 0 1.6rem;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 1.4rem;
`;



export const Cart: React.FC = () => {
  const {
    items,
    subtotal,
    discount,
    shipping,
    total,
    updateQuantity,
    removeFromCart: onRemoveItem,
    applyCoupon: onApplyCoupon,
    clearCart: onCheckout
  } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode);
      setCouponCode('');
    }
  };

  if (items.length === 0) {
    return (
      <CartContainer>
        <CartEmpty>
          <CartEmptyIcon>
            <FiShoppingCart />
          </CartEmptyIcon>
          <CartEmptyText>Seu carrinho está vazio</CartEmptyText>
          <ContinueShopping onClick={() => navigate('/')}>
            <FiArrowLeft /> Continuar Comprando
          </ContinueShopping>
        </CartEmpty>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </BackButton>
        <CartTitle>Meu Carrinho</CartTitle>
      </CartHeader>

      <CartContent>
        <CartItems>
          {items.map(item => (
            <CartItemCard key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                {item.brand && <ItemBrand>{item.brand}</ItemBrand>}
              </ItemInfo>
              <ItemPrice>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(item.price)}
              </ItemPrice>
              <ItemQuantity>
                <QuantityButton
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  <FiMinus />
                </QuantityButton>
                <QuantityInput
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e =>
                    handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                  }
                />
                <QuantityButton
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <FiPlus />
                </QuantityButton>
              </ItemQuantity>
              <RemoveButton onClick={() => onRemoveItem(item.id)}>
                <FiTrash2 />
              </RemoveButton>
            </CartItemCard>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Resumo do Pedido</SummaryTitle>
          
          <SummaryRow>
            <SummaryLabel>Subtotal</SummaryLabel>
            <SummaryValue>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(subtotal)}
            </SummaryValue>
          </SummaryRow>

          <CouponInput>
            <CouponField
              type="text"
              placeholder="Cupom de desconto"
              value={couponCode}
              onChange={e => setCouponCode(e.target.value)}
            />
            <ApplyCouponButton onClick={handleApplyCoupon}>
              Aplicar
            </ApplyCouponButton>
          </CouponInput>

          {discount > 0 && (
            <SummaryRow>
              <SummaryLabel>Desconto</SummaryLabel>
              <SummaryValue style={{ color: '#10b981' }}>
                -{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(discount)}
              </SummaryValue>
            </SummaryRow>
          )}

          <SummaryRow>
            <SummaryLabel>Frete</SummaryLabel>
            <SummaryValue>
              {shipping === 0
                ? 'Grátis'
                : new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(shipping)}
            </SummaryValue>
          </SummaryRow>

          <Divider />

          <SummaryRow>
            <SummaryLabel>Total</SummaryLabel>
            <SummaryValue bold>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(total)}
            </SummaryValue>
          </SummaryRow>


          <CheckoutButton onClick={onCheckout}>
            Finalizar Compra
          </CheckoutButton>

          <ContinueShopping
            onClick={() => navigate('/')}
            style={{
              marginTop: '1.5rem',
              width: '100%',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              color: '#4b5563',
              border: '1px solid #e5e7eb',
            }}
          >
            <FiArrowLeft /> Continuar Comprando
          </ContinueShopping>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
