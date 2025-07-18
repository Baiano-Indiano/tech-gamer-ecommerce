import React from 'react';
import { useAuth } from '../../../context/providers/AuthProvider/useAuth';
import styled from 'styled-components';
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock, FiDollarSign } from 'react-icons/fi';
import { formatCurrency } from '../../../utils/formatters/currency';
import { formatDate } from '../../../utils/formatters/date';

export const Orders: React.FC = () => {
  const { user } = useAuth();

  // Mock data - in a real app, this would come from an API
  const mockOrders = [
    {
      id: 'ORD-2023-001',
      date: '2023-06-15T14:30:00Z',
      status: 'delivered',
      total: 5249.99,
      items: [
        {
          id: '1',
          name: 'PlayStation 5',
          price: 4499.99,
          quantity: 1,
          image: 'https://via.placeholder.com/80',
        },
        {
          id: '2',
          name: 'Controle DualSense - Branco',
          price: 499.99,
          quantity: 1,
          image: 'https://via.placeholder.com/80',
        },
        {
          id: '3',
          name: 'Jogo Horizon Forbidden West',
          price: 249.99,
          quantity: 1,
          image: 'https://via.placeholder.com/80',
        },
      ],
      shippingAddress: {
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01001-000',
      },
      paymentMethod: {
        cardNumber: '•••• •••• •••• 1234',
        cardType: 'Visa',
      },
    },
    {
      id: 'ORD-2023-002',
      date: '2023-06-10T09:15:00Z',
      status: 'shipped',
      total: 1299.99,
      items: [
        {
          id: '4',
          name: 'Nintendo Switch - Azul e Vermelho',
          price: 2499.99,
          quantity: 1,
          image: 'https://via.placeholder.com/80',
        },
      ],
      trackingNumber: 'BR123456789BR',
      shippingAddress: {
        street: 'Avenida Paulista',
        number: '1000',
        complement: 'Apto 101',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100',
      },
      paymentMethod: {
        cardNumber: '•••• •••• •••• 5678',
        cardType: 'Mastercard',
      },
    },
    {
      id: 'ORD-2023-003',
      date: '2023-06-05T16:45:00Z',
      status: 'processing',
      total: 349.99,
      items: [
        {
          id: '5',
          name: 'Jogo The Legend of Zelda: Tears of the Kingdom',
          price: 349.99,
          quantity: 1,
          image: 'https://via.placeholder.com/80',
        },
      ],
      shippingAddress: {
        street: 'Rua Augusta',
        number: '500',
        neighborhood: 'Consolação',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01304-000',
      },
      paymentMethod: {
        cardNumber: '•••• •••• •••• 9012',
        cardType: 'Visa',
      },
    },
  ];

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          text: 'Entregue',
          icon: <FiCheckCircle />,
          color: '#10b981', // green-500
          bgColor: '#ecfdf5', // green-50
        };
      case 'shipped':
        return {
          text: 'Enviado',
          icon: <FiTruck />,
          color: '#3b82f6', // blue-500
          bgColor: '#eff6ff', // blue-50
        };
      case 'processing':
        return {
          text: 'Processando',
          icon: <FiClock />,
          color: '#f59e0b', // amber-500
          bgColor: '#fffbeb', // amber-50
        };
      case 'cancelled':
        return {
          text: 'Cancelado',
          icon: <FiXCircle />,
          color: '#ef4444', // red-500
          bgColor: '#fef2f2', // red-50
        };
      default:
        return {
          text: 'Pendente',
          icon: <FiClock />,
          color: '#6b7280', // gray-500
          bgColor: '#f9fafb', // gray-50
        };
    }
  };

  // Usando a função formatDate do módulo de utilitários

  // Usando a função formatCurrency do módulo de utilitários

  if (!user) return null;

  return (
    <Container>
      <Header>
        <h2>Meus Pedidos</h2>
      </Header>

      {mockOrders.length === 0 ? (
        <EmptyState>
          <FiPackage size={48} />
          <h3>Nenhum pedido encontrado</h3>
          <p>Você ainda não fez nenhum pedido em nossa loja.</p>
          <Button onClick={() => window.location.href = '/produtos'}>
            Ver Produtos
          </Button>
        </EmptyState>
      ) : (
        <OrdersList>
          {mockOrders.map((order) => {
            const status = getStatusDetails(order.status);
            
            return (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <div>
                    <OrderId>Pedido #{order.id}</OrderId>
                    <OrderDate>{formatDate(order.date)}</OrderDate>
                  </div>
                  <StatusBadge $color={status.color} $bgColor={status.bgColor}>
                    {status.icon}
                    <span>{status.text}</span>
                  </StatusBadge>
                </OrderHeader>

                <OrderItems>
                  {order.items.map((item) => (
                    <OrderItem key={`${order.id}-${item.id}`}>
                      <ItemImage>
                        <img src={item.image} alt={item.name} />
                      </ItemImage>
                      <ItemDetails>
                        <ItemName>{item.name}</ItemName>
                        <ItemQuantity>Quantidade: {item.quantity}</ItemQuantity>
                        <ItemPrice>{formatCurrency(item.price)}</ItemPrice>
                      </ItemDetails>
                    </OrderItem>
                  ))}
                </OrderItems>

                <OrderFooter>
                  <OrderTotal>
                    <FiDollarSign size={18} />
                    <span>Total: <strong>{formatCurrency(order.total)}</strong></span>
                  </OrderTotal>
                  
                  <OrderActions>
                    <Button $variant="outline" onClick={() => {
                      // In a real app, this would open the order details
                      console.log('View order details:', order.id);
                    }}>
                      Ver Detalhes
                    </Button>
                    
                    {order.status === 'delivered' && (
                      <Button $variant="outline" onClick={() => {
                        // In a real app, this would track the order
                        console.log('Track order:', order.id);
                      }}>
                        Acompanhar Pedido
                      </Button>
                    )}
                    
                    {order.status === 'delivered' && (
                      <Button $variant="outline" onClick={() => {
                        // In a real app, this would open the return form
                        console.log('Return order:', order.id);
                      }}>
                        Trocar/Devolver
                      </Button>
                    )}
                  </OrderActions>
                </OrderFooter>
              </OrderCard>
            );
          })}
        </OrdersList>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background: #fff;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #111827;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${({ $variant }) => ($variant === 'outline' ? '#d1d5db' : 'transparent')};
  background: ${({ $variant }) => ($variant === 'primary' ? '#2563eb' : 'transparent')};
  color: ${({ $variant }) => ($variant === 'primary' ? '#fff' : '#4b5563')};

  &:hover {
    background: ${({ $variant }) => ($variant === 'primary' ? '#1d4ed8' : '#f3f4f6')};
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

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const OrderId = styled.span`
  font-weight: 600;
  color: #111827;
`;

const OrderDate = styled.span`
  display: block;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const StatusBadge = styled.div<{ $color: string; $bgColor: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ $color }) => $color};
  background-color: ${({ $bgColor }) => $bgColor};
  border: 1px solid ${({ $color }) => `${$color}40`};

  svg {
    font-size: 1rem;
  }
`;

const OrderItems = styled.div`
  padding: 1rem 0;
`;

const OrderItem = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  gap: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 0.375rem;
  overflow: hidden;
  background-color: #f3f4f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
`;

const ItemQuantity = styled.p`
  margin: 0 0 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ItemPrice = styled.p`
  margin: 0;
  font-weight: 600;
  color: #111827;
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
`;

const OrderTotal = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;

  svg {
    color: #10b981;
  }
`;

const OrderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;
