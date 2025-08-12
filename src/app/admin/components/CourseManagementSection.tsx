import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Course } from '../types/adminTypes';
import React from 'react'; // Import React

interface CourseManagementSectionProps {
  courses: Course[];
  loading: boolean;
}

export const CourseManagementSection = ({ courses, loading }: CourseManagementSectionProps) => (
  <>
    <p>Aquí puedes ver un listado básico de los cursos existentes.</p>
    <p>Para agregar, editar o eliminar cursos, ve a la página de gestión.</p>
    <div className="mt-4">
      <Link href="/admin/gestion_cursos" passHref>
        <Button asChild>
          <a>Ir a Gestión de Cursos</a>
        </Button>
      </Link>
    </div>

    <h3 className="text-lg font-semibold mt-6 mb-2">Listado Básico de Cursos</h3>
    {loading ? (
      <p>Cargando cursos...</p>
    ) : courses.length === 0 ? (
      <p>No hay cursos disponibles.</p>
    ) : (
      <Table>
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
  </>
);