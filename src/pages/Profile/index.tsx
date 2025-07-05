import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
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
            $active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile' as TabType)}
          >
            <FiUser /> Meu Perfil
          </NavItem>
          <NavItem 
            $active={activeTab === 'addresses'}
            onClick={() => setActiveTab('addresses' as TabType)}
          >
            <FiMapPin /> Meus Endereços
          </NavItem>
          <NavItem 
            $active={activeTab === 'payments'}
            onClick={() => setActiveTab('payments' as TabType)}
          >
            <FiCreditCard /> Pagamentos
          </NavItem>
          <NavItem 
            $active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders' as TabType)}
          >
            <FiPackage /> Meus Pedidos
          </NavItem>
          <NavItem 
            $active={activeTab === 'wishlist'}
            onClick={() => setActiveTab('wishlist' as TabType)}
          >
            <FiHeart /> Lista de Desejos
          </NavItem>
        </Nav>
        
        <LogoutButton onClick={handleLogout}>
          <FiLogOut /> Sair
        </LogoutButton>
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
  min-height: calc(100vh - 60px);
  background-color: #f9fafb;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
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

const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${({ $active }) => ($active ? '#2563eb' : '#4b5563')};
  background-color: ${({ $active }) => ($active ? '#eff6ff' : 'transparent')};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
    color: #1d4ed8;
  }
  
  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

const LogoutButton = styled(NavItem)`
  color: #dc2626;
  margin-top: 1rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  
  &:hover {
    color: #b91c1c;
    background: #fef2f2;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

export default ProfilePage;
