"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";

export default function RegisterPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/verify-email";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim()),
    [email]
  );
  const passOk = useMemo(() => password.length >= 8, [password]);
  const matchOk = useMemo(() => password === confirm, [password, confirm]);
  const canSubmit = emailOk && passOk && matchOk && !busy;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setBusy(true);
    setErr(null);
    setOkMsg(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Unable to create account.");
      }

      // Succès : on envoie vers /verify-email avec l’email pré-rempli
      setOkMsg("Account created. Check your mailbox to confirm your email.");
      // petit délai pour l’UX puis redirection
      setTimeout(() => {
        const url = new URL(callbackUrl, window.location.origin);
        url.searchParams.set("status", "ok");
        url.searchParams.set("email", email.trim().toLowerCase());
        url.searchParams.set("justRegistered", "1");
        router.push(url.toString());
      }, 900);
    } catch (e: any) {
      setErr(e?.message || "Unexpected error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start protecting documents in seconds."
    >
      {/* SR status */}
      <p aria-live="polite" className="sr-only">
        {busy ? "Creating account…" : "Idle"}
      </p>

      {err && (
        <div role="alert" className="mb-3 rounded-lg bg-rose-500/10 p-2 text-sm text-rose-200">
          {err}
        </div>
      )}
      {okMsg && (
        <div role="status" className="mb-3 rounded-lg bg-emerald-500/10 p-2 text-sm text-emerald-200">
          {okMsg}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-300">Email</span>
          <input
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">Password</span>
          <input
            name="password"
            type="password"
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <p className="mt-1 text-xs text-slate-500">Use at least 8 characters.</p>
        </label>

        <label className="block">
          <span className="text-sm text-slate-300">Confirm password</span>
          <input
            name="confirm"
            type="password"
            placeholder="Repeat the password"
            autoComplete="new-password"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={8}
          />
          {!matchOk && confirm.length > 0 && (
            <p className="mt-1 text-xs text-rose-300">Passwords don’t match.</p>
          )}
        </label>

        <button
          disabled={!canSubmit}
          className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {busy ? "Creating…" : "Create account"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-slate-400">Already have an account?</span>{" "}
        <Link href="/login" className="text-slate-100 underline hover:opacity-90">
          Sign in
        </Link>
      </div>
    </AuthCard>
  );
          }
