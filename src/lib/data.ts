export interface Course {
  id: string;
  docId: string; // Firestore document ID
  title: string;
  descriptionBreve: string;
  descriptionCompleta: string;
  imagenURL: string;
  dataAiHint: string;
  lecciones: number;
  duracion: number;
  contenido?: string;
  nivel: "basico" | "intermedio" | "avanzado";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  courses: string[]; // IDs de cursos en los que está inscrito
}

export interface Subscription {
  id: string;
  userId: string;
  courseId: string;
  userName: string;
  courseName: string;
  status: "pending" | "approved" | "rejected";
}

export const users: User[] = [
  {
    id: "user1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
    courses: ["1"],
  },
  {
    id: "user2",
    name: "Bob Williams",
    email: "bob@example.com",
    role: "user",
    courses: ["2"],
  },
  {
    id: "user3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "admin",
    courses: [],
  },
];

export const subscriptions: Subscription[] = [
  {
    id: "sub1",
    userId: "user1",
    courseId: "2",
    userName: "Alice Johnson",
    courseName: "Advanced TypeScript",
    status: "pending",
  },
];
