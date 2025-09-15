// app/about/loading.tsx
'use client';

export default function AboutLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="bg-[var(--bg)] text-[var(--fg)]"
    >
      <section className="section-dark">
        <div className="container-max py-14">
          <div className="h-8 w-56 rounded-xl bg-white/10 animate-pulse" />
          <div className="mt-3 h-4 w-[80%] max-w-xl rounded-xl bg-white/8 animate-pulse" />
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-white/8 animate-pulse" />
            <div className="h-4 w-[95%] rounded bg-white/8 animate-pulse" />
            <div className="h-4 w-[90%] rounded bg-white/8 animate-pulse" />
            <div className="h-4 w-[80%] rounded bg-white/8 animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
