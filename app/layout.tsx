// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "DigitalMeve — The .MEVE Standard",
  description:
    "A simple, portable proof that certifies existence, integrity (SHA-256), and authenticity of any file.",
  openGraph: {
    title: "DigitalMeve — The .MEVE Standard",
    description:
      "A simple, portable proof that certifies existence, integrity (SHA-256), and authenticity of any file.",
    type: "website",
  },
  metadataBase: new URL("https://jeason1.vercel.app"), // mets ton domaine si besoin
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#0B1220]">
      <body className="text-white antialiased">
        {/* Header sticky (desktop + mobile burger) */}
        <Header />
        {/* petit espace sous le header */}
        <div className="h-2 md:h-4" />
        {children}
      </body>
    </html>
  );
}
