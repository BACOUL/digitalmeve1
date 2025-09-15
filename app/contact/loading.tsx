// app/contact/loading.tsx
'use client';

export default function ContactLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="bg-[var(--bg)] text-[var(--fg)]"
    >
      <section className="section-dark">
        <div className="container-max py-14 max-w-xl">
          <div className="h-8 w-48 rounded-xl bg-white/10 animate-pulse" />
          <div className="mt-3 h-4 w-[90%] rounded-xl bg-white/8 animate-pulse" />
          <div className="mt-8 space-y-4">
            <div className="h-10 w-full rounded-xl bg-white/10 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-white/10 animate-pulse" />
            <div className="h-24 w-full rounded-xl bg-white/10 animate-pulse" />
          </div>
          <div className="mt-6 h-10 w-40 rounded-xl bg-white/10 animate-pulse" />
        </div>
      </section>
    </div>
  );
}
