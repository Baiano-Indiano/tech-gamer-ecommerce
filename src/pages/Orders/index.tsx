import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/formatters/date';
import styled from 'styled-components';
import type { Order } from '../../types/order';

const OrdersPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento dos pedidos
    const fetchOrders = async () => {
      try {
        // TODO: Implementar chamada à API para buscar os pedidos do usuário
        // const response = await api.get(`/users/${user?.id}/orders`);
        // setOrders(response.data);
        
        // Dados mockados temporariamente
        setTimeout(() => {
          setOrders([
            {
              id: '1',
              date: new Date('2023-06-15'),
              status: 'delivered',
              total: 2499.99,
              items: [
                {
                  id: 'item1',
                  name: 'Product 1',
                  price: 1299.99,
                  quantity: 1,
                  image: '',
                },
                {
                  id: 'item2',
                  name: 'Product 2',
                  price: 1200.00,
                  quantity: 1,
                  image: '',
                }
              ],
              subtotal: 2499.99,
              shipping: 0,
              discount: 0,
              shippingAddress: {
                street: 'Rua Exemplo',
                number: '123',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '01001000'
              },
              paymentMethod: {
                type: 'credit',
                lastFourDigits: '1234',
                installments: 1
              },
              trackingNumber: 'BR123456789BR',
            },
            {
              id: '2',
              date: new Date('2023-05-22'),
              status: 'shipped',
              total: 1299.99,
              items: [
                {
                  id: 'item3',
                  name: 'Product 3',
                  price: 1299.99,
                  quantity: 1,
                  image: '',
                }
              ],
              subtotal: 1299.99,
              shipping: 0,
              discount: 0,
              shippingAddress: {
                street: 'Rua Exemplo',
                number: '123',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '01001000'
              },
              paymentMethod: {
                type: 'credit',
                lastFourDigits: '1234',
                installments: 1
              },
              trackingNumber: 'BR987654321BR',
            },
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return t('orders.status.processing');
      case 'shipped':
        return t('orders.status.shipped');
      case 'delivered':
        return t('orders.status.delivered');
      case 'cancelled':
        return t('orders.status.cancelled');
      default:
        return status;
    }
  };

  // Usando a função formatDate do módulo de utilitários

  if (isLoading) {
    return <LoadingContainer>Carregando pedidos...</LoadingContainer>;
  }

  if (orders.length === 0) {
    return <EmptyState>{t('orders.empty')}</EmptyState>;
  }

  return (
    <Container>
      <h1>{t('orders.title')}</h1>
      <OrdersList>
        {orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <OrderInfo>
                <span>{t('orders.order')} #{order.id}</span>
                <span>{formatDate(order.date)}</span>
              </OrderInfo>
              <OrderStatus status={order.status}>
                {getStatusText(order.status)}
              </OrderStatus>
            </OrderHeader>
            <OrderDetails>
              <div>
                {order.items.length} {order.items.length === 1 ? t('orders.item') : t('orders.items')}
              </div>
              <OrderTotal>
                {t('orders.total')}: {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(order.total)}
              </OrderTotal>
            </OrderDetails>
            <OrderActions>
              <button>{t('orders.viewDetails')}</button>
              {order.status === 'delivered' && (
                <button>{t('orders.trackOrder')}</button>
              )}
            </OrderActions>
          </OrderCard>
        ))}
      </OrdersList>
    </Container>
  );
};

export default OrdersPage;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  h1 {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const OrdersList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  span:first-child {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
  
  span:last-child {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const OrderStatus = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${({ status, theme }) => {
    switch (status) {
      case 'processing':
        return `
          background-color: ${theme.colors.warningLight};
          color: ${theme.colors.warning};
        `;
      case 'shipped':
        return `
          background-color: ${theme.colors.infoLight};
          color: ${theme.colors.info};
        `;
      case 'delivered':
        return `
          background-color: ${theme.colors.successLight};
          color: ${theme.colors.success};
        `;
      case 'cancelled':
        return `
          background-color: ${theme.colors.errorLight};
          color: ${theme.colors.error};
        `;
      default:
        return `
          background-color: ${theme.colors.gray100};
          color: ${theme.colors.gray700};
        `;
    }
  }}
`;

const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const OrderTotal = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const OrderActions = styled.div`
  display: flex;
  gap: 1rem;
  
  button {
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }
    
    &:last-child {
      border-color: ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.text};
      
      &:hover {
        background: ${({ theme }) => theme.colors.background};
        border-color: ${({ theme }) => theme.colors.text};
      }
    }
  }
`;
