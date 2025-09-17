"use client";

const QA = [
  {
    q: "Do I need an account?",
    a: "No. You can generate and verify without creating an account.",
  },
  {
    q: "Do you store my files?",
    a: "No. Everything runs in your browser — we never keep your files.",
  },
  {
    q: "Are my files still readable?",
    a: "Yes. Nothing changes for how you open or share them.",
  },
  {
    q: "Is this a legal proof?",
    a: "It’s a technical integrity signal. See Legal/Terms for guidance per jurisdiction.",
  },
];

export default function FAQ() {
  return (
    <section aria-label="FAQ" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-semibold">FAQ</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {QA.map((f) => (
          <details key={f.q} className="surface p-5 rounded-2xl group" data-reveal>
            <summary className="cursor-pointer list-none font-semibold">
              {f.q}
              <span className="float-right opacity-60 group-open:rotate-45 transition">+</span>
            </summary>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
