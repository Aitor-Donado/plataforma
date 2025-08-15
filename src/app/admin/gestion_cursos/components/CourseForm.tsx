import { ChangeEvent, FormEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Course } from "../types/courseTypes";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component

interface CourseFormProps {
  course: Course;
  onSubmit: (e: FormEvent) => Promise<void>;
  onDelete?: () => void;
  onChange: (field: keyof Course, value: string | number) => void;
  isNew: boolean;
  loading: boolean;
}

export const CourseForm = ({
  course,
  onSubmit,
  onDelete,
  onChange,
  isNew,
  loading,
}: CourseFormProps) => {
  console.log("CourseForm received course prop:", course); // Log the received course prop
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    console.log(`Form Input Changed: Field=${id}, Value=${value}`); // Console log
    onChange(
      id as keyof Course,
      id === "lecciones" || id === "duracion" ? Number(value) : value
    );
  };

  const handleSelectChange = (value: string) => {
    console.log(`Form Select Changed: Field=nivel, Value=${value}`); // Console log
    onChange("nivel", value);
  };

  return (
    <div className="mb-6 p-6 border rounded">
      <h2 className="text-xl font-semibold mb-4">
        {isNew ? "Agregar Nuevo Curso" : "Editar Curso"}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              placeholder="e.g., Introduction to Next.js"
              required
              value={course.title || ""}
              onChange={handleInputChange} // Connect onChange
              disabled={loading} // Disable while loading
            />
          </div>
          {/* Short Description */}

          <div className="space-y-2">
            <Label htmlFor="descriptionBreve">Short Description</Label>
            <Input
              id="descriptionBreve"
              placeholder="A brief summary of the course"
              required
              value={course.descriptionBreve || ""}
              onChange={handleInputChange} // Connect onChange
              disabled={loading} // Disable while loading
            />
          </div>
          {/* Full Description */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="descriptionCompleta">Full Description</Label>
            <Textarea
              id="descriptionCompleta"
              placeholder="A detailed description of the course content"
              required
              rows={5}
              value={course.descriptionCompleta || ""}
              onChange={handleInputChange} // Connect onChange
              disabled={loading} // Disable while loading
            />
          </div>
          {/* Number of Lessons */}
          <div className="space-y-2">
            <Label htmlFor="lecciones">Number of Lessons</Label>
            <Input
              type="number"
              id="lecciones"
              placeholder="e.g., 10"
              required
              value={course.lecciones || 0} // Use 0 as default for number
              onChange={handleInputChange} // Connect onChange
              disabled={loading} // Disable while loading
            />
          </div>
          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duracion">Duration (hours)</Label>
            <Input
              type="number"
              id="duracion"
              placeholder="e.g., 5"
              required
              value={course.duracion || 0} // Use 0 as default for number
              onChange={handleInputChange} // Connect onChange
              disabled={loading} // Disable while loading
            />
          </div>
          {/* Level */}
          <div className="space-y-2">
            <Label htmlFor="nivel">Level</Label>
            <Select
              onValueChange={handleSelectChange}
              value={course.nivel || "basico"}
            >
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
          {/* Image URL */}
          {/* Add Image URL field if needed */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="imagenURL">Image URL</Label>
            <Input
              id="imagenURL"
              placeholder="URL of the course image"
              required
              value={course.imagenURL || ""}
              onChange={handleInputChange} // Connect onChange
              disabled={loading} // Disable while loading
            />
          </div>
          {/* AI Hint Data */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="dataAiHint">AI Hint Data (Optional)</Label>
            <Textarea
              id="dataAiHint"
              placeholder="Optional data for AI hints"
              rows={3}
              value={course.dataAiHint || ""}
              onChange={handleInputChange}
              disabled={loading} // Disable while loading
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          {!isNew && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
              disabled={loading} // Disable while loading
            >
              Eliminar
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            {isNew ? "Agregar Curso" : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};
