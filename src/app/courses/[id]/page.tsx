import React from 'react';
import { notFound } from 'next/navigation';
import { NotionAPI } from 'notion-client';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Assuming db import is correct

const notion = new NotionAPI();

// Hardcoded Notion Page ID for testing - replace with logic to get this from course data later
const NOTION_PAGE_ID = '256f12692df480a8b352f4a11c04ba50';

export default async function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Unwrap the params Promise in the Server Component
  const { id: courseId } = React.use(params);

  // Fetch Firestore course data server-side
  const firestoreQuery = query(
    collection(db, "courses"),
    where("id", "==", courseId)
  );
  const firestorePromise = getDocs(firestoreQuery);

  // Fetch Notion page data by calling the API route
  const notionApiUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/notion?pageId=${NOTION_PAGE_ID}`;
  const notionPromise = fetch(notionApiUrl).then(res => res.json());

  try {
    // Await both promises concurrently
    const querySnapshot = await firestorePromise;
    const notionData = await notionPromise;

    if (querySnapshot.empty) {
      console.log(`Course with ID ${courseId} not found in Firestore.`);
      notFound();
    } else {
      const course = querySnapshot.docs[0].data(); // Data is already Course type via client component
      console.log(`Course found: ${course.title}`);

    }
  } catch (error) {
    // Handle potential errors from either Firestore or Notion fetching
     console.error(`Error fetching Firestore data for course ID ${courseId}:`, error);
     notFound(); // If Firestore fetching fails, notFound() is called
  }

  // If course was not found by Firestore query, notFound() is already called.

  // Import and render the Client Component, passing the fetched data
  const { CourseDetailsClient } = await import('./components/CourseDetailsClient');
  return (
    <CourseDetailsClient initialCourse={course as Course} notionData={notionData} />
  );
}
