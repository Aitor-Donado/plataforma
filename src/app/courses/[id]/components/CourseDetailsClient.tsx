'use client';

import React from "react";
// Remove notFound import as handling is server-side
// import { notFound } from "next/navigation";
import Image from "next/image";
import { SubscriptionButton } from "@/components/courses/subscription-button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Clock, Users } from "lucide-react";
import type { Course } from "@/lib/data"; // Assuming this type is correct
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css'; // Import styles here too for client-side rendering

interface CourseDetailsClientProps {
  initialCourse: Course | null; // Receive the fetched course data
  notionData: any; // Receive Notion data
}

export const CourseDetailsClient = ({ initialCourse, notionData }: CourseDetailsClientProps) => {
  // Use the data received from the server
  const course = initialCourse;

  // Remove client-side fetching state and effect
  // const [course, setCourse] = useState<Course | null>(null);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => { ... }, [...]);


  // Handle case where course data was not found on the server
  if (!course) {
    // notFound() is called server-side, but this is a safeguard/type safety check
    // This component should ideally not render if course is null
     return null;
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
          {/* Render Notion content using NotionRenderer */}
          {notionData ? (
             <NotionRenderer recordMap={notionData} fullPage={false} darkMode={false} />
          ) : (
              <div>Error loading Notion content or no content available.</div>
          )}
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
                  <span className="font-medium">
                    {course.lecciones} Lessons
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">{course.duracion} Hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium capitalize">
                    {course.nivel} Level\
                  </span>
                </div>
              </div>

              {/* SubscriptionButton remains client-side as it likely has interaction/state */}
              <SubscriptionButton courseId={course.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};