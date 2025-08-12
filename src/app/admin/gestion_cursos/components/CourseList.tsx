import { Course } from '../types/courseTypes';

interface CourseListProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

export const CourseList = ({ courses, onSelectCourse }: CourseListProps) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Lista de Cursos</h2>
    <ul>
      {courses.length === 0 ? (
        <li>No hay cursos disponibles para mostrar en la lista.</li>
      ) : (
        courses.map((course) => (
          <li key={course.id} className="border-b py-2 flex justify-between items-center">
            <span>{course.title}</span>
            <button
              onClick={() => onSelectCourse(course.id!)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Ver Detalle
            </button>
          </li>
        ))
      )}
    </ul>
  </div>
);