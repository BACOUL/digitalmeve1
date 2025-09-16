// app/debug/sentry/page.tsx
"use client";

import * as Sentry from "@sentry/nextjs";

export default function DebugSentryPage() {
  const throwClientError = () => {
    throw new Error("Test Sentry — client error 🚨");
  };

  const captureMessage = () => {
    Sentry.captureMessage("Test Sentry — client message ✅", "info");
    alert("Message capturé (client). Vérifie Sentry.");
  };

  const triggerServerError = async () => {
    const res = await fetch("/api/sentry", { method: "POST" });
    if (res.ok) alert("Erreur serveur déclenchée. Vérifie Sentry (Issues).");
    else alert(`Echec /api/sentry: HTTP ${res.status}`);
  };

  return (
    <main className="container-max py-10">
      <h1 className="h2 mb-4">Debug Sentry</h1>
      <div className="flex flex-wrap gap-3">
        <button className="btn btn-primary-strong" onClick={throwClientError}>
          Throw client error
        </button>
        <button className="btn-outline" onClick={captureMessage}>
          Capture message
        </button>
        <button className="btn-outline" onClick={triggerServerError}>
          Tester l’erreur serveur (/api/sentry)
        </button>
      </div>
    </main>
  );
}
