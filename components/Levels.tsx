export default function Levels() {
  const levels = [
    {
      title: "Personal",
      desc: "Free .MEVE proofs for individuals. Quick and easy certification with no storage.",
      badge: "Personal",
    },
    {
      title: "Pro",
      desc: "For professionals and businesses. API access, higher limits, and priority support.",
      badge: "Pro",
    },
    {
      title: "Official",
      desc: "For institutions and authorities. Advanced verification and official compliance.",
      badge: "Official",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">
        Levels of Certification
      </h2>
      <p className="mt-3 text-slate-400">
        Choose the right .MEVE badge for your needs.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {levels.map((lvl) => (
          <div
            key={lvl.title}
            className="rounded-2xl bg-slate-900/60 border border-white/10 p-8 backdrop-blur-md shadow-md hover:border-emerald-400/50 transition"
          >
            <div className="mb-4 text-lg font-semibold text-emerald-400">
              {lvl.badge}
            </div>
            <h3 className="text-xl font-semibold text-slate-100">{lvl.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{lvl.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
