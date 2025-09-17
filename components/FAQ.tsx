// components/FAQ.tsx
export default function FAQ() {
  return (
    <section aria-label="FAQ" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold">FAQ</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="font-semibold text-slate-100">Do I need an account?</h3>
          <p className="mt-1 text-sm text-slate-300">No. You can generate and verify without creating an account.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="font-semibold text-slate-100">Do you store my files?</h3>
          <p className="mt-1 text-sm text-slate-300">No. Files stay on your device. We only prepare your certificate.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="font-semibold text-slate-100">Are files still readable?</h3>
          <p className="mt-1 text-sm text-slate-300">Yes. Open and share them as usual — the proof is invisible.</p>
        </div>
      </div>
    </section>
  );
}
