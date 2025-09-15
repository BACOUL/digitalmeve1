"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Lock, AlertCircle } from "lucide-react";

export default function ResetConfirmPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-md px-6 py-20">
        <Suspense fallback={<Skeleton />}>
          <ResetConfirmContent />
        </Suspense>
      </section>
    </main>
  );
}

function ResetConfirmContent() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const email = params.get("email") || "";

  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || !token || !email) return;
    setState("submitting");
    setMsg(null);

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

      setState("done");
      setMsg("Your password has been updated.");
      setPassword("");
    } catch (err: any) {
      setState("error");
      setMsg(err.message ?? "Something went wrong");
    }
  }

  if (!token || !email) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-amber-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Invalid reset link</h1>
            <p className="mt-2 text-sm text-gray-700">
              The link is missing information or has expired. Request a new one.
            </p>
            <div className="mt-4">
              <Link href="/reset" className="text-emerald-700 underline">Request new link</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Password updated</h1>
            <p className="mt-2 text-sm text-gray-700">You can now sign in with your new password.</p>
            <div className="mt-4">
              <Link href="/signin" className="text-slate-900 underline">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start gap-3">
        <Lock className="h-6 w-6 text-slate-700" />
        <div className="w-full">
          <h1 className="text-xl font-semibold text-gray-900">Create a new password</h1>
          <p className="mt-2 text-sm text-gray-700">
            Choose a strong password you don’t use elsewhere.
          </p>

          <label className="mt-6 block">
            <span className="text-sm text-gray-700">New password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-gray-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={state === "submitting"}
            className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {state === "submitting" ? "Updating…" : "Update password"}
          </button>

          {msg && (
            <div className={`mt-3 rounded-lg px-3 py-2 text-sm ${
              state === "error" ? "bg-red-500/10 text-red-700" : "bg-emerald-500/10 text-emerald-700"
            }`}>
              {msg}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-48 rounded bg-slate-200" />
      <div className="h-4 w-full rounded bg-slate-200" />
      <div className="h-4 w-2/3 rounded bg-slate-200" />
      <div className="h-9 w-40 rounded bg-slate-200" />
    </div>
  );
}
