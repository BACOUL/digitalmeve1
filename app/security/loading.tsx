// app/security/loading.tsx
'use client';

export default function SecurityLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="bg-[var(--bg)] text-[var(--fg)]"
    >
      <section className="section-dark">
        <div className="container-max py-14">
          <div className="h-8 w-60 rounded-xl bg-white/10 animate-pulse" />
          <div className="mt-3 h-4 w-[85%] max-w-2xl rounded-xl bg-white/8 animate-pulse" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="h-32 rounded-2xl bg-white/5 animate-pulse" />
            <div className="h-32 rounded-2xl bg-white/5 animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
