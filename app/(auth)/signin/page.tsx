// app/(auth)/signin/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import AuthCard from "@/components/AuthCard";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get("email") || "").trim(),
      password: String(form.get("password") || ""),
    };

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Invalid credentials");
      // Replace with router.push after session is set:
      window.location.href = "/dashboard";
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to access your dashboard."
      footer={
        <div className="text-sm text-slate-400 space-y-1">
          <p>
            New here?{" "}
            <Link className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4" href="/signup">
              Create an account
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4" href="/forgot">
              Reset it
            </Link>
          </p>
        </div>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-300">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </label>

        {err && <p className="rounded-lg bg-red-500/10 p-2 text-sm text-red-200">{err}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthCard>
  );
}
