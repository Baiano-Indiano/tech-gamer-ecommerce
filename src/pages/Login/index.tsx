import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { Button } from '../../components/buttons';
import { Input } from '../../components/forms/input';
import { FormContainer, FormTitle, StyledForm, FormGroup, FormFooter, ErrorMessage } from './styles';
import { loginSchema } from '../../schemas/auth.schema';

type LoginFormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { t } = useTranslation('auth');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError('');
    setIsLoading(true);

    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setSubmitError(t('errors.invalidCredentials'));
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormTitle>{t('login.title')}</FormTitle>
        
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
        
        <FormGroup>
          <label htmlFor="email">{t('login.email')}</label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="password">{t('login.password')}</label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('login.signingIn') : t('login.signIn')}
        </Button>
        
        <FormFooter>
          <Link to="/register">{t('login.noAccount')} {t('login.signUp')}</Link>
          <Link to="/forgot-password">{t('login.forgotPassword')}</Link>
        </FormFooter>
      </StyledForm>
    </FormContainer>
  );
};

export default Login;
