import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter, Sora } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const sora  = Sora({  subsets: ["latin"], display: "swap", variable: "--font-display" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DigitalMeve — The .MEVE Standard",
  description: "DigitalMeve delivers a simple, universal digital proof — free for individuals.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DigitalMeve",
    title: "DigitalMeve — The .MEVE Standard",
    description: "DigitalMeve delivers a simple, universal digital proof — free for individuals.",
    images: [{ url: "/og/og-image.png", width: 1200, height: 630, alt: "DigitalMeve — The .MEVE Standard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalMeve — The .MEVE Standard",
    description: "DigitalMeve delivers a simple, universal digital proof — free for individuals.",
    images: ["/og/og-image.png"],
  },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/apple-touch-icon.png" },
  applicationName: "DigitalMeve",
  referrer: "strict-origin-when-cross-origin",
  other: { "theme-color": "#ffffff" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
