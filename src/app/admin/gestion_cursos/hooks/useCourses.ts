import { useState, useEffect, useCallback } from 'react';
import { Course } from '../types/courseTypes';
import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';


export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'courses')); // Fetch raw snapshot
      const coursesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { ...data, id: doc.id } as Course; // Ensure doc.id is the id
      });
      setCourses(coursesData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, refresh: fetchCourses };
};