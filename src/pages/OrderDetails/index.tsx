import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FiArrowLeft, 
  FiPackage, 
  FiTruck, 
  FiCheckCircle, 
  FiXCircle
} from 'react-icons/fi';
import { useAuth } from '../../context/useAuth';
import {
  Container,
  BackButton,
  Header,
  OrderDate,
  StatusBadge,
  Content,
  Section,
  SectionTitle,
  ItemsList,
  Item,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
  ItemSubtotal,
  OrderSummary,
  SummaryRow,
  TrackButton,
  LoadingContainer,
  EmptyState,
  Sidebar,
  InfoCard,
  InfoCardTitle,
  AddressText,
  PaymentInfo,
  TrackingInfo
} from './styles';

// Types
type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';
type PaymentType = 'credit' | 'debit' | 'pix' | 'bank_slip';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface PaymentMethod {
  type: PaymentType;
  lastFourDigits?: string;
  installments?: number;
}

interface ShippingAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Order {
  id: string;
  date: Date;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // TODO: Implement API call to fetch order details
        // const response = await api.get(`/users/${user?.id}/orders/${id}`);
        // setOrder(response.data);
        
        // Mock data temporarily
        setTimeout(() => {
          setOrder({
            id: id || '1',
            date: new Date('2023-06-15'),
            status: 'delivered',
            items: [
              {
                id: 'prod1',
                name: 'PlayStation 5',
                price: 4499.99,
                quantity: 1,
                image: '/images/ps5.jpg',
              },
              {
                id: 'prod2',
                name: 'Controle DualSense - Branco',
                price: 499.99,
                quantity: 2,
                image: '/images/dualsense.jpg',
              },
            ],
            subtotal: 5499.97,
            shipping: 25.99,
            discount: 500.0,
            total: 5025.96,
            shippingAddress: {
              street: 'Rua das Flores',
              number: '123',
              complement: 'Apto 101',
              neighborhood: 'Centro',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01001-000',
            },
            paymentMethod: {
              type: 'credit',
              lastFourDigits: '1234',
              installments: 10,
            },
            trackingNumber: 'BR123456789BR',
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setIsLoading(false);
      }
    };

    if (user && id) {
      fetchOrderDetails();
    }
  }, [user, id]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getPaymentMethodText = (method: PaymentMethod) => {
    switch (method.type) {
      case 'credit':
        return `${t('payment.creditCard')} •••• ${method.lastFourDigits} (${method.installments}x)`;
      case 'debit':
        return `${t('payment.debitCard')} •••• ${method.lastFourDigits}`;
      case 'pix':
        return 'PIX';
      case 'bank_slip':
        return t('payment.bankSlip');
      default:
        return '';
    }
  };

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'processing':
        return 'info';
      case 'shipped':
        return 'warning';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'text';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return <FiPackage />;
      case 'shipped':
        return <FiTruck />;
      case 'delivered':
        return <FiCheckCircle />;
      case 'cancelled':
        return <FiXCircle />;
      default:
        return <FiPackage />;
    }
  };

  if (isLoading) {
    return <LoadingContainer>Carregando detalhes do pedido...</LoadingContainer>;
  }

  if (!order) {
    return <EmptyState>{t('orders.orderNotFound')}</EmptyState>;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <FiArrowLeft /> {t('common.back')}
      </BackButton>

      <Header>
        <div>
          <h1>{t('orders.order')} #{order.id}</h1>
          <OrderDate>{formatDate(order.date)}</OrderDate>
        </div>
        <StatusBadge $color={getStatusColor(order.status)}>
          {getStatusIcon(order.status)}
          {t(`orders.status.${order.status}`)}
        </StatusBadge>
      </Header>

      <Content>
        <Section>
          <SectionTitle>{t('orders.items')}</SectionTitle>
          <ItemsList>
            {order.items.map((item) => (
              <Item key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>
                    {item.quantity} x {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(item.price)}
                  </ItemPrice>
                </ItemDetails>
                <ItemSubtotal>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(item.price * item.quantity)}
                </ItemSubtotal>
              </Item>
            ))}
          </ItemsList>

          <OrderSummary>
            <SummaryRow>
              <span>{t('orders.subtotal')}</span>
              <span>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(order.subtotal)}
              </span>
            </SummaryRow>
            <SummaryRow>
              <span>{t('orders.shipping')}</span>
              <span>
                {order.shipping === 0
                  ? t('orders.free')
                  : new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(order.shipping)}
              </span>
            </SummaryRow>
            {order.discount > 0 && (
              <SummaryRow>
                <span>{t('orders.discount')}</span>
                <span className="discount">
                  - {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(order.discount)}
                </span>
              </SummaryRow>
            )}
            <SummaryRow className="total">
              <span>{t('orders.total')}</span>
              <span>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(order.total)}
              </span>
            </SummaryRow>
          </OrderSummary>
        </Section>

        <Sidebar>
          <InfoCard>
            <InfoCardTitle>{t('orders.shippingAddress')}</InfoCardTitle>
            <AddressText>
              {order.shippingAddress.street}, {order.shippingAddress.number}
              {order.shippingAddress.complement && `, ${order.shippingAddress.complement}`}
              <br />
              {order.shippingAddress.neighborhood}
              <br />
              {order.shippingAddress.city} - {order.shippingAddress.state}
              <br />
              CEP: {order.shippingAddress.zipCode}
            </AddressText>
          </InfoCard>

          <InfoCard>
            <InfoCardTitle>{t('orders.payment')}</InfoCardTitle>
            <PaymentInfo>
              <div>{getPaymentMethodText(order.paymentMethod)}</div>
              <div className="total">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(order.total)}
              </div>
            </PaymentInfo>
          </InfoCard>

          {order.trackingNumber && (
            <InfoCard>
              <InfoCardTitle>{t('orders.tracking')}</InfoCardTitle>
              <TrackingInfo>
                <div>{t('orders.trackingNumber')}: {order.trackingNumber}</div>
                <TrackButton>{t('orders.trackOrder')}</TrackButton>
              </TrackingInfo>
            </InfoCard>
          )}
        </Sidebar>
      </Content>
    </Container>
  );
};

export default OrderDetailsPage;
