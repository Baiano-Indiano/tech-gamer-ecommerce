import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'sonner';

// Configuração base da API
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Interceptores de requisição
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se existir
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptores de resposta
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Tratamento de erros comuns
    if (error.response) {
      const { status, data } = error.response;
      
      // Erros 4xx e 5xx
      if (status === 401) {
        // Token expirado ou inválido
        localStorage.removeItem('authToken');
        window.location.href = '/auth/login';
        toast.error('Sessão expirada. Por favor, faça login novamente.');
      } else if (status === 403) {
        // Acesso negado
        toast.error('Você não tem permissão para acessar este recurso.');
      } else if (status === 404) {
        // Recurso não encontrado
        toast.error('Recurso não encontrado.');
      } else if (status === 429) {
        // Muitas requisições
        toast.error('Muitas requisições. Por favor, tente novamente mais tarde.');
      } else if (status >= 500) {
        // Erro do servidor
        toast.error('Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.');
      } else if (data && typeof data === 'object' && 'message' in data) {
        // Mensagem de erro personalizada da API
        toast.error(String(data.message));
      } else {
        // Outros erros
        toast.error('Ocorreu um erro inesperado.');
      }
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      toast.error('Tempo de conexão esgotado. Verifique sua conexão e tente novamente.');
    } else if (error.code === 'ERR_NETWORK') {
      // Sem conexão
      toast.error('Sem conexão com a internet. Verifique sua conexão e tente novamente.');
    } else {
      // Erro desconhecido
      toast.error('Ocorreu um erro inesperado.');
    }
    
    return Promise.reject(error);
  }
);

export { api };

// Utilitários para requisições comuns
export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const fetcherWithParams = <T = unknown>(url: string, params: Record<string, string | number | boolean> = {}): Promise<T> =>
  api.get<T>(url, { params }).then((res) => res.data);

export const postData = <T = unknown, D = unknown>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig<D>
): Promise<T> =>
  api.post<T>(url, data, config).then((res) => res.data);

export const putData = <T = unknown, D = unknown>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig<D>
): Promise<T> =>
  api.put<T>(url, data, config).then((res) => res.data);

export const deleteData = <T = unknown>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<T> =>
  api.delete<T>(url, config).then((res) => res.data);

export const patchData = <T = unknown, D = unknown>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig<D>
): Promise<T> =>
  api.patch<T>(url, data, config).then((res) => res.data);

// Tipos úteis
export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
};

export const isApiError = (error: unknown): error is { response: { data: ApiError } } => {
  return (
    error !== null &&
    typeof error === 'object' &&
    'response' in error &&
    error.response !== null &&
    typeof error.response === 'object' &&
    'data' in error.response &&
    error.response.data !== null &&
    typeof error.response.data === 'object' &&
    'message' in error.response.data
  );
};
