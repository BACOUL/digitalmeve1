export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-slate-100">Page not found</h1>
      <p className="mt-3 text-slate-400">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110 transition"
      >
        Back to home
      </a>
    </main>
  );
}
