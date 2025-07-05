import React, { useState } from 'react';
import { useAuth } from '../../../context/useAuth';
import styled from 'styled-components';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiMapPin } from 'react-icons/fi';
import type { UserAddress } from '../../../types/user';

export const Addresses: React.FC = () => {
  const { user, addAddress, updateAddress, removeAddress, setDefaultAddress } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    nickname: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAddress(editingId, formData);
        setEditingId(null);
      } else {
        await addAddress(formData);
        setIsAdding(false);
      }
      setFormData({
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
        nickname: '',
      });
    } catch (error) {
      console.error('Failed to save address', error);
    }
  };

  const handleEdit = (address: UserAddress) => {
    setEditingId(address.id);
    setFormData({
      street: address.street,
      number: address.number,
      complement: address.complement || '',
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      nickname: address.nickname || '',
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      nickname: '',
    });
  };

  if (!user) return null;

  return (
    <Container>
      <Header>
        <h2>Meus Endereços</h2>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)}>
            <FiPlus /> Adicionar Endereço
          </Button>
        )}
      </Header>

      {(isAdding || editingId) && (
        <AddressForm onSubmit={handleSubmit}>
          <h3>{editingId ? 'Editar Endereço' : 'Novo Endereço'}</h3>
          <FormRow>
            <FormGroup>
              <Label htmlFor="nickname">Apelido (opcional)</Label>
              <Input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Ex: Casa, Trabalho"
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                placeholder="00000-000"
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup style={{ flex: 2 }}>
              <Label htmlFor="street">Rua</Label>
              <Input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="number">Número</Label>
              <Input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>


          <FormRow>
            <FormGroup>
              <Label htmlFor="complement">Complemento (opcional)</Label>
              <Input
                type="text"
                id="complement"
                name="complement"
                value={formData.complement}
                onChange={handleChange}
                placeholder="Apto, bloco, etc."
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                type="text"
                id="neighborhood"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup style={{ flex: 2 }}>
              <Label htmlFor="city">Cidade</Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="state">Estado</Label>
              <Input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                maxLength={2}
                placeholder="SP"
                style={{ textTransform: 'uppercase' }}
              />
            </FormGroup>
          </FormRow>

          <ButtonGroup>
            <Button type="button" $variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" $variant="primary">
              {editingId ? 'Atualizar Endereço' : 'Salvar Endereço'}
            </Button>
          </ButtonGroup>
        </AddressForm>
      )}

      {!isAdding && !editingId && (
        <AddressesList>
          {user.addresses.length === 0 ? (
            <EmptyState>
              <FiMapPin size={48} />
              <h3>Nenhum endereço cadastrado</h3>
              <p>Adicione um endereço para facilitar suas compras</p>
              <Button onClick={() => setIsAdding(true)}>
                <FiPlus /> Adicionar Endereço
              </Button>
            </EmptyState>
          ) : (
            user.addresses.map((address) => (
              <AddressCard key={address.id} $isDefault={address.isDefault}>
                {address.isDefault && (
                  <DefaultBadge>
                    <FiCheck size={14} /> Padrão
                  </DefaultBadge>
                )}
                <AddressHeader>
                  <h3>
                    {address.nickname || 'Endereço'} 
                    {address.isDefault && '(Padrão)'}
                  </h3>
                  <Actions>
                    <button 
                      onClick={() => handleEdit(address)}
                      aria-label="Editar endereço"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      onClick={() => removeAddress(address.id)}
                      aria-label="Remover endereço"
                    >
                      <FiTrash2 />
                    </button>
                  </Actions>
                </AddressHeader>
                <AddressContent>
                  <p>{address.street}, {address.number}</p>
                  {address.complement && <p>{address.complement}</p>}
                  <p>{address.neighborhood}</p>
                  <p>{address.city} - {address.state}</p>
                  <p>CEP: {address.zipCode}</p>
                </AddressContent>
                {!address.isDefault && (
                  <AddressFooter>
                    <Button 
                      $variant="text" 
                      onClick={() => setDefaultAddress(address.id)}
                    >
                      Definir como padrão
                    </Button>
                  </AddressFooter>
                )}
              </AddressCard>
            ))
          )}
        </AddressesList>
      )}
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

const AddressForm = styled.form`
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

const FormGroup = styled.div<{ flex?: number }>`
  flex: ${({ flex }) => flex || 1};
  margin-bottom: 0.5rem;
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

const AddressesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const AddressCard = styled.div<{ $isDefault?: boolean }>`
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

const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;

  h3 {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    color: #111827;
  }
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

const AddressContent = styled.div`
  p {
    margin: 0 0 0.25rem;
    color: #4b5563;
    font-size: 0.9375rem;
    line-height: 1.5;
  }
`;

const AddressFooter = styled.div`
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
