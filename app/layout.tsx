// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigitalMeve",
  description: "Vos preuves numériques, simples et vérifiées",
};

export const dynamic = "force-dynamic";   // <-- empêche l’erreur de build
export const revalidate = 0;              // <-- évite le SSG bloquant

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-white text-gray-900">
      <body className="min-h-screen flex flex-col">
        {/* HEADER simple pour revenir sur le site */}
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-sky-600">DigitalMeve</h1>
            <nav className="flex gap-4 text-sm font-medium text-gray-700">
              <a href="/pricing" className="hover:text-sky-600">Tarifs</a>
              <a href="/personal" className="hover:text-sky-600">Personnel</a>
              <a href="/business" className="hover:text-sky-600">Entreprise</a>
            </nav>
          </div>
        </header>

        {/* CONTENU */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} DigitalMeve — Tous droits réservés
          </div>
        </footer>
      </body>
    </html>
  );
}
