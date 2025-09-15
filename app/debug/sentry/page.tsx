"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

export default function DebugSentryPage() {
  const throwClientError = () => {
    // erreur volontaire
    // @ts-expect-error
    myUndefinedFunction();
  };

  const captureMessage = () => {
    Sentry.captureMessage("Test message from /debug-sentry");
    alert("Message capturé → check Sentry Issues dans 10-30s.");
  };

  const checkSDK = () => {
    const client = Sentry.getCurrentHub().getClient();
    const dsn = (client as any)?._options?.dsn;
    console.log("[Sentry] client =", client);
    console.log("[Sentry] dsn =", dsn);
    alert(dsn ? `SDK OK ✅\nDSN: ${dsn}` : "SDK non initialisé ❌ (DSN manquant au build ?)");
  };

  return (
    <main className="container-max px-4 py-10">
      <h1 className="h1">Debug Sentry</h1>
      <p className="sub mt-2">Déclenche un évènement côté client et vérifie l’initialisation.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="btn btn-primary-strong" onClick={throwClientError}>
          Throw client error
        </button>
        <button className="btn-outline" onClick={captureMessage}>
          Capture message
        </button>
        <button className="btn" onClick={checkSDK}>
          Check SDK (affiche DSN)
        </button>
      </div>

      <p className="mt-6">
        Tester l’erreur serveur :{" "}
        <Link className="link" href="/api/sentry">
          /api/sentry
        </Link>
      </p>
    </main>
  );
}
