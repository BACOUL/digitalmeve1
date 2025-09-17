import Hero from "@/components/Hero";
import AudienceStrip from "@/components/AudienceStrip"; // <— NEW
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
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Hero />
      <AudienceStrip />     {/* <<< met en évidence Particuliers / Pros */}
      <HowItWorks />
      <WhyDigitalMeve />
      <TrustedByDesign />
      <Showcase />
      <UseCases />
      <FAQ />
      <PreFooterCTA />
    </main>
  );
}
