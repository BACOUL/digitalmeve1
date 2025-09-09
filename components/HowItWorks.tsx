// components/HowItWorks.tsx
export default function HowItWorks() {
  const steps = [
    {
      title: "Upload",
      desc:
        "Drop any file or take a photo from mobile. No storage: processed in memory, up to 25 MB.",
      icon: "📤",
    },
    {
      title: "Generate the proof",
      desc:
        "We compute the SHA-256 hash and add an ISO-8601 UTC timestamp and issuer metadata.",
      icon: "⚙️",
    },
    {
      title: "Verify anywhere",
      desc:
        "Download a .meve sidecar or embedded proof. Anyone can verify the hash, timestamp and issuer level.",
      icon: "✅",
    },
  ];

  return (
    <section
      aria-labelledby="how-it-works"
      className="mx-auto max-w-7xl px-4 py-16 md:py-20"
    >
      <div className="text-center">
        <h2
          id="how-it-works"
          className="text-2xl md:text-3xl font-semibold tracking-tight"
        >
          How it works
        </h2>
        <p className="mt-3 text-slate-300">
          Three simple steps to certify and verify any document.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg backdrop-blur"
          >
            {/* Accent line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-dm-emerald via-dm-accent to-dm-sky" />

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-2xl">
                {s.icon}
              </div>
              <div>
                <div className="text-sm text-slate-400">Step {i + 1}</div>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Row */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a href="/generate" className="btn-primary text-center">
          Generate a proof
        </a>
        <a
          href="/verify"
          className="rounded-2xl border border-white/10 px-5 py-3 text-slate-200 hover:bg-white/5 transition text-center"
        >
          Verify a proof
        </a>
      </div>
    </section>
  );
}
