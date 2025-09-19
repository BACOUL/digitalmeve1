// app/(auth)/reset/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";

export default function ResetPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const tokenFromUrl = (sp.get("token") || "").trim();
  const emailFromUrl = (sp.get("email") || "").trim().toLowerCase();

  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setErr(null); setMsg(null);

    try {
      const res = await fetch("/api/auth/reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: tokenFromUrl,
          email: emailFromUrl,
          password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Unable to reset password.");
      setMsg("Your password has been updated.");
      setTimeout(() => router.push("/login"), 1200);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  const tokenMissing = !tokenFromUrl || !emailFromUrl;

  return (
    <AuthCard
      title="Choose a new password"
      subtitle={tokenMissing ? "Invalid link. Request a new reset email." : "Enter a strong password (min 8 characters)."}
    >
      {tokenMissing ? (
        <p className="rounded-lg bg-rose-500/10 p-2 text-sm text-rose-200">
          The reset link is invalid or incomplete. Please request a new one from the forgot page.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-slate-300">New password</span>
            <input
              name="password"
              type="password"
              minLength={8}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {err && <p className="rounded-lg bg-red-500/10 p-2 text-sm text-red-200">{err}</p>}
          {msg && <p className="rounded-lg bg-emerald-500/10 p-2 text-sm text-emerald-200">{msg}</p>}

          <button disabled={busy} className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 font-medium text-white hover:bg-emerald-600 disabled:opacity-60">
            {busy ? "Updating…" : "Update password"}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
