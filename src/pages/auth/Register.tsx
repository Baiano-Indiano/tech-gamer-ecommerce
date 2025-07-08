import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAuth } from '../../context/useAuth';
import RegisterForm from '../../components/auth/RegisterForm';
import type { RegisterFormData } from '../../components/auth/RegisterForm';

const ErrorMessage = styled.div`
  color: #991b1b;
  background-color: #fef2f2;
  padding: 1rem 1.25rem 1rem 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  border: 1px solid #fecaca;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  line-height: 1.5;
  
  &::before {
    content: '';
    display: block;
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    background-color: #dc2626;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.125rem;
    position: relative;
    
    &::after {
      content: '!';
      font-weight: 800;
    }
  }
  
  a {
    color: #b91c1c;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
    
    &:hover {
      text-decoration-thickness: 2px;
    }
  }
`;

const Register = () => {
  const { t } = useTranslation(['auth', 'common']);
  const [error, setError] = useState('');
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData: Omit<RegisterFormData, 'confirmPassword'>): Promise<void> => {
    try {
      // Extrai apenas os campos necessários para o registro
      const { name, email, phone = '', cpf = '', birthDate = '', newsletter = false } = formData;
      
      // Registra o usuário com os campos necessários
      await register({
        name,
        email,
        phone,
        cpf,
        birthDate,
        newsletter,
        addresses: [],
        paymentMethods: [],
        avatar: ''
      });
      
      try {
        // Tenta fazer login automaticamente
        await login(email, formData.password);
        // Redireciona para a página inicial após o registro bem-sucedido
        navigate('/');
      } catch (loginError) {
        // Se o login automático falhar, redireciona para a página de login
        console.error('Login automático falhou:', loginError);
        navigate('/login', { 
          state: { 
            email: email, 
            message: t('auth:register.successMessage')
          } 
        });
      }
      
      // O retorno é void, então não precisamos retornar nada
    } catch (err: unknown) {
      let errorMessage = t('auth:errors.generic');
      
      if (err instanceof Error) {
        errorMessage = t(`auth:errors.${err.message}`, { defaultValue: errorMessage });
      }
      console.error('Registration error:', err);
      setError(errorMessage);
      throw new Error(errorMessage); // Lança o erro para ser tratado pelo RegisterForm
    }
  };

  return (
    <RegisterContainer>
      <h1>{t('auth:register.title')}</h1>
      
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      
      <RegisterForm 
        onSubmit={handleSubmit} 
        submitButtonText={t('auth:register.createAccount')}
      />
      
      <LoginLink>
        {t('auth:register.haveAccount')} <a href="/login">{t('auth:register.signIn')}</a>
      </LoginLink>
    </RegisterContainer>
  );
};

export default Register;

// Styled Components
const RegisterContainer = styled.div`
  max-width: 50rem;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.025);
  position: relative;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  
  /* Subtle background pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, #4f46e5, #7c3aed, #a78bfa);
    background-size: 200% 200%;
    animation: gradient 8s ease infinite;
  }
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (min-width: 640px) {
    width: 90%;
    padding: 3rem 2.5rem 4rem;
    margin: 2rem auto 5rem;
    border-radius: 1.75rem;
  }
  
  @media (min-width: 768px) {
    padding: 3.5rem 3rem 4.5rem;
  }
  
  @media (min-width: 1024px) {
    max-width: 56rem;
    padding: 4rem 4.5rem 5rem;
    margin: 3rem auto 6rem;
  }
  
  h1 {
    font-size: 1.875rem;
    font-weight: 800;
    color: #111827;
    margin: 0 0 2rem;
    text-align: center;
    line-height: 1.2;
    letter-spacing: -0.025em;
    background: linear-gradient(90deg, #1e1b4b, #3730a3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    padding-bottom: 1.5rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 4rem;
      height: 0.25rem;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      border-radius: 0.25rem;
    }
    
    @media (min-width: 640px) {
      font-size: 2.25rem;
      margin-bottom: 2.5rem;
    }
    
    @media (min-width: 1024px) {
      font-size: 2.75rem;
      margin-bottom: 3rem;
      padding-bottom: 1.75rem;
      
      &::after {
        width: 5rem;
        height: 0.3rem;
      }
    }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 2.5rem;
  font-size: 0.9375rem;
  color: #6b7280;
  
  a {
    color: #4f46e5;
    font-weight: 600;
    text-decoration: none;
    margin-left: 0.375rem;
    padding: 0.25rem 0.375rem;
    border-radius: 0.375rem;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    
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
    
    &:focus-visible {
      outline: 2px solid #a5b4fc;
      outline-offset: 2px;
      background-color: #f5f3ff;
    }
    
    &:active {
      transform: translateY(1px);
    }
  }
  
  @media (min-width: 640px) {
    font-size: 1.0625rem;
  }
`;
