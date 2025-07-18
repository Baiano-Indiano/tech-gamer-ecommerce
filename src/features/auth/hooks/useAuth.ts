import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, LoginCredentials, RegisterData } from '../../../contexts/auth/types';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });
  
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado ao carregar o hook
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simula uma verificação de token na API
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Aqui você faria uma chamada para a API para verificar o token
          // e obter os dados do usuário
          // const user = await api.get('/me', { headers: { Authorization: `Bearer ${token}` } });
          // setState({ user, isLoading: false, error: null });
          
          // Simulação de usuário autenticado
          setTimeout(() => {
            setState({
              user: {
                id: '1',
                name: 'Usuário de Teste',
                email: 'teste@example.com',
                role: 'user',
                emailVerified: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                // avatar é opcional, então podemos omiti-lo
              },
              isLoading: false,
              error: null,
            });
          }, 500);
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        setState({
          user: null,
          isLoading: false,
          error: 'Failed to authenticate. Please try again.',
        });
        localStorage.removeItem('auth_token');
      }
    };

    checkAuth();
  }, []);

  const refreshUser = useCallback(async (): Promise<void> => {
    return new Promise((resolve) => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setState(prev => ({ ...prev, isLoading: false, user: null }));
          resolve();
          return;
        }

        // Em uma aplicação real, você faria uma chamada para a API para atualizar os dados do usuário
        // const response = await api.get('/auth/me');
        // const user = response.data.user;
        
        // Simulação de atualização do usuário
        const user: User = {
          id: '1',
          name: 'Usuário de Teste',
          email: 'teste@example.com',
          role: 'user',
          emailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setState(prev => ({
          ...prev,
          user,
          isLoading: false,
          error: null,
        }));
        resolve();
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        localStorage.removeItem('auth_token');
        setState(prev => ({
          ...prev,
          user: null,
          isLoading: false,
          error: 'Falha ao atualizar os dados do usuário',
        }));
      }
    });
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    return new Promise((resolve, reject) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Simula uma chamada à API
      setTimeout(() => {
        try {
          // Em uma aplicação real, você faria algo como:
          // const response = await api.post('/auth/login', credentials);
          // const { user, token } = response.data;
          // localStorage.setItem('auth_token', token);
          
          // Simulação de login bem-sucedido
          const user: User = {
            id: '1',
            name: 'Usuário de Teste',
            email: credentials.email,
            role: 'user',
            emailVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          setState({
            user,
            isLoading: false,
            error: null,
          });
          
          // Redireciona para a página inicial
          const from = '/';
          navigate(from, { replace: true });
          resolve();
        } catch (error) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: 'Credenciais inválidas. Por favor, tente novamente.',
          }));
          reject(error);
        }
      }, 1000);
    });
  }, [navigate]);

  const register = useCallback(async (userData: RegisterData): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Simula uma chamada de API para registro
        // const { data } = await api.post('/auth/register', userData);
        // localStorage.setItem('auth_token', data.token);
        // setState({ user: data.user, isLoading: false, error: null });
        
        // Simulação de registro bem-sucedido
        setTimeout(() => {
          localStorage.setItem('auth_token', 'fake-jwt-token');
          setState({
            user: {
              id: '1',
              name: userData.name,
              email: userData.email,
              role: 'user',
              emailVerified: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            isLoading: false,
            error: null,
          });
          navigate('/');
          resolve();
        }, 1000);
        
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Erro ao criar conta. Por favor, tente novamente.',
        }));
        reject(error);
      }
    });
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setState({ user: null, isLoading: false, error: null });
    navigate('/auth/login');
  }, [navigate]);

  return {
    ...state,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!state.user,
  };
}
