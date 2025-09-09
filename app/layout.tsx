// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "DigitalMeve — The .MEVE Standard",
  description:
    "A simple, portable proof that certifies existence, integrity (SHA-256), and authenticity of any document.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {/* Global Header */}
        <Header />

        {/* Page content */}
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600">
            © {new Date().getFullYear()} DigitalMeve — All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
