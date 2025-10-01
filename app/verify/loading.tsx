// app/verify/loading.tsx

export default function VerifyLoading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="min-h-[70vh] bg-[var(--bg)] text-[var(--fg)]"
    >
      <p className="sr-only">Loading verify page…</p>

      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          {/* Title */}
          <div className="h-8 w-72 rounded-xl bg-white/10 ring-1 ring-white/10 motion-safe:animate-pulse" />
          <div className="mt-3 h-4 w-[28rem] max-w-full rounded-xl bg-white/10 ring-1 ring-white/10 motion-safe:animate-pulse" />

          {/* Trust badges (3) */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-7 w-40 rounded-full bg-white/5 ring-1 ring-white/10 motion-safe:animate-pulse"
              />
            ))}
          </div>

          {/* Dropzone placeholder */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm motion-safe:animate-pulse" />

          {/* Buttons row */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-44 rounded-2xl bg-white/10 ring-1 ring-white/10 motion-safe:animate-pulse" />
            <div className="h-10 w-28 rounded-xl bg-white/5 ring-1 ring-white/10 motion-safe:animate-pulse" />
          </div>

          {/* Result card */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
            <div className="h-5 w-24 rounded bg-white/10 ring-1 ring-white/10 motion-safe:animate-pulse" />
            <div className="mt-3 grid gap-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <div className="h-4 w-16 rounded bg-white/10 ring-1 ring-white/10 motion-safe:animate-pulse" />
                  <div className="col-span-2 sm:col-span-3 h-4 w-full rounded bg-white/5 ring-1 ring-white/10 motion-safe:animate-pulse" />
                </div>
              ))}
            </div>
            <div className="mt-5 h-9 w-56 rounded-xl bg-white/10 ring-1 ring-white/10 motion-safe:animate-pulse" />
          </div>

          {/* Micro-claims skeleton */}
          <div className="mt-10 mx-auto h-3 w-72 rounded bg-white/10 ring-1 ring-white/10 motion-safe:animate-pulse" />
        </div>
      </section>
    </main>
  );
}
