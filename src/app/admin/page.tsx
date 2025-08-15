// src/app/admin/page.tsx
"use client";
import { Subscript } from "lucide-react";
import { AdminCard } from "./components/AdminCard";
import { CoursePreviewSection } from "./components/CoursePreviewSection";
import { UserPreviewSection } from "./components/UserPreviewSection";
import { SubscriptionPreviewSection } from "./components/SubscriptionPreviewSection";
import { useAdminData } from "./hooks/useAdminData";
import React from "react";

import { ProtectedRoute } from "@/components/protected-route";

export default function AdminPage() {
  const { courses, subscriptions, users, loading } = useAdminData();

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8">Panel de administrador</h1>

        <div className="grid gap-8">
          {/* Course Management Section */}
          <AdminCard
            title="Gestión de los Cursos"
            description="Gestión de los cursos, usuarios y suscripciones."
          >
            <CoursePreviewSection courses={courses} loading={loading} />
          </AdminCard>
          {/* User Management Section */}
          <AdminCard
            title="Gestión de los Usuarios"
            description="Gestión de los usuarios y suscripciones."
          >
            <UserPreviewSection users={users} loading={loading} />
          </AdminCard>
          {/* User Management Section */}
          <AdminCard
            title="Gestión de las Suscripciones"
            description="Gestión de las suscripciones."
          >
            <SubscriptionPreviewSection
              subscriptions={subscriptions}
              loading={loading}
            />
          </AdminCard>
        </div>
      </div>
    </ProtectedRoute>
  );
}
