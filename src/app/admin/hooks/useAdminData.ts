import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AdminData, Course, Subscription, User } from '../types/adminTypes'; // Import Course, Subscription, User types

export const useAdminData = () => {
  const [adminData, setAdminData] = useState<AdminData>({
    courses: [],
    subscriptions: [],
    users: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesSnapshot, subscriptionsSnapshot, usersSnapshot] = await Promise.all([
          getDocs(collection(db, 'courses')),
          getDocs(collection(db, 'subscriptions')),
          getDocs(collection(db, 'users'))
        ]);

        // Assuming your Firestore documents have the necessary fields
        setAdminData({
          courses: coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)),
          subscriptions: subscriptionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subscription)),
          users: usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)),
          loading: false
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setAdminData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return adminData;
};