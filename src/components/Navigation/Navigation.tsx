import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  .dark & {
    background: ${({ theme }) => theme.colors.backgroundDark};
    border-bottom-color: ${({ theme }) => theme.colors.borderDark};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  .dark & {
    color: ${({ theme }) => theme.colors.textDark};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LanguageSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  
  .dark & {
    background: ${({ theme }) => theme.colors.backgroundDark};
    color: ${({ theme }) => theme.colors.textDark};
    border-color: ${({ theme }) => theme.colors.borderDark};
  }
`;

const Navigation = () => {
  const { t, i18n } = useTranslation(['common', 'theme']);
  
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Nav>
      <NavLinks>
        <NavLink to="/">{t('common:home')}</NavLink>
        <NavLink to="/products">{t('common:products')}</NavLink>
        <NavLink to="/cart">{t('common:viewCart')}</NavLink>
      </NavLinks>
      
      <Controls>
        <LanguageSelect 
          value={i18n.language} 
          onChange={changeLanguage}
          aria-label={t('common:selectLanguage')}
        >
          <option value="en">English</option>
          <option value="pt">Português</option>
        </LanguageSelect>
        
        <ThemeToggle />
      </Controls>
    </Nav>
  );
};

export default Navigation;
