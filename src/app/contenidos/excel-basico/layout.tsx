// src/app/contenidos/excel-basico/layout.tsx

// Remove Metadata export if it's not needed specifically for this segment
// import type { Metadata } from "next";

// Remove font imports if they are already in the root layout
// import { Geist, Geist_Mono } from "next/font/google";

// Remove local globals.css import if global styles are handled in root
// import "./globals.css";

// Remove font variable declarations if fonts are handled in root layout
// const geistSans = Geist({ ... });
// const geistMono = Geist_Mono({ ... });

// Remove Metadata export
// export const metadata: Metadata = { ... };

export default function ExcelBasicoLayout({
  // Rename function to reflect segment
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="app-container">{children}</div>;
}
