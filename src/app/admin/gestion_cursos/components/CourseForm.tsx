import { ChangeEvent, FormEvent } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Course } from '../types/courseTypes';

interface CourseFormProps {
  course: Course;
  onSubmit: (e: FormEvent) => Promise<void>;
  onDelete?: () => void;
  onChange: (field: keyof Course, value: any) => void; // Using any for simplicity, can refine later
  isNew: boolean;
  loading: boolean;
}

export const CourseForm = ({ course, onSubmit, onDelete, onChange, isNew, loading }: CourseFormProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    onChange(id as keyof Course, id === 'lecciones' || id === 'duracion' ? Number(value) : value);
  };

  const handleSelectChange = (value: string) => {
    onChange('nivel', value);
  };

  return (
    <div className="mb-6 p-4 border rounded">
      <h2>{isNew ? 'Agregar Nuevo Curso' : 'Editar Curso'}</h2>
      <form onSubmit={onSubmit}>
        {/* Campos del formulario (igual que en tu código original) */}
        {/* You will need to manually add the input fields here based on your previous HTML structure and connect them to the `course` prop and `handleInputChange`/`handleSelectChange` */}
        <div>Formulario Placeholder - Add form fields here</div>
        {/* ... */}
      </form>
    </div>
  );
};