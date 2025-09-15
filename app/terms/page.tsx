// app/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service – DigitalMeve",
  description: "The rules for using DigitalMeve.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 bg-white text-gray-800">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Terms of Service</h1>
        <p className="mt-3 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">1. Acceptation</h2>
        <p className="text-gray-700 leading-7">
          En utilisant DigitalMeve, vous acceptez ces Conditions. Si vous n’êtes pas d’accord,
          n’utilisez pas le service.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">2. Usage</h2>
        <p className="text-gray-700 leading-7">
          Vous êtes responsable du contenu que vous traitez. N’utilisez pas le service pour des
          activités illégales ni pour violer des droits de tiers.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">3. Limitation</h2>
        <p className="text-gray-700 leading-7">
          Le service est fourni “en l’état”, sans garantie. Dans la mesure permise par la loi,
          notre responsabilité est limitée.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">4. Résiliation</h2>
        <p className="text-gray-700 leading-7">
          Nous pouvons suspendre ou mettre fin à l’accès en cas d’abus ou de violation de ces
          Conditions.
        </p>
      </section>

      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">5. Contact</h2>
        <p className="text-gray-700 leading-7">
          Questions ?{" "}
          <a
            href="mailto:legal@digitalmeve.com"
            className="text-emerald-600 hover:text-emerald-700 underline"
          >
            legal@digitalmeve.com
          </a>
          .
        </p>
        <p className="text-sm text-gray-500">
          Consultez aussi notre{" "}
          <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline">
            Politique de confidentialité
          </Link>.
        </p>
      </section>
    </main>
  );
}
