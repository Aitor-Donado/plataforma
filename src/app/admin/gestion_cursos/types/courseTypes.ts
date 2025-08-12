export interface Course {
  id?: string;
  title: string;
  descriptionBreve: string;
  descriptionCompleta: string;
  lecciones: number;
  duracion: number;
  nivel: 'basico' | 'intermedio' | 'avanzado';
  imagenURL: string;
  dataAiHint?: string;
}

export type CourseFormData = Omit<Course, 'id'>;