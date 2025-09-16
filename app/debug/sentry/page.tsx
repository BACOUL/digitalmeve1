"use client";

import * as Sentry from "@sentry/nextjs";

export default function DebugSentryPage() {
  const throwUnhandled = () => {
    // Erreur non interceptée (unhandled) : Sentry doit la voir automatiquement
    setTimeout(() => {
      // en dehors du handler React
      // @ts-expect-error test
      throw new Error("Test: unhandled client error");
    }, 0);
    alert("Erreur non interceptée déclenchée (regarde Sentry dans 10-30s).");
  };

  const captureMessage = () => {
    Sentry.captureMessage("Test: message client (captureMessage)");
    alert("Message capturé (client). Vérifie Sentry.");
  };

  const captureException = () => {
    try {
      // @ts-expect-error test
      myUndefinedFunction();
    } catch (e) {
      Sentry.captureException(e);
      alert("Exception capturée (client). Vérifie Sentry.");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Debug Sentry</h1>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={throwUnhandled}
          className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
        >
          Throw client error (unhandled)
        </button>

        <button
          onClick={captureMessage}
          className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
        >
          Capture message
        </button>

        <button
          onClick={captureException}
          className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
        >
          Capture exception
        </button>
      </div>

      <p className="text-sm opacity-70">
        Si rien n’apparaît dans Sentry, ouvre la console réseau du navigateur et
        vérifie qu’il y a un POST vers <code>/api/sentry</code> (envelope 200/204).
      </p>
    </main>
  );
}
