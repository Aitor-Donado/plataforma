// src/app/login/page.tsx
"use client";

import { Suspense } from "react";
import LoginForm from "./LoginForm"; // move the real UI here

// Page shell that guarantees client-only rendering
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}

// Opt the entire route out of static generation
export const dynamic = "force-dynamic";
