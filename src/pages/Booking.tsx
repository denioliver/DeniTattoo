import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { theme } from '../styles/theme';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import type { Appointment } from '../types';

const BookingSection = styled.section`
  padding: ${theme.spacing['4xl']} 0;
  min-height: 80vh;
`;

const Container = styled.div`
  max-width: 800px;
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
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const FormContainer = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  border: 1px solid ${theme.colors.border};
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

const TextArea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.base};
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const Select = styled.select`
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

  option {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.xs};
`;

const SubmitButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  margin-top: ${theme.spacing.lg};

  &:hover:not(:disabled) {
    background: ${theme.colors.text};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: ${theme.colors.success}20;
  border: 1px solid ${theme.colors.success};
  color: ${theme.colors.success};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  margin-top: ${theme.spacing.lg};
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

const InfoBox = styled.div`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const InfoTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const InfoText = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing.sm};
`;

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  description: string;
}

export const Booking: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BookingFormData>();

  // Horários disponíveis
  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Data mínima (hoje) e máxima (3 meses à frente)
  const minDate = dayjs().format('YYYY-MM-DD');
  const maxDate = dayjs().add(3, 'month').format('YYYY-MM-DD');

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const appointmentData: Omit<Appointment, 'id'> = {
        ...data,
        status: 'pending',
        createdAt: new Date()
      };

      await addDoc(collection(db, 'appointments'), appointmentData);

      setIsSuccess(true);
      reset();

      // Simular notificação
      console.log('📧 Novo agendamento recebido:', appointmentData);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      setSubmitError('Erro ao enviar agendamento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BookingSection>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Agendar Consulta
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Vamos criar sua tatuagem única. Preencha o formulário e entraremos em contato.
          </Subtitle>
        </Header>

        <FormContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <InfoBox>
            <InfoTitle>Como funciona o agendamento?</InfoTitle>
            <InfoText>
              1. Preencha o formulário com suas informações e ideia da tatuagem
            </InfoText>
            <InfoText>
              2. Analisaremos sua solicitação e entraremos em contato em até 24h
            </InfoText>
            <InfoText>
              3. Agendaremos uma consulta presencial gratuita para discutir o projeto
            </InfoText>
            <InfoText>
              4. Criamos o design personalizado e marcamos a sessão de tatuagem
            </InfoText>
          </InfoBox>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  {...register('name', {
                    required: 'Nome é obrigatório',
                    minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                  })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
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
            </FormRow>

            <FormGroup>
              <Label htmlFor="phone">Telefone/WhatsApp *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                {...register('phone', {
                  required: 'Telefone é obrigatório',
                  minLength: { value: 10, message: 'Telefone inválido' }
                })}
              />
              {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="date">Data Preferida *</Label>
                <Input
                  id="date"
                  type="date"
                  min={minDate}
                  max={maxDate}
                  {...register('date', { required: 'Data é obrigatória' })}
                />
                {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="time">Horário Preferido *</Label>
                <Select
                  id="time"
                  {...register('time', { required: 'Horário é obrigatório' })}
                >
                  <option value="">Selecione um horário</option>
                  {availableTimes.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
                {errors.time && <ErrorMessage>{errors.time.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="description">Descrição da Ideia *</Label>
              <TextArea
                id="description"
                placeholder="Descreva sua ideia de tatuagem: estilo, tamanho, localização no corpo, cores, elementos específicos, referências..."
                {...register('description', {
                  required: 'Descrição é obrigatória',
                  minLength: { value: 20, message: 'Descrição deve ter pelo menos 20 caracteres' }
                })}
              />
              {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </FormGroup>

            {submitError && (
              <ErrorMessage style={{ textAlign: 'center', fontSize: theme.typography.fontSize.base }}>
                {submitError}
              </ErrorMessage>
            )}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting && <LoadingSpinner />}
              {isSubmitting ? 'Enviando...' : 'Enviar Agendamento'}
            </SubmitButton>

            {isSuccess && (
              <SuccessMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                ✅ Agendamento enviado com sucesso!
                <br />
                Entraremos em contato em até 24 horas.
              </SuccessMessage>
            )}
          </Form>
        </FormContainer>
      </Container>
    </BookingSection>
  );
};
