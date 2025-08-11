// src/app/all_courses.tsx

import { CourseList } from "@/components/courses/course-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function All_Courses() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
          Descubre tu potencial
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Únete a nuestra comunidad de estudiantes y descubre cursos diseñados
          para elevar tus habilidades al siguiente nivel.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="#courses">Explorador de cursos</Link>
          </Button>
        </div>
      </section>

      <section id="courses">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          Nuestros Cursos
        </h2>
        <CourseList />
      </section>
    </div>
  );
}
