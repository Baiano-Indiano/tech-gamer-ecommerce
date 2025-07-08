import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUser, FiMail, FiPhone, FiLock, FiCheck } from 'react-icons/fi';
import styled from 'styled-components';
import Input from '../Input/Input';
import { InputGroup } from '../Input';
import { validateCPF, validateEmail } from '../../utils/formatters';

// Tipos para os dados do formulário
export interface RegisterFormData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
  acceptTerms?: boolean;
}

type FormField = keyof RegisterFormData;

// Styled components
const StyledButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  padding: 1.125rem;
  font-size: 1.125rem;
  font-weight: 600;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #4338ca 0%, #4f46e5 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3), 0 4px 6px -2px rgba(79, 70, 229, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2), 0 2px 4px -1px rgba(79, 70, 229, 0.1);
  }
  
  &:focus-visible {
    outline: 2px solid #818cf8;
    outline-offset: 2px;
  }
  
  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &::before {
      display: none;
    }
  }
  
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0.25rem;
  
  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;
    
    & > * {
      flex: 1;
      min-width: 0; /* Prevents flex items from overflowing their container */
    }
  }
  
  /* Add some spacing between stacked form rows */
  & + & {
    margin-top: 0.25rem;
    
    @media (min-width: 768px) {
      margin-top: 0;
    }
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  margin: 0.5rem 0 0;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  font-size: 0.9375rem;
  color: #374151;
  line-height: 1.6;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
    transform: translateY(-1px);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
  
  input[type="checkbox"] {
    flex-shrink: 0;
    margin-top: 0.125rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.5rem;
    border: 2px solid #d1d5db;
    background-color: white;
    appearance: none;
    cursor: pointer;
    position: relative;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::before {
      content: '';
      position: absolute;
      width: 0.75rem;
      height: 0.75rem;
      background-color: white;
      border-radius: 0.25rem;
      transform: scale(0);
      transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &:checked {
      background-color: #4f46e5;
      border-color: #4f46e5;
      
      &::before {
        transform: scale(1);
      }
      
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -60%) rotate(45deg) scale(1);
        opacity: 0;
        animation: checkmark-appear 0.2s ease-out 0.1s forwards;
      }
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
      border-color: #4f46e5;
    }
    
    @keyframes checkmark-appear {
      0% {
        opacity: 0;
        transform: translate(-50%, -60%) rotate(45deg) scale(0.5);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -60%) rotate(45deg) scale(1);
      }
    }
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 2.5rem 2rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%);
  border: 1px solid #bbf7d0;
  border-radius: 1rem;
  color: #166534;
  margin: 1.5rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #22c55e, #10b981);
  }
  
  svg {
    margin-bottom: 1.25rem;
    color: #16a34a;
    width: 4rem;
    height: 4rem;
    background-color: #dcfce7;
    border-radius: 50%;
    padding: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.1), 0 4px 6px -2px rgba(34, 197, 94, 0.05);
    position: relative;
    z-index: 1;
    border: 2px solid #86efac;
  }
  
  h3 {
    margin: 0.75rem 0 0.5rem;
    font-size: 1.625rem;
    font-weight: 700;
    line-height: 1.25;
    color: #14532d;
    position: relative;
    z-index: 1;
  }
  
  p {
    margin: 0;
    color: #166534;
    font-size: 1.0625rem;
    line-height: 1.6;
    max-width: 36rem;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    opacity: 0.95;
  }
  
  /* Animate the success checkmark */
  @keyframes checkmark-scale {
    0% { transform: scale(0); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  svg {
    animation: checkmark-scale 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9375rem;
  color: #6b7280;
  
  button {
    background: none;
    border: none;
    color: #4f46e5;
    font-weight: 600;
    cursor: pointer;
    padding: 0.25rem 0.375rem;
    margin-left: 0.375rem;
    border-radius: 0.375rem;
    position: relative;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0.375rem;
      right: 0.375rem;
      height: 2px;
      background-color: #c7d2fe;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    &:hover {
      color: #4338ca;
      text-decoration: none;
      background-color: #f5f3ff;
      
      &::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
    
    &:active {
      transform: translateY(1px);
    }
    
    &:focus-visible {
      outline: 2px solid #a5b4fc;
      outline-offset: 2px;
      background-color: #f5f3ff;
    }
  }
`;



interface RegisterFormProps {
  onSubmit: (data: Omit<RegisterFormData, 'confirmPassword'>) => Promise<void>;
  isLoading?: boolean;
  initialValues?: Partial<RegisterFormData>;
  submitButtonText?: string;
  showLoginLink?: boolean;
  onLoginClick?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  initialValues = {},
  submitButtonText = 'Criar conta',
  showLoginLink = true,
  onLoginClick,
}) => {
  const { t } = useTranslation(['auth', 'common']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    ...initialValues,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  
  // Funções auxiliares para obter as traduções
  const getLabel = useCallback((key: FormField): string => t(`auth:register.${key}`), [t]);
  
  const getPlaceholder = useCallback((key: FormField): string => {
    return t(`auth:register.${key}Placeholder`);
  }, [t]);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error for the field being edited
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);
  
  const validateField = useCallback((name: string, value: string): string => {
    if (!value && name !== 'newsletter') return t('auth:errors.requiredField');
    
    switch (name) {
      case 'email':
        return !validateEmail(value) ? t('auth:errors.invalidEmail') : '';
      case 'cpf':
        return value && !validateCPF(value) ? t('auth:errors.invalidCPF') : '';
      case 'phone':
        return value && value.replace(/\D/g, '').length < 10 ? t('auth:errors.invalidPhone') : '';
      case 'password':
        return value.length < 8 ? t('auth:errors.passwordTooShort') : '';
      case 'confirmPassword':
        return value !== formData.password ? t('auth:errors.passwordMismatch') : '';
      default:
        return '';
    }
  }, [formData.password, t]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};
    let isValid = true;

    // Validate name
    const nameError = validateField('name', formData.name);
    if (nameError) {
      newErrors.name = nameError;
      isValid = false;
    }

    // Validate email
    const emailError = validateField('email', formData.email);
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }

    // Validate CPF if provided
    if (formData.cpf) {
      const cpfError = validateField('cpf', formData.cpf);
      if (cpfError) {
        newErrors.cpf = cpfError;
        isValid = false;
      }
    }

    // Validate password
    const passwordError = validateField('password', formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    // Validate password confirmation
    const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);
    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Remove password confirmation before submitting
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...submitData } = formData;
      
      await onSubmit(submitData);
      setSubmitSuccess(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitSuccess(false);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {submitSuccess ? (
        <SuccessMessage>
          <FiCheck size={32} />
          <h3>{t('auth:register.successTitle')}</h3>
          <p>{t('auth:register.successMessage')}</p>
        </SuccessMessage>
      ) : (
        <>
          <FormRow>
            <InputGroup
              label={getLabel('name')}
              startIcon={<FiUser />}
              error={errors.name}
              required
            >
              <Input
                label=""
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={getPlaceholder('name')}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
          </FormRow>
          
          <FormRow>
            <InputGroup
              label={getLabel('email')}
              startIcon={<FiMail />}
              error={errors.email}
              required
            >
              <Input
                label=""
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={getPlaceholder('email')}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
          </FormRow>
          
          <FormRow>
            <InputGroup
              label={getLabel('cpf')}
              error={errors.cpf}
            >
              <Input
                label=""
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder={getPlaceholder('cpf')}
                maxLength={14}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
            
            <InputGroup
              label={getLabel('birthDate')}
            >
              <Input
                label=""
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleInputChange}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
          </FormRow>
          
          <FormRow>
            <InputGroup
              label={getLabel('phone')}
              startIcon={<FiPhone />}
            >
              <Input
                label=""
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={getPlaceholder('phone')}
                maxLength={15}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
          </FormRow>
          
          <FormRow>
            <InputGroup
              label={getLabel('password')}
              startIcon={<FiLock />}
              error={errors.password}
              required
            >
              <Input
                label=""
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={getPlaceholder('password')}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
            
            <InputGroup
              label={getLabel('confirmPassword')}
              startIcon={<FiLock />}
              error={errors.confirmPassword}
              required
            >
              <Input
                label=""
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={getPlaceholder('confirmPassword')}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
          </FormRow>
          
          <CheckboxContainer>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
              disabled={isLoading || isSubmitting}
            />
            <span>{t('register.newsletter')}</span>
          </CheckboxContainer>
          
          <StyledButton 
            type="submit"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? t('common:loading') : submitButtonText}
          </StyledButton>
          
          {showLoginLink && onLoginClick && (
            <LoginLink>
              {t('auth:register.haveAccount')}{' '}
              <button type="button" onClick={onLoginClick}>
                {t('auth:register.signIn')}
              </button>
            </LoginLink>
          )}
        </>
      )}
    </Form>
  );
};

export default RegisterForm;
