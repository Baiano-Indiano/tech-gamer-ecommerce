import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { FormContainer, FormTitle, Form, FormGroup, FormFooter } from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation('auth');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setError(t('errors.invalidCredentials'));
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>{t('login.title')}</FormTitle>
        
        {error && <div className="error">{error}</div>}
        
        <FormGroup>
          <label htmlFor="email">{t('login.email')}</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="password">{t('login.password')}</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('login.signingIn') : t('login.signIn')}
        </Button>
        
        <FormFooter>
          <Link to="/register">{t('login.noAccount')} {t('login.signUp')}</Link>
          <Link to="/forgot-password">{t('login.forgotPassword')}</Link>
        </FormFooter>
      </Form>
    </FormContainer>
  );
};

export default Login;
