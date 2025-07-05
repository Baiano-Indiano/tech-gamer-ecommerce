import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useAuth } from './context/useAuth';
import Header from './components/Header';
import styled, { keyframes } from 'styled-components';

// Importing the centralized theme
import { theme } from './theme';

// Lazy loading for pages
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Cart = lazy(() => import('./pages/Cart'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const FavoritesPage = lazy(() => import('./pages/Favorites'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Categories = lazy(() => import('./pages/Categories'));
const Deals = lazy(() => import('./pages/Deals'));
const About = lazy(() => import('./pages/About'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'));

// Loading animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Loading component
const Spinner = styled.div`
  width: 40px;
  height: 40px;
  margin: 100px auto;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  animation: ${spin} 1s linear infinite;
`;

// Layout component
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Main content component
const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

// Loading container for auth routes
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

// Protected route component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Guest route component (for authentication pages)
const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

// Main App component
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Header />
        <MainContent>
          <Suspense fallback={<Spinner />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/about" element={<About />} />
              
              {/* Authentication routes */}
              <Route path="/login" element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              } />
              <Route path="/register" element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              } />
              <Route path="/forgot-password" element={
                <GuestRoute>
                  <ForgotPassword />
                </GuestRoute>
              } />
              
              {/* Protected routes */}
              <Route path="/cart" element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              } />
              <Route path="/profile/*" element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } />
              <Route path="/favorites" element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              } />
              
              {/* 404 route - Redirects to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </MainContent>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
