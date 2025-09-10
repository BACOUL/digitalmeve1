import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header"; // ✅ import par défaut

export const metadata: Metadata = {
  title: "DigitalMeve — The .MEVE Standard",
  description:
    "DigitalMeve delivers a simple, universal digital proof — free for individuals.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100 antialiased">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
