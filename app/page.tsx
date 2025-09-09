import { Hero } from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import HowItWorks from "@/components/HowItWorks";
import Levels from "@/components/Levels";

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <Hero />

      {/* Value proposition (Existence, Integrity, Authenticity) */}
      <ValueProps />

      {/* 3-step process (Upload → Generate → Verify) */}
      <HowItWorks />

      {/* Certification levels (Personal / Pro / Official) */}
      <Levels />
    </>
  );
}
