import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { ReactQueryProvider } from '@/lib/react-query';
import { theme } from '@/styles/theme';
import { router } from './app/router';

// Estilos globais para o tema
const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light dark;
  }
  
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body.dark {
    background-color: ${({ theme }) => theme.colors.gray[900]};
    color: ${({ theme }) => theme.colors.gray[100]};
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  ul, ol {
    list-style: none;
  }
`;

// Componente de carregamento
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem',
  }}>
    <div style={{
      display: 'inline-block',
      width: '2rem',
      height: '2rem',
      border: '3px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
      borderTopColor: theme.colors.primary,
      animation: 'spin 1s ease-in-out infinite',
      marginRight: '1rem',
    }} />
    <span>Carregando...</span>
  </div>
);

// Componente principal da aplicação
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ReactQueryProvider>
        <GlobalStyle />
        <Suspense fallback={<LoadingFallback />}>
          <RouterProvider router={router} />
        </Suspense>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export default App;
