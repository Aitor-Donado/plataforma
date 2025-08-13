'use client';
import { AdminCard } from './components/AdminCard';
import { CourseManagementSection } from './components/CourseManagementSection';
import { useAdminData } from './hooks/useAdminData';
import React from 'react';

export default function AdminPage() {
  const { courses, subscriptions, users, loading } = useAdminData();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-8">
        {/* Course Management Section */}
        <AdminCard
          title="Gestión de Cursos"
          description="Overview of existing courses and link to full management."
        >
          <CourseManagementSection courses={courses} loading={loading} />
        </AdminCard>
      </div>
    </div>
  );
}