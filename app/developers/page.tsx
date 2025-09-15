// app/developers/page.tsx
import type { Metadata } from "next";
import DevelopersClient from "./DevelopersClient";

export const metadata: Metadata = {
  title: "Developers — DigitalMeve",
  description:
    "Protect and verify documents at scale with the DigitalMeve API. Lightweight proofs, clean endpoints, privacy-by-design.",
};

export default function Page() {
  return <DevelopersClient />;
}
