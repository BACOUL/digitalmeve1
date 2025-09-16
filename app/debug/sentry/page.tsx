"use client";

import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

export default function DebugSentryPage() {
  const [lastId, setLastId] = useState<string | null>(null);

  async function sendMessage() {
    Sentry.captureMessage("DMV test message (client)", { level: "error" });
    await Sentry.flush(5000); // force l’envoi
    const id = Sentry.lastEventId();
    setLastId(id || null);
    alert(`Message envoyé. eventId=${id || "?"}`);
  }

  async function throwUnhandled() {
    setTimeout(() => {
      // erreur non interceptée
      throw new Error("DMV unhandled client error");
    }, 0);
    // flush au cas où
    await Sentry.flush(5000);
  }

  async function testServer() {
    const res = await fetch("/api/sentry-test", { method: "POST" });
    alert(`Serveur → ${res.status}`);
  }

  return (
    <main className="p-6 space-y-4">
      <div className="p-4 rounded-lg border">
        <div>SDK initialisé : oui ✅</div>
        <div>Env : {process.env.NODE_ENV}</div>
        <div>Dernier eventId : {lastId ?? "—"}</div>
      </div>

      <button onClick={throwUnhandled}>Throw client error (unhandled)</button>
      <button onClick={sendMessage}>Capture message (client)</button>
      <button onClick={testServer}>Tester erreur serveur (/api/sentry-test)</button>
    </main>
  );
}
