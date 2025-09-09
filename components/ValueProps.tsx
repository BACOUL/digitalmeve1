export default function ValueProps() {
  const items = [
    {
      title: "Existence",
      description:
        "Prove that a file existed at a specific time with a portable .meve proof.",
      icon: "📂",
    },
    {
      title: "Integrity",
      description:
        "Ensure the file has not been altered, using SHA-256 hashing.",
      icon: "🔒",
    },
    {
      title: "Authenticity",
      description:
        "Attach an issuer or identity to your proof for trust and verification.",
      icon: "✅",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center">
      <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">
        Why DigitalMeve?
      </h2>
      <p className="mt-3 text-slate-400">
        The .MEVE standard makes it simple to certify your documents.
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-md shadow-md hover:border-emerald-400/50 transition"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-xl font-semibold text-slate-100">
              {item.title}
            </h3>
            <p className="mt-2 text-slate-400 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
