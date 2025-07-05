import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiShoppingCart, FiUser, FiHeart } from 'react-icons/fi';
import SearchBar from '../SearchBar';

const HeaderContainer = styled.header`
  background-color: #2563eb;
  color: #ffffff;
  padding: 1.6rem 5%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  
  @media (max-width: 1024px) {
    padding: 1.6rem 3.2rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem 2.4rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 1.6rem;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    max-width: 400px;
  }
  
  @media (max-width: 768px) {
    grid-area: search;
    max-width: 100%;
    order: 3;
  }
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2.4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: auto 1fr auto;
    gap: 1.6rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr auto;
    grid-template-areas: 
      'logo menu'
      'search search';
    row-gap: 1.6rem;
  }
`;

const Logo = styled(Link)`
  font-size: 2.4rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    grid-area: logo;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 1024px) {
    gap: 1.6rem;
  }
  
  @media (max-width: 768px) {
    grid-area: menu;
    justify-self: end;
    gap: 1.2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
  
  & > li {
    margin: 0;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 500;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  white-space: nowrap;
  padding: 0.8rem;
  border-radius: 0.4rem;
  
  &:hover, &:focus {
    opacity: 0.9;
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 1.4rem;
  }
`;

const CartCount = styled.span`
  background-color: #1e40af;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-left: 0.4rem;
`;

const Header = () => {
  // TODO: Implementar contagem real do carrinho usando o contexto do carrinho
  const cartCount = 0;

  const handleSearch = (query: string) => {
    console.log('Pesquisando por:', query);
    // TODO: Implementar navegação ou filtro de pesquisa
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">TechGamer</Logo>
        
        <SearchContainer>
          <SearchBar onSearch={handleSearch} />
        </SearchContainer>
        
        <NavLinks as="ul">
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className="nav-icon" aria-label="Favorites">
              <FiHeart size={20} aria-hidden="true" />
              <span className="sr-only">Favorites</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="nav-icon" aria-label="Shopping Cart">
              <FiShoppingCart size={20} aria-hidden="true" />
              {cartCount > 0 && <CartCount aria-hidden="true">{cartCount}</CartCount>}
              <span className="sr-only">Cart {cartCount > 0 ? `(${cartCount} items)` : ''}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="nav-icon" aria-label="My Account">
              <FiUser size={20} aria-hidden="true" />
              <span className="sr-only">My Account</span>
            </NavLink>
          </li>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
