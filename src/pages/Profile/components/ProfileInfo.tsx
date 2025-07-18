import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/providers/AuthProvider/useAuth';
import styled from 'styled-components';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { formatDate } from '../../../utils/formatters/date';

export const ProfileInfo: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cpf: user?.cpf || '',
    birthDate: user?.birthDate?.split('T')[0] || '',
    newsletter: user?.newsletter || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        ...formData,
        birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  if (!user) return null;

  return (
    <Container>
      <Header>
        <h2>{t('profile.title')}</h2>
        {isEditing ? (
          <ButtonGroup>
            <Button type="button" $variant="outline" onClick={() => setIsEditing(false)}>
              <FiX /> {t('common.cancel')}
            </Button>
            <Button type="submit" form="profileForm" $variant="primary">
              <FiSave /> {t('common.save')}
            </Button>
          </ButtonGroup>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <FiEdit2 /> {t('common.edit')}
          </Button>
        )}
      </Header>

      <Form id="profileForm" onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">{t('profile.form.name')}</Label>
          {isEditing ? (
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t('profile.form.namePlaceholder')}
            />
          ) : (
            <p>{user.name}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">{t('profile.form.email')}</Label>
          {isEditing ? (
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t('profile.form.emailPlaceholder')}
            />
          ) : (
            <p>{user.email || t('profile.form.notProvided')}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="cpf">{t('profile.form.cpf')}</Label>
          {isEditing ? (
            <Input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder={t('profile.form.cpfPlaceholder')}
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            />
          ) : (
            <p>{user.cpf || t('profile.form.notProvided')}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">{t('profile.form.phone')}</Label>
          {isEditing ? (
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('profile.form.phonePlaceholder')}
            />
          ) : (
            <p>{user.phone || t('profile.form.notProvided')}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="birthDate">{t('profile.form.birthDate')}</Label>
          {isEditing ? (
            <Input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          ) : (
            <p>{user.birthDate ? formatDate(new Date(user.birthDate)) : t('profile.form.notProvided')}</p>
          )}
        </FormGroup>

        <FormGroup>
          <CheckboxContainer>
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Label htmlFor="newsletter">{t('profile.form.newsletter')}</Label>
          </CheckboxContainer>
        </FormGroup>
      </Form>
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
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #111827;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

interface ButtonProps {
  $variant?: 'primary' | 'outline';
}

const Button = styled.button<ButtonProps>`
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

  svg {
    font-size: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  p {
    margin: 0.5rem 0 0;
    color: #374151;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #111827;
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  input[type='checkbox'] {
    width: 1.1rem;
    height: 1.1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    cursor: pointer;
  }
`;
