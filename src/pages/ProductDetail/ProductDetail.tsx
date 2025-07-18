import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRefreshCw, FiAlertCircle, FiCreditCard } from 'react-icons/fi';
import { useCart } from '../../context/cart/CartContext';
import { useFavorites } from '../../context/providers/FavoritesProvider/FavoritesProvider';
import type { Product } from '../../types/product';
import api from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ProductDetailContainer,
  BackButton,
  LoadingContainer,
  ErrorContainer,
  ProductGrid,
  ProductGallery,
  Thumbnails,
  Thumbnail,
  ProductInfo,
  ProductTitle,
  ProductMeta,
  PriceContainer,
  OriginalPrice,
  ProductDescription,
  FeaturesList,
  AddToCartButton,
  QuantitySelector,
  ProductImageContainer,
  ProductImage,
  FavoriteButton,
  Price,
  LoadingSpinner,
  Rating,
  ReviewCount,
  BenefitsList
} from './styles';

// Componente principal
const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const { id: productId = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  // Função para mapear o produto da API para o tipo unificado
  const mapApiProductToProduct = useCallback((apiProduct: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    description: string;
    inStock: boolean;
    rating: number;
    reviewCount?: number;
    features?: string[];
    images?: string[];
    category?: string;
    image?: string;
  }): Product => {
    // Garantir que temos pelo menos uma imagem
    const images = apiProduct.images || [];
    if (apiProduct.image && !images.length) {
      images.push(apiProduct.image);
    }
    
    return {
      id: apiProduct.id,
      name: apiProduct.name,
      category: apiProduct.category || 'Eletrônicos',
      price: apiProduct.price,
      originalPrice: apiProduct.originalPrice,
      discount: apiProduct.discount,
      description: apiProduct.description,
      inStock: apiProduct.inStock,
      rating: apiProduct.rating,
      reviewCount: apiProduct.reviewCount,
      features: apiProduct.features || [],
      images: images,
    };
  }, []);
  
  // Função para carregar produto da API
  const loadProduct = useCallback(async (productId: string): Promise<Product> => {
    try {
      const apiProduct = await api.products.getProductById(productId);
      if (!apiProduct) {
        throw new Error('Product not found');
      }
      return mapApiProductToProduct(apiProduct);
    } catch (error) {
      console.error('Error loading product:', error);
      throw new Error('Could not load product data');
    }
  }, [mapApiProductToProduct]);
  
  // Carregar produto quando o ID mudar
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const productData = await loadProduct(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
        setError('Could not load the product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, loadProduct]);

  // Função para alternar o estado de favorito
  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product) return;
    
    if (isFavorite(String(product.id))) {
      removeFromFavorites(String(product.id));
      toast.success('Product removed from favorites');
    } else {
      addToFavorites(product);
      toast.success('Product added to favorites');
    }
  }, [isFavorite, product, addToFavorites, removeFromFavorites]);
  
  // Função para tentar novamente carregar o produto
  const handleRetry = () => {
    if (productId) {
      setError(null);
      setProduct(null);
      
      // Forçar recarregamento do produto
      loadProduct(productId)
        .then((productData: Product) => {
          setProduct(productData);
          setError(null);
        })
        .catch((error: Error) => {
          console.error('Error reloading the product:', error);
          setError('Could not reload the product. Please try again.');
        });
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    try {
      // Adicionar ao carrinho
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || '',
        category: product.category || 'Electronics',
        rating: product.rating || 0,
        inStock: product.inStock,
        originalPrice: product.originalPrice,
        description: product.description,
        quantity: quantity, // Usando a quantidade selecionada
      };

      // Converter para o tipo esperado pelo carrinho
      const cartProduct = {
        ...cartItem,
        id: parseInt(cartItem.id, 10) || 0, // Garante que o ID seja um número
      };

      addToCart(cartProduct);
      
      // Mostrar notificação de sucesso
      toast.success(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`, {
        icon: <FiShoppingCart size={24} />,
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Resetar quantidade após adicionar ao carrinho
      setQuantity(1);
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('An error occurred while adding the item to the cart. Please try again.', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Se estiver carregando, mostrar o indicador de carregamento
  if (isLoading) {
    return (
      <ProductDetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft /> Voltar
        </BackButton>
        <LoadingContainer>
          <LoadingSpinner />
          <p>Loading product...</p>
        </LoadingContainer>
      </ProductDetailContainer>
    );
  }

  // Se houver erro, mostrar mensagem de erro
  if (error) {
    return (
      <ProductDetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft /> Voltar
        </BackButton>
        <ErrorContainer>
          <FiAlertCircle />
          <p>{error}</p>
          <button onClick={handleRetry}>
            <FiRefreshCw /> Try again
          </button>
        </ErrorContainer>
      </ProductDetailContainer>
    );
  }

  // Se não houver produto, não renderizar nada (ou mostrar mensagem)
  if (!product) {
    return (
      <ProductDetailContainer>
        <BackButton onClick={() => navigate(-1)}>
          <FiArrowLeft /> Voltar
        </BackButton>
        <ErrorContainer>
          <FiAlertCircle />
          <p>Product not found</p>
        </ErrorContainer>
      </ProductDetailContainer>
    );
  }
  
  // Garantir que temos pelo menos uma imagem
  const productImages = product.images?.length ? product.images : ['/placeholder-product.jpg'];
  const mainImage = productImages[selectedImage] || '/placeholder-product.jpg';

  // Se chegou até aqui, temos um produto válido para exibir
  return (
    <ProductDetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FiArrowLeft /> Voltar
      </BackButton>
      
      <ProductGrid>
        <ProductGallery>
          <ProductImageContainer>
            <ProductImage 
              src={mainImage} 
              alt={product.name} 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-product.jpg';
              }}
              loading="lazy"
            />
            <FavoriteButton 
              onClick={handleToggleFavorite}
              $isFavorite={isFavorite(product.id)}
              aria-label={isFavorite(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <FiHeart />
            </FavoriteButton>
          </ProductImageContainer>
{productImages.length > 1 && (
            <Thumbnails>
              {productImages.map((image, index) => (
                <Thumbnail 
                  key={index}
                  bgImage={image}
                  isActive={index === selectedImage}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Visualizar imagem ${index + 1}`}
                />
              ))}
            </Thumbnails>
          )}
        </ProductGallery>
        
        <ProductInfo>
          <ProductTitle>
            {product.name}
          </ProductTitle>
          
          <ProductMeta>
            <Rating>
              <FiStar />
              <span style={{ color: '#1e293b', marginLeft: '0.25rem' }}>
                {product.rating.toFixed(1)}
              </span>
            </Rating>
            <ReviewCount>({product.reviewCount || 0} reviews)</ReviewCount>
          </ProductMeta>
          
          <PriceContainer>
            <Price>R$ {product.price.toFixed(2).replace('.', ',')}</Price>
            {product.originalPrice !== undefined && product.originalPrice > product.price && (
              <OriginalPrice>
                De: R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </OriginalPrice>
            )}
          </PriceContainer>
          
          <ProductDescription>{product.description}</ProductDescription>
          
          <div>
            <h3>Features</h3>
            <FeaturesList>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </FeaturesList>
          </div>
          
          <QuantitySelector>
            <button 
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 10}
            >
              +
            </button>
          </QuantitySelector>
          
          <AddToCartButton 
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </AddToCartButton>
          
          <BenefitsList>
            <div>
              <FiTruck />
              <p>Free shipping nationwide</p>
            </div>
            <div>
              <FiShield />
              <p>12-month warranty</p>
            </div>
            <div>
              <FiCreditCard />
              <p>Up to 12x interest-free installments</p>
            </div>
          </BenefitsList>
        </ProductInfo>
      </ProductGrid>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
