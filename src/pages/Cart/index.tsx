import * as React from 'react';
import styled from 'styled-components';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Helper function to format price
// Format price to Brazilian Real
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

// Styled Components
const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const StyledCartIcon = styled(FiShoppingCart)`
  font-size: 2.4rem;
  margin-right: 1rem;
`;

const CartTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
`;

const CartContent = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 0;
`;

const EmptyCartTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const EmptyCartText = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-block;
  background: #2563eb;
  color: white;
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

const CartItem = styled.li`
  display: flex;
  padding: 2rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors?.text || '#1e293b'};
`;

const ItemPrice = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || '#2563eb'};
  margin: 0.8rem 0;
`;

const CartPage = (): React.JSX.Element => {
  // TODO: Replace with actual cart data from context
  type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  // TODO: Replace with actual cart data from context
  const cartItems: CartItem[] = [];
  
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  const shipping = subtotal > 0 ? 10 : 0; // Example shipping calculation
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <CartHeader>
          <StyledCartIcon />
          <CartTitle>My Cart</CartTitle>
        </CartHeader>
        <CartContent>
          <EmptyCart>
            <FiShoppingCart size={48} />
            <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
            <EmptyCartText>Add items to your cart to continue</EmptyCartText>
            <ContinueShoppingButton to="/">Continue Shopping</ContinueShoppingButton>
          </EmptyCart>
        </CartContent>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <StyledCartIcon />
        <CartTitle>My Cart</CartTitle>
      </CartHeader>
      <CartContent>
        <ItemsList>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <div>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                {/* Add quantity controls here */}
              </div>
            </CartItem>
          ))}
        </ItemsList>
        <div className="cart-summary">
          <div className="cart-summary-item">
            <span>Subtotal:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="cart-summary-item">
            <span>Shipping:</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="cart-summary-item total">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </CartContent>
    </CartContainer>
  );
};

export default CartPage;
