import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Layouts
const MainLayout = lazy(() => import('@/app/layouts/MainLayout'));
const AuthLayout = lazy(() => import('@/app/layouts/AuthLayout'));

// Páginas públicas
const HomePage = lazy(() => import('@/pages/Home').then(module => ({ default: module.default })));
const ProductsPage = lazy(() => import('@/pages/Products').then(module => ({ default: module.default })));
const ProductDetailsPage = lazy(() => import('@/pages/ProductDetails').then(module => ({ default: module.default })));
const AboutPage = lazy(() => import('@/pages/About').then(module => ({ default: module.default })));
const DealsPage = lazy(() => import('@/pages/Deals').then(module => ({ default: module.default })));
const FavoritesPage = lazy(() => import('@/pages/Favorites').then(module => ({ default: module.default })));

// Páginas de autenticação
const LoginPage = lazy(() => import('@/pages/Login').then(module => ({ default: module.default })));
const RegisterPage = lazy(() => import('@/pages/Register').then(module => ({ default: module.default })));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPassword').then(module => ({ default: module.default })));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage').then(module => ({ default: module.default })));

// Páginas autenticadas
const ProfilePage = lazy(() => import('@/pages/Profile').then(module => ({ default: module.default })));
const OrdersPage = lazy(() => import('@/pages/Orders').then(module => ({ default: module.default })));
const OrderDetailsPage = lazy(() => import('@/pages/OrderDetails').then(module => ({ default: module.default })));
const CartPage = lazy(() => import('@/pages/Cart').then(module => ({ default: module.default })));
const CheckoutPage = lazy(() => import('@/pages/Checkout').then(module => ({ default: module.default })));

// Erros
const NotFoundPage = lazy(() => import('@/pages/NotFound').then(module => ({ default: module.default })));

// Componentes de roteamento
import { ProtectedRoute } from './ProtectedRoute';

// Rotas da aplicação
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'products',
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
        ],
      },
      { path: 'cart', element: <CartPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'deals', element: <DealsPage /> },
      {
        path: 'favorites',
        element: (
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'account',
        children: [
          {
            path: 'profile',
            element: (
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'orders',
            element: (
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'orders/:id',
            element: (
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
