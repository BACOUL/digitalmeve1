// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "DigitalMeve — The .MEVE Standard",
  description:
    "A 2-second, portable proof of existence, integrity (SHA-256), and authenticity for any file.",
  metadataBase: new URL("https://digitalmeve.com"),
  openGraph: {
    title: "DigitalMeve — The .MEVE Standard",
    description:
      "A 2-second, portable proof of existence, integrity (SHA-256), and authenticity.",
    url: "https://digitalmeve.com",
    siteName: "DigitalMeve",
    images: [{ url: "/og/cover.png", width: 1200, height: 630, alt: "DigitalMeve" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalMeve — The .MEVE Standard",
    description:
      "A 2-second, portable proof of existence, integrity (SHA-256), and authenticity.",
    images: ["/og/cover.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-[#0B1220] text-slate-100 antialiased">
        {/* Sticky glass header */}
        <Header />

        {/* Page content */}
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
