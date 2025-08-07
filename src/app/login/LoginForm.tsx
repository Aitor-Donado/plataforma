// src/app/login/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirectUrl);
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] py-12">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Button>
          </CardFooter>

          <CardFooter className="flex justify-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline ml-1">
              Sign up
            </a>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
