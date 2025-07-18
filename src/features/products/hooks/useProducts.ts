import { useQuery } from '@tanstack/react-query';
import { Product } from '../types';

interface FetchProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  sort?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const fetchProducts = async (params: FetchProductsParams = {}) => {
  const { 
    page = 1, 
    limit = 12, 
    category 
  } = params;

  // Em um cenário real, isso seria uma chamada à API
  // const response = await api.get<PaginatedResponse<Product>>('/products', {
  //   params: {
  //     page,
  //     limit,
  //     category,
  //     sort,
  //     search,
  //     minPrice,
  //     maxPrice,
  //     brands: brands?.join(',')
  //   },
  // });
  // return response.data;

  // Mock de resposta para desenvolvimento
  return new Promise<PaginatedResponse<Product>>((resolve) => {
    setTimeout(() => {
      // Simulando atraso de rede
      const mockProducts: Product[] = [];
      const totalItems = 48; // Total simulado de itens
      
      // Gerar produtos mockados
      for (let i = 0; i < limit; i++) {
        const id = (page - 1) * limit + i + 1;
        if (id > totalItems) break;
        
        mockProducts.push({
          id: id.toString(),
          name: `Produto ${id} ${category ? `- ${category}` : ''}`.trim(),
          slug: `produto-${id}-${category || 'geral'}`.toLowerCase().replace(/\s+/g, '-'),
          description: `Descrição do produto ${id}. Este é um produto de alta qualidade com ótimo custo-benefício.`,
          price: Math.floor(Math.random() * 5000) + 100, // Entre 100 e 5100
          originalPrice: Math.random() > 0.7 ? Math.floor(Math.random() * 6000) + 100 : undefined,
          stock: Math.floor(Math.random() * 100) + 1,
          rating: Math.floor(Math.random() * 3) + 3, // Entre 3 e 5
          reviewCount: Math.floor(Math.random() * 100),
          category: category || 'eletronicos',
          brand: ['Intel', 'AMD', 'NVIDIA', 'Corsair', 'Samsung', 'Kingston'][Math.floor(Math.random() * 6)],
          images: [
            {
              url: `https://picsum.photos/seed/product-${id}/400/400`,
              alt: `Produto ${id}`,
              isPrimary: true
            }
          ],
          specifications: [
            { name: 'Marca', value: 'TechGamer' },
            { name: 'Modelo', value: `TG-${id}` },
            { name: 'Cor', value: 'Preto' },
          ],
          isNew: Math.random() > 0.7,
          isOnSale: Math.random() > 0.5,
          isFeatured: Math.random() > 0.8,
          isAvailable: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      resolve({
        data: mockProducts,
        total: totalItems,
        page,
        limit,
        totalPages: Math.ceil(totalItems / limit),
      });
    }, 500); // 500ms de atraso simulado
  });
};

export const useProducts = (params: FetchProductsParams = {}) => {
  const { 
    page = 1, 
    limit = 12, 
    category 
  } = params;

  return useQuery({
    queryKey: ['products', { page, limit, category }],
    queryFn: () => fetchProducts({ page, limit, category }),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos (substitui cacheTime no v5)
  });
};

export const useFeaturedProducts = (limit = 8) => {
  return useQuery({
    queryKey: ['featured-products', limit],
    queryFn: () => fetchProducts({ 
      limit, 
      // sort: 'featured', // Removido pois não está sendo usado na implementação atual
      // isFeatured: true 
    }),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      // Em um cenário real, isso seria uma chamada à API
      // const response = await api.get<Product>(`/products/slug/${slug}`);
      // return response.data;
      
      // Mock de resposta
      return new Promise<Product>((resolve) => {
        setTimeout(() => {
          resolve({
            id: '1',
            slug,
            name: `Produto ${slug.split('-')[1]}`,
            description: 'Descrição detalhada do produto. Este é um produto de alta qualidade com ótimo custo-benefício.',
            price: 2499.99,
            originalPrice: 2999.99,
            stock: 10,
            rating: 4.5,
            reviewCount: 128,
            category: 'eletronicos',
            brand: 'TechGamer',
            images: [
              { url: 'https://picsum.photos/800/800', alt: 'Produto', isPrimary: true },
              { url: 'https://picsum.photos/800/801', alt: 'Produto - Detalhe 1' },
              { url: 'https://picsum.photos/800/802', alt: 'Produto - Detalhe 2' },
            ],
            specifications: [
              { name: 'Marca', value: 'TechGamer' },
              { name: 'Modelo', value: 'TG-2000' },
              { name: 'Cor', value: 'Preto' },
              { name: 'Dimensões', value: '20 x 30 x 15 cm' },
              { name: 'Peso', value: '1.2 kg' },
            ],
            isNew: true,
            isOnSale: true,
            isFeatured: true,
            isAvailable: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }, 300);
      });
    },
    enabled: !!slug,
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};
