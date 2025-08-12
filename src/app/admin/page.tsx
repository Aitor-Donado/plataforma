// src/app/admin/page.tsx
'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

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

export default function AdminPage() {
  const { toast } = useToast();
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    descriptionBreve: '',
    descriptionCompleta: '',
    lecciones: 0,
    duracion: 0,
    nivel: 'basico' as 'basico' | 'intermedio' | 'avanzado',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setCourseDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setCourseDetails((prev) => ({
      ...prev,
      nivel: value as 'basico' | 'intermedio' | 'avanzado',
    }));
  };
  const handleCourseUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = courseDetails.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      await addDoc(collection(db, 'courses'), {
        ...courseDetails,
        id: slug,
        lecciones: Number(courseDetails.lecciones),
        duracion: Number(courseDetails.duracion),
        imagenURL: 'https://placehold.co/600x400.png',
        dataAiHint: courseDetails.title,
      });

      toast({
        title: 'Course Uploaded',
        description: 'The new course has been added to the database.',
      });
      // Reset form
      setCourseDetails({
        title: '',
        descriptionBreve: '',
        descriptionCompleta: '',
        lecciones: 0,
        duracion: 0,
        nivel: 'basico',
      });
    } catch (error) {
      console.error('Error uploading course: ', error);
      toast({
        title: 'Error',
        description: 'There was an error uploading the course.',
        variant: 'destructive',
      });
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Course</CardTitle>
            <CardDescription>
              Fill out the details below to add a new course.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleCourseUpload}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Next.js"
                  value={courseDetails.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionBreve">Short Description</Label>
                <Input
                  id="descriptionBreve"
                  placeholder="A brief summary of the course"
                  value={courseDetails.descriptionBreve}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descriptionCompleta">Full Description</Label>
                <Textarea
                  id="descriptionCompleta"
                  placeholder="A detailed description of the course content"
                  value={courseDetails.descriptionCompleta}
                  onChange={handleInputChange}
                  required
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lecciones">Number of Lessons</Label>
                <Input
                  id="lecciones"
                  type="number"
                  placeholder="e.g., 10"
                  value={courseDetails.lecciones}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duracion">Duration (hours)</Label>
                <Input
                  id="duracion"
                  type="number"
                  placeholder="e.g., 5"
                  value={courseDetails.duracion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nivel">Level</Label>
                <Select
                  onValueChange={handleSelectChange}
                  defaultValue={courseDetails.nivel}
                >
                  <SelectTrigger id="nivel">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basico">Básico</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto">
                <Upload className="mr-2 h-4 w-4" />
                Upload Course
              </Button>
            </CardFooter>
          </form>
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
