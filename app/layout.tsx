// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Sora } from "next/font/google";
import dynamic from "next/dynamic";
import Script from "next/script";

// ⬇️ Import dynamique: évite d'embarquer next-auth côté serveur pendant le prerender
const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  applicationName: "DigitalMeve",
  referrer: "strict-origin-when-cross-origin",
  // (Optionnel) tu peux aussi utiliser la clé dédiée: themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0B1220" }]
  other: { "theme-color": "#0B1220" },
};

// Script d'init du thème (dark par défaut) injecté AVANT l'hydratation pour éviter le flash
const THEME_INIT = `
try {
  var ls = typeof window !== 'undefined' ? window.localStorage : null;
  var pref = ls ? ls.getItem('dm-theme') : null; // "dark" | "light"
  var root = document.documentElement;
  if (pref === 'light') {
    root.classList.add('theme-light');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#FFFFFF');
  } else {
    root.classList.remove('theme-light');
    var meta2 = document.querySelector('meta[name="theme-color"]');
    if (meta2) meta2.setAttribute('content', '#0B1220');
  }
} catch(_) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`antialiased ${inter.variable} ${sora.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      {/* Injecté "beforeInteractive": exécuté avant le premier paint */}
      <Script id="dm-theme-init" strategy="beforeInteractive">{THEME_INIT}</Script>

      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        {/* Header/Footer client-only pour éviter les erreurs de prerender liées à next-auth */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* <div aria-hidden className="noise"></div> */}
      </body>
    </html>
  );
}
