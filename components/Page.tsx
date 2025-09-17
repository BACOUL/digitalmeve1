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
      {/* 1. HERO */}
      <Hero />

      {/* 2. HOW IT WORKS */}
      <HowItWorks />

      {/* 3. WHY DIGITALMEVE */}
      <WhyDigitalMeve />

      {/* 4. USE CASES */}
      <UseCases />

      {/* 5. SECURITY STRIP */}
      <SecurityStrip />

      {/* 6. FAQ */}
      <FAQ />

      {/* 7. PRE-FOOTER CTA */}
      <PreFooterCTA />
    </main>
  );
}
