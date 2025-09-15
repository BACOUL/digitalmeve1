// app/developers/loading.tsx
'use client';

export default function DevelopersLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="bg-[var(--bg)] text-[var(--fg)]">
      {/* Hero */}
      <section className="section-dark">
        <div className="container-max py-14">
          <div className="h-8 w-64 rounded-xl bg-white/10 animate-pulse" />
          <div className="mt-2 h-4 w-[min(48rem,92%)] rounded-xl bg-white/8 animate-pulse" />
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="h-10 w-40 rounded-2xl bg-white/10 animate-pulse" />
            <div className="h-10 w-44 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
          </div>
        </div>
      </section>

      {/* SDK tiles */}
      <section className="section-dark">
        <div className="container-max pb-10">
          <div className="h-6 w-32 rounded bg-white/12 animate-pulse" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-6 w-6 rounded bg-white/12" />
                <div className="mt-3 h-5 w-40 rounded bg-white/10" />
                <div className="mt-2 h-4 w-[85%] rounded bg-white/8" />
                <div className="mt-1 h-4 w-[70%] rounded bg-white/8" />
                <div className="mt-4 h-9 w-28 rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Endpoints table */}
      <section className="section-dark">
        <div className="container-max pb-16">
          <div className="h-6 w-40 rounded bg-white/12 animate-pulse" />
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-5 bg-white/5 p-3">
              {[0,1,2,3,4].map((h) => (
                <div key={h} className="h-4 w-24 rounded bg-white/10 animate-pulse" />
              ))}
            </div>
            {[...Array(6)].map((_, r) => (
              <div key={r} className="grid grid-cols-5 border-t border-white/10 p-3">
                {[0,1,2,3,4].map((c) => (
                  <div key={c} className="h-4 w-[80%] rounded bg-white/6 animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webhooks & auth */}
      <section className="section-dark">
        <div className="container-max pb-20 grid gap-6 lg:grid-cols-2">
          {[0,1].map((i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-5 w-36 rounded bg-white/12" />
              <div className="mt-2 h-4 w-[85%] rounded bg-white/8" />
              <div className="mt-1 h-4 w-[75%] rounded bg-white/8" />
              <div className="mt-1 h-4 w-[60%] rounded bg-white/8" />
              <div className="mt-4 h-9 w-32 rounded-xl bg-white/10" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
