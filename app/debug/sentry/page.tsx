"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || "";

export default function DebugSentryPage() {
  const [log, setLog] = useState<string[]>([]);
  const add = (m: string) => setLog((x) => [new Date().toLocaleTimeString() + " — " + m, ...x]);

  const shortDSN =
    dsn
      ? (() => {
          try {
            const u = new URL(dsn);
            const key = u.username || dsn.split("//")[1]?.split("@")[0] || "";
            return `${key.slice(0, 6)}…${key.slice(-4)}  /  ${u.host}${u.pathname}`;
          } catch {
            return dsn.slice(0, 12) + "…";
          }
        })()
      : "(vide)";

  const throwUnhandled = () => {
    setTimeout(() => {
      throw new Error("DM test: unhandled client error");
    }, 0);
    alert("Erreur non interceptée déclenchée (vérifie Sentry dans 10–30 s).");
  };

  const captureMessage = () => {
    Sentry.captureMessage("DM test: message côté client");
    alert("Message capturé (client). Vérifie Sentry.");
  };

  const captureException = () => {
    Sentry.captureException(new Error("DM test: exception côté client"));
    alert("Exception capturée (client). Vérifie Sentry.");
  };

  const pingServer = async () => {
    const res = await fetch("/api/sentry-test", { method: "POST" });
    add(`/api/sentry-test → ${res.status}`);
    if (res.ok) {
      alert("Erreur serveur capturée. Vérifie Sentry.");
    } else {
      alert("Appel serveur non OK.");
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">Debug Sentry</h1>

      <div className="rounded-xl border p-4 space-y-2">
        <div><b>SDK initialisé :</b> {dsn ? "oui ✅" : "non ❌"}</div>
        <div><b>DSN (masqué) :</b> {shortDSN}</div>
        <div><b>Env :</b> {process.env.NEXT_PUBLIC_RUNTIME_ENV || process.env.NODE_ENV || "production"}</div>
      </div>

      <div className="grid gap-3">
        <button onClick={throwUnhandled} className="px-4 py-2 rounded-lg border">Throw client error (unhandled)</button>
        <button onClick={captureMessage} className="px-4 py-2 rounded-lg border">Capture message (client)</button>
        <button onClick={captureException} className="px-4 py-2 rounded-lg border">Capture exception (client)</button>
        <button onClick={pingServer} className="px-4 py-2 rounded-lg border">Tester erreur serveur (/api/sentry-test)</button>
      </div>

      <div className="rounded-xl border p-4">
        <b>Logs</b>
        <ul className="mt-2 space-y-1 text-sm">
          {log.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      </div>
    </main>
  );
    }
