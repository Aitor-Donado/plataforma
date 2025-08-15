// src/components/protected-route.tsx
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // Rol requerido para acceder a la ruta
}

export function ProtectedRoute({
  children,
  requiredRole = "admin",
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Si no hay usuario autenticado, redirigir a /login
        router.push("/login");
      } else if (requiredRole && user.role !== requiredRole) {
        // Si el usuario no tiene el rol requerido, redirigir a una página de no autorizado
        router.push("/unauthorized");
      }
    }
  }, [user, loading, router, requiredRole]);

  if (loading) {
    return <div>Loading...</div>; // O un componente de carga más elaborado
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null; // No renderizar nada mientras se redirige
  }

  return <>{children}</>;
}
