import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div<{ $fullScreen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
  ${props => props.$fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.background};
    z-index: 9999;
  `}
  ${props => !props.$fullScreen && `
    padding: ${theme.spacing['2xl']};
  `}
`;

const Spinner = styled.div<{ $size?: 'sm' | 'md' | 'lg' }>`
  width: ${props => {
    switch (props.$size) {
      case 'sm': return '20px';
      case 'lg': return '60px';
      default: return '40px';
    }
  }};
  height: ${props => {
    switch (props.$size) {
      case 'sm': return '20px';
      case 'lg': return '60px';
      default: return '40px';
    }
  }};
  border: 3px solid ${theme.colors.border};
  border-top: 3px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.base};
  text-align: center;
`;

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Loading: React.FC<LoadingProps> = ({
  text = 'Carregando...',
  fullScreen = false,
  size = 'md'
}) => {
  return (
    <LoaderContainer $fullScreen={fullScreen}>
      <Spinner $size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </LoaderContainer>
  );
};
