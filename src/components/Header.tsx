import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${theme.colors.background}ee;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.md} 0;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link) <{ $isActive: boolean }>`
  color: ${props => props.$isActive ? theme.colors.primary : theme.colors.text};
  font-weight: ${props => props.$isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal};
  text-decoration: none;
  position: relative;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primary};
  }

  ${props => props.$isActive && `
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${theme.colors.primary};
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.xl};
  padding: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNavLink = styled(Link) <{ $isActive: boolean }>`
  color: ${props => props.$isActive ? theme.colors.primary : theme.colors.text};
  font-weight: ${props => props.$isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.normal};
  text-decoration: none;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const CTAButton = styled(Link)`
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-decoration: none;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.text};
    color: ${theme.colors.background};
    transform: translateY(-2px);
  }
`;

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/portfolio', label: 'Portfólio' },
    { path: '/contato', label: 'Contato' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">Oliveira Tattoo</Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
          <CTAButton to="/agendamento">Agendar</CTAButton>
        </NavLinks>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>

      {isMobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {navItems.map((item) => (
            <MobileNavLink
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </MobileNavLink>
          ))}
          <CTAButton
            to="/agendamento"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Agendar
          </CTAButton>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};
