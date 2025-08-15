// src/app/users/[userId]/page.tsx
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UserProfile {
  email: string;
  role: string;
  name?: string; // Añade otros campos según tu estructura en Firestore
}

export default function UserProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const checkAndFetchProfile = async () => {
      // Acceder a userId dentro de una función para evitar el error del linter
      const userId = params.userId;

      if (!loading) {
        if (!user) {
          // Si no está autenticado, redirigir a login
          router.push("/login");
        } else if (user.uid !== userId) {
          // Si el userId no coincide con el del usuario autenticado, redirigir
          router.push("/unauthorized");
        } else {
          // Obtener datos del perfil desde Firestore
          try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              setProfile(userDoc.data() as UserProfile);
            } else {
              setProfile({
                email: user.email || "",
                role: user.role || "user",
              });
            }
          } catch (error) {
            console.error("Error al cargar el perfil:", error);
            router.push("/error");
          }
          setProfileLoading(false);
        }
      }
    };

    checkAndFetchProfile();
  }, [user, loading, router, params]); // Usamos params como dependencia

  if (loading || profileLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !profile) {
    return null; // No renderizar nada mientras se redirige
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
      <div className="mt-4">
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Rol:</strong> {profile.role}
        </p>
        {profile.name && (
          <p>
            <strong>Nombre:</strong> {profile.name}
          </p>
        )}
      </div>
      <a href="/" className="text-primary underline mt-4 inline-block">
        Volver al inicio
      </a>
    </div>
  );
}
