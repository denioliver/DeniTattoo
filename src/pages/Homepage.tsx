import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${theme.colors.background} 0%,
    ${theme.colors.surface} 100%
  );
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="tattoo-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M10 0L20 10L10 20L0 10Z" fill="%23FF6B35" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23tattoo-pattern)"/></svg>');
  background-size: 100px 100px;
  opacity: 0.3;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  max-width: 800px;
  padding: 0 ${theme.spacing.md};
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(${theme.typography.fontSize['4xl']}, 8vw, ${theme.typography.fontSize['6xl']});
  font-weight: ${theme.typography.fontWeight.extrabold};
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.text});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: ${theme.typography.lineHeight.tight};
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing['2xl']};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  text-decoration: none;
  transition: all ${theme.transitions.normal};
  box-shadow: ${theme.shadows.lg};

  &:hover {
    background: ${theme.colors.text};
    color: ${theme.colors.background};
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: ${theme.colors.text};
  padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  text-decoration: none;
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const FeaturesSection = styled.section`
  padding: ${theme.spacing['4xl']} 0;
  background: ${theme.colors.surface};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['3xl']};
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
  color: ${theme.colors.primary};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

const FeatureCard = styled(motion.div)`
  background: ${theme.colors.background};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  text-align: center;
  border: 1px solid ${theme.colors.border};
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  font-size: ${theme.typography.fontSize['4xl']};
  margin-bottom: ${theme.spacing.lg};
`;

const FeatureTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const StatsSection = styled.section`
  padding: ${theme.spacing['4xl']} 0;
  background: ${theme.colors.background};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.xl};
  text-align: center;
`;

const StatCard = styled(motion.div)`
  padding: ${theme.spacing.xl};
`;

const StatNumber = styled.div`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textSecondary};
`;

export const Homepage: React.FC = () => {
  const features = [
    {
      icon: '🎨',
      title: 'Arte Personalizada',
      description: 'Cada tatuagem é única e desenvolvida especialmente para você, respeitando seu estilo e personalidade.'
    },
    {
      icon: '🏆',
      title: 'Qualidade Premium',
      description: 'Utilizamos apenas os melhores equipamentos e tintas importadas para garantir o melhor resultado.'
    },
    {
      icon: '🛡️',
      title: 'Segurança Total',
      description: 'Ambiente 100% esterilizado e materiais descartáveis para sua total segurança e tranquilidade.'
    },
    {
      icon: '👨‍🎨',
      title: 'Experiência',
      description: 'Mais de 10 anos de experiência criando tatuagens que contam histórias e expressam identidade.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Clientes Satisfeitos' },
    { number: '10+', label: 'Anos de Experiência' },
    { number: '500+', label: 'Projetos Únicos' },
    { number: '100%', label: 'Segurança' }
  ];

  return (
    <>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Arte na Pele,
            <br />
            Histórias para Vida
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforme suas ideias em tatuagens únicas e profissionais.
            Qualidade, segurança e arte em cada trabalho.
          </HeroSubtitle>
          <CTAButtons
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PrimaryButton to="/agendamento">
              Agendar Consulta
            </PrimaryButton>
            <SecondaryButton to="/portfolio">
              Ver Portfólio
            </SecondaryButton>
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Por que escolher o Oliveira Tattoo?</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      <StatsSection>
        <Container>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </Container>
      </StatsSection>
    </>
  );
};
