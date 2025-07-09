import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/buttons';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>{t('notFound.title')}</Title>
      <Description>{t('notFound.description')}</Description>
      <ButtonContainer>
        <Link to="/">
          <Button variant="primary">
            {t('notFound.backToHome')}
          </Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

export default NotFoundPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, #6c5ce7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 1rem 0 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 2rem;
  max-width: 500px;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  margin-top: 1.5rem;
  
  a {
    text-decoration: none;
  }
`;
