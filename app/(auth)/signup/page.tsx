// app/(auth)/signup/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import AuthCard from "@/components/AuthCard";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr(null); setMsg(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get("email") || "").trim(),
      password: String(form.get("password") || ""),
      name: String(form.get("name") || "").trim(),
    };

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");
      setMsg("Check your inbox — we sent you a verification link.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Protect and verify documents at scale. Free forever for individuals."
      footer={
        <p className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4" href="/signin">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-300">Name</span>
          <input
            name="name"
            type="text"
            placeholder="Ada Lovelace"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </label>

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

        <label className="block">
          <span className="text-sm text-slate-300">Password</span>
          <input
            name="password"
            type="password"
            minLength={12}
            placeholder="Minimum 12 characters"
            autoComplete="new-password"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <p className="mt-1 text-xs text-slate-400">
            Use a passphrase (e.g. four random words). We’ll hash it with a modern KDF.
          </p>
        </label>

        {err && <p className="rounded-lg bg-red-500/10 p-2 text-sm text-red-200">{err}</p>}
        {msg && <p className="rounded-lg bg-emerald-500/10 p-2 text-sm text-emerald-200">{msg}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {loading ? "Creating…" : "Create account"}
        </button>

        <p className="text-[11px] leading-5 text-slate-400">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="text-emerald-400 underline underline-offset-4">Terms</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-emerald-400 underline underline-offset-4">Privacy Policy</Link>.
        </p>
      </form>
    </AuthCard>
  );
          }
