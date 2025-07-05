import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/useAuth';
import { FiAlertCircle } from 'react-icons/fi';
import { RegisterForm } from '../../components/auth/RegisterForm';
import type { RegisterFormData } from '../../components/auth/RegisterForm';

const Register = () => {
  const [error, setError] = useState('');
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData: Omit<RegisterFormData, 'confirmPassword'>): Promise<void> => {
    try {
      // Cria o objeto de usuário com os dados fornecidos
      // Extrai os dados do formulário, removendo a confirmação de senha
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...userData } = formData;
      
      // Registra o usuário
      await register({
        ...userData,
        addresses: [],
        paymentMethods: [],
        avatar: ''
      });
      
      try {
        // Tenta fazer login automaticamente
        await login(formData.email, formData.password);
        // Redireciona para a página inicial após o registro bem-sucedido
        navigate('/');
      } catch (loginError) {
        // Se o login automático falhar, redireciona para a página de login
        console.error('Login automático falhou:', loginError);
        navigate('/login', { 
          state: { 
            email: formData.email, 
            message: 'Conta criada com sucesso! Por favor, faça login para continuar.' 
          } 
        });
      }
      
      // O retorno é void, então não precisamos retornar nada
    } catch (err: unknown) {
      let errorMessage = 'Ocorreu um erro ao criar sua conta. Por favor, tente novamente.';
      
      if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      console.error('Registration error:', err);
      setError(errorMessage);
      throw new Error(errorMessage); // Lança o erro para ser tratado pelo RegisterForm
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Criar Conta</Title>
        <Subtitle>Preencha os dados abaixo para se cadastrar</Subtitle>
        
        {error && (
          <ErrorAlert>
            <FiAlertCircle size={18} />
            <span>{error}</span>
          </ErrorAlert>
        )}
        
        <RegisterForm 
          onSubmit={handleSubmit} 
          submitButtonText="Criar conta"
          showLoginLink={true}
          onLoginClick={() => navigate('/login')}
        />
      </RegisterCard>
      
      <LoginLink>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </LoginLink>
    </RegisterContainer>
  );
};

export default Register;

// Styled Components
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-bottom: 2rem;
  text-align: center;
`;

const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #FEE2E2;
  color: #B91C1C;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`;

const LoginLink = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

