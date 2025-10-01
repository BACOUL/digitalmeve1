// app/security/loading.tsx

export default function SecurityLoading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="bg-[var(--bg)] text-[var(--fg)]"
    >
      <p className="sr-only">Loading security page…</p>

      <section className="section-dark">
        <div className="container-max py-14">
          {/* Title skeleton */}
          <div className="h-8 w-60 rounded-xl bg-white/10 motion-safe:animate-pulse" />

          {/* Subtitle skeleton */}
          <div className="mt-3 h-4 w-[85%] max-w-2xl rounded-xl bg-white/10 motion-safe:animate-pulse" />

          {/* Cards skeleton */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="h-32 rounded-2xl bg-white/5 motion-safe:animate-pulse" />
            <div className="h-32 rounded-2xl bg-white/5 motion-safe:animate-pulse" />
          </div>
        </div>
      </section>
    </main>
  );
}
