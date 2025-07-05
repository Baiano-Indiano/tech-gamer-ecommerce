import type { Product } from '../types/products';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Monitor Gamer 27" 144Hz',
    category: 'Monitores',
    price: 1999.99,
    originalPrice: 2499.99,
    description: 'Monitor gamer de alta performance com taxa de atualização de 144Hz',
    inStock: true,
    rating: 4.8,
    reviewCount: 128,
    brand: 'TechGamer',
    features: ['144Hz', '1ms', 'HDR', 'G-Sync'],
    specifications: {
      'Tamanho': '27"',
      'Resolução': '2560x1440',
      'Tipo de painel': 'IPS',
      'Taxa de atualização': '144Hz',
      'Tempo de resposta': '1ms'
    },
    image: 'https://via.placeholder.com/300',
    images: [
      'https://via.placeholder.com/600',
      'https://via.placeholder.com/600/0000FF',
      'https://via.placeholder.com/600/008000'
    ]
  },
  {
    id: '2',
    name: 'Teclado Mecânico RGB',
    category: 'Periféricos',
    price: 599.99,
    originalPrice: 799.99,
    description: 'Teclado mecânico com iluminação RGB personalizável',
    inStock: true,
    rating: 4.5,
    reviewCount: 85,
    brand: 'MechTech',
    features: ['Switches Azuis', 'RGB', 'Apoio de pulso', 'Anti-ghosting'],
    image: 'https://via.placeholder.com/300',
    images: []
  },
  {
    id: '3',
    name: 'Mouse Gamer 16000 DPI',
    category: 'Periféricos',
    price: 349.99,
    originalPrice: 449.99,
    description: 'Mouse gamer de alta precisão com sensor óptico avançado',
    inStock: true,
    rating: 4.7,
    reviewCount: 92,
    brand: 'SpeedTech',
    features: ['16000 DPI', '7 botões programáveis', 'Pesos ajustáveis', 'RGB'],
    image: 'https://via.placeholder.com/300',
    images: []
  },
  {
    id: '4',
    name: 'Headset Gamer 7.1',
    category: 'Áudio',
    price: 399.99,
    originalPrice: 499.99,
    description: 'Headset gamer com som surround 7.1 e cancelamento de ruído',
    inStock: true,
    rating: 4.6,
    reviewCount: 67,
    brand: 'AudioPro',
    features: ['7.1 Surround', 'Microfone removível', 'Iluminação RGB', 'Almofadas em couro'],
    image: 'https://via.placeholder.com/300',
    images: []
  },
  {
    id: '5',
    name: 'Cadeira Gamer Ergonômica',
    category: 'Cadeiras',
    price: 1999.99,
    originalPrice: 2499.99,
    description: 'Cadeira gamer ergonômica com suporte lombar e apoio para os pés',
    inStock: true,
    rating: 4.9,
    reviewCount: 43,
    brand: 'ComfortSeat',
    features: ['Ajuste de altura', 'Inclinação de 180°', 'Rodinhas 360°', 'Espuma de alta densidade'],
    image: 'https://via.placeholder.com/300',
    images: []
  },
  {
    id: '6',
    name: 'Mousepad Gamer XXL',
    category: 'Acessórios',
    price: 149.99,
    description: 'Mousepad gamer extra grande com superfície de baixo atrito',
    inStock: true,
    rating: 4.3,
    reviewCount: 56,
    brand: 'SpeedTech',
    features: ['Tamanho XXL (900x400mm)', 'Superfície de tecido', 'Base antiderrapante', 'Costura reforçada'],
    image: 'https://via.placeholder.com/300',
    images: []
  }
];
