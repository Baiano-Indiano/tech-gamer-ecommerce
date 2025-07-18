import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAuth } from '../../context/providers/AuthProvider/useAuth';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { t } = useTranslation('auth');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError(t('errors.fillAllFields'));
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(t('errors.invalidCredentials'));
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>{t('login.title')}</Title>
        <Subtitle>{t('login.subtitle')}</Subtitle>
        
        {error && (
          <ErrorAlert>
            <FiAlertCircle size={18} />
            <span>{error}</span>
          </ErrorAlert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">{t('login.email')}</Label>
            <InputGroup>
              <InputIcon>
                <FiMail size={20} />
              </InputIcon>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('login.emailPlaceholder')}
                autoComplete="email"
                required
              />
            </InputGroup>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">{t('login.password')}</Label>
            <InputGroup>
              <InputIcon>
                <FiLock size={20} />
              </InputIcon>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.passwordPlaceholder')}
                autoComplete="current-password"
                required
              />
            </InputGroup>
            <ForgotPassword to="/forgot-password">
              {t('login.forgotPassword')}
            </ForgotPassword>
          </FormGroup>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('login.signingIn') : t('login.signIn')}
          </Button>
        </Form>
        
        <SignupText>
          {t('login.noAccount')} <SignupLink to="/register">{t('login.signUp')}</SignupLink>
        </SignupText>
      </LoginCard>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f9fafb;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 32rem;
  padding: 3rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #FEE2E2;
  color: #B91C1C;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #111827;
  font-weight: 500;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  color: #4b5563;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
    transform: translateY(-1px);
  }
`;

const ForgotPassword = styled(Link)`
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.9375rem;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  padding: 0.25rem 0;

  &:hover {
    color: #4338ca;
    text-decoration: underline;
    transform: translateX(2px);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  background-color: #4f46e5;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SignupText = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 1rem;
  color: #4b5563;
`;

const SignupLink = styled(Link)`
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: #4338ca;
    text-decoration: underline;
  }
`;

export default Login;
