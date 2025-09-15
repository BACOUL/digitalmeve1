// app/verify/loading.tsx
'use client';

export default function VerifyLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="min-h-[70vh] bg-white text-slate-900"
    >
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          {/* Title */}
          <div className="h-8 w-72 rounded-xl bg-gray-100 animate-pulse" />
          <div className="mt-3 h-4 w-[28rem] max-w-full rounded-xl bg-gray-100 animate-pulse" />

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[0,1,2].map((i) => (
              <div key={i} className="h-7 w-40 rounded-full border border-gray-200 bg-gray-50 animate-pulse" />
            ))}
          </div>

          {/* Dropzone placeholder */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-10 animate-pulse">
            <div className="mx-auto h-5 w-48 rounded bg-gray-200" />
            <div className="mx-auto mt-2 h-4 w-64 rounded bg-gray-200" />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-40 rounded-2xl bg-gray-200 animate-pulse" />
            <div className="h-10 w-24 rounded-xl border border-gray-200 bg-white animate-pulse" />
          </div>

          {/* Result card */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse">
            <div className="h-5 w-24 rounded bg-gray-200" />
            <div className="mt-3 grid gap-y-2">
              {[0,1,2,3].map((i) => (
                <div key={i} className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <div className="h-4 w-16 rounded bg-gray-200" />
                  <div className="col-span-2 sm:col-span-3 h-4 w-full rounded bg-gray-100" />
                </div>
              ))}
            </div>
            <div className="mt-5 h-9 w-56 rounded-xl border border-gray-200 bg-white" />
          </div>
        </div>
      </section>
    </div>
  );
}
