export interface Course {
  id: string;
  title: string;
  descriptionBreve: string;
  descriptionCompleta: string;
  imagenURL: string;
  dataAiHint: string;
  lecciones: number;
  duracion: number;
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

export const courses: Course[] = [
  {
    id: "hojas-calculo-basico",
    title: "Hojas de Cálculo. Nivel Básico",
    descriptionBreve:
      "Dominar los conceptos básicos de hojas de cálculo y realizar cálculos avanzados.",
    descriptionCompleta:
      "Domina los conceptos básicos sobre hojas de cálculo. Domina la interfaz de Microsoft Excel para la gestión de documentos. Seleccionar y moverse en una hoja de Excel, crear fórmulas sencillas, manejar operadores y referencias. Emplearás funciones lógicas y condicionales. Anidar funciones. Crear gráficos de datos y cambiar sus formatos. Configurar la impresión de las hojas de cálculo.",
    imagenURL: "https://placehold.co/600x400.png",
    dataAiHint: "Hojas de cálculo",
    lecciones: 7,
    duracion: 15,
    nivel: "basico",
  },
  {
    id: "hojas-calculo-medio",
    title: "EXCEL Avanzado",
    descriptionBreve:
      "Uso avanzado de hojas de datos. Tablas dinámicas, macros, Power Query, Power Pivot",
    descriptionCompleta:
      "Dive deep into React concepts including components, state, props, hooks, and context. This course is perfect for beginners looking to build a strong foundation in modern web development. You will build several small projects to solidify your understanding.",
    imagenURL: "https://placehold.co/600x400.png",
    dataAiHint: "abstract code",
    lecciones: 8,
    duracion: 25,
    nivel: "intermedio",
  },
  {
    id: "hojas-calculo-avanzado",
    title: "Power BI",
    descriptionBreve: "Uso de PowerBI para visualización de datos y reportes.",
    descriptionCompleta:
      "Uso de PowerBI para visualización de datos y reportes.",
    imagenURL: "https://placehold.co/600x400.png",
    dataAiHint: "abstract code",
    lecciones: 10,
    duracion: 60,
    nivel: "avanzado",
  },
];

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

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};
