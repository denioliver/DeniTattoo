import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { Appointment } from '../types';

// Hook específico para agendamentos
export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const appointmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];

      setAppointments(appointmentsData);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const addAppointment = async (appointment: Omit<Appointment, 'id'>): Promise<string | null> => {
    try {
      const docRef = await addDoc(collection(db, 'appointments'), appointment);

      // Update local state
      setAppointments(prev => [{
        id: docRef.id,
        ...appointment
      }, ...prev]);

      return docRef.id;
    } catch (err) {
      console.error('Error adding appointment:', err);
      setError('Erro ao adicionar agendamento');
      return null;
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>): Promise<boolean> => {
    try {
      await updateDoc(doc(db, 'appointments', id), updates);

      // Update local state
      setAppointments(prev => prev.map(appointment =>
        appointment.id === id ? { ...appointment, ...updates } : appointment
      ));

      return true;
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError('Erro ao atualizar agendamento');
      return false;
    }
  };

  const deleteAppointment = async (id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, 'appointments', id));

      // Update local state
      setAppointments(prev => prev.filter(appointment => appointment.id !== id));

      return true;
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError('Erro ao deletar agendamento');
      return false;
    }
  };

  return {
    appointments,
    loading,
    error,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    refresh: fetchAppointments
  };
}
