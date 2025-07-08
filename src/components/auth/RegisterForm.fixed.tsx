import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUser, FiMail, FiPhone, FiLock, FiCheck } from 'react-icons/fi';
import styled from 'styled-components';
import Input from '../Input/Input';
import { InputGroup } from '../Input';
import { validateCPF, validateEmail } from '../../utils/formatters';

// Styled components
const StyledButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  
  &:hover {
    background-color: #1d4ed8;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    
    & > * {
      flex: 1;
    }
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.5rem;
  cursor: pointer;
  font-size: 0.9375rem;
  color: #4b5563;
  line-height: 1.5;
  
  input[type="checkbox"] {
    margin-top: 0.25rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.25rem;
    border: 1px solid #d1d5db;
    accent-color: #4f46e5;
    cursor: pointer;
    
    &:focus {
      outline: 2px solid #4f46e5;
      outline-offset: 2px;
    }
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f0fdf4;
  border-radius: 0.5rem;
  color: #166534;
  
  svg {
    margin-bottom: 1rem;
    color: #22c55e;
  }
  
  h3 {
    margin: 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: #166534;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9375rem;
  color: #4b5563;
  
  button {
    background: none;
    border: none;
    color: #2563eb;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    margin-left: 0.25rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
}

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
  const { t } = useTranslation();
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
  
  const fieldLabels = {
    name: t('auth.register.name'),
    email: t('auth.register.email'),
    phone: t('auth.register.phone'),
    cpf: t('auth.register.cpf'),
    birthDate: t('auth.register.birthDate'),
    password: t('auth.register.password'),
    confirmPassword: t('auth.register.confirmPassword'),
  };
  
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
    if (!value && name !== 'newsletter') return t('auth.errors.requiredField');
    
    switch (name) {
      case 'email':
        return !validateEmail(value) ? t('auth.errors.invalidEmail') : '';
      case 'cpf':
        return value && !validateCPF(value) ? t('auth.errors.invalidCPF') : '';
      case 'phone':
        return value && value.replace(/\D/g, '').length < 10 ? t('auth.errors.invalidPhone') : '';
      case 'password':
        return value.length < 8 ? t('auth.errors.passwordTooShort') : '';
      case 'confirmPassword':
        return value !== formData.password ? t('auth.errors.passwordMismatch') : '';
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
          <h3>{t('auth.register.successTitle')}</h3>
          <p>{t('auth.register.successMessage')}</p>
        </SuccessMessage>
      ) : (
        <>
          <FormRow>
            <InputGroup
              label={fieldLabels.name}
              startIcon={<FiUser />}
              error={errors.name}
              required
            >
              <Input
                label=""
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('auth.register.namePlaceholder')}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
          </FormRow>
          
          <FormRow>
            <InputGroup
              label={fieldLabels.email}
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
                placeholder={t('auth.register.emailPlaceholder')}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
          </FormRow>
          
          <FormRow>
            <InputGroup
              label={fieldLabels.cpf}
              error={errors.cpf}
            >
              <Input
                label=""
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder={t('auth.register.cpfPlaceholder')}
                maxLength={14}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
            
            <InputGroup
              label={fieldLabels.birthDate}
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
              label={fieldLabels.phone}
              startIcon={<FiPhone />}
            >
              <Input
                label=""
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t('auth.register.phonePlaceholder')}
                maxLength={15}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
          </FormRow>
          
          <FormRow>
            <InputGroup
              label={fieldLabels.password}
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
                placeholder={t('auth.register.passwordPlaceholder')}
                disabled={isLoading || isSubmitting}
              />
            </InputGroup>
            
            <InputGroup
              label={fieldLabels.confirmPassword}
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
                placeholder={t('auth.register.confirmPasswordPlaceholder')}
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
            <span>{t('auth.register.newsletter')}</span>
          </CheckboxContainer>
          
          <StyledButton 
            type="submit"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? t('common.loading') : submitButtonText}
          </StyledButton>
          
          {showLoginLink && onLoginClick && (
            <LoginLink>
              {t('auth.register.haveAccount')}{' '}
              <button type="button" onClick={onLoginClick}>
                {t('auth.register.loginLink')}
              </button>
            </LoginLink>
          )}
        </>
      )}
    </Form>
  );
};

export default RegisterForm;
