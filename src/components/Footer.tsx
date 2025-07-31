import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const FooterContainer = styled.footer`
  background: ${theme.colors.surface};
  border-top: 1px solid ${theme.colors.border};
  padding: ${theme.spacing['2xl']} 0 ${theme.spacing.lg};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FooterTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.sm};
`;

const FooterText = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const FooterRouterLink = styled(Link)`
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const SocialLink = styled.a`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.xl};
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Copyright = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Oliveira Tattoo</FooterTitle>
          <FooterText>
            Transformando pele em arte desde 2020. Especializada em tatuagens realistas, 
            tribais e personalizadas. Cada trabalho é único e feito com paixão e dedicação.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://instagram.com/oliveiratattoo" target="_blank" rel="noopener noreferrer">
              📷
            </SocialLink>
            <SocialLink href="https://facebook.com/oliveiratattoo" target="_blank" rel="noopener noreferrer">
              📘
            </SocialLink>
            <SocialLink href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              💬
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Navegação</FooterTitle>
          <FooterRouterLink to="/sobre">Sobre o Estúdio</FooterRouterLink>
          <FooterRouterLink to="/portfolio">Portfólio</FooterRouterLink>
          <FooterRouterLink to="/agendamento">Agendar Consulta</FooterRouterLink>
          <FooterRouterLink to="/admin">Área Administrativa</FooterRouterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contato</FooterTitle>
          <ContactInfo>
            📍 Rua das Artes, 123 - Centro, São Paulo/SP
          </ContactInfo>
          <ContactInfo>
            📞 (11) 99999-9999
          </ContactInfo>
          <ContactInfo>
            ✉️ contato@oliveiratattoo.com
          </ContactInfo>
          <ContactInfo>
            🕒 Seg-Sáb: 9h às 18h
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Serviços</FooterTitle>
          <FooterText>• Tatuagens Realistas</FooterText>
          <FooterText>• Tatuagens Tribais</FooterText>
          <FooterText>• Tatuagens Personalizadas</FooterText>
          <FooterText>• Cover-up</FooterText>
          <FooterText>• Restauração de Tatuagens</FooterText>
          <FooterText>• Consultoria e Orçamentos</FooterText>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; 2025 Oliveira Tattoo. Todos os direitos reservados.</p>
      </Copyright>
    </FooterContainer>
  );
};
