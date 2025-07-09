import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/useAuth';
import { Button } from '../../components/buttons';
import { Input, PasswordStrengthMeter } from '../../components/forms/input';
import { FormContainer, FormTitle, Form as StyledForm, FormGroup, ErrorMessage } from '../Login/styles';
import { registerSchema } from '../../schemas/auth.schema';

type RegisterFormData = yup.InferType<typeof registerSchema>;

// Função auxiliar para calcular a força da senha
function calculatePasswordStrength(password: string): number {
  if (!password) return 0;
  
  let strength = 0;
  
  // Comprimento mínimo
  if (password.length >= 8) strength++;
  
  // Contém letras minúsculas e maiúsculas
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  
  // Contém números
  if (/[0-9]/.test(password)) strength++;
  
  // Contém caracteres especiais
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  return Math.min(strength, 4);
}

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { t } = useTranslation(['auth', 'common']);
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setSubmitError('');
    setIsLoading(true);

    try {
      await registerAuth({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: '',
        cpf: '',
        birthDate: '',
        newsletter: false,
        avatar: '',
        addresses: [],
        paymentMethods: []
      });
      
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError(t('errors.generic'));
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormTitle>{t('register.title')}</FormTitle>
        
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
        
        <FormGroup>
          <label htmlFor="name">{t('register.name')}</label>
          <Input
            id="name"
            type="text"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="email">{t('register.email')}</label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="password">{t('register.password')}</label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          <PasswordStrengthMeter strength={calculatePasswordStrength(password)} />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="confirmPassword">{t('register.confirmPassword')}</label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </FormGroup>
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('common:loading') : t('register.createAccount')}
        </Button>
        
        <p>
          {t('register.haveAccount')}{' '}
          <Link to="/login">{t('register.signIn')}</Link>
        </p>
      </StyledForm>
    </FormContainer>
  );
};

export default Register;
