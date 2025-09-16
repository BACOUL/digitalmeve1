// app/debug/sentry/page.tsx
"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

export const metadata = {
  title: "Debug Sentry",
};

export default function DebugSentryPage() {
  const throwClientError = () => {
    // Déclenche une erreur non-catchée côté client
    throw new Error("Test Sentry — client error 🚨");
  };

  const captureMessage = () => {
    // Envoie un message info côté client
    Sentry.captureMessage("Test Sentry — client message ✅", "info");
    alert("Message capturé (client). Regarde ton dashboard Sentry.");
  };

  const triggerServerError = async () => {
    try {
      const res = await fetch("/api/sentry", { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("Erreur serveur déclenchée. Vérifie Sentry (Issues).");
    } catch (e: any) {
      alert(`Échec appel /api/sentry: ${e?.message || e}`);
    }
  };

  return (
    <main className="container-max py-10">
      <h1 className="h2 mb-4">Debug Sentry</h1>
      <p className="sub mb-6">
        Déclenche un évènement côté client et vérifie l’intégration Sentry.
      </p>

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

        <Link href="/" className="btn ghost">Home</Link>
      </div>
    </main>
  );
}
