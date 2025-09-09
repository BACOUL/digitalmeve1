// components/ValueProps.tsx
export default function ValueProps() {
  const items = [
    {
      title: "Existence",
      desc: "Timestamped proof that your file existed at a given moment.",
      icon: "⏱️",
    },
    {
      title: "Integrity",
      desc: "SHA-256 cryptographic hash ensures your document has not been altered.",
      icon: "🛡️",
    },
    {
      title: "Authenticity",
      desc: "Issuer identity level (Personal / Pro / Official) is clearly verifiable.",
      icon: "✅",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-slate-900/60 border border-white/10 p-6 text-center backdrop-blur-sm shadow-lg hover:shadow-xl transition"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-slate-300 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
