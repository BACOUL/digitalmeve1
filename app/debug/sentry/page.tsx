// app/debug/sentry/page.tsx
"use client";

import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

export default function DebugSentryPage() {
  const [done, setDone] = useState(false);

  function throwClientError() {
    // Ceci déclenchera l’Error Boundary et Sentry côté client
    throw new Error("Client-side test error from /debug/sentry");
  }

  async function captureMessage() {
    Sentry.captureMessage("Client-side test message from /debug/sentry", "info");
    setDone(true);
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <section className="container-max px-4 py-12 space-y-6">
        <h1 className="h2">Debug Sentry</h1>
        <p className="sub">Déclenche un évènement côté client pour vérifier Sentry.</p>

        <div className="flex gap-3">
          <button
            onClick={throwClientError}
            className="btn btn-primary-strong"
          >
            Throw client error
          </button>

          <button
            onClick={captureMessage}
            className="btn-outline"
          >
            Capture message
          </button>
        </div>

        {done && (
          <p className="text-sm text-[var(--fg-muted)]">
            Message capturé ! Vérifie ton projet Sentry.
          </p>
        )}

        <div className="mt-6">
          <a
            href="/api/sentry"
            className="link"
          >
            Tester l’erreur serveur (/api/sentry)
          </a>
        </div>
      </section>
    </main>
  );
}
