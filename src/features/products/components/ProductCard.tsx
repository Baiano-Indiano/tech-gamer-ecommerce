import { formatCurrency } from '@/lib/utils';
import { StarIcon } from '@heroicons/react/20/solid';

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageSrc: string;
  imageAlt: string;
  isNew?: boolean;
  isOnSale?: boolean;
};

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  
  return (
    <div className={`group relative ${className}`}>
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
        
        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Novo
            </span>
          )}
          {product.isOnSale && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Oferta
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </h3>
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={`h-4 w-4 flex-shrink-0 ${
                    product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="ml-2 text-xs text-gray-500">
              {product.reviewCount} avaliações
            </p>
          </div>
        </div>
        
        <div className="text-right">
          {hasDiscount && (
            <p className="text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice!)}
            </p>
          )}
          <p className={`text-sm font-medium ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
            {formatCurrency(product.price)}
          </p>
          {hasDiscount && (
            <p className="text-xs text-green-600">
              {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
