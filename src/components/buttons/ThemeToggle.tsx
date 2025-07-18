import { useTheme } from '../../context/providers/ThemeProvider/ThemeContext';
import styled from 'styled-components';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
  
  .dark & {
    color: ${({ theme }) => theme.colors.textDark};
    
    &:hover {
      background: ${({ theme }) => theme.colors.backgroundSecondaryDark};
    }
  }
`;

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation('theme');
  
  return (
    <ToggleButton 
      onClick={toggleTheme}
      aria-label={isDark ? t('light') : t('dark')}
      title={isDark ? t('light') : t('dark')}
    >
      {isDark ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
      <span>{isDark ? t('light') : t('dark')}</span>
    </ToggleButton>
  );
};

export default ThemeToggle;
