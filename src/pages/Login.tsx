import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { theme } from '../styles/theme';
import { useAuth } from '../hooks/useAuth';

const LoginSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background};
`;

const LoginContainer = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  width: 100%;
  max-width: 400px;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadows.xl};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['2xl']};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.primary};
`;

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.sm};
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.base};
  transition: border-color ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
`;

const SubmitButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.base};
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${theme.colors.text};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid ${theme.colors.background};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${theme.spacing.sm};
`;

const BackButton = styled.button`
  background: transparent;
  color: ${theme.colors.textSecondary};
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  margin-top: ${theme.spacing.lg};

  &:hover {
    color: ${theme.colors.text};
    border-color: ${theme.colors.primary};
  }
`;

interface LoginFormData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string>('');
  const { signIn, user, isAdmin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();

  // Redirect if already logged in and is admin
  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setLoginError('');

    try {
      await signIn(data.email, data.password);
      // Navigation will be handled by the useAuth hook and component re-render
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <LoginSection>
      <LoginContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Header>
          <Title>Área Administrativa</Title>
          <Subtitle>Faça login para acessar o painel de controle</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@oliveiratattoo.com"
              {...register('email', {
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'E-mail inválido'
                }
              })}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Senha é obrigatória',
                minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' }
              })}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </FormGroup>

          {loginError && (
            <ErrorMessage style={{ textAlign: 'center' }}>
              {loginError}
            </ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoadingSpinner />}
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </SubmitButton>
        </Form>

        <BackButton onClick={goBack}>
          ← Voltar ao Site
        </BackButton>
      </LoginContainer>
    </LoginSection>
  );
};
