import { Product } from '@/features/products/types';
import { ProductCard } from './ProductCard';

type ViewMode = 'grid' | 'list';

interface ProductListProps {
  products: Product[];
  viewMode?: ViewMode;
  className?: string;
}

export function ProductList({ 
  products, 
  viewMode = 'grid',
  className = '' 
}: ProductListProps) {
  if (viewMode === 'list') {
    return (
      <div className={`space-y-6 ${className}`}>
        {products.map((product) => (
          <div key={product.id} className="flex border-b border-gray-200 pb-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={product.images[0]?.url || '/placeholder-product.jpg'}
                alt={product.images[0]?.alt || product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                  <p className="ml-4">{product.formattedPrice}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.brand?.name}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">
                  {product.inStock ? 'Em estoque' : 'Fora de estoque'}
                </p>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default grid view
  return (
    <div className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Skeleton loader for product list
export function ProductListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <div className="h-full w-full bg-gray-300"></div>
          </div>
          <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="mt-2 h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}
