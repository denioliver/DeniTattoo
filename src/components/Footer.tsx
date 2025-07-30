import React from 'react';
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

const FooterLink = styled.a`
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.sm};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${theme.colors.surfaceLight};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.textSecondary};
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
    transform: translateY(-2px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.border};
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.fontSize.sm};
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Oliveira Tattoo</FooterTitle>
          <FooterText>
            Estúdio especializado em tatuagens artísticas de alta qualidade.
            Transformamos suas ideias em arte permanente com técnicas profissionais
            e materiais de primeira linha.
          </FooterText>
          <SocialLinks>
            <SocialLink
              href="https://instagram.com/oliveiratattoo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              📷
            </SocialLink>
            <SocialLink
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              💬
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contato</FooterTitle>
          <ContactInfo>
            <ContactItem>
              📍 Rua das Artes, 123 - Centro, São Paulo - SP
            </ContactItem>
            <ContactItem>
              📞 (11) 99999-9999
            </ContactItem>
            <ContactItem>
              ✉️ contato@oliveiratattoo.com
            </ContactItem>
            <ContactItem>
              🕒 Seg-Sex: 10h às 18h | Sáb: 9h às 16h
            </ContactItem>
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Serviços</FooterTitle>
          <FooterLink href="/portfolio">Tatuagem Tradicional</FooterLink>
          <FooterLink href="/portfolio">Realismo</FooterLink>
          <FooterLink href="/portfolio">Blackwork</FooterLink>
          <FooterLink href="/portfolio">Minimalista</FooterLink>
          <FooterLink href="/portfolio">Geométrica</FooterLink>
          <FooterLink href="/agendamento">Consulta Gratuita</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Links Úteis</FooterTitle>
          <FooterLink href="/sobre">Sobre o Estúdio</FooterLink>
          <FooterLink href="/portfolio">Portfólio</FooterLink>
          <FooterLink href="/agendamento">Agendar Consulta</FooterLink>
          <FooterLink href="/cuidados">Cuidados Pós-Tatuagem</FooterLink>
          <FooterLink href="/admin">Área Administrativa</FooterLink>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; 2025 Oliveira Tattoo. Todos os direitos reservados.</p>
      </Copyright>
    </FooterContainer>
  );
};
