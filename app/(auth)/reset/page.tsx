// app/(auth)/reset/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setState("sending");
    setMessage(null);

    try {
      const res = await fetch("/api/auth/reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to send reset email");
      }

      setState("sent");
      setMessage("If the address exists, a secure reset link has been sent.");
      setEmail("");
    } catch (err: any) {
      setState("error");
      setMessage(err.message ?? "Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Reset your password</h1>
        <p className="mt-2 text-slate-300">
          Enter your email. We’ll send you a secure link to create a new password.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="you@company.com"
            />
          </label>

          <button
            type="submit"
            disabled={state === "sending"}
            className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {state === "sending" ? "Sending…" : "Send reset link"}
          </button>

          {message && (
            <div
              className={`rounded-lg px-3 py-2 text-sm ${
                state === "error" ? "bg-red-500/10 text-red-200" : "bg-emerald-500/10 text-emerald-200"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Remembered your password?{" "}
          <Link href="/signin" className="text-emerald-400 underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
