// components/UseCases.tsx
export default function UseCases() {
  return (
    <section aria-label="Use cases" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold">Use cases</h2>
      <p className="mt-2 text-slate-400">Concrete examples for individuals and teams.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Individuals */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">For Individuals</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="font-medium text-slate-100">CV & Résumé</p>
              <p className="mt-1 text-sm text-slate-400">Share an authenticated version recruiters can check.</p>
            </li>
            <li className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="font-medium text-slate-100">Quotes & Letters</p>
              <p className="mt-1 text-sm text-slate-400">Add a built-in .MEVE proof to your PDFs.</p>
            </li>
            <li className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="font-medium text-slate-100">Diplomas</p>
              <p className="mt-1 text-sm text-slate-400">Keep integrity for your certificates.</p>
            </li>
          </ul>
        </div>

        {/* Business */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">For Business</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="font-medium text-slate-100">HR / Recruiting</p>
              <p className="mt-1 text-sm text-slate-400">Certified CVs and internal attestations.</p>
            </li>
            <li className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="font-medium text-slate-100">Legal</p>
              <p className="mt-1 text-sm text-slate-400">Timestamped versions, sealed attachments.</p>
            </li>
            <li className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="font-medium text-slate-100">Education</p>
              <p className="mt-1 text-sm text-slate-400">Digital diplomas and transcripts.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
