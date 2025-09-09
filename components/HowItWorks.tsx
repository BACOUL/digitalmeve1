export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Upload",
      desc:
        "Drop any file (up to 25 MB). No storage: your file is processed in memory and never saved.",
    },
    {
      step: "2",
      title: "Generate",
      desc:
        "Create a portable .meve JSON proof with the file’s SHA-256 and optional issuer and metadata.",
    },
    {
      step: "3",
      title: "Verify",
      desc:
        "Anyone can verify the proof to confirm existence, integrity, and authenticity in seconds.",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="text-center text-3xl font-bold text-slate-100 sm:text-4xl">
        How it works
      </h2>
      <p className="mt-3 text-center text-slate-400">
        Three simple steps to certify your documents with the .MEVE standard.
      </p>

      <ol className="mt-10 grid gap-6 sm:grid-cols-3">
        {steps.map(({ step, title, desc }) => (
          <li
            key={step}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md shadow-md hover:border-emerald-400/50 transition"
          >
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-800/60 text-sm font-semibold text-slate-200">
              {step}
            </div>
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
            <p className="mt-2 text-sm text-slate-400">{desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
