// app/pro/loading.tsx
'use client';

export default function ProLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="bg-white text-gray-900">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 text-center">
          <div className="mx-auto h-9 w-[26rem] max-w-full rounded-xl bg-gray-200 animate-pulse" />
          <div className="mx-auto mt-3 h-4 w-[34rem] max-w-full rounded-xl bg-gray-200 animate-pulse" />
          <div className="mx-auto mt-6 flex max-w-md justify-center gap-3">
            <div className="h-10 w-44 rounded-xl bg-sky-200/60 animate-pulse" />
            <div className="h-10 w-40 rounded-xl border border-gray-200 bg-white animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto h-6 w-72 rounded bg-gray-200 animate-pulse" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
              <div className="h-6 w-6 rounded bg-gray-200" />
              <div className="mt-3 h-5 w-32 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-48 rounded bg-gray-100" />
              <div className="mt-1 h-4 w-40 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 py-12 border-t border-gray-100">
        <div className="mx-auto h-6 w-52 rounded bg-gray-200 animate-pulse" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[0,1,2].map(i => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
              <div className="h-5 w-28 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-40 rounded bg-gray-100" />
              <div className="mt-4 h-8 w-24 rounded bg-gray-200" />
              <div className="mt-6 space-y-2">
                {[0,1,2,3].map(j => <div key={j} className="h-4 w-48 rounded bg-gray-100" />)}
              </div>
              <div className="mt-6 h-10 w-full rounded-xl border border-gray-200 bg-white" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
