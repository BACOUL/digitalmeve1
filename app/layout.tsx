import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DigitalMeve",
  description: "Vos subventions. En un clic.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {/* Header / Menu */}
        <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-teal-600">DigitalMeve</h1>
          <nav className="space-x-6">
            <a href="/" className="text-gray-700 hover:text-teal-600">
              Accueil
            </a>
            <a href="/services" className="text-gray-700 hover:text-teal-600">
              Services
            </a>
            <a href="/contact" className="text-gray-700 hover:text-teal-600">
              Contact
            </a>
          </nav>
        </header>

        {/* Contenu des pages */}
        <main className="p-8">{children}</main>

        {/* Footer */}
        <footer className="w-full bg-gray-100 text-center p-4 mt-8">
          <p className="text-sm text-gray-600">
            © 2025 DigitalMeve. Tous droits réservés.
          </p>
        </footer>
      </body>
    </html>
  );
}
