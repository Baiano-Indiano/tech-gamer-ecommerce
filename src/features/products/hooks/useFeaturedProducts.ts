import { useQuery } from '@tanstack/react-query';
import { Product } from '../types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Processador Intel Core i9-13900K',
    description: 'Processador Intel Core i9-13900K, 24-Core, 32-Threads, 3.0GHz (5.8GHz Turbo), Cache 36MB, LGA 1700, BX8071513900K',
    price: 4299.90,
    originalPrice: 4599.90,
    rating: 4.8,
    reviewCount: 127,
    imageSrc: 'https://images.kabum.com.br/produtos/fotos/416266/processador-intel-core-i9-13900k-5-8ghz-36mb-cache-lga1700-bx8071513900k_1664880289_gg.jpg',
    imageAlt: 'Processador Intel Core i9-13900K',
    category: 'Processadores',
    brand: 'Intel',
    stock: 15,
    isOnSale: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Placa de Vídeo RTX 4090',
    description: 'Placa de Vídeo NVIDIA GeForce RTX 4090, 24GB GDDR6X, 384-bit, DLSS, Ray Tracing - ZT-D40900B-10P',
    price: 12499.90,
    rating: 5.0,
    reviewCount: 89,
    imageSrc: 'https://images.kabum.com.br/produtos/fotos/416267/placa-de-video-nvidia-geforce-rtx-4090-24gb-gddr6x-384-bit-dlss-ray-tracing-zt-d40900b-10p_1664880289_gg.jpg',
    imageAlt: 'Placa de Vídeo RTX 4090',
    category: 'Placas de Vídeo',
    brand: 'Zotac',
    stock: 8,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Monitor Gamer Samsung Odyssey G7',
    description: 'Monitor Gamer Samsung Odyssey G7, 27", WQHD, 240Hz, 1ms, HDMI/DisplayPort, FreeSync Premium Pro, HDR600, Preto - LC27G75TQSLXZD',
    price: 3999.90,
    originalPrice: 4599.90,
    rating: 4.9,
    reviewCount: 215,
    imageSrc: 'https://images.kabum.com.br/produtos/fotos/170459/monitor-gamer-samsung-odyssey-g7-27-wqhd-240hz-1ms-hdmi-displayport-freesync-premium-pro-hdr600-preto-lc27g75tqslxzd_1632831508_gg.jpg',
    imageAlt: 'Monitor Gamer Samsung Odyssey G7',
    category: 'Monitores',
    brand: 'Samsung',
    stock: 12,
    isOnSale: true,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Teclado Mecânico Gamer Redragon Kumara',
    description: 'Teclado Mecânico Gamer Redragon Kumara, RGB, Switch Outemu Blue, ABNT2 - K552-2 (PT-BLUE)',
    price: 349.90,
    rating: 4.7,
    reviewCount: 342,
    imageSrc: 'https://images.kabum.com.br/produtos/fotos/104898/teclado-mecanico-gamer-redragon-kumara-rgb-switch-outemu-blue-abnt2-k552-2-pt-blue_1587131135_gg.jpg',
    imageAlt: 'Teclado Mecânico Gamer Redragon Kumara',
    category: 'Periféricos',
    brand: 'Redragon',
    stock: 25,
    isFeatured: true,
  },
];

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Em uma aplicação real, você faria uma chamada para a API aqui
      // const response = await api.get('/products/featured');
      // return response.data;
      
      return mockProducts;
    },
  });
}
