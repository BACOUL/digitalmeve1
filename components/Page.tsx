// app/page.tsx — Home v1.0 (9 sections, world-class layout)

import Hero from "@/components/Hero";
import AudienceStrip from "@/components/AudienceStrip"; // Highlights Individuals / Pros
import HowItWorks from "@/components/HowItWorks";
import WhyDigitalMeve from "@/components/WhyDigitalMeve";
import TrustedByDesign from "@/components/TrustedByDesign";
import Showcase from "@/components/Showcase";
import UseCases from "@/components/UseCases";
import FAQ from "@/components/FAQ";
import PreFooterCTA from "@/components/PreFooterCTA";

export const runtime = "nodejs";
export const dynamic = "error";

export default function HomePage() {
  return (
    <main
      className="min-h-[100dvh] overflow-visible bg-slate-950 text-slate-100"
      aria-label="DigitalMeve — Home"
    >
      <Hero />
      <AudienceStrip />     {/* Individuals / Professionals at a glance */}
      <HowItWorks />        {/* 3–4 steps, ultra simple */}
      <WhyDigitalMeve />    {/* Key benefits: No storage · Universal · GDPR · Fast */}
      <TrustedByDesign />   {/* Trust badges, counters, reassurance */}
      <Showcase />          {/* Sample certificate / small visual demos */}
      <UseCases />          {/* Concrete use cases for both audiences */}
      <FAQ />               {/* Objections: privacy, legal, pricing, usage */}
      <PreFooterCTA />      {/* Final CTA row: Try free / See Pro plans */}
    </main>
  );
}
