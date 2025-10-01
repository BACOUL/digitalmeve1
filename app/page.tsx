// app/page.tsx — Home v3 (world-class: perf, a11y, CTA sample)

import type { Metadata } from "next";
import dynamicImport from "next/dynamic"; // <- renommé (évite conflit avec export const dynamic)
import Hero from "@/components/Hero";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// --- SEO: metadata forte pour la home ---
export const metadata: Metadata = {
  title: "DigitalMeve — The world’s first privacy-first, on-device proof of authenticity",
  description:
    "Protect and verify your documents instantly. No uploads. No storage. Built-in .MEVE proof for PDF/DOCX. Free for individuals.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "DigitalMeve — Privacy-first, on-device proof of authenticity",
    description:
      "Protect and verify documents instantly. No uploads. No storage. Built-in .MEVE proof.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalMeve — Privacy-first, on-device proof",
    description:
      "Protect and verify documents instantly. No uploads. No storage. Built-in .MEVE proof.",
  },
};

// Chargement différé des sections sous la ligne de flottaison (meilleure TTI)
const AudienceStrip   = dynamicImport(() => import("@/components/AudienceStrip"),   { loading: () => <SectionSkeleton ariaLabel="Audience" /> });
const HowItWorks      = dynamicImport(() => import("@/components/HowItWorks"),      { loading: () => <SectionSkeleton ariaLabel="How it works" /> });
const WhyDigitalMeve  = dynamicImport(() => import("@/components/WhyDigitalMeve"),  { loading: () => <SectionSkeleton ariaLabel="Why DigitalMeve" /> });
const TrustedByDesign = dynamicImport(() => import("@/components/TrustedByDesign"), { loading: () => <SectionSkeleton ariaLabel="Trust" /> });
const Showcase        = dynamicImport(() => import("@/components/Showcase"),        { loading: () => <SectionSkeleton ariaLabel="Showcase" /> });
const UseCases        = dynamicImport(() => import("@/components/UseCases"),        { loading: () => <SectionSkeleton ariaLabel="Use cases" /> });
const FAQ             = dynamicImport(() => import("@/components/FAQ"),             { loading: () => <SectionSkeleton ariaLabel="FAQ" /> });
const PreFooterCTA    = dynamicImport(() => import("@/components/PreFooterCTA"),    { loading: () => <SectionSkeleton ariaLabel="Call to action" /> });

export const runtime = "nodejs";
export const dynamic = "error";

export default function HomePage() {
  return (
    <main
      id="main" // a11y: correspond à la skip-link dans layout
      className="min-h-[100dvh] overflow-visible bg-slate-950 text-slate-100"
      aria-label="DigitalMeve — Home"
    >
      <Hero />

      {/* QUICK START: CTA principaux (impact UX + conversion + Lighthouse “tap targets”) */}
      <section aria-label="Quick start" className="border-b border-[var(--border,rgba(255,255,255,0.08))]">
        <div className="container-max px-4 py-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/generate" className="btn inline-flex items-center gap-2">
              Protect a file <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/verify" className="btn btn-ghost inline-flex items-center gap-2">
              Verify a file <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/examples/sample.pdf" // ⚠️ ajoute /public/examples/sample.pdf
              className="btn-outline"
            >
              Try sample.pdf
            </a>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            DigitalMeve is not legal advice and is not, by itself, a legally binding proof. See <Link href="/terms" className="underline">Terms</Link>.
          </p>
        </div>
      </section>

      <AudienceStrip />     {/* Individuals / Pros */}
      <HowItWorks />        {/* 3 steps */}
      <WhyDigitalMeve />    {/* Benefits */}
      <TrustedByDesign />   {/* Trust badges, reassurance */}
      <Showcase />          {/* Tiny demos / visuals */}
      <UseCases />          {/* Concrete use cases */}
      <FAQ />               {/* Objections & answers */}
      <PreFooterCTA />      {/* Final CTA row */}
    </main>
  );
}

/* ——— Lightweight skeleton (no layout shift) ——— */
function SectionSkeleton({ ariaLabel }: { ariaLabel: string }) {
  return (
    <section aria-label={ariaLabel} className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="h-5 w-36 rounded-full bg-white/5 ring-1 ring-white/10" />
        <div className="mt-3 h-8 w-2/3 rounded-lg bg-white/5 ring-1 ring-white/10" />
        <div className="mt-2 h-4 w-1/2 rounded-lg bg-white/5 ring-1 ring-white/10" />
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[0,1,2].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/5 ring-1 ring-white/10" />
          ))}
        </div>
      </div>
    </section>
  );
}
