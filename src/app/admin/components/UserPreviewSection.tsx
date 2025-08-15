// src/app/admin/components/UserPreviewSection.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User } from "../types/adminTypes";

interface UserPreviewProps {
  users: User[];
  loading: boolean;
  error?: string | null;
}

export const UserPreviewSection = ({
  users,
  loading,
  error,
}: UserPreviewProps) => (
  <section aria-labelledby="users-heading" className="mt-6">
    <h3 id="users-heading" className="text-lg font-semibold mb-2">
      Listado de Usuarios
    </h3>
    <p className="mb-4">Consulta los usuarios registrados en la plataforma.</p>
    {error ? (
      <p aria-live="polite" className="text-red-500 mb-4">
        Error al cargar los usuarios: {error}
      </p>
    ) : loading ? (
      <p aria-live="polite" className="text-gray-500 mb-4">
        Cargando usuarios...
      </p>
    ) : users.length === 0 ? (
      <p aria-live="polite" className="text-gray-500 mb-4">
        No se encontraron usuarios.
      </p>
    ) : (
      <Table>
        <caption className="sr-only">Listado de usuarios registrados</caption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Cursos Inscritos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === "admin" ? "default" : "outline"}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                {Array.isArray(user.courses)
                  ? user.courses.join(", ") || "Ninguno"
                  : user.courses || "Ninguno"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </section>
);
