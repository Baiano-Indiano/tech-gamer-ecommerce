import type { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/theme';
import { AuthProvider, CartProvider } from '@/context';

type AppProvidersProps = {
  children: ReactNode;
};

// Cria uma instância do QueryClient com configurações padrão
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 30 * 60 * 1000, // 30 minutos (substitui o cacheTime no React Query v5+)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Provedor principal da aplicação que envolve a aplicação com todos os providers necessários.
 * Inclui:
 * - QueryClientProvider para gerenciamento de cache e requisições
 * - ThemeProvider para estilização temática
 * - BrowserRouter para roteamento
 * - AuthProvider para autenticação
 * - CartProvider para gerenciamento do carrinho
 * - ReactQueryDevtools para desenvolvimento
 */
export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-right" />
      )}
    </QueryClientProvider>
  );
};

export default AppProviders;
