export interface Course {
  id: string;
  title: string;
  descriptionBreve: string;
  descriptionCompleta: string;
  imagenURL: string;
  dataAiHint: string;
}

export const courses: Course[] = [
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    descriptionBreve: 'Master the basics of React and build modern web applications.',
    descriptionCompleta: 'Dive deep into React concepts including components, state, props, hooks, and context. This course is perfect for beginners looking to build a strong foundation in modern web development. You will build several small projects to solidify your understanding.',
    imagenURL: 'https://placehold.co/600x400.png',
    dataAiHint: 'abstract code',
  },
  {
    id: 'advanced-typescript',
    title: 'Advanced TypeScript',
    descriptionBreve: 'Take your TypeScript skills to the next level with advanced patterns.',
    descriptionCompleta: 'Explore generics, decorators, mapped types, and other advanced TypeScript features. This course will help you write more robust, scalable, and maintainable code for large applications. We will cover real-world examples from popular open-source projects.',
    imagenURL: 'https://placehold.co/600x400.png',
    dataAiHint: 'glowing code',
  },
  {
    id: 'firebase-for-web',
    title: 'Firebase for Web',
    descriptionBreve: 'Learn to build full-stack applications with Firebase and React.',
    descriptionCompleta: 'This course covers Firebase Authentication, Firestore, Cloud Functions, and Hosting. You will learn how to build a complete serverless application from scratch, including user management, data storage, and backend logic.',
    imagenURL: 'https://placehold.co/600x400.png',
    dataAiHint: 'cloud database',
  },
  {
    id: 'nextjs-mastery',
    title: 'Next.js Mastery',
    descriptionBreve: 'Build high-performance, server-rendered React applications.',
    descriptionCompleta: 'Learn the ins and outs of Next.js, including App Router, Server Components, Server Actions, and dynamic routing. We will focus on performance optimization and best practices for building production-ready applications.',
    imagenURL: 'https://placehold.co/600x400.png',
    dataAiHint: 'web architecture',
  },
  {
    id: 'ui-design-principles',
    title: 'UI Design Principles',
    descriptionBreve: 'Discover the fundamentals of creating beautiful and usable interfaces.',
    descriptionCompleta: 'This course covers core design principles like color theory, typography, layout, and hierarchy. You will learn how to create visually appealing and user-friendly interfaces, with a focus on practical application and design thinking.',
    imagenURL: 'https://placehold.co/600x400.png',
    dataAiHint: 'design wireframe',
  },
  {
    id: 'data-structures-algorithms',
    title: 'Data Structures & Algorithms',
    descriptionBreve: 'Strengthen your problem-solving skills with essential computer science concepts.',
    descriptionCompleta: 'A comprehensive review of common data structures and algorithms. This course is essential for technical interviews and for building efficient software. Topics include arrays, linked lists, trees, graphs, sorting, and searching algorithms.',
    imagenURL: 'https://placehold.co/600x400.png',
    dataAiHint: 'binary tree',
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};
