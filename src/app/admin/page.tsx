// src/app/admin/page.tsx
'use client';
import { useState, useEffect } from 'react'; // Import useEffect
import Link from 'next/link'; // Import Link
import { Card,
  CardDescription,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent, // Keep SelectContent for Level select if you decide to keep it
  SelectItem, // Keep SelectItem for Level select
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

/*
// Mock data
const subscriptions = [
  {
    id: 'sub1',
    userName: 'Alice Johnson',
    courseName: 'React Fundamentals',
    status: 'pending',
  },
  {
    id: 'sub2',
    userName: 'Bob Williams',
    courseName: 'Advanced TypeScript',
    status: 'pending',
  },
  {
    id: 'sub3',
    userName: 'Charlie Brown',
    courseName: 'Firebase for Web',
    status: 'approved',
  },
];

const users = [
  {
    id: 'user1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'user',
    courses: 1,
  },
  {
    id: 'user2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    role: 'user',
    courses: 1,
  },
  {
    id: 'user3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'user',
    courses: 2,
  },
  {
    id: 'user4',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    courses: 0,
  },
];
*/
import { getDocs } from 'firebase/firestore'; // Import getDocs

interface Course {
  id: string;
  title: string;
  nivel: string;
  // Add other properties if you want to display them in the list
}

export default function AdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[];
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-8">
        {/* Course Management Section */}
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Cursos</CardTitle>
            <CardDescription>
              Fill out the details below to add a new course.
            </CardDescription>
          </CardHeader>
          {/* Removed form for adding/editing courses */}
          {/* <form onSubmit={handleCourseUpload}> */}
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <p>Aquí puedes ver un listado básico de los cursos existentes.</p>
                <p>Para agregar, editar o eliminar cursos, ve a la página de gestión.</p>
                <div className="mt-4">
                   <Link href="/admin/gestion_cursos" passHref>
                    <Button asChild>
                      <a>Ir a Gestión de Cursos</a>
                    </Button>
                  </Link>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-2">Listado Básico de Cursos</h3>
                {loading ? (
                  <p>Cargando cursos...</p>
                ) : courses.length === 0 ? (
                  <p>No hay cursos disponibles.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Nivel</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.id}</TableCell>
                          <TableCell>{course.title}</TableCell>
                          <TableCell>{course.nivel}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
            {/* Removed save button */}
            {/* <CardFooter>
              <Button type="submit" className="ml-auto">
                <Upload className="mr-2 h-4 w-4" />
                Guardar Curso
              </Button>
            </CardFooter> */}
          {/* </form> */}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Subscriptions</CardTitle>
            <CardDescription>
              Review and approve new course subscription requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions
                  .filter((s) => s.status === 'pending')
                  .map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>{sub.userName}</TableCell>
                      <TableCell>{sub.courseName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{sub.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-2 text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {subscriptions.filter((s) => s.status === 'pending').length ===
              0 && (
              <p className="text-center text-muted-foreground py-4">
                No pending subscriptions.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View all registered users on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Enrolled Courses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === 'admin' ? 'default' : 'outline'}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.courses}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
