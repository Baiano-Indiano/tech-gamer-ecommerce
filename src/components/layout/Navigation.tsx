import { NavLink } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="hidden md:ml-6 md:flex md:space-x-8">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
            isActive
              ? 'border-primary-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`
        }
      >
        Início
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
            isActive
              ? 'border-primary-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`
        }
      >
        Produtos
      </NavLink>
      <NavLink
        to="/categories"
        className={({ isActive }) =>
          `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
            isActive
              ? 'border-primary-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`
        }
      >
        Categorias
      </NavLink>
      <NavLink
        to="/deals"
        className={({ isActive }) =>
          `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
            isActive
              ? 'border-primary-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`
        }
      >
        Ofertas
      </NavLink>
    </nav>
  );
}
