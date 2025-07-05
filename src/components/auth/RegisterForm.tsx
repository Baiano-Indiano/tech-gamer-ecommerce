import React, { useState, useCallback } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiCheck } from 'react-icons/fi';
import Input from '../Input/Input';
import { InputGroup } from '../Input';
import Button from '../ui/Button/Button';
import { formatCPF, formatPhone, validateCPF, validateEmail } from '../../utils/formatters';
import styled from 'styled-components';
// O tema estendido já está configurado no arquivo de tipos

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 480px;
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
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[700]};
  
  input[type="checkbox"] {
    margin-top: 0.25rem;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Error message is now handled by InputGroup

interface ThemeColors {
  primary?: string;
  [key: string]: unknown;
}

const SuccessMessage = styled.div`
  color: ${({ theme }) => (theme.colors as ThemeColors).primary || '#4f46e5'};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  
  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    margin-left: 0.25rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  initialValues = {},
  submitButtonText = 'Criar conta',
  showLoginLink = true,
  onLoginClick,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: initialValues.name || '',
    email: initialValues.email || '',
    phone: initialValues.phone || '',
    cpf: initialValues.cpf || '',
    birthDate: initialValues.birthDate || new Date().toISOString().split('T')[0],
    password: initialValues.password || '',
    confirmPassword: initialValues.confirmPassword || '',
    newsletter: initialValues.newsletter || false,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Função para formatar valores enquanto o usuário digita
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Aplica formatação específica para CPF e telefone
    let formattedValue = value;
    
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue,
    }));
    
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);
  
  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório';
      isValid = false;
    }
    
    if (!formData.email) {
      newErrors.email = 'O email é obrigatório';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido';
      isValid = false;
    }
    
    if (formData.cpf && !validateCPF(formData.cpf.replace(/\D/g, ''))) {
      newErrors.cpf = 'CPF inválido';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'A senha é obrigatória';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
      isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Remove a confirmação de senha antes de enviar
      // Remove confirmPassword antes de enviar
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...submitData } = formData;
      
      await onSubmit(submitData);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      // O erro específico pode ser tratado pelo componente pai
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (submitSuccess) {
    return (
      <div>
        <SuccessMessage>
          <FiCheck size={20} />
          Cadastro realizado com sucesso! Verifique seu email para confirmar sua conta.
        </SuccessMessage>
        {showLoginLink && onLoginClick && (
          <LoginLink>
            Já confirmou seu email? <button type="button" onClick={onLoginClick}>Fazer login</button>
          </LoginLink>
        )}
      </div>
    );
  }
  
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormRow>
        <InputGroup
          label="Nome completo"
          startIcon={<FiUser />}
          error={errors.name}
          required
        >
          <Input
            label=""
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Digite seu nome completo"
            disabled={isLoading || isSubmitting}
          />
        </InputGroup>
      </FormRow>
      
      <FormRow>
        <InputGroup
          label="Email"
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
            placeholder="seu@email.com"
            disabled={isLoading || isSubmitting}
          />
        </InputGroup>
      </FormRow>
      
      <FormRow>
        <InputGroup
          label="CPF"
          error={errors.cpf}
        >
          <Input
            label=""
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            placeholder="000.000.000-00"
            maxLength={14}
            disabled={isLoading || isSubmitting}
          />
        </InputGroup>
        
        <InputGroup
          label="Data de Nascimento"
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
          label="Telefone"
          startIcon={<FiPhone />}
        >
          <Input
            label=""
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(00) 00000-0000"
            maxLength={15}
            disabled={isLoading || isSubmitting}
          />
        </InputGroup>
      </FormRow>
      
      <FormRow>
        <InputGroup
          label="Senha"
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
            placeholder="Digite sua senha"
            disabled={isLoading || isSubmitting}
          />
        </InputGroup>
        
        <InputGroup
          label="Confirme sua senha"
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
            placeholder="Confirme sua senha"
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
        <span>Desejo receber ofertas e novidades por email</span>
      </CheckboxContainer>
      
      <Button 
        type="submit" 
        variant="primary"
        size="lg"
        fullWidth
        disabled={isLoading || isSubmitting}
        isLoading={isSubmitting}
      >
        {isSubmitting ? 'Criando conta...' : submitButtonText}
      </Button>
      
      {showLoginLink && onLoginClick && (
        <LoginLink>
          Já tem uma conta? <button type="button" onClick={onLoginClick}>Faça login</button>
        </LoginLink>
      )}
    </Form>
  );
};

export default RegisterForm;
