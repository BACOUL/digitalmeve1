// app/page.tsx — Home v2 (world-class: perf, a11y, no overflow, lazy below-the-fold)

import dynamicImport from "next/dynamic"; // <- renommé (évite conflit avec export const dynamic)
import Hero from "@/components/Hero";

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
// Important: on garde ce flag, mais l’import `dynamic` a été renommé en `dynamicImport`
export const dynamic = "error";

export default function HomePage() {
  return (
    <main
      className="min-h-[100dvh] overflow-visible bg-slate-950 text-slate-100"
      aria-label="DigitalMeve — Home"
    >
      <Hero />
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
