'use client';

import { useState, FormEvent } from 'react';
import { CourseSelector } from './components/CourseSelector';
import { CourseForm } from './components/CourseForm';
import { CourseList } from './components/CourseList';
import { useCourses } from './hooks/useCourses';
import { useCourseManagement } from './hooks/useCourseManagement';
import type { Course } from './types/courseTypes';

export default function GestionCursosPage() {
  const { courses, loading: loadingCourses, refresh } = useCourses();
  const {
    currentCourse,
    loading: loadingCourse,
    loadCourse,
    saveCourse,
    deleteCourse,
  } = useCourseManagement();
  const [selectedCourseId, setSelectedCourseId] = useState<string>('new');
  const { updateCurrentCourse } = useCourseManagement(); // Destructure updateCurrentCourse here

  // Add a console log wrapper around updateCurrentCourse
  const handleFormChange = (field: keyof Course, value: any) => {
    console.log('Form Change received:', field, value);
    updateCurrentCourse(field, value);
  };


  const handleCourseSelect = async (courseId: string) => {
    setSelectedCourseId(courseId);
    await loadCourse(courseId);
  };

  const handleSaveCourse = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentCourse) return;

    try {
      await saveCourse(currentCourse);
      refresh(); // Actualizar la lista después de guardar
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleDelete = async () => {
    if (!currentCourse?.id) return;
    if (!confirm('¿Estás seguro de que quieres eliminar este curso?')) return;

    try {
      await deleteCourse(currentCourse.id);
      setSelectedCourseId('new'); // Reset selector
      await loadCourse('new'); // Load empty form
      refresh(); // Refresh list
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Cursos</h1>

      {/* Selector de Curso */}
      {loadingCourses ? (
        <div>Cargando cursos...</div>
      ) : (
        <CourseSelector
          courses={courses}
          selectedCourseId={selectedCourseId}
          onCourseSelected={handleCourseSelect}
        />
      )}

      {/* Formulario de Curso */}
      {currentCourse !== null && (
        <CourseForm
          course={currentCourse}
          onSubmit={handleSaveCourse}
          onDelete={currentCourse.id ? handleDelete : undefined} // Solo mostrar botón eliminar si es un curso existente
          onChange={handleFormChange} // Use the wrapped function
          isNew={!currentCourse.id}
          loading={loadingCourse}
        />
      )}

      {/* Lista de Cursos */}
      {!loadingCourses && ( // Solo mostrar la lista si los cursos han cargado
        <CourseList courses={courses} onSelectCourse={handleCourseSelect} />
      )}
    </div>
  );
}