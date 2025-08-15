export interface Course {
  id: string;
  title: string;
  nivel: string;
}

export interface Subscription {
  id: string;
  userId: string;
  courseId: string;
  userName: string;
  courseName: string;
  status: "pending" | "approved" | "rejected";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  courses: number;
}

export type AdminData = {
  courses: Course[];
  subscriptions: Subscription[];
  users: User[];
  loading: boolean;
};
