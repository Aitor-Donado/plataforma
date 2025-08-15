import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Course } from "../types/adminTypes";

interface CoursePreviewProps {
  courses: Course[];
  loading: boolean;
  error?: string | null;
}

export const CoursePreviewSection = ({
  courses,
  loading,
  error,
}: CoursePreviewProps) => (
  <section aria-labelledby="courses-heading" className="mt-6">
    <h3 id="courses-heading" className="text-lg font-semibold mb-2">
      Listado Básico de Cursos
    </h3>
    <p className="mb-4">Consulta los cursos disponibles en la plataforma.</p>
    {error ? (
      <p aria-live="polite" className="text-red-500">
        Error al cargar los cursos: {error}
      </p>
    ) : loading ? (
      <p aria-live="polite" className="text-gray-500">
        Cargando cursos...
      </p>
    ) : courses.length === 0 ? (
      <p aria-live="polite" className="text-gray-500">
        No se encontraron cursos.
      </p>
    ) : (
      <Table>
        <caption className="sr-only">Listado básico de cursos</caption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Nivel</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.id}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.nivel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
    <p className="mt-4">
      Para agregar, editar o eliminar cursos, visita la página de gestión.
    </p>
    <div className="mt-4">
      <Link href="/admin/gestion_cursos" passHref>
        <Button>Ir a Gestión de Cursos</Button>
      </Link>
    </div>
  </section>
);
