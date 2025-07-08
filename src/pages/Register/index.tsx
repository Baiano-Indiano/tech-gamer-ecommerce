import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { PasswordStrengthMeter } from '../../components/Input/PasswordStrengthMeter';
import { FormContainer, FormTitle, Form, FormGroup } from '../Login/styles';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation(['auth', 'common']);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError(t('errors.passwordMismatch'));
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Primeiro, registra o usuário com os dados básicos
      await register({
        name,
        email,
        phone: '', // Será preenchido posteriormente
        cpf: '',
        birthDate: '',
        avatar: '',
        addresses: [],
        paymentMethods: [],
        newsletter: false
      });
      
      // Se o registro for bem-sucedido, redireciona para a página inicial
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setError(t('errors.generic'));
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>{t('register.title')}</FormTitle>
        
        {error && <div className="error">{error}</div>}
        
        <FormGroup>
          <label htmlFor="name">{t('register.name')}</label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="email">{t('register.email')}</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="password">{t('register.password')}</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <PasswordStrengthMeter password={password} />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="confirmPassword">{t('register.confirmPassword')}</label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            required
          />
        </FormGroup>
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('common:loading') : t('register.createAccount')}
        </Button>
        
        <p>
          {t('register.haveAccount')}{' '}
          <Link to="/login">{t('register.signIn')}</Link>
        </p>
      </Form>
    </FormContainer>
  );
};

export default Register;
