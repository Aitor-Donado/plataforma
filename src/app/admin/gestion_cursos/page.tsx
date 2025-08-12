'use client';

import { useState, useEffect, useCallback, ChangeEvent, FormEvent, React } from 'react'; // Import React
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'; // Import Select components
import { Label } from '@/components/ui/label'; // Import Label component
import { db } from '@/lib/firebase'; // Import Firebase db instance

// Corrected Course interface
// Define a type for your course data
interface Course {
  id?: string; // ID is optional for new courses
  title: string;
  descriptionBreve: string;
  descriptionCompleta: string;
  lecciones: number;
  duracion: number;
  nivel: string;
  imagenURL: string;
  dataAiHint?: string; // Assuming this is optional
  }

export default function GestionCursosPage() {
  const [courses, setCourses] = useState<any[]>([]); // State to hold the list of courses
  const [loadingCourses, setLoadingCourses] = useState(true); // Loading state for fetching all courses
  const [selectedCourseId, setSelectedCourseId] = useState('add-new'); // State for selected course ID in the select dropdown
  const [editingCourseData, setEditingCourseData] = useState<any>({}); // State to hold the data of the course being edited or a new course
  const [loadingEditingCourse, setLoadingEditingCourse] = useState(false); // Loading state for fetching individual course data

  const fetchCourses = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(coursesData); // Set courses here
        // setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses().finally(() => setLoadingCourses(false));
  }, []);

  useEffect(() => {
    // Effect to fetch individual course data when selectedCourseId changes
    const fetchEditingCourse = async () => {
      if (selectedCourseId === 'add-new') {
        setEditingCourseData({ // Set to empty for adding a new course
          title: '',
          descriptionBreve: '',
          descriptionCompleta: '',
          lecciones: 0,
          duracion: 0,
          nivel: 'basico', // Set a default level
          imagenURL: '', // Assuming an image URL field
        });
        return;
      }

      setLoadingEditingCourse(true);
      try {
        const docRef = doc(db, 'courses', selectedCourseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEditingCourseData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('Course not found for ID:', selectedCourseId);
          setEditingCourseData({}); // Reset if not found
        }
      } catch (error) {
        console.error('Error fetching individual course:', error);
        setEditingCourseData({}); // Reset on error
      } finally {
        setLoadingEditingCourse(false);
      }
    };

    fetchEditingCourse();
  }, [selectedCourseId, db]); // Add db as a dependency

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]); // Fetch courses on initial mount and when fetchCourses is called

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEditingCourseData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setEditingCourseData((prevData: any) => ({
      ...prevData,
      nivel: value,
    }));
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
  };


  // Placeholder function for deleting a course
  const handleDeleteCourse = async (courseId: string | undefined) => {
    if (!courseId) return; // Cannot delete without an ID
    if (!confirm('Are you sure you want to delete this course?')) return; // Add a confirmation

    try {
      await deleteDoc(doc(db, 'courses', courseId));
      // Refresh the list of courses after deletion
      fetchCourses();
      // If the deleted course was the one being edited, reset the form
      if (selectedCourseId === courseId) {
        setSelectedCourseId('add-new');
      }
      console.log('Course deleted successfully:', courseId);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Placeholder function for saving a course (add/edit)
  const handleSaveCourse = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      if (selectedCourseId === 'add-new') {
        // Add new course
        const newDocRef = await addDoc(collection(db, 'courses'), editingCourseData);
        console.log('New course added with ID:', newDocRef.id);
    // } else {
    //   await addCourseToFirestore(courseData);
    // }
    setShowAddForm(false);
    setEditingCourse(null);
    // Refresh the list
    // fetchCourses();
  };
      } else {
        // Update existing course
        await updateDoc(doc(db, 'courses', selectedCourseId), editingCourseData);
        console.log('Course updated successfully:', selectedCourseId);
  if (loadingCourses) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Cursos</h1>
      
      {/* Select dropdown for adding or editing courses */}

      <div className="mb-6">
        <Label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Curso:
        </Label>
        <Select onValueChange={handleCourseSelect} value={selectedCourseId}>
          <SelectTrigger id="course-select" className="w-[280px]">
            <SelectValue placeholder="Selecciona un curso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="add-new">Añadir nuevo</SelectItem>
            {courses.map((course: any) => (
              <SelectItem key={course.id} value={course.id}>
                {course.title} ({course.id}) {/* Displaying title and ID for clarity */}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Form for adding or editing a course */}
      {loadingEditingCourse ? (
        <div>Loading course data...</div>
      ) : (
        <div className="mb-6 p-4 border rounded">
          <h2>{selectedCourseId === 'add-new' ? 'Agregar Nuevo Curso' : 'Editar Curso'}</h2>
          <form onSubmit={handleSaveCourse}>
            <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="title">
                  Course Title
                </Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="title"
                  placeholder="e.g., Introduction to Next.js"
                  required
                  value={editingCourseData.title || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="descriptionBreve">
                  Short Description
                </Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="descriptionBreve"
                  placeholder="A brief summary of the course"
                  required
                  value={editingCourseData.descriptionBreve || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="descriptionCompleta">
                  Full Description
                </Label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="descriptionCompleta"
                  placeholder="A detailed description of the course content"
                  required
                  rows={5}
                  value={editingCourseData.descriptionCompleta || ''}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="lecciones">
                  Number of Lessons
                </Label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="lecciones"
                  placeholder="e.g., 10"
                  required
                  value={editingCourseData.lecciones || 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="duracion">
                  Duration (hours)
                </Label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="duracion"
                  placeholder="e.g., 5"
                  required
                  value={editingCourseData.duracion || 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="nivel">
                  Level
                </Label>
                <Select onValueChange={handleSelectChange} value={editingCourseData.nivel || 'basico'}>
                  <SelectTrigger id="nivel">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basico">Básico</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Add input for imagenURL */}
              <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="imagenURL">
                  Image URL
                </Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="imagenURL"
                  placeholder="e.g., https://example.com/image.jpg"
                  required
                  value={editingCourseData.imagenURL || ''}
                  onChange={handleInputChange}
                />
              </div>
              {/* Assuming you might need dataAiHint as well */}
              {/* <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="dataAiHint">
                  Data AI Hint
                </Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="dataAiHint"
                  placeholder="e.g., description of image for AI"
                  value={editingCourseData.dataAiHint || ''}
                  onChange={handleInputChange}
                />
              </div> */}
            </div>
            <div className="flex items-center p-6 pt-0">
              <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto">
                {selectedCourseId === 'add-new' ? 'Agregar Nuevo Curso' : 'Modificar Curso'}
              </button>
              {selectedCourseId !== 'add-new' && (
                 <button
                   type="button"
                   onClick={() => handleDeleteCourse(selectedCourseId)}
                   className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
                 >
                   Eliminar Curso
                 </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Cursos</h2>
        {/* Placeholder list */}
        <ul>
          {courses.length === 0 ? (
            <li>No hay cursos disponibles para mostrar en la lista.</li>
          ) : (
            courses.map((course: any) => (
              <li key={course.id} className="border-b py-2 flex justify-between items-center">
                <span>{course.title}</span>
                <div>
                  {/* Removed direct edit/delete buttons from this list as they are now handled by the form/dropdown */}
                  {/* <button onClick={() => handleEditCourse(course.id)} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded mr-2">
                    Editar
                  </button> */}
                  {/* <button onClick={() => handleDeleteCourse(course.id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded">
                    Eliminar
                  </button> */}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}