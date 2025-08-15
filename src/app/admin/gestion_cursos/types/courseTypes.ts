export interface Course {
  id?: string;
  title: string;
  descriptionBreve: string;
  descriptionCompleta: string;
  lecciones: number;
  duracion: number;
  nivel: "basico" | "intermedio" | "avanzado";
  imagenURL: string;
  dataAiHint?: string;
}

// Para el formulario, no necesito el id
export type CourseFormData = Omit<Course, "id">;
