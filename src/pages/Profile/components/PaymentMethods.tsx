import React, { useState } from 'react';
import { useAuth } from '../../../context/useAuth';
import styled from 'styled-components';
import { FiPlus, FiEdit2, FiTrash2, FiCreditCard, FiCheck } from 'react-icons/fi';
import type { UserPaymentMethod } from '../../../types/user';

export const PaymentMethods: React.FC = () => {
  const { user, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    nickname: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number as user types (add space every 4 digits)
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{4})/g, '$1 ') // Add space every 4 digits
        .trim();
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue,
      }));
      return;
    }

    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/^(\d{2})/, '$1/') // Add slash after MM
        .substr(0, 5); // Limit to MM/YY format
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue,
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Format card number (remove spaces) and expiry date (format as MM/YY) before saving
      const formattedData = {
        ...formData,
        cardNumber: formData.cardNumber.replace(/\s+/g, ''),
        expiryDate: formData.expiryDate,
      };
      
      if (editingId) {
        // In a real app, we would call updatePaymentMethod here
        console.log('Update payment method:', editingId, formattedData);
        setEditingId(null);
      } else {
        await addPaymentMethod(formattedData);
        setIsAdding(false);
      }
      setFormData({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        nickname: '',
      });
    } catch (error) {
      console.error('Failed to save payment method', error);
    }
  };

  const handleEdit = (method: UserPaymentMethod) => {
    setEditingId(method.id);
    setFormData({
      cardNumber: method.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 '), // Add spaces for display
      cardHolder: method.cardHolder,
      expiryDate: method.expiryDate,
      nickname: method.nickname || '',
    });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      nickname: '',
    });
  };

  // Função para formatar número do cartão (mantida para referência)
  // const formatCardNumber = (number: string) => {
  //   return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  // };

  const getCardType = (number: string) => {
    const num = number.replace(/\s+/g, '');
    
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'American Express';
    if (/^3(?:0[0-5]|[68][0-9])/.test(num)) return 'Diners Club';
    if (/^6(?:011|5)/.test(num)) return 'Discover';
    if (/^(?:2131|1800|35)/.test(num)) return 'JCB';
    
    return 'Cartão';
  };

  if (!user) return null;

  return (
    <Container>
      <Header>
        <h2>Métodos de Pagamento</h2>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)}>
            <FiPlus /> Adicionar Cartão
          </Button>
        )}
      </Header>

      {isAdding && (
        <PaymentForm onSubmit={handleSubmit}>
          <h3>{editingId ? 'Editar Cartão' : 'Adicionar Novo Cartão'}</h3>
          
          <FormGroup>
            <Label htmlFor="nickname">Apelido (opcional)</Label>
            <Input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Ex: Cartão Pessoal, Cartão da Empresa"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19} // 16 digits + 3 spaces
              required
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="cardHolder">Nome no Cartão</Label>
              <Input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                placeholder="Como está no cartão"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="expiryDate">Validade</Label>
              <Input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/AA"
                maxLength={5}
                required
              />
            </FormGroup>
          </FormRow>

          <ButtonGroup>
            <Button type="button" $variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" $variant="primary">
              {editingId ? 'Atualizar Cartão' : 'Salvar Cartão'}
            </Button>
          </ButtonGroup>
        </PaymentForm>
      )}

      <PaymentMethodsList>
        {user.paymentMethods.length === 0 ? (
          <EmptyState>
            <FiCreditCard size={48} />
            <h3>Nenhum cartão cadastrado</h3>
            <p>Adicione um cartão para facilitar suas compras</p>
            <Button onClick={() => setIsAdding(true)}>
              <FiPlus /> Adicionar Cartão
            </Button>
          </EmptyState>
        ) : (
          user.paymentMethods.map((method) => (
            <PaymentCard key={method.id} $isDefault={method.isDefault}>
              {method.isDefault && (
                <DefaultBadge>
                  <FiCheck size={14} /> Padrão
                </DefaultBadge>
              )}
              <CardHeader>
                <CardType>{getCardType(method.cardNumber)}</CardType>
                <Actions>
                  <button 
                    onClick={() => handleEdit(method)}
                    aria-label="Editar cartão"
                  >
                    <FiEdit2 />
                  </button>
                  <button 
                    onClick={() => removePaymentMethod(method.id)}
                    aria-label="Remover cartão"
                  >
                    <FiTrash2 />
                  </button>
                </Actions>
              </CardHeader>
              
              <CardNumber>
                •••• •••• •••• {method.cardNumber.slice(-4)}
              </CardNumber>
              
              <CardDetails>
                <div>
                  <Label>Nome no cartão</Label>
                  <p>{method.cardHolder}</p>
                </div>
                <div>
                  <Label>Validade</Label>
                  <p>{method.expiryDate}</p>
                </div>
              </CardDetails>
              
              {method.nickname && (
                <CardNickname>
                  <Label>Apelido</Label>
                  <p>{method.nickname}</p>
                </CardNickname>
              )}
              
              {!method.isDefault && (
                <CardFooter>
                  <Button 
                    $variant="text" 
                    onClick={() => setDefaultPaymentMethod(method.id)}
                  >
                    Definir como padrão
                  </Button>
                </CardFooter>
              )}
            </PaymentCard>
          ))
        )}
      </PaymentMethodsList>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #111827;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'outline' | 'text' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${({ $variant }) => ($variant === 'text' ? '0.25rem 0.5rem' : '0.5rem 1rem')};
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${({ $variant }) => {
    if ($variant === 'outline') return '#d1d5db';
    if ($variant === 'text') return 'transparent';
    return 'transparent';
  }};
  background: ${({ $variant }) => {
    if ($variant === 'primary') return '#2563eb';
    if ($variant === 'text') return 'transparent';
    return '#f3f4f6';
  }};
  color: ${({ $variant }) => {
    if ($variant === 'primary') return '#fff';
    if ($variant === 'text') return '#2563eb';
    return '#4b5563';
  }};

  &:hover {
    background: ${({ $variant }) => {
      if ($variant === 'primary') return '#1d4ed8';
      if ($variant === 'text') return '#eff6ff';
      return '#e5e7eb';
    }};
  }

  svg {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const PaymentForm = styled.form`
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    color: #111827;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  color: #111827;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    outline: none;
    border-color: #93c5fd;
    box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.5);
  }
`;

const PaymentMethodsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const PaymentCard = styled.div<{ $isDefault?: boolean }>`
  position: relative;
  border: 1px solid ${({ $isDefault }) => ($isDefault ? '#2563eb' : '#e5e7eb')};
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: #fff;
  transition: all 0.2s;
  box-shadow: ${({ $isDefault }) => 
    $isDefault ? '0 0 0 1px #2563eb' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'};
`;

const DefaultBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: #dbeafe;
  color: #1e40af;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CardType = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
      color: #1f2937;
      background: #f3f4f6;
    }
  }
`;

const CardNumber = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const CardDetails = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;

  div {
    flex: 1;
  }

  p {
    margin: 0.25rem 0 0;
    color: #4b5563;
    font-size: 0.9375rem;
  }
`;

const CardNickname = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #e5e7eb;

  p {
    margin: 0.25rem 0 0;
    color: #4b5563;
    font-size: 0.9375rem;
  }
`;

const CardFooter = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
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
