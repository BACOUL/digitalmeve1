// app/generate/loading.tsx
'use client';

export default function GenerateLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="min-h-[70vh] bg-[var(--bg)] text-[var(--fg)]"
    >
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          {/* Title */}
          <div className="h-8 w-80 rounded-xl bg-white/5 animate-pulse" />
          <div className="mt-3 h-4 w-[28rem] max-w-full rounded-xl bg-white/5 animate-pulse" />

          {/* Trust badges row */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[0,1,2].map((i) => (
              <div key={i} className="h-7 w-40 rounded-full border border-white/10 bg-white/5 animate-pulse" />
            ))}
          </div>

          {/* Dropzone placeholder */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-10 animate-pulse">
            <div className="mx-auto h-5 w-48 rounded bg-white/10" />
            <div className="mx-auto mt-2 h-4 w-64 rounded bg-white/10" />
          </div>

          {/* Issuer field */}
          <div className="mt-5">
            <div className="h-4 w-24 rounded bg-white/8 animate-pulse" />
            <div className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-white/5 animate-pulse" />
          </div>

          {/* CTA */}
          <div className="mt-6 h-11 w-48 rounded-2xl bg-white/8 animate-pulse" />

          {/* Result card placeholder */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 animate-pulse">
            <div className="h-5 w-40 rounded bg-white/8" />
            <div className="mt-4 grid gap-y-2">
              {[0,1,2,3].map((i) => (
                <div key={i} className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <div className="h-4 w-20 rounded bg-white/8" />
                  <div className="col-span-2 sm:col-span-3 h-4 w-full rounded bg-white/6" />
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="h-10 w-56 rounded-xl bg-white/8" />
              <div className="h-10 w-56 rounded-xl bg-white/8" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
