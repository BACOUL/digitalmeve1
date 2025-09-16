"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect, useRef, useState } from "react";

export default function DebugSentryPage() {
  const [lastId, setLastId] = useState<string | null>(null);
  const [proxyInfo, setProxyInfo] = useState<any>(null);
  const logRef = useRef<HTMLPreElement>(null);

  // Capturer les logs SDK dans la page (utile sur mobile)
  useEffect(() => {
    const origLog = console.log;
    const origWarn = console.warn;
    const origErr = console.error;
    function tap(kind: string, args: any[]) {
      const line = `[${kind}] ${args.map(a => String(a)).join(" ")}`;
      if (logRef.current) {
        logRef.current.textContent += line + "\n";
      }
    }
    console.log = (...a) => { tap("log", a); origLog(...a); };
    console.warn = (...a) => { tap("warn", a); origWarn(...a); };
    console.error = (...a) => { tap("error", a); origErr(...a); };
    return () => { console.log = origLog; console.warn = origWarn; console.error = origErr; };
  }, []);

  async function sendMessage() {
    Sentry.captureMessage("DMV test message (client)", { level: "error" });
    await Sentry.flush(5000);
    const id = Sentry.lastEventId();
    setLastId(id || null);
    alert(`Message envoyé. eventId=${id || "?"}`);
  }

  // erreur non interceptée
  async function throwUnhandled() {
    setTimeout(() => {
      throw new Error("DMV unhandled client error");
    }, 0);
    await Sentry.flush(5000);
  }

  // ping proxy directement (retourne headers x-sentry-*)
  async function testProxy() {
    // petit envelope valide minimal
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || "";
    const now = Date.now();
    const header = JSON.stringify({ dsn, sent_at: new Date(now).toISOString() });
    const itemHeader = JSON.stringify({ type: "event" });
    const event = JSON.stringify({
      event_id: crypto.randomUUID(),
      level: "error",
      message: "DMV proxy envelope test",
      timestamp: now / 1000,
    });
    const envelope = `${header}\n${itemHeader}\n${event}\n`;

    const res = await fetch("/api/sentry", {
      method: "POST",
      headers: { "content-type": "application/x-sentry-envelope" },
      body: envelope,
    });
    const data = await res.json();
    setProxyInfo(data);
    alert(`Proxy→ status:${data.status} ok:${data.ok} err:${data.x_sentry_error || "null"}`);
  }

  return (
    <main className="p-6 space-y-4">
      <div className="p-4 rounded-lg border">
        <div>SDK initialisé : {Sentry.getCurrentHub().getClient() ? "oui ✅" : "non ❌"}</div>
        <div>Env : {process.env.NODE_ENV}</div>
        <div>Dernier eventId : {lastId ?? "—"}</div>
        <div>Proxy info : {proxyInfo ? JSON.stringify(proxyInfo) : "—"}</div>
      </div>

      <button onClick={throwUnhandled}>Throw client error (unhandled)</button>
      <button onClick={sendMessage}>Capture message (client)</button>
      <button onClick={testProxy}>Tester envoi brut via proxy</button>

      <div className="p-4 rounded-lg border">
        <div className="font-semibold mb-2">Logs SDK / Console</div>
        <pre ref={logRef} className="whitespace-pre-wrap text-xs"></pre>
      </div>
    </main>
  );
                                   }
