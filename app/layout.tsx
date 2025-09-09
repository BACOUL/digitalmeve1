import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "DigitalMeve — The .MEVE Standard",
  description:
    "A simple, portable proof that certifies existence, integrity (SHA-256), and authenticity of any file — in seconds.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100 antialiased">
      <body className="min-h-screen flex flex-col">
        {/* Header global */}
        <Header />

        {/* Contenu des pages */}
        <main className="flex-1">{children}</main>

        {/* Footer à ajouter plus tard */}
      </body>
    </html>
  );
}
