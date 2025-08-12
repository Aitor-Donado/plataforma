'use client';
import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SubscriptionButton } from '@/components/courses/subscription-button';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Clock, Users } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { Course } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}
) {
  const resolvedParams = React.use(params); // Unwrap the params Promise
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        const fetchCourse = async () => {
          try {
            const q = query(
              collection(db, 'courses'),
              where('id', '==', params.id)
            );
            const querySnapshot = await getDocs(q);
            console.log('Query result:', querySnapshot.empty); // <-- Agrega este log
            if (querySnapshot.empty) {
              console.log('Course not found, redirecting to 404'); // <-- Agrega este log
              notFound();
            } else {
              const courseData = querySnapshot.docs[0].data() as Course;
              console.log('Course data fetched:', courseData.title); // <-- Agrega este log
              setCourse(courseData);
            }
          } catch (error) {
            console.error('Error fetching course:', error); // <-- Este ya está, pero es crucial
            notFound();
          } finally {
            setLoading(false);
          }
        };
        fetchCourse();
      }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="md:col-span-1">
            <Card className="overflow-hidden sticky top-24">
              <Skeleton className="aspect-[3/2] w-full" />
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-12 w-full mt-4" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    // This will be handled by notFound() in useEffect, but as a fallback
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            {course.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {course.descriptionBreve}
          </p>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>{course.descriptionCompleta}</p>
          </div>
        </div>
        <div className="md:col-span-1">
          <Card className="overflow-hidden sticky top-24">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={course.imagenURL}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                data-ai-hint={course.dataAiHint}
              />
            </div>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Book className="h-5 w-5 text-primary" />
                  <span className="font-medium">{course.lecciones} Lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">{course.duracion} Hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium capitalize">{course.nivel} Level</span>
                </div>
              </div>

              <SubscriptionButton courseId={course.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
