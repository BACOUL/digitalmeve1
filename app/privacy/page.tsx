// app/privacy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – DigitalMeve",
  description: "How DigitalMeve collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 bg-white text-gray-800">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Privacy Policy</h1>
        <p className="mt-3 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">1. Overview</h2>
        <p className="text-gray-700 leading-7">
          DigitalMeve traite vos fichiers localement dans votre navigateur. Nous ne
          stockons pas vos documents lorsque vous générez ou vérifiez une preuve.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">2. Données collectées</h2>
        <p className="text-gray-700 leading-7">
          Nous pouvons collecter des métadonnées strictement nécessaires au bon fonctionnement
          du service (journalisation d’erreurs, statistiques agrégées, limite d’usage invité).
          Aucun contenu de vos documents n’est envoyé à nos serveurs.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">3. Cookies</h2>
        <p className="text-gray-700 leading-7">
          Nous utilisons uniquement des cookies techniques et/ou un stockage local minimal pour
          les préférences et limites d’usage. Pas de cookies publicitaires.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">4. Vos droits</h2>
        <p className="text-gray-700 leading-7">
          Vous pouvez nous contacter pour toute demande d’accès, de rectification ou de
          suppression des données personnelles vous concernant.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">5. Contact</h2>
        <p className="text-gray-700 leading-7">
          Pour toute question, écrivez-nous à{" "}
          <a
            href="mailto:privacy@digitalmeve.com"
            className="text-emerald-600 hover:text-emerald-700 underline"
          >
            privacy@digitalmeve.com
          </a>.
        </p>
        <p className="text-sm text-gray-500">
          Voir aussi nos{" "}
          <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 underline">
            Conditions d’utilisation
          </Link>.
        </p>
      </section>
    </main>
  );
}
