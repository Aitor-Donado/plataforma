"use client"; // This component needs client-side hooks for Firestore data

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';

import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { Course } from "@/lib/data";

import { Skeleton } from "@/components/ui/skeleton"; // Assuming Skeleton is client-side
import { CourseDetailsClient } from "./components/CourseDetailsClient"; // Import the new client component

// Import react-notion-x styles
import 'react-notion-x/src/styles.css';

export default function CourseDetailPage({
  params,
}: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [notionPageData, setNotionPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded Notion Page ID for testing
  const notionPageId = '256f12692df480a8b352f4a11c04ba50';
  const notion = new NotionAPI(); // Initialize Notion API client on the client for now

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const q = query(
          collection(db, "courses"),
          where("id", "==", params.id)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          notFound();
        } else {
          const courseData = querySnapshot.docs[0].data() as Course;
          const recordMap = await notion.getPage(notionPageId);
          setNotionPageData(recordMap);
          setCourse(courseData);
        }
      } catch (error) {
        console.error("Error fetching course or notion:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.id, notionPageId]); // Add notionPageId to dependency array

  if (loading) {
    // Keep the skeleton loader for initial loading
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="md:col-span-1">
            {/* Assuming Card and CardContent are client components or used here */}
            <div className="overflow-hidden sticky top-24">
              <Skeleton className="aspect-[3/2] w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-12 w-full mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course || !notionPageData) {
    // If either course or notion data is missing after loading, show not found
    return notFound();
  }

  // Pass fetched data and params.id to the client component
  return (
 <CourseDetailsClient course={course} notionPageData={notionPageData} courseId={params.id} />
  );
}
