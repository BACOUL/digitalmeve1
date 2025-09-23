// app/page.tsx — Home v2 (world-class: perf, a11y, no overflow, lazy below-the-fold)

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Chargement différé des sections sous la ligne de flottaison (meilleure TTI)
const AudienceStrip    = dynamic(() => import("@/components/AudienceStrip"),   { ssr: false, loading: () => <SectionSkeleton /> });
const HowItWorks       = dynamic(() => import("@/components/HowItWorks"),      { ssr: false, loading: () => <SectionSkeleton /> });
const WhyDigitalMeve   = dynamic(() => import("@/components/WhyDigitalMeve"),  { ssr: false, loading: () => <SectionSkeleton /> });
const TrustedByDesign  = dynamic(() => import("@/components/TrustedByDesign"), { ssr: false, loading: () => <SectionSkeleton /> });
const Showcase         = dynamic(() => import("@/components/Showcase"),        { ssr: false, loading: () => <SectionSkeleton /> });
const UseCases         = dynamic(() => import("@/components/UseCases"),        { ssr: false, loading: () => <SectionSkeleton /> });
const FAQ              = dynamic(() => import("@/components/FAQ"),             { ssr: false, loading: () => <SectionSkeleton /> });
const PreFooterCTA     = dynamic(() => import("@/components/PreFooterCTA"),    { ssr: false, loading: () => <SectionSkeleton /> });

export const runtime = "nodejs";
export const dynamic = "error";

export default function HomePage() {
  return (
    <main
      className="min-h-[100dvh] overflow-visible bg-[var(--bg)] text-[var(--fg)]"
      aria-label="DigitalMeve — Home"
    >
      {/* 1) Hero (au-dessus de la ligne de flottaison) */}
      <section className="fx-boundary" aria-labelledby="hero">
        <Hero />
      </section>

      {/* 2) Bandeau audiences (Individuals / Pros) — demandé en premier */}
      <section className="fx-boundary" aria-labelledby="audience">
        <AudienceStrip />
      </section>

      {/* 3) How it works (3 étapes claires) */}
      <section className="fx-boundary" aria-labelledby="how-it-works">
        <HowItWorks />
      </section>

      {/* 4) Why DigitalMeve (valeurs clés, cohérent avec GitHub) */}
      <section className="fx-boundary" aria-labelledby="why-digitalmeve">
        <WhyDigitalMeve />
      </section>

      {/* 5) Trusted by design (piliers de confiance) */}
      <section className="fx-boundary" aria-labelledby="trusted-by-design">
        <TrustedByDesign />
      </section>

      {/* 6) Use cases (concrets, avant les visuels) */}
      <section className="fx-boundary" aria-labelledby="use-cases">
        <UseCases />
      </section>

      {/* 7) Showcase (visuels / échantillons) */}
      <section className="fx-boundary" aria-labelledby="showcase">
        <Showcase />
      </section>

      {/* 8) FAQ (objections clés) */}
      <section className="fx-boundary" aria-labelledby="faq">
        <FAQ />
      </section>

      {/* 9) CTA final (Try free / See Pro) */}
      <section className="fx-boundary" aria-labelledby="cta-final">
        <PreFooterCTA />
      </section>
    </main>
  );
}

/* ————— Skeleton ultra léger pour le lazy ————— */
function SectionSkeleton() {
  return (
    <div className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="h-6 w-40 rounded-lg bg-white/5" />
        <div className="mt-3 h-8 w-3/5 rounded-lg bg-white/5" />
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="h-24 rounded-xl bg-white/5" />
          <div className="h-24 rounded-xl bg-white/5" />
          <div className="h-24 rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  );
      }
