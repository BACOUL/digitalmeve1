// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter, Sora } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DigitalMeve — The .MEVE Standard",
  description:
    "DigitalMeve delivers a simple, universal digital proof — free for individuals.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DigitalMeve",
    title: "DigitalMeve — The .MEVE Standard",
    description:
      "DigitalMeve delivers a simple, universal digital proof — free for individuals.",
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
    description:
      "DigitalMeve delivers a simple, universal digital proof — free for individuals.",
    images: ["/og/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  applicationName: "DigitalMeve",
  referrer: "strict-origin-when-cross-origin",
  // sombre par défaut (aligné avec --bg = #0B1220 dans globals.css)
  other: { "theme-color": "#0B1220" },
};

// Petit script inline, exécuté AVANT le rendu, pour appliquer la préférence thème
// - Par défaut: sombre
// - Si localStorage.theme = "light", on force le clair
// - Sinon si pas de préférence et OS en clair => on peut basculer en clair (optionnel, ici on reste dark par défaut)
const THEME_INIT = `
(function() {
  try {
    var ls = typeof window !== 'undefined' ? window.localStorage : null;
    var pref = ls ? ls.getItem('dm-theme') : null; // "dark" | "light" | null
    var body = document.documentElement; // plus tôt que <body>
    // On veut le sombre par défaut (cohérent avec la charte)
    // On ne passe en clair QUE si l'utilisateur l'a explicitement demandé.
    if (pref === 'light') {
      document.documentElement.classList.add('theme-light');
      // Met à jour la meta theme-color sans FOUC
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#FFFFFF');
    } else {
      document.documentElement.classList.remove('theme-light');
      var meta2 = document.querySelector('meta[name="theme-color"]');
      if (meta2) meta2.setAttribute('content', '#0B1220');
    }
  } catch (e) { /* no-op */ }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // On place les variables de police sur <html> pour qu’elles soient disponibles partout
    <html
      lang="en"
      className={`antialiased ${inter.variable} ${sora.variable}`}
      // Améliore les contrôles natifs en sombre (inputs, select, etc.)
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      {/* Script d'init thème avant paint (évite le flash) */}
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT }}
        />
      </head>

      {/* 
        - Fond & texte basés sur variables de la charte (globals.css)
        - Layout en colonne
      */}
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Grain léger global optionnel (si défini dans globals.css) */}
        {/* <div aria-hidden className="noise"></div> */}
      </body>
    </html>
  );
}
