import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc, DocumentReference } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Assuming this import is correct
import { Course } from '../types/courseTypes';

export const getCourses = async (): Promise<Course[]> => {
  const querySnapshot = await getDocs(collection(db, 'courses'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  console.log('Attempting to fetch course with ID:', id);
  const docRef = doc(db, 'courses', id);
  const docSnap = await getDoc(docRef);
  console.log('Document with ID', id, 'exists:', docSnap.exists());
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Course) : null;
};

export const createCourse = async (courseData: Omit<Course, 'id'>): Promise<DocumentReference<Course>> => {
  // Get a new document reference with a generated ID
  const newDocRef = doc(collection(db, 'courses'));
  // Get the ID from this reference
  const newId = newDocRef.id;
  // Add this ID as a field to the course data object
  const courseDataWithId = { ...courseData, id: newId };
  // Use setDoc with the new document reference and the modified courseData
  await setDoc(newDocRef as DocumentReference<Course>, courseDataWithId as Course);
  return newDocRef as DocumentReference<Course>;
};

export const updateCourse = async (id: string, courseData: Partial<Course>): Promise<void> => {
  await updateDoc(doc(db, 'courses', id), courseData);
};

export const deleteCourse = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'courses', id));
};