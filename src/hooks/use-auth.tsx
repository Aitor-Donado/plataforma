// src/hooks/use-auth.tsx
// src/hooks/use-auth.ts
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

interface User {
  uid: string;
  email: string | null;
  role?: string; // Añadimos el campo role
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Obtener el documento del usuario desde Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: userData.role || "user", // Asignar "user" por defecto si no hay rol
          });
        } else {
          // Si no existe el documento, asignar rol por defecto
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: "user",
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
