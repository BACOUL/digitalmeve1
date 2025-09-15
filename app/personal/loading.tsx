// app/personal/loading.tsx
'use client';

export default function PersonalLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="bg-white text-gray-900">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20 text-center">
          <div className="mx-auto h-9 w-[22rem] max-w-full rounded-xl bg-gray-200 animate-pulse" />
          <div className="mx-auto mt-3 h-4 w-[28rem] max-w-full rounded-xl bg-gray-200 animate-pulse" />
          <div className="mx-auto mt-6 flex max-w-md justify-center gap-3">
            <div className="h-10 w-40 rounded-xl bg-emerald-200/60 animate-pulse" />
            <div className="h-10 w-44 rounded-xl border border-gray-200 bg-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="mx-auto h-6 w-48 rounded bg-gray-200 animate-pulse" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[0,1,2].map(i => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
              <div className="h-9 w-9 rounded-full border border-gray-200 bg-gray-100" />
              <div className="mt-3 h-5 w-28 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-40 rounded bg-gray-100" />
              <div className="mt-1 h-4 w-36 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </section>

      {/* Pricing skeleton */}
      <section className="mx-auto max-w-5xl px-4 py-14 border-t border-gray-100">
        <div className="mx-auto h-6 w-56 rounded bg-gray-200 animate-pulse" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[0,1,2].map(i => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
              <div className="h-5 w-24 rounded bg-gray-200" />
              <div className="mt-2 h-8 w-20 rounded bg-gray-200" />
              <div className="mt-3 space-y-2">
                {[0,1,2].map(j => <div key={j} className="h-4 w-44 rounded bg-gray-100" />)}
              </div>
              <div className="mt-6 h-10 w-full rounded-xl border border-gray-200 bg-white" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
