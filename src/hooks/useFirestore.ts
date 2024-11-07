import { useState, useEffect } from 'react';
import { 
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export function useFirestore<T extends { id?: string }>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, `users/${currentUser.uid}/${collectionName}`),
      orderBy('dateCreation', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const items: T[] = [];
        snapshot.forEach((doc) => {
          items.push({ ...doc.data(), id: doc.id } as T);
        });
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching collection:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, currentUser]);

  const add = async (item: Omit<T, 'id'>) => {
    if (!currentUser) throw new Error('No authenticated user');
    
    try {
      const docRef = await addDoc(
        collection(db, `users/${currentUser.uid}/${collectionName}`),
        {
          ...item,
          dateCreation: new Date().toISOString(),
          userId: currentUser.uid
        }
      );
      return docRef.id;
    } catch (err) {
      console.error('Error adding document:', err);
      throw err;
    }
  };

  const update = async (id: string, item: Partial<T>) => {
    if (!currentUser) throw new Error('No authenticated user');
    
    try {
      await updateDoc(
        doc(db, `users/${currentUser.uid}/${collectionName}`, id),
        item
      );
    } catch (err) {
      console.error('Error updating document:', err);
      throw err;
    }
  };

  const remove = async (id: string) => {
    if (!currentUser) throw new Error('No authenticated user');
    
    try {
      await deleteDoc(
        doc(db, `users/${currentUser.uid}/${collectionName}`, id)
      );
    } catch (err) {
      console.error('Error removing document:', err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    add,
    update,
    remove
  };
}