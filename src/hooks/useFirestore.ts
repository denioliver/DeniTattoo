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
  type OrderByDirection
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

export function useFirestore<T extends { id: string }>(
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

      let q: any = collection(db, collectionName);

      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection));
      }

      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((docItem: any) => {
        const data = docItem.data();
        return {
          id: docItem.id,
          ...data
        };
      }) as T[];

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
      await updateDoc(doc(db, collectionName, id), updates as any);

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
