import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Cria uma instância do Axios com configurações padrão
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      // Tratamento de erros com base no status HTTP
      switch (error.response.status) {
        case 401:
          // Redirecionar para login se não autenticado
          window.location.href = '/login';
          break;
        case 403:
          // Acesso negado
          console.error('Acesso negado: ', error.response.data);
          break;
        case 404:
          // Recurso não encontrado
          console.error('Recurso não encontrado: ', error.response.data);
          break;
        case 500:
          // Erro interno do servidor
          console.error('Erro interno do servidor: ', error.response.data);
          break;
        default:
          console.error('Erro na requisição: ', error.response.data);
      }
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error('Sem resposta do servidor: ', error.request);
    } else {
      // Erro ao configurar a requisição
      console.error('Erro na requisição: ', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

// Funções auxiliares para requisições comuns
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const post = async <T, D = unknown>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig<D>
): Promise<T> => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

export const put = async <T, D = unknown>(
  url: string, 
  data?: D, 
  config?: AxiosRequestConfig<D>
): Promise<T> => {
  const response = await api.put<T>(url, data, config);
  return response.data;
};

export const del = async <T>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.delete<T>(url, config);
  return response.data;
};
