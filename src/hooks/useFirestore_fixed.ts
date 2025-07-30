import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  where,
  onSnapshot,
  type DocumentData,
  type OrderByDirection,
  type WhereFilterOp
} from 'firebase/firestore';
import { db } from '../firebase/config';

interface UseFirestoreOptions {
  orderByField?: string;
  orderDirection?: OrderByDirection;
}

interface UseFirestoreReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  add: (document: Omit<T, 'id'>) => Promise<string | null>;
  update: (id: string, updates: Partial<T>) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
  refresh: () => void;
}

export function useFirestore<T extends DocumentData & { id: string }>(
  collectionName: string,
  options: UseFirestoreOptions = {}
): UseFirestoreReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { orderByField, orderDirection = 'desc' } = options;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let q = collection(db, collectionName);

      if (orderByField) {
        // @ts-ignore - Firebase types issue with query composition
        q = query(q, orderBy(orderByField, orderDirection));
      }

      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];

      setData(documents);
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(`Erro ao carregar ${collectionName}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionName, orderByField, orderDirection]);

  const add = async (document: Omit<T, 'id'>): Promise<string | null> => {
    try {
      const docRef = await addDoc(collection(db, collectionName), document);

      // Update local state
      setData(prev => [{
        id: docRef.id,
        ...document
      } as T, ...prev]);

      return docRef.id;
    } catch (err) {
      console.error(`Error adding document to ${collectionName}:`, err);
      setError(`Erro ao adicionar documento`);
      return null;
    }
  };

  const update = async (id: string, updates: Partial<T>): Promise<boolean> => {
    try {
      // @ts-ignore - Firebase types issue with updateDoc
      await updateDoc(doc(db, collectionName, id), updates);

      // Update local state
      setData(prev => prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ));

      return true;
    } catch (err) {
      console.error(`Error updating document in ${collectionName}:`, err);
      setError(`Erro ao atualizar documento`);
      return false;
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, collectionName, id));

      // Update local state
      setData(prev => prev.filter(item => item.id !== id));

      return true;
    } catch (err) {
      console.error(`Error deleting document from ${collectionName}:`, err);
      setError(`Erro ao excluir documento`);
      return false;
    }
  };

  const refresh = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    add,
    update,
    remove,
    refresh
  };
}

// Hook específico para buscar documentos com filtros em tempo real
export function useFirestoreQuery<T extends DocumentData & { id: string }>(
  collectionName: string,
  orderByField?: string,
  orderDirection: OrderByDirection = 'desc'
): UseFirestoreReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let q = collection(db, collectionName);

        if (orderByField) {
          // @ts-ignore - Firebase types issue
          q = query(q, orderBy(orderByField, orderDirection));
        }

        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];

        setData(documents);
      } catch (err) {
        console.error(`Error fetching ${collectionName}:`, err);
        setError(`Erro ao carregar ${collectionName}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, orderByField, orderDirection]);

  return {
    data,
    loading,
    error,
    add: async () => null,
    update: async () => false,
    remove: async () => false,
    refresh: () => { }
  };
}

// Hook para buscar com filtros específicos
export function useFirestoreWhere<T extends DocumentData & { id: string }>(
  collectionName: string,
  field: string,
  // @ts-ignore - Firebase types issue
  operator: WhereFilterOp,
  // @ts-ignore - Firebase types issue
  value: unknown,
  orderByField?: string,
  orderDirection: OrderByDirection = 'desc'
): { data: T[]; loading: boolean; error: string | null } {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let q = collection(db, collectionName);

        // Apply where filter
        q = query(q, where(field, operator, value));

        if (orderByField) {
          // @ts-ignore - Firebase types issue
          q = query(q, orderBy(orderByField, orderDirection));
        }

        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];

        setData(documents);
      } catch (err) {
        console.error(`Error fetching ${collectionName} with filter:`, err);
        setError(`Erro ao carregar ${collectionName}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, field, operator, value, orderByField, orderDirection]);

  return { data, loading, error };
}

// Hook para escutar mudanças em tempo real
export function useFirestoreRealtime<T extends DocumentData & { id: string }>(
  collectionName: string,
  orderByField?: string,
  orderDirection: OrderByDirection = 'desc'
): { data: T[]; loading: boolean; error: string | null } {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let q = collection(db, collectionName);

    if (orderByField) {
      // @ts-ignore - Firebase types issue
      q = query(q, orderBy(orderByField, orderDirection));
    }

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];

        setData(documents);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`Error listening to ${collectionName}:`, err);
        setError(`Erro ao escutar mudanças em ${collectionName}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, orderByField, orderDirection]);

  return { data, loading, error };
}
