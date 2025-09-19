// app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setMsg(null); setErr(null);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Registration failed.");
      setMsg("Account created. Check your email to verify.");
      (e.target as HTMLFormElement).reset();
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-[70vh] bg-[var(--bg)] text-[var(--fg)]">
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
          <div className="card p-6">
            <h1 className="text-xl font-semibold">Create your account</h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              You’ll receive a verification email to activate your account.
            </p>

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm text-[var(--fg-muted)]">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm text-[var(--fg-muted)]">Password</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2"
                  required
                />
              </label>

              {err && <p className="rounded-lg bg-rose-500/10 p-2 text-sm text-rose-200">{err}</p>}
              {msg && <p className="rounded-lg bg-emerald-500/10 p-2 text-sm text-emerald-200">{msg}</p>}

              <button disabled={busy} className="btn btn-primary w-full">
                {busy ? "Creating…" : "Create account"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-[var(--fg-muted)]">
              Already have an account?{" "}
              <Link href="/login" className="underline hover:opacity-90">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
      }
