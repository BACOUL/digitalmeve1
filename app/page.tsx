// app/page.tsx
export default function Home() {
  return (
    <section className="py-16">
      <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">
        The <span className="text-dm-accent">.MEVE</span> Standard
      </h1>
      <p className="mt-4 max-w-2xl text-slate-300">
        Verify any document in seconds: timestamps, hashes and issuer levels — globally.
      </p>
      <div className="mt-8 flex gap-3">
        <a href="/generate" className="btn-primary">Generate a proof</a>
        <a href="/verify" className="rounded-2xl border border-white/10 px-5 py-3 text-slate-200 hover:bg-white/5 transition">
          Verify a proof
        </a>
      </div>
    </section>
  );
}
