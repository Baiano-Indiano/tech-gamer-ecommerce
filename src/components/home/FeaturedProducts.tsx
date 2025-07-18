import { Link } from 'react-router-dom';
import { ProductCard } from '@/features/products/components/ProductCard';
import { useFeaturedProducts } from '@/features/products/hooks/useFeaturedProducts';
import { Spinner } from '@/components/ui/Spinner';

export function FeaturedProducts() {
  const { data: products, isLoading, error } = useFeaturedProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Erro ao carregar produtos em destaque.</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum produto em destaque no momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <Link 
          key={product.id} 
          to={`/products/${product.id}`}
          className="group"
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
