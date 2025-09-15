// app/(auth)/reset/confirm/page.tsx
"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetConfirmInner() {
  const sp = useSearchParams();
  const token = (sp.get("token") || "").trim();
  const email = (sp.get("email") || "").trim().toLowerCase();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== password2) {
      setMessage("Passwords do not match.");
      return;
    }
    if (!token || !email) {
      setMessage("Invalid or missing reset link.");
      return;
    }

    setState("saving");
    setMessage(null);

    try {
      const res = await fetch("/api/auth/reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to reset password");
      }
      setState("ok");
      setMessage("Your password has been updated. You can now sign in.");
      setPassword("");
      setPassword2("");
    } catch (err: any) {
      setState("error");
      setMessage(err.message ?? "Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Create a new password</h1>
        <p className="mt-2 text-slate-300">
          Set a strong password for <span className="font-medium">{email || "your account"}</span>.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm text-slate-300">New password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="At least 8 characters"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Confirm password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Repeat your password"
            />
          </label>

          <button
            type="submit"
            disabled={state === "saving"}
            className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {state === "saving" ? "Saving…" : "Update password"}
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
          Back to{" "}
          <Link href="/signin" className="text-emerald-400 underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function ResetConfirmPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-slate-100">
          <section className="mx-auto max-w-md px-6 py-20">
            <div className="h-5 w-40 animate-pulse rounded bg-slate-800" />
            <div className="mt-4 h-4 w-72 animate-pulse rounded bg-slate-800" />
            <div className="mt-10 h-10 w-full animate-pulse rounded-xl bg-slate-800" />
          </section>
        </main>
      }
    >
      <ResetConfirmInner />
    </Suspense>
  );
}
