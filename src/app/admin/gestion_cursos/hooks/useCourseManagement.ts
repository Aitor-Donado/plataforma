import { useState } from 'react';
import { Course } from '../types/courseTypes';
import { getCourseById, createCourse, updateCourse, deleteCourse } from '../services/courseService';

export const useCourseManagement = () => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadCourse = async (id: string) => {
    if (id === 'new') {
      setCurrentCourse({
        title: '',
        descriptionBreve: '',
        descriptionCompleta: '',
        lecciones: 0,
        duracion: 0,
        nivel: 'basico',
        imagenURL: '',
      } as Course); // Explicitly cast to Course
      return;
    }

    try {
      setLoading(true);
      const course = await getCourseById(id);
      setCurrentCourse(course);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentCourse = (field: keyof Course, value: any) => {
    setCurrentCourse(prev => prev ? {
      ...prev,
      [field]: value,
    } : null);
  };

  const saveCourse = async (course: Course) => {
    try {
      setLoading(true);
      if (course.id) {
        await updateCourse(course.id, course);
      } else {
        const newId = await createCourse(course);
        return newId; // Return the new ID after creation
      }
    } catch (err) {
      setError(err as Error);
      throw err; // Re-throw the error for the UI to handle
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async (id: string) => {
    try {
      setLoading(true);
      await deleteCourse(id);
    } catch (err) {
      setError(err as Error);
      throw err; // Re-throw the error for the UI to handle
    } finally {
      setLoading(false);
    }
  };

  return {
    currentCourse,
    loading,
    error,
    loadCourse,
    updateCurrentCourse,
    saveCourse,
    deleteCourse: removeCourse,
    resetCourse: () => setCurrentCourse(null), // Add a reset function
  };
};