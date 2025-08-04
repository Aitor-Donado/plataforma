import { getCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SubscriptionButton } from '@/components/courses/subscription-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Clock, Users } from 'lucide-react';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">{course.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{course.descriptionBreve}</p>
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
                    <span className="font-medium">12 Lessons</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium">8 Hours</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-medium">Beginner Level</span>
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
