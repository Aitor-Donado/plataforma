// src/app/admin/components/SubscriptionPreviewSection.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Subscription } from "../types/adminTypes";

interface SubscriptionsSectionProps {
  subscriptions: Subscription[];
  loading: boolean;
  error?: string | null;
}

export const SubscriptionPreviewSection = ({
  subscriptions,
  loading,
  error,
}: SubscriptionsSectionProps) => {
  const pendingSubscriptions = subscriptions.filter(
    (s) => s.status === "pending" || s.status === "approved"
  );

  return (
    <section aria-labelledby="subscriptions-heading" className="mt-6">
      <h3 id="subscriptions-heading" className="text-lg font-semibold mb-2">
        Listado de Suscripciones
      </h3>
      <p className="mb-4">Consulta las suscripciones pendientes y aprobadas.</p>
      {error ? (
        <p aria-live="polite" className="text-red-500 mb-4">
          Error al cargar las suscripciones: {error}
        </p>
      ) : loading ? (
        <p aria-live="polite" className="text-gray-500 mb-4">
          Cargando suscripciones...
        </p>
      ) : pendingSubscriptions.length === 0 ? (
        <p aria-live="polite" className="text-gray-500 mb-4">
          No se encontraron suscripciones pendientes o aprobadas.
        </p>
      ) : (
        <Table>
          <caption className="sr-only">
            Listado de suscripciones pendientes y aprobadas
          </caption>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>ID del Curso</TableHead>
              <TableHead>Nombre del Curso</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingSubscriptions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.userName}</TableCell>
                <TableCell>{sub.courseId}</TableCell>
                <TableCell>{sub.courseName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{sub.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2 text-green-600 hover:text-green-700"
                    aria-label={`Aprobar suscripción ${sub.id}`}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700"
                    aria-label={`Rechazar suscripción ${sub.id}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};
