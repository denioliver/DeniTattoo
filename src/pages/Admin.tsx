import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { theme } from '../styles/theme';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import type { Appointment } from '../types';

const AdminSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing['3xl']};
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  color: ${theme.colors.primary};
`;

const LogoutButton = styled.button`
  background: ${theme.colors.error};
  color: ${theme.colors.text};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  border: none;
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.error}dd;
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['3xl']};
`;

const StatCard = styled(motion.div)`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.$isActive ? theme.colors.primary : 'transparent'};
  color: ${props => props.$isActive ? theme.colors.background : theme.colors.text};
  border: 2px solid ${props => props.$isActive ? theme.colors.primary : theme.colors.border};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${props => props.$isActive ? theme.colors.background : theme.colors.primary};
  }
`;

const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const AppointmentCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  border: 1px solid ${theme.colors.border};
`;

const AppointmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const AppointmentInfo = styled.div``;

const ClientName = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const AppointmentDate = styled.div`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const StatusBadge = styled.span<{ $status: Appointment['status'] }>`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.base};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  
  ${props => {
    switch (props.$status) {
      case 'pending':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      case 'approved':
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case 'rejected':
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
        `;
      case 'completed':
        return `
          background: ${theme.colors.info}20;
          color: ${theme.colors.info};
        `;
      default:
        return `
          background: ${theme.colors.surfaceLight};
          color: ${theme.colors.textSecondary};
        `;
    }
  }}
`;

const AppointmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const DetailItem = styled.div``;

const DetailLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.xs};
`;

const DetailValue = styled.div`
  color: ${theme.colors.text};
`;

const Description = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
  margin-bottom: ${theme.spacing.lg};
`;

const DescriptionLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.sm};
`;

const DescriptionText = styled.div`
  color: ${theme.colors.text};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ $variant: 'approve' | 'reject' | 'complete' }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: none;
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  font-size: ${theme.typography.fontSize.sm};

  ${props => {
    switch (props.$variant) {
      case 'approve':
        return `
          background: ${theme.colors.success};
          color: ${theme.colors.text};
          &:hover { background: ${theme.colors.success}dd; }
        `;
      case 'reject':
        return `
          background: ${theme.colors.error};
          color: ${theme.colors.text};
          &:hover { background: ${theme.colors.error}dd; }
        `;
      case 'complete':
        return `
          background: ${theme.colors.info};
          color: ${theme.colors.text};
          &:hover { background: ${theme.colors.info}dd; }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacing['2xl']};
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacing['2xl']};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
`;

export const Admin: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Appointment['status'] | 'all'>('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Redirect if not admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const fetchAppointments = async () => {
    try {
      const appointmentsQuery = query(
        collection(db, 'appointments'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(appointmentsQuery);
      const appointmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];

      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: Appointment['status']) => {
    try {
      await updateDoc(doc(db, 'appointments', appointmentId), {
        status: newStatus
      });

      setAppointments(prev =>
        prev.map(appointment =>
          appointment.id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );

      console.log(`📋 Agendamento ${appointmentId} atualizado para: ${newStatus}`);
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const filteredAppointments = filter === 'all'
    ? appointments
    : appointments.filter(appointment => appointment.status === filter);

  const getStats = () => {
    const pending = appointments.filter(a => a.status === 'pending').length;
    const approved = appointments.filter(a => a.status === 'approved').length;
    const completed = appointments.filter(a => a.status === 'completed').length;
    const total = appointments.length;

    return { pending, approved, completed, total };
  };

  const stats = getStats();

  const getStatusLabel = (status: Appointment['status']) => {
    const labels = {
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Rejeitado',
      completed: 'Concluído'
    };
    return labels[status];
  };

  if (loading) {
    return (
      <AdminSection>
        <Container>
          <LoadingMessage>Carregando agendamentos...</LoadingMessage>
        </Container>
      </AdminSection>
    );
  }

  return (
    <AdminSection>
      <Container>
        <Header>
          <Title>Painel Administrativo</Title>
          <LogoutButton onClick={handleLogout}>
            Sair
          </LogoutButton>
        </Header>

        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>Total</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatNumber>{stats.pending}</StatNumber>
            <StatLabel>Pendentes</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatNumber>{stats.approved}</StatNumber>
            <StatLabel>Aprovados</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatNumber>{stats.completed}</StatNumber>
            <StatLabel>Concluídos</StatLabel>
          </StatCard>
        </StatsGrid>

        <FilterSection>
          <FilterButton
            $isActive={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            Todos
          </FilterButton>
          <FilterButton
            $isActive={filter === 'pending'}
            onClick={() => setFilter('pending')}
          >
            Pendentes
          </FilterButton>
          <FilterButton
            $isActive={filter === 'approved'}
            onClick={() => setFilter('approved')}
          >
            Aprovados
          </FilterButton>
          <FilterButton
            $isActive={filter === 'completed'}
            onClick={() => setFilter('completed')}
          >
            Concluídos
          </FilterButton>
          <FilterButton
            $isActive={filter === 'rejected'}
            onClick={() => setFilter('rejected')}
          >
            Rejeitados
          </FilterButton>
        </FilterSection>

        <AppointmentsList>
          {filteredAppointments.length === 0 ? (
            <EmptyMessage>
              {filter === 'all'
                ? 'Nenhum agendamento encontrado.'
                : `Nenhum agendamento ${getStatusLabel(filter as Appointment['status']).toLowerCase()} encontrado.`
              }
            </EmptyMessage>
          ) : (
            filteredAppointments.map((appointment, index) => (
              <AppointmentCard
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AppointmentHeader>
                  <AppointmentInfo>
                    <ClientName>{appointment.name}</ClientName>
                    <AppointmentDate>
                      {dayjs(appointment.date).format('DD/MM/YYYY')} às {appointment.time}
                    </AppointmentDate>
                  </AppointmentInfo>
                  <StatusBadge $status={appointment.status}>
                    {getStatusLabel(appointment.status)}
                  </StatusBadge>
                </AppointmentHeader>

                <AppointmentDetails>
                  <DetailItem>
                    <DetailLabel>E-mail</DetailLabel>
                    <DetailValue>{appointment.email}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Telefone</DetailLabel>
                    <DetailValue>{appointment.phone}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Data do Agendamento</DetailLabel>
                    <DetailValue>
                      {dayjs(appointment.createdAt instanceof Date
                        ? appointment.createdAt
                        : appointment.createdAt.toDate()).format('DD/MM/YYYY HH:mm')}
                    </DetailValue>
                  </DetailItem>
                </AppointmentDetails>

                <Description>
                  <DescriptionLabel>Descrição da Ideia:</DescriptionLabel>
                  <DescriptionText>{appointment.description}</DescriptionText>
                </Description>

                {appointment.status === 'pending' && (
                  <ActionButtons>
                    <ActionButton
                      $variant="approve"
                      onClick={() => updateAppointmentStatus(appointment.id!, 'approved')}
                    >
                      ✓ Aprovar
                    </ActionButton>
                    <ActionButton
                      $variant="reject"
                      onClick={() => updateAppointmentStatus(appointment.id!, 'rejected')}
                    >
                      ✕ Rejeitar
                    </ActionButton>
                  </ActionButtons>
                )}

                {appointment.status === 'approved' && (
                  <ActionButtons>
                    <ActionButton
                      $variant="complete"
                      onClick={() => updateAppointmentStatus(appointment.id!, 'completed')}
                    >
                      ✓ Marcar como Concluído
                    </ActionButton>
                  </ActionButtons>
                )}
              </AppointmentCard>
            ))
          )}
        </AppointmentsList>
      </Container>
    </AdminSection>
  );
};
