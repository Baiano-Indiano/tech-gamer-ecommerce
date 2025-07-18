import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../../context/cart/CartContext';
import type { Product } from '../../types';
import ProductDetails from '../../components/ProductDetails';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  margin: 2rem 0;
`;

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Substitua pela chamada real da API quando disponível
        // const response = await api.get(`/products/${id}`);
        // setProduct(response.data);
        
        // Dados mockados temporários
        setTimeout(() => {
          const mockProduct: Product = {
            id: parseInt(id || '1', 10),
            name: 'Produto de Exemplo',
            description: 'Este é um produto de exemplo com descrição detalhada.',
            price: 999.99,
            originalPrice: 1299.99,
            image: 'https://via.placeholder.com/600x400?text=Produto',
            images: [
              'https://via.placeholder.com/600x400?text=Imagem+1',
              'https://via.placeholder.com/600x400?text=Imagem+2',
              'https://via.placeholder.com/600x400?text=Imagem+3',
            ],
            rating: 4.5,
            category: 'Eletrônicos',
            brand: 'Marca Exemplo',
            inStock: true,
            fastDelivery: true,
            freeShipping: true,
            specifications: {
              'Modelo': 'MOD-2023',
              'Cor': 'Preto',
              'Dimensões': '20 x 15 x 5 cm',
              'Peso': '500g'
            },
            reviews: [
              {
                id: 1,
                user: 'Cliente Satisfeito',
                rating: 5,
                comment: 'Produto excelente, superou minhas expectativas!',
                date: '2023-05-15',
              },
              {
                id: 2,
                user: 'Comprador Anônimo',
                rating: 4,
                comment: 'Bom produto, mas a entrega atrasou um pouco.',
                date: '2023-04-22',
              },
            ],
            relatedProducts: [2, 3, 4],
          };
          setProduct(mockProduct);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Erro ao carregar produto:', err);
        setError('Não foi possível carregar os detalhes do produto.');
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError('Produto não encontrado');
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = (product: Product, quantity: number) => {
    // Cria um novo objeto com as propriedades necessárias para o carrinho
    const productForCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      images: product.images,
      rating: product.rating,
      category: product.category,
      brand: product.brand,
      inStock: product.inStock,
      fastDelivery: product.fastDelivery,
      freeShipping: product.freeShipping,
      description: product.description,
      specifications: product.specifications,
    };
    
    // Adiciona a quantidade especificada ao carrinho
    for (let i = 0; i < quantity; i++) {
      addToCart(productForCart);
    }
    
    // Feedback para o usuário
    toast.success(
      quantity > 1 
        ? `${quantity} itens de ${product.name} adicionados ao carrinho!`
        : `${product.name} adicionado ao carrinho!`
    );
  };

  if (loading) {
    return (
      <LoadingContainer>
        <div>Carregando...</div>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <Container>
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#2563eb',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}
        >
          <FiArrowLeft /> Voltar
        </button>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#2563eb',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}
        >
          <FiArrowLeft /> Voltar
        </button>
        <ErrorMessage>Produto não encontrado</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          color: '#2563eb',
          cursor: 'pointer',
          marginBottom: '1rem',
          fontSize: '1rem'
        }}
      >
        <FiArrowLeft /> Voltar para produtos
      </button>
      
      <ProductDetails 
        product={product} 
        onAddToCart={handleAddToCart} 
      />
    </Container>
  );
};

export default ProductDetailsPage;
