import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import type { TattooStyle } from '../types';

const PortfolioSection = styled.section`
  padding: ${theme.spacing['4xl']} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
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

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing['3xl']};
`;

const FilterButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  background: ${props => props.$isActive ? theme.colors.primary : 'transparent'};
  color: ${props => props.$isActive ? theme.colors.background : theme.colors.text};
  border: 2px solid ${props => props.$isActive ? theme.colors.primary : theme.colors.border};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${props => props.$isActive ? theme.colors.background : theme.colors.primary};
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const ImageCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
  cursor: pointer;
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.lg};
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.fontSize.lg};
  text-align: center;
  border-bottom: 1px solid ${theme.colors.border};
`;

const ImageInfo = styled.div`
  padding: ${theme.spacing.lg};
`;

const ImageTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};
`;

const ImageStyle = styled.span`
  display: inline-block;
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.base};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing.sm};
`;

const ImageDescription = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  border: none;
  border-radius: ${theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.lg};
  z-index: 1;

  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 400px;
  background: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.fontSize.xl};
  text-align: center;
  border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
`;

const ModalInfo = styled.div`
  padding: ${theme.spacing.xl};
`;

const ModalTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const ModalDescription = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.lg};
`;

interface TattooWork {
  id: string;
  title: string;
  style: TattooStyle;
  description: string;
  imageUrl?: string;
}

export const Portfolio: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<TattooStyle | 'all'>('all');
  const [selectedImage, setSelectedImage] = useState<TattooWork | null>(null);

  const filters: Array<{ value: TattooStyle | 'all'; label: string }> = [
    { value: 'all', label: 'Todos' },
    { value: 'traditional', label: 'Tradicional' },
    { value: 'realism', label: 'Realismo' },
    { value: 'blackwork', label: 'Blackwork' },
    { value: 'minimal', label: 'Minimalista' },
    { value: 'geometric', label: 'Geométrica' },
    { value: 'watercolor', label: 'Aquarela' },
    { value: 'tribal', label: 'Tribal' },
    { value: 'japanese', label: 'Japonesa' },
    { value: 'oldschool', label: 'Old School' },
    { value: 'newschool', label: 'New School' }
  ];

  // Dados de exemplo - substitua por dados reais do Firebase
  const tattooWorks: TattooWork[] = [
    {
      id: '1',
      title: 'Rosa Realista',
      style: 'realism',
      description: 'Tatuagem realista de uma rosa vermelha no antebraço, com sombreado detalhado e cores vibrantes.'
    },
    {
      id: '2',
      title: 'Mandala Geométrica',
      style: 'geometric',
      description: 'Design geométrico complexo inspirado em mandalas tradicionais, criado especialmente para o cliente.'
    },
    {
      id: '3',
      title: 'Leão Blackwork',
      style: 'blackwork',
      description: 'Leão majestoso em estilo blackwork, usando apenas tinta preta com técnicas de sombreado únicas.'
    },
    {
      id: '4',
      title: 'Borboleta Minimalista',
      style: 'minimal',
      description: 'Design clean e minimalista de uma borboleta, perfeito para quem busca elegância discreta.'
    },
    {
      id: '5',
      title: 'Dragão Tradicional',
      style: 'traditional',
      description: 'Tatuagem tradicional americana de um dragão, com cores sólidas e contornos marcantes.'
    },
    {
      id: '6',
      title: 'Carpa Japonesa',
      style: 'japanese',
      description: 'Carpa koi em estilo japonês tradicional, com ondas e flores de cerejeira ao fundo.'
    },
    {
      id: '7',
      title: 'Flor Aquarela',
      style: 'watercolor',
      description: 'Técnica de aquarela aplicada em uma delicada flor de lótus, com efeitos de tinta derramada.'
    },
    {
      id: '8',
      title: 'Tribal Moderno',
      style: 'tribal',
      description: 'Padrão tribal modernizado com elementos contemporâneos, mantendo a essência ancestral.'
    }
  ];

  const filteredWorks = selectedFilter === 'all'
    ? tattooWorks
    : tattooWorks.filter(work => work.style === selectedFilter);

  const getStyleLabel = (style: TattooStyle): string => {
    const filter = filters.find(f => f.value === style);
    return filter ? filter.label : style;
  };

  return (
    <>
      <PortfolioSection>
        <Container>
          <Header>
            <Title
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Portfólio
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore nossa coleção de trabalhos únicos e descubra o estilo perfeito para sua próxima tatuagem
            </Subtitle>
          </Header>

          <FilterSection>
            <FilterButtons>
              {filters.map((filter) => (
                <FilterButton
                  key={filter.value}
                  $isActive={selectedFilter === filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                >
                  {filter.label}
                </FilterButton>
              ))}
            </FilterButtons>
          </FilterSection>

          <Gallery>
            <AnimatePresence mode="wait">
              {filteredWorks.map((work, index) => (
                <ImageCard
                  key={work.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedImage(work)}
                >
                  <ImagePlaceholder>
                    🎨 {work.title}
                    <br />
                    <small>(Substituir por imagem real)</small>
                  </ImagePlaceholder>
                  <ImageInfo>
                    <ImageStyle>{getStyleLabel(work.style)}</ImageStyle>
                    <ImageTitle>{work.title}</ImageTitle>
                    <ImageDescription>
                      {work.description.substring(0, 100)}...
                    </ImageDescription>
                  </ImageInfo>
                </ImageCard>
              ))}
            </AnimatePresence>
          </Gallery>
        </Container>
      </PortfolioSection>

      <AnimatePresence>
        {selectedImage && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedImage(null)}>
                ✕
              </CloseButton>
              <ModalImage>
                🎨 {selectedImage.title}
                <br />
                <small>(Imagem em alta resolução)</small>
              </ModalImage>
              <ModalInfo>
                <ImageStyle>{getStyleLabel(selectedImage.style)}</ImageStyle>
                <ModalTitle>{selectedImage.title}</ModalTitle>
                <ModalDescription>{selectedImage.description}</ModalDescription>
              </ModalInfo>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};
