import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export function CartButton() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link
      to="/cart"
      className="group -m-2 p-2 flex items-center text-gray-400 hover:text-gray-500 relative"
    >
      <ShoppingCartIcon
        className="flex-shrink-0 h-6 w-6"
        aria-hidden="true"
      />
      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
        {itemCount}
      </span>
      <span className="sr-only">itens no carrinho, visualizar carrinho</span>
      
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
