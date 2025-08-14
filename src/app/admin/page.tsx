'use client';
import { Subscript } from 'lucide-react';
import { AdminCard } from './components/AdminCard';
import { CourseManagementSection } from './components/CourseManagementSection';
import { UserManagementSection } from './components/UserManagementSection';
import { SubscriptionsSection } from './components/SubscriptionsSection';
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
          description="Gestión de los cursos, usuarios y suscripciones."
        >
          <CourseManagementSection courses={courses} loading={loading} />
          <UserManagementSection users={users} loading={loading} />
          <SubscriptionsSection subscriptions={subscriptions} loading={loading} />
        </AdminCard>
      </div>
    </div>
  );
}