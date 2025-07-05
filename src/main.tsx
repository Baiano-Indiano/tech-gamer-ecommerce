import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './index.css';
import App from './App.tsx';
import { CartProvider } from './context';
import { AuthProvider } from './context/AuthProvider';
import { FavoritesProvider } from './context/FavoritesProvider';
import theme from './theme';

// Importa a tipagem do tema uma vez
import './theme/styled.d';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
