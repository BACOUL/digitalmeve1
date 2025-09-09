import { Hero } from "@/components/Hero";
import ValueProps from "@/components/ValueProps"; // si ce composant existe en export default
import HowItWorks from "@/components/HowItWorks"; // idem

export default function Home() {
  return (
    <>
      <Hero />
      {/* Conserve les sections existantes si tu veux */}
      {typeof ValueProps === "function" && <ValueProps />}
      {typeof HowItWorks === "function" && <HowItWorks />}
    </>
  );
}
