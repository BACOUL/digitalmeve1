// app/page.tsx
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyDigitalMeve from "@/components/WhyDigitalMeve";
import UseCases from "@/components/UseCases";
import SecurityStrip from "@/components/SecurityStrip";
import FAQ from "@/components/FAQ";
import PreFooterCTA from "@/components/PreFooterCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Hero />
      {/* TRUST STRIP supprimé */}
      <HowItWorks />
      <WhyDigitalMeve />
      <UseCases />
      <SecurityStrip />
      <FAQ />
      <PreFooterCTA />
    </main>
  );
}
