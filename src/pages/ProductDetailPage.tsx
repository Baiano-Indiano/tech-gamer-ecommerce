import { useParams, useNavigate } from 'react-router-dom';
import { useProductBySlug } from '@/features/products/hooks/useProducts';
import { formatCurrency } from '@/lib/utils';
import { StarIcon } from '@heroicons/react/20/solid';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/features/cart/hooks/useCart';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProductBySlug(slug || '');
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0]?.url || '',
      maxQuantity: product.stock,
      slug: product.slug,
    });
    
    // Feedback para o usuário
    toast.success('Produto adicionado ao carrinho!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Produto não encontrado</h2>
        <p className="mt-2 text-gray-600">
          O produto que você está procurando não existe ou foi removido.
        </p>
        <Button
          onClick={() => navigate('/products')}
          variant="outline"
          className="mt-6"
        >
          Voltar para a loja
        </Button>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navegação */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Início
              </a>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Produtos
              </a>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Galeria de imagens */}
          <div className="lg:col-span-1">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              <img
                src={product.images[selectedImage]?.url || '/placeholder-product.jpg'}
                alt={product.images[selectedImage]?.alt || product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-md border-2 ${
                      selectedImage === index
                        ? 'border-primary-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `Imagem ${index + 1} de ${product.name}`}
                      className="h-24 w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do produto */}
          <div className="mt-8 lg:mt-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-4">
              <h2 className="sr-only">Informações do produto</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {formatCurrency(product.price)}
                {hasDiscount && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {formatCurrency(product.originalPrice!)}
                  </span>
                )}
              </p>
              {hasDiscount && (
                <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                  {discountPercentage}% OFF
                </span>
              )}

              {/* Avaliações */}
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">
                  {product.reviewCount} avaliações
                </p>
              </div>

              {/* Disponibilidade */}
              <div className="mt-4">
                {product.stock > 0 ? (
                  <p className="text-green-600 font-medium">
                    Em estoque ({product.stock} unidades)
                  </p>
                ) : (
                  <p className="text-red-600 font-medium">Fora de estoque</p>
                )}
              </div>

              {/* Descrição */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Descrição</h3>
                <div className="mt-2 space-y-4">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>

              {/* Especificações */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    Especificações técnicas
                  </h3>
                  <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    {product.specifications.map((spec) => (
                      <div key={spec.name} className="border-t border-gray-200 pt-4">
                        <dt className="text-sm font-medium text-gray-500">
                          {spec.name}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Ações */}
              <div className="mt-8">
                {product.stock > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <label htmlFor="quantity" className="mr-4 text-sm font-medium text-gray-700">
                        Quantidade
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {product.stock} disponíveis
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleAddToCart}
                        className="w-full sm:w-auto"
                        size="lg"
                      >
                        Adicionar ao carrinho
                      </Button>
                      <Button
                        onClick={handleBuyNow}
                        variant="primary"
                        className="w-full sm:w-auto"
                        size="lg"
                      >
                        Comprar agora
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-red-600">Produto esgotado</p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // TODO: Implementar notificação quando o produto estiver disponível
                        toast.success('Você será notificado quando este produto estiver disponível!');
                      }}
                    >
                      Avise-me quando chegar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Produtos relacionados */}
        <section aria-labelledby="related-heading" className="mt-16">
          <h2 id="related-heading" className="text-2xl font-bold text-gray-900">
            Produtos relacionados
          </h2>
          
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {/* Aqui você pode adicionar uma lista de produtos relacionados */}
            <div className="text-center py-8">
              <p className="text-gray-500">Produtos relacionados serão exibidos aqui</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
