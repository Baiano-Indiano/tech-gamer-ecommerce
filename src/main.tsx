import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from './theme';
import { ThemeProvider } from './context/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthProvider';
import { FavoritesProvider } from './context/FavoritesProvider';
import { CartProvider } from './context/CartProvider';
import App from './App';

// Importar estilos globais
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';

// Adicionar classe de tema ao body
document.body.classList.add('light-theme');

// Configuração global do toast
const toastOptions = {
  style: {
    background: theme.colors.background,
    color: theme.colors.text,
    border: `1px solid ${theme.colors.border}`,
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <StyledThemeProvider theme={theme}>
            <AuthProvider>
              <FavoritesProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </FavoritesProvider>
            </AuthProvider>
            <Toaster position="top-right" toastOptions={toastOptions} />
          </StyledThemeProvider>
        </ThemeProvider>
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>
);
