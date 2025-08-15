import { useState, useEffect, useCallback, useMemo } from "react";
import { Course } from "../types/courseTypes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Función auxiliar para validar datos de Firestore
const isValidCourseData = (data: any): data is Omit<Course, "id"> => {
  return (
    typeof data.title === "string" &&
    typeof data.descriptionBreve === "string" &&
    typeof data.descriptionCompleta === "string" &&
    typeof data.lecciones === "number" &&
    typeof data.duracion === "number" &&
    ["basico", "intermedio", "avanzado"].includes(data.nivel) &&
    typeof data.imagenURL === "string"
  );
};

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    if (!db) {
      setError("Firestore no está inicializado");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null); // Resetear error antes de la nueva carga
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesData: Course[] = [];
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (isValidCourseData(data)) {
          coursesData.push({ id: doc.id, ...data } as Course);
        } else {
          console.warn(
            `Documento ${doc.id} no cumple con el formato de Course`
          );
        }
      });
      setCourses(coursesData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar los cursos";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return useMemo(
    () => ({ courses, loading, error, refresh: loadCourses }),
    [courses, loading, error, loadCourses]
  );
};
