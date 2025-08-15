// src/app/unauthorized/page.tsx
export default function UnauthorizedPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold">Acceso no autorizado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <a href="/" className="text-primary underline">
        Volver al inicio
      </a>
    </div>
  );
}
