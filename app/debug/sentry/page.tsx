// app/debug/sentry/page.tsx
"use client";

import * as Sentry from "@sentry/nextjs";

export default function DebugSentryPage() {
  const throwUnhandled = () => {
    // Erreur non interceptée (unhandled) → Sentry doit l’attraper
    setTimeout(() => {
      throw new Error("Test: unhandled client error");
    }, 0);
    alert("Erreur non interceptée déclenchée (vérifie Sentry dans 10–30 s).");
  };

  const captureMessage = () => {
    Sentry.captureMessage("Test: message client (captureMessage)");
    alert("Message capturé (client). Vérifie Sentry.");
  };

  const captureException = () => {
    try {
      // on force une ReferenceError contrôlée
      // @ts-ignore – volontaire pour la démo
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
        <button onClick={throwUnhandled} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20">
          Throw client error (unhandled)
        </button>
        <button onClick={captureMessage} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20">
          Capture message
        </button>
        <button onClick={captureException} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20">
          Capture exception
        </button>
      </div>

      <p className="text-sm opacity-70">
        Astuce: dans l’onglet <b>Network</b>, vérifie le POST <code>/api/sentry</code> (200/204).
      </p>
    </main>
  );
}
