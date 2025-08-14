import { useState } from 'react';
import { Course, CourseFormData } from '../types/courseTypes';
import { getCourseById, createCourse, updateCourse, deleteCourse } from '../services/courseService';

export const useCourseManagement = () => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>({
    title: '',
    descriptionBreve: '',
    descriptionCompleta: '',
    lecciones: 0,
    duracion: 0, // Ensure default duration is a number
    nivel: 'basico',
    imagenURL: '',
  } as Course); // Initialize with default new course structure
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadCourse = async (id: string) => {
    if (id === 'new') {
      setCurrentCourse({
        title: '',
        descriptionBreve: '',
        descriptionCompleta: '',
        lecciones: 0,
        duracion: 0, // Ensure default duration is a number
        nivel: 'basico',
        imagenURL: '',
      } as Course); // Explicitly cast to Course
      return;
    }

    try {
      setLoading(true);
      const course = await getCourseById(id);
 console.log('currentCourse after fetching:', course);
      setCurrentCourse(course);
    } catch (err) {
      setError(err as Error);
      // If fetching fails, set to a default empty course structure
      // to allow the user to add a new course or see an empty form.
      setCurrentCourse({
        title: '',
        descriptionBreve: '',
        descriptionCompleta: '',
        lecciones: 0,
        duracion: 0,
        nivel: 'basico',
        imagenURL: '',
      } as Course);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentCourse = (field: keyof Course, value: any) => {
    setCurrentCourse(prev => {
      if (!prev) return null;
      const updatedCourse = { ...prev, [field]: value };
      return updatedCourse;
    });
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