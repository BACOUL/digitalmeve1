"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function DebugSentryPage() {
  const [sdkReady, setSdkReady] = useState(false);
  const [lastEventId, setLastEventId] = useState<string | null>(null);
  const [proxyInfo, setProxyInfo] = useState<string>("—");

  useEffect(() => {
    // @ts-expect-error _isInitialized est interne, juste pour debug visuel
    setSdkReady(!!Sentry?.getCurrentHub?.()?.getClient?.()?._isInitialized);
  }, []);

  async function testProxy() {
    try {
      const res = await fetch("/api/sentry", {
        method: "POST",
        headers: { "Content-Type": "application/x-sentry-envelope" },
        body: "test", // on envoie un truc bidon, on veut juste vérifier le 200
      });
      setProxyInfo(JSON.stringify({ ok: res.ok, status: res.status }));
      alert(`Proxy répond: ${res.status}`);
    } catch (e: any) {
      setProxyInfo(e?.message || "error");
      alert("Proxy KO");
    }
  }

  function throwUnhandled() {
    // Provoque une erreur *non interceptée* (en dehors de l’event handler)
    setTimeout(() => {
      throw new Error("DMV unhandled client error");
    }, 0);
    alert("Erreur non interceptée déclenchée (vérifie Sentry dans 10–30 s).");
  }

  async function captureMsg() {
    const id = Sentry.captureMessage("DMV test message (client)");
    setLastEventId(id);
    alert("Message capturé (client). Vérifie Sentry.");
  }

  async function captureException() {
    try {
      JSON.parse("{"); // force une erreur
    } catch (err) {
      const id = Sentry.captureException(err);
      setLastEventId(id);
      alert("Exception capturée (client). Vérifie Sentry.");
    }
  }

  return (
    <main className="mx-auto max-w-screen-md p-6 space-y-6">
      <h1 className="text-3xl font-bold">Debug Sentry</h1>

      <div className="rounded-xl border border-neutral-700 p-4 leading-7">
        <div>SDK initialisé : {sdkReady ? "oui ✅" : "non ❌"}</div>
        <div>Env : {process.env.NODE_ENV}</div>
        <div>Dernier eventId : {lastEventId ?? "—"}</div>
        <div>Proxy info : {proxyInfo}</div>
      </div>

      <button
        onClick={throwUnhandled}
        className="w-full rounded-lg border border-neutral-700 px-4 py-3 text-left hover:bg-neutral-900"
      >
        Throw client error (unhandled)
      </button>

      <button
        onClick={captureMsg}
        className="w-full rounded-lg border border-neutral-700 px-4 py-3 text-left hover:bg-neutral-900"
      >
        Capture message (client)
      </button>

      <button
        onClick={captureException}
        className="w-full rounded-lg border border-neutral-700 px-4 py-3 text-left hover:bg-neutral-900"
      >
        Capture exception (client)
      </button>

      <button
        onClick={testProxy}
        className="w-full rounded-lg border border-neutral-700 px-4 py-3 text-left hover:bg-neutral-900"
      >
        Tester envoi brut via proxy
      </button>
    </main>
  );
      }
