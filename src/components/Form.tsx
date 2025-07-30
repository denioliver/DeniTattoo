import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label<{ $required?: boolean }>`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.sm};
  
  ${props => props.$required && `
    &::after {
      content: ' *';
      color: ${theme.colors.error};
    }
  `}
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  padding: ${theme.spacing.md};
  border: 2px solid ${props => props.$hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.base};
  transition: border-color ${theme.transitions.fast};
  font-family: inherit;

  &:focus {
    border-color: ${props => props.$hasError ? theme.colors.error : theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${theme.colors.surface};
  }
`;

const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: ${theme.spacing.md};
  border: 2px solid ${props => props.$hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.base};
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color ${theme.transitions.fast};

  &:focus {
    border-color: ${props => props.$hasError ? theme.colors.error : theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${theme.colors.surface};
  }
`;

const StyledSelect = styled.select<{ $hasError?: boolean }>`
  padding: ${theme.spacing.md};
  border: 2px solid ${props => props.$hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.base};
  transition: border-color ${theme.transitions.fast};
  font-family: inherit;

  &:focus {
    border-color: ${props => props.$hasError ? theme.colors.error : theme.colors.primary};
    outline: none;
  }

  option {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${theme.colors.surface};
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
`;

const HelpText = styled.span`
  color: ${theme.colors.textMuted};
  font-size: ${theme.typography.fontSize.sm};
`;

interface BaseInputProps {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

interface InputProps extends BaseInputProps, React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'date' | 'time';
}

interface TextAreaProps extends BaseInputProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

interface SelectProps extends BaseInputProps, React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  required,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <InputGroup>
      {label && (
        <Label htmlFor={inputId} $required={required}>
          {label}
        </Label>
      )}
      <StyledInput
        id={inputId}
        $hasError={!!error}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helpText && !error && <HelpText>{helpText}</HelpText>}
    </InputGroup>
  );
};

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helpText,
  required,
  id,
  ...props
}) => {
  const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <InputGroup>
      {label && (
        <Label htmlFor={inputId} $required={required}>
          {label}
        </Label>
      )}
      <StyledTextArea
        id={inputId}
        $hasError={!!error}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helpText && !error && <HelpText>{helpText}</HelpText>}
    </InputGroup>
  );
};

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helpText,
  required,
  id,
  children,
  ...props
}) => {
  const inputId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <InputGroup>
      {label && (
        <Label htmlFor={inputId} $required={required}>
          {label}
        </Label>
      )}
      <StyledSelect
        id={inputId}
        $hasError={!!error}
        {...props}
      >
        {children}
      </StyledSelect>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helpText && !error && <HelpText>{helpText}</HelpText>}
    </InputGroup>
  );
};
