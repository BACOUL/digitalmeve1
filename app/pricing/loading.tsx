// app/pricing/loading.tsx
'use client';

export default function PricingLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="bg-[var(--bg)] text-[var(--fg)]">
      {/* Hero */}
      <section className="section-dark">
        <div className="container-max py-14">
          <div className="h-8 w-56 rounded-xl bg-white/10 animate-pulse" />
          <div className="mt-2 h-4 w-[min(44rem,90%)] rounded-xl bg-white/8 animate-pulse" />
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="h-10 w-36 rounded-2xl bg-white/10 animate-pulse" />
            <div className="h-10 w-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-dark">
        <div className="container-max pb-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0,1,2].map((i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-5 w-24 rounded bg-white/12" />
                <div className="mt-2 h-10 w-28 rounded bg-white/10" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-56 rounded bg-white/8" />
                  <div className="h-4 w-48 rounded bg-white/8" />
                </div>
                <div className="mt-5 space-y-2">
                  {[0,1,2,3].map((j) => (
                    <div key={j} className="h-4 w-[80%] rounded bg-white/6" />
                  ))}
                </div>
                <div className="mt-6 h-11 w-full rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-dark">
        <div className="container-max pb-20">
          <div className="h-6 w-32 rounded bg-white/12 animate-pulse" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[0,1,2,3].map((k) => (
              <div key={k} className="card p-5 animate-pulse">
                <div className="h-5 w-52 rounded bg-white/10" />
                <div className="mt-2 h-4 w-[85%] rounded bg-white/8" />
                <div className="mt-1 h-4 w-[70%] rounded bg-white/8" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
