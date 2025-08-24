import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normaliza un ID de Notión eliminando los guiones
 * Esto es necesario porque Next.js puede modificar los IDs en las URLs
 */
export function normalizeNotionId(id: string): string {
  return id.replace(/-/g, "");
}

/**
 * Restaura los guiones en un ID de Notión
 * Los IDs de Notión tienen el formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
export function restoreNotionId(id: string): string {
  // Si el ID ya tiene guiones, devolverlo tal cual
  if (id.includes("-")) {
    return id;
  }

  // Si no tiene guiones, añadirlos en las posiciones correctas
  if (id.length === 32) {
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(
      16,
      20
    )}-${id.slice(20)}`;
  }

  // Si no coincide con el formato esperado, devolverlo tal cual
  return id;
}
