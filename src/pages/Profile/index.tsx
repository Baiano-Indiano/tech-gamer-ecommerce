import React, { useState } from 'react';
import { useAuth } from '../../context/providers/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiUser, FiMapPin, FiCreditCard, FiPackage, FiHeart, FiLogOut } from 'react-icons/fi';
import { ProfileInfo, Addresses, PaymentMethods, Orders, Wishlist } from './components';

type TabType = 'profile' | 'addresses' | 'payments' | 'orders' | 'wishlist';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo />;
      case 'addresses':
        return <Addresses />;
      case 'payments':
        return <PaymentMethods />;
      case 'orders':
        return <Orders />;
      case 'wishlist':
        return <Wishlist />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <Container>
      <Sidebar>
        <ProfileInfoContainer>
          <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
          <div>
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </div>
        </ProfileInfoContainer>
        
        <Nav>
          <NavItem 
            as="button"
            type="button"
            $active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser /> Meu Perfil
          </NavItem>
          <NavItem 
            as="button"
            type="button"
            $active={activeTab === 'addresses'}
            onClick={() => setActiveTab('addresses')}
          >
            <FiMapPin /> Meus Endereços
          </NavItem>
          <NavItem 
            as="button"
            type="button"
            $active={activeTab === 'payments'}
            onClick={() => setActiveTab('payments')}
          >
            <FiCreditCard /> Pagamentos
          </NavItem>
          <NavItem 
            as="button"
            type="button"
            $active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
          >
            <FiPackage /> Meus Pedidos
          </NavItem>
          <NavItem 
            as="button"
            type="button"
            $active={activeTab === 'wishlist'}
            onClick={() => setActiveTab('wishlist')}
          >
            <FiHeart /> Lista de Desejos
          </NavItem>
          <NavItem 
            as="button"
            type="button"
            onClick={handleLogout}
            style={{ marginTop: 'auto', color: '#ef4444' }}
          >
            <FiLogOut /> Sair
          </NavItem>
        </Nav>
        
      </Sidebar>
      
      <MainContent>
        {renderTabContent()}
      </MainContent>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  background-color: #f9fafb;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  flex-shrink: 0;
  margin-right: 2rem;
  height: fit-content;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1.5rem;
    padding: 1rem;
  }
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 1rem;
  text-transform: uppercase;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const Nav = styled.nav`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  width: 100%;
  border: none;
  background: ${props => (props.$active ? '#f0f7ff' : 'transparent')};
  color: ${props => (props.$active ? '#2563eb' : '#4b5563')};
  font-weight: ${props => (props.$active ? '600' : '500')};
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  text-decoration: none;
  font-size: 0.95rem;

  &:hover {
    background-color: #f3f4f6;
    color: #2563eb;
  }

  svg {
    margin-right: 0.75rem;
    font-size: 1.1rem;
    color: ${props => (props.$active ? '#2563eb' : '#6b7280')};
  }
`;

const MainContent = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  min-height: 60vh;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 100%;
  }
`;

export default ProfilePage;
