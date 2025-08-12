'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '@/lib/firebase'; // Import Firebase db instance

export default function GestionCursosPage() {
  // Placeholder state for courses
  const [courses, setCourses] = useState([]);
  // Placeholder state for loading
  const [loading, setLoading] = useState(true);
  // Placeholder state for forms (add/edit)
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    // Placeholder for fetching courses from Firestore
    const fetchCourses = async () => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // const coursesData = await getCoursesFromFirestore();
        // setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Placeholder function for adding a course
  const handleAddCourse = () => {
    setShowAddForm(true);
    setEditingCourse(null);
  };

  // Placeholder function for editing a course
  const handleEditCourse = (courseId: string) => {
    // Simulate finding course by ID
    // const courseToEdit = courses.find(course => course.id === courseId);
    // setEditingCourse(courseToEdit);
    setShowAddForm(true);
  };

  // Placeholder function for deleting a course
  const handleDeleteCourse = async (courseId: string) => {
    // Simulate deleting course
    // await deleteCourseFromFirestore(courseId);
    // setCourses(courses.filter(course => course.id !== courseId));
  };

  // Placeholder function for saving a course (add/edit)
  const handleSaveCourse = (courseData: any) => {
    // Simulate saving course
    // if (editingCourse) {
    //   await updateCourseInFirestore(editingCourse.id, courseData);
    // } else {
    //   await addCourseToFirestore(courseData);
    // }
    setShowAddForm(false);
    setEditingCourse(null);
    // Refresh the list
    // fetchCourses();
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Cursos</h1>

      <div className="mb-4">
        <button onClick={handleAddCourse} className="px-4 py-2 bg-blue-500 text-white rounded">
          Agregar Nuevo Curso
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded">
          <h2>{editingCourse ? 'Editar Curso' : 'Agregar Curso'}</h2>
          {/* Placeholder form */}
          <div>Formulario aquí...</div>
          <button onClick={() => setShowAddForm(false)} className="mt-4 px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>
          {/* Placeholder Save button */}
          <button onClick={() => handleSaveCourse({})} className="mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded">
            Guardar
          </button>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Cursos</h2>
        {/* Placeholder list */}
        <ul>
          {courses.length === 0 ? (
            <li>No hay cursos disponibles.</li>
          ) : (
            courses.map((course: any) => (
              <li key={course.id} className="border-b py-2 flex justify-between items-center">
                <span>{course.title}</span>
                <div>
                  <button onClick={() => handleEditCourse(course.id)} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteCourse(course.id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded">
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}