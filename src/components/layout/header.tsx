// src/components/layout/header.tsx
"use client";

import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export function Header() {
  const { user, loading } = useAuth();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const NavLinks = () => (
    <>
      <Link href="/" className="hover:text-primary">
        Inicio
      </Link>
      <Link href="/courses" className="hover:text-primary">
        Course Explorer
      </Link>
      <Link href="/about" className="hover:text-primary">
        About
      </Link>
      <Link href="/blog" className="hover:text-primary">
        Blog
      </Link>
      {user && (
        <Link href={`/users/${user.uid}/`} className="hover:text-primary">
          Profile
        </Link>
      )}
      {user && user.role === "admin" && (
        <Link href="/admin" className="hover:text-primary">
          Admin
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-gray-800 dark:text-white">
              Course Explorer
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav className="flex items-center space-x-6 text-sm font-medium text-gray-800 dark:text-gray-200">
            <NavLinks />
          </nav>
        )}

        {/* Auth Button */}
        {!isMobile && (
          <div>
            {!loading &&
              (user ? (
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
              ))}
          </div>
        )}

        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-800 dark:text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      {isMobile && menuOpen && (
        <div className="bg-background border-t border-border p-4 space-y-4 text-gray-800 dark:text-gray-200">
          <nav className="flex flex-col space-y-4">
            <NavLinks />
          </nav>
          {!loading &&
            (user ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full"
              >
                Logout
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
            ))}
        </div>
      )}
    </header>
  );
}
