// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About – DigitalMeve",
  description: "About DigitalMeve",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <section className="container-max px-4 py-14">
        <h1 className="text-3xl font-extrabold tracking-tight">About DigitalMeve</h1>
        <p className="mt-2 text-[var(--fg-muted)]">
          This page is temporarily simplified to unblock the build.
        </p>
      </section>
    </main>
  );
}
