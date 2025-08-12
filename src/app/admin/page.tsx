'use client';
import { AdminCard } from './components/AdminCard';
import { CourseManagementSection } from './components/CourseManagementSection';
import { SubscriptionsSection } from './components/SubscriptionsSection';
import { UserManagementSection } from './components/UserManagementSection';
import { useAdminData } from './hooks/useAdminData';
import React from 'react'; // Import React

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

        {/* Pending Subscriptions Section */}
        <AdminCard
          title="Pending Subscriptions"
          description="Review and approve new course subscription requests."
        >
          <SubscriptionsSection subscriptions={subscriptions} />
        </AdminCard>

        {/* User Management Section */}
        <AdminCard
          title="User Management"
          description="View all registered users on the platform."
        >
          <UserManagementSection users={users} />
        </AdminCard>
      </div>
    </div>
  );
}