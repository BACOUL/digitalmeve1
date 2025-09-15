// app/(auth)/forgot/page.tsx
"use client";

import { useState } from "react";
import AuthCard from "@/components/AuthCard";

export default function ForgotPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr(null); setMsg(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unable to send email");
      setMsg("If an account exists for that email, we’ve sent a reset link.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Forgot password?" subtitle="Enter your email and we’ll send you a secure reset link.">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-300">Email</span>
          <input
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </label>

        {err && <p className="rounded-lg bg-red-500/10 p-2 text-sm text-red-200">{err}</p>}
        {msg && <p className="rounded-lg bg-emerald-500/10 p-2 text-sm text-emerald-200">{msg}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </AuthCard>
  );
}
