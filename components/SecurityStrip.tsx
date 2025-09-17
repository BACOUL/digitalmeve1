// components/SecurityStrip.tsx
export default function SecurityStrip() {
  return (
    <section aria-label="Security & privacy" className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
          <p className="font-medium text-emerald-400">No storage</p>
          <p className="text-slate-400">Files never leave your device.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
          <p className="font-medium text-sky-400">Privacy by design</p>
          <p className="text-slate-400">Local processing in your browser.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
          <p className="font-medium text-slate-200">Status</p>
          <p className="text-slate-400">All systems normal.</p>
        </div>
      </div>
    </section>
  );
}
