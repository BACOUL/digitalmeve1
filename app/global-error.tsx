'use client';

export default function GlobalError({
  error,
  reset,
}: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="min-h-[70vh] grid place-items-center px-4">
        <main className="max-w-xl text-center">
          <h1 className="text-3xl font-bold mb-2">Erreur critique</h1>
          <p className="text-slate-300 mb-6">{error.message}</p>
          <button
            onClick={() => reset()}
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            Recharger
          </button>
        </main>
      </body>
    </html>
  );
}
