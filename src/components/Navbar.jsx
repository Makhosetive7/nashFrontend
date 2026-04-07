import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background: ${props => props.theme.colors.primary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavbarWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 28px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.primary};
    flex-direction: column;
    padding: 20px;
    gap: 16px;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
  background: ${props => props.$active ? props.theme.colors.secondary : 'transparent'};

  &:hover {
    background: ${props => props.$active ? props.theme.colors.secondary : 'rgba(255, 255, 255, 0.1)'};
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const GetStartedButton = styled(Link)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.primary};
  padding: 10px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <LogoLink to="/" onClick={closeMenu}>
          <Logo>
            <span>🛒</span>
            NashMart
          </Logo>
        </LogoLink>

        <MenuButton onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </MenuButton>

        <NavLinks $isOpen={isOpen}>
          <NavLink 
            to="/" 
            $active={location.pathname === '/'}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/dashboard" 
            $active={location.pathname === '/dashboard'}
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/products" 
            $active={location.pathname === '/products'}
            onClick={closeMenu}
          >
            Products
          </NavLink>
          <NavLink 
            to="/sales" 
            $active={location.pathname === '/sales'}
            onClick={closeMenu}
          >
            Sales
          </NavLink>
          <GetStartedButton to="/dashboard" onClick={closeMenu}>
            Get Started
          </GetStartedButton>
        </NavLinks>
      </NavbarWrapper>
    </NavbarContainer>
  );
}

export default Navbar;