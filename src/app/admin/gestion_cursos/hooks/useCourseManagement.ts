import { useState } from 'react';
import { Course, CourseFormData } from '../types/courseTypes';
import { getCourseById, createCourse, updateCourse, deleteCourse } from '../services/courseService';

export const useCourseManagement = () => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>({
    title: '',
    descriptionBreve: '',
    id: '', // Initialize with empty string
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
        id: '', // Initialize with empty string
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
        id: id,
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
  console.log('updateCurrentCourse called - Field:', field, 'Value:', value); // Log at the start
  setCurrentCourse((prev)=>{
  if (!prev) {
  console.log('updateCurrentCourse: prev state is null, cannot update.');
  return null;
  }
  // Explicitly preserve the existing id
        const updatedCourse = { ...prev, [field]: value, id: prev.id };
  console.log('Object being set by updateCurrentCourse:', updatedCourse); // Log the object being set
  return updatedCourse;
  });
    };



  const saveCourse = async (editingCourseData: Course) => {
    try {
      setLoading(true);
      if (editingCourseData.id) {
 console.log('Attempting to update course with ID:', editingCourseData.id); // Log the ID being used for update
 await updateCourse(editingCourseData.id, editingCourseData as Partial<Course>);
        // After successful update, you might want to refresh the course list or update the currentCourse state if needed
        // For now, let's assume the list is handled elsewhere or will be refreshed.
      } else {
        // Add new course
        // Exclude the 'id' property when adding, Firestore will generate one.
        const { id, ...dataWithoutId } = editingCourseData;

        const newDocRef = await createCourse(dataWithoutId as CourseFormData); // Pass data without id and expect DocumentReference
        // After adding, update the currentCourse state with the data and the new Firestore-generated document ID.
        setCurrentCourse({ ...editingCourseData, id: newDocRef.id });
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