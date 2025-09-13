// app/security/page.tsx
"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  HardDrive,
  Fingerprint,
  EyeOff,
  Cpu,
  Network,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
              Security & Trust —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
                by design
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              DigitalMeve protège vos documents sans les stocker. Nous calculons une
              empreinte locale (SHA-256) et intégrons une preuve légère directement
              dans le fichier. Votre document reste lisible et vérifiable, partout.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center justify-center gap-2 rounded-xl ring-1 ring-sky-200 px-5 py-2.5 text-sm font-medium text-sky-700 hover:bg-sky-50"
              >
                Verify a document
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODEL OVERVIEW */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card
            icon={<Cpu className="h-5 w-5 text-emerald-600" />}
            title="Hash local, pas d’upload"
            desc="Le calcul SHA-256 s’exécute dans votre navigateur. Nous n’envoyons pas votre document — pour l’usage individuel, aucun contenu n’est transmis à nos serveurs."
          />
          <Card
            icon={<FileCheck2 className="h-5 w-5 text-sky-600" />}
            title="Preuve intégrée au fichier"
            desc="Nous insérons une preuve .MEVE (date, heure, empreinte) dans le fichier (PDF/DOCX). Le document reste lisible, portable et vérifiable par tous."
          />
          <Card
            icon={<HardDrive className="h-5 w-5 text-amber-500" />}
            title="Zéro stockage par défaut"
            desc="Nous ne conservons pas vos fichiers. Côté Business/API, vous choisissez: hash-only ou transfert; la conservation est configurable/optionnelle."
          />
        </div>
      </section>

      {/* DIAGRAM / FLOW */}
      <section className="mx-auto max-w-6xl px-4 py-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-gray-900">Comment ça marche</h2>
          <p className="mt-2 text-gray-600">
            Un flux simple qui privilégie la confidentialité et l’interopérabilité.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-4">
            <Step
              n={1}
              title="Choix du fichier"
              desc="Vous sélectionnez votre document sur votre appareil."
              icon={<Lock className="h-5 w-5 text-gray-500" />}
            />
            <Step
              n={2}
              title="Empreinte locale"
              desc="Le navigateur calcule un SHA-256 localement (pas d’upload)."
              icon={<Fingerprint className="h-5 w-5 text-emerald-600" />}
            />
            <Step
              n={3}
              title="Marqueur .MEVE"
              desc="Nous intégrons une preuve légère (date/heure + empreinte) au fichier."
              icon={<ShieldCheck className="h-5 w-5 text-sky-600" />}
            />
            <Step
              n={4}
              title="Vérification universelle"
              desc="Le fichier reste lisible et peut être vérifié par n’importe qui."
              icon={<Network className="h-5 w-5 text-amber-500" />}
            />
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Nos engagements</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Bullet
            title="Confidentialité par défaut"
            points={[
              "Usage individuel: le traitement reste local dans votre navigateur.",
              "Aucun compte requis. Aucun stockage par défaut.",
            ]}
          />
          <Bullet
            title="Intégrité du document"
            points={[
              "Le fichier reste lisible: pas d’encryptage opaque ni de DRM bloquants.",
              "Toute altération change l’empreinte: la vérification détecte la fraude.",
            ]}
          />
          <Bullet
            title="Interopérabilité"
            points={[
              ".MEVE n’enferme pas vos données — c’est un marqueur léger et documenté.",
              "Vérifiable publiquement (page Verify et outils ouverts).",
            ]}
          />
          <Bullet
            title="Transparence & contrôle (Business)"
            points={[
              "API hash-only, webhooks, journaux d’audit.",
              "Politiques de rétention configurables; hébergement/région à l’étude.",
            ]}
          />
        </div>
      </section>

      {/* THREAT MODEL (résumé) */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-gray-900">Modèle de menace (résumé)</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Ce que .MEVE empêche</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li>• Substituer un document sans le détecter (empreinte change immédiatement).</li>
                <li>• Ajouter/retirer des pages ou modifier le contenu à l’identique sans alerte.</li>
                <li>• “Nettoyer” la preuve: l’absence de marqueur est détectable.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Hors périmètre</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li>• Confidentialité du contenu après partage (pas de chiffrement/DRM côté Free).</li>
                <li>• Compromission du poste client (malware, navigateur modifié).</li>
                <li>• Attestation d’identité forte sans étape KYC (badge Pro requis côté Business).</li>
              </ul>
              <p className="mt-2 text-xs text-gray-500">
                Pour des exigences de chiffrement ou d’identité, utilisez nos offres Business
                (badge domaine/e-mail, politiques de data-handling) ou des outils complémentaires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-gray-500" />
          <h2 className="text-2xl font-semibold text-gray-900">FAQ</h2>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <QA
            q="Stockez-vous mes documents ?"
            a="Non pour l’usage individuel: tout se fait localement dans votre navigateur. Côté Business, vous choisissez le mode (hash-only recommandé)."
          />
          <QA
            q="Le fichier reste-t-il lisible ?"
            a="Oui. Le marqueur .MEVE est léger et intégré; votre PDF/DOCX s’ouvre normalement dans les lecteurs habituels."
          />
          <QA
            q="Comment vérifier un fichier ?"
            a="Ouvrez la page Verify et déposez le fichier .MEVE. Toute modification est détectée (empreinte différente ou marqueur manquant)."
          />
          <QA
            q="Proposez-vous du chiffrement ?"
            a="Notre priorité est une preuve portable et universelle. Le chiffrement/DRM peut être combiné en solution Business selon vos besoins."
          />
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/developers"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50"
          >
            Developer docs
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700"
          >
            Contact sales
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ---------------------- UI bits ---------------------- */

function Card({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Step({
  n,
  title,
  desc,
  icon,
}: {
  n: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          {icon}
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        </div>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
          {n}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Bullet({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-gray-700">
        {points.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>
    </div>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="text-base font-semibold text-gray-900">{q}</h3>
      <p className="mt-2 text-sm text-gray-600">{a}</p>
    </div>
  );
      }
