// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers"; // <-- SessionProvider (client)

// Polices
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

// Base URL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com";

// Métadonnées
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
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "DigitalMeve — The .MEVE Standard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalMeve — The .MEVE Standard",
    description: "DigitalMeve delivers a simple, universal digital proof — free for individuals.",
    images: ["/og/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  applicationName: "DigitalMeve",
  referrer: "strict-origin-when-cross-origin",
  other: { "theme-color": "#0B1220" }, // sombre par défaut
};

// Script thème exécuté avant paint (évite le FOUC)
const THEME_INIT = `
(function() {
  try {
    var ls = typeof window !== 'undefined' ? window.localStorage : null;
    var pref = ls ? ls.getItem('dm-theme') : null; // "dark" | "light" | null
    if (pref === 'light') {
      document.documentElement.classList.add('theme-light');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#FFFFFF');
    } else {
      document.documentElement.classList.remove('theme-light');
      var meta2 = document.querySelector('meta[name="theme-color"]');
      if (meta2) meta2.setAttribute('content', '#0B1220');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`antialiased ${inter.variable} ${sora.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      {/* Script d'init thème AVANT l'interactif */}
      <Script id="dm-theme-init" strategy="beforeInteractive">
        {THEME_INIT}
      </Script>

      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        {/* Tout composant utilisant useSession est couvert ici */}
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>

        {/* Grain global optionnel si défini dans globals.css */}
        {/* <div aria-hidden className="noise" /> */}
      </body>
    </html>
  );
}
