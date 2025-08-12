import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Course } from '../types/courseTypes';

interface CourseSelectorProps {
  courses: Course[];
  selectedCourseId: string;
  onCourseSelected: (courseId: string) => void;
}

export const CourseSelector = ({ courses, selectedCourseId, onCourseSelected }: CourseSelectorProps) => (
  <div className="mb-6">
    <Label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mb-2">
      Seleccionar Curso:
    </Label>
    <Select onValueChange={onCourseSelected} value={selectedCourseId}>
      <SelectTrigger id="course-select" className="w-[280px]">
        <SelectValue placeholder="Selecciona un curso" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new">Añadir nuevo</SelectItem>
        {courses.map((course) => (
          <SelectItem key={course.id} value={course.id!}>
            {course.title} ({course.id})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);