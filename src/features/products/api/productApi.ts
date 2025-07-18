import { api } from '@/lib/api';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  // Add other product fields as needed
}

export const productApi = {
  async getProducts(): Promise<Product[]> {
    const response = await api.get('/products');
    return response.data;
  },
  
  async getProductById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  // Add other product-related API calls here
};
