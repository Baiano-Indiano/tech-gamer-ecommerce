import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { Navigation } from './Navigation';
import { CartButton } from '@/features/cart/components/CartButton';
import { UserMenu } from '@/features/auth/components/UserMenu';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo className="h-8 w-auto text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Tech Gamer</span>
            </Link>
            <Navigation />
          </div>
          
          <div className="flex items-center space-x-4">
            <CartButton />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
