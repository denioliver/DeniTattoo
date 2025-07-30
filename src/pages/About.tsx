import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const AboutSection = styled.section`
  padding: ${theme.spacing['4xl']} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};
`;

const Title = styled(motion.h1)`
  font-size: ${theme.typography.fontSize['4xl']};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.primary};
`;

const Subtitle = styled(motion.p)`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};
  margin-bottom: ${theme.spacing['4xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
  }
`;

const StorySection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
`;

const Paragraph = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.md};
`;

const ImagePlaceholder = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 2px dashed ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.fontSize.lg};
  text-align: center;
  padding: ${theme.spacing.xl};
`;

const ContactSection = styled.section`
  background: ${theme.colors.surface};
  padding: ${theme.spacing['4xl']} 0;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
  }
`;

const ContactInfo = styled(motion.div)``;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
`;

const InfoIcon = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.primary}20;
  border-radius: ${theme.borderRadius.md};
`;

const InfoContent = styled.div``;

const InfoLabel = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const InfoText = styled.div`
  color: ${theme.colors.textSecondary};
`;

const MapContainer = styled(motion.div)`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  overflow: hidden;
  height: 400px;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.surface};
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.fontSize.lg};
  text-align: center;
  padding: ${theme.spacing.xl};
`;

const BusinessHours = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing['2xl']} 0;
`;

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
`;

const HourItem = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
`;

const DayName = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const HourTime = styled.div`
  color: ${theme.colors.textSecondary};
`;

export const About: React.FC = () => {
  const contactInfo = [
    {
      icon: '📍',
      label: 'Endereço',
      text: 'Rua das Artes, 123 - Centro\nSão Paulo - SP, CEP: 01234-567'
    },
    {
      icon: '📞',
      label: 'Telefone',
      text: '(11) 99999-9999'
    },
    {
      icon: '✉️',
      label: 'E-mail',
      text: 'contato@oliveiratattoo.com'
    },
    {
      icon: '📷',
      label: 'Instagram',
      text: '@oliveiratattoo'
    }
  ];

  const businessHours = [
    { day: 'Segunda', hours: '10:00 - 18:00' },
    { day: 'Terça', hours: '10:00 - 18:00' },
    { day: 'Quarta', hours: '10:00 - 18:00' },
    { day: 'Quinta', hours: '10:00 - 18:00' },
    { day: 'Sexta', hours: '10:00 - 18:00' },
    { day: 'Sábado', hours: '09:00 - 16:00' },
    { day: 'Domingo', hours: 'Fechado' }
  ];

  return (
    <>
      <AboutSection>
        <Container>
          <HeroSection>
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Sobre o Oliveira Tattoo
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Mais de uma década transformando ideias em arte permanente
            </Subtitle>
          </HeroSection>

          <ContentGrid>
            <StorySection
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionTitle>Nossa História</SectionTitle>
              <Paragraph>
                O Oliveira Tattoo nasceu em 2014 da paixão pela arte e pelo desejo de criar
                tatuagens únicas que contassem histórias. Deni Oliveira, fundador e principal
                tatuador do estúdio, começou sua jornada no mundo da tatuagem há mais de 10 anos.
              </Paragraph>
              <Paragraph>
                Especializado em diversos estilos, desde o tradicional até o realismo mais
                detalhado, nosso foco sempre foi proporcionar uma experiência completa aos
                nossos clientes, combinando arte excepcional com total segurança e conforto.
              </Paragraph>
              <Paragraph>
                Cada tatuagem é tratada como uma obra de arte única, desenvolvida em colaboração
                com o cliente para garantir que o resultado final supere todas as expectativas.
              </Paragraph>
            </StorySection>

            <ImagePlaceholder
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              📸 Foto do estúdio
              <br />
              (Substitua por uma imagem real do seu estúdio)
            </ImagePlaceholder>
          </ContentGrid>
        </Container>
      </AboutSection>

      <ContactSection>
        <Container>
          <SectionTitle style={{ textAlign: 'center', marginBottom: theme.spacing['2xl'] }}>
            Localização e Contato
          </SectionTitle>

          <ContactGrid>
            <ContactInfo
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {contactInfo.map((info, index) => (
                <InfoItem key={index}>
                  <InfoIcon>{info.icon}</InfoIcon>
                  <InfoContent>
                    <InfoLabel>{info.label}</InfoLabel>
                    <InfoText style={{ whiteSpace: 'pre-line' }}>
                      {info.text}
                    </InfoText>
                  </InfoContent>
                </InfoItem>
              ))}
            </ContactInfo>

            <MapContainer
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <MapPlaceholder>
                🗺️ Google Maps
                <br />
                (Integrar com Google Maps usando o endereço do estúdio)
                <br />
                <small>
                  Substitua por um iframe do Google Maps
                </small>
              </MapPlaceholder>
            </MapContainer>
          </ContactGrid>
        </Container>
      </ContactSection>

      <BusinessHours>
        <Container>
          <SectionTitle style={{ textAlign: 'center', marginBottom: theme.spacing['2xl'] }}>
            Horário de Funcionamento
          </SectionTitle>

          <HoursGrid>
            {businessHours.map((item, index) => (
              <HourItem key={index}>
                <DayName>{item.day}</DayName>
                <HourTime>{item.hours}</HourTime>
              </HourItem>
            ))}
          </HoursGrid>
        </Container>
      </BusinessHours>
    </>
  );
};
