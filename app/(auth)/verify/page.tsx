// app/(auth)/verify/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import Link from "next/link";

export default function VerifyEmailPage() {
  const sp = useSearchParams();
  const token = sp.get("token");
  const [state, setState] = useState<"idle"|"verifying"|"success"|"error">("idle");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      setState("verifying");
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`, { method: "POST" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Invalid or expired link");
        setState("success");
      } catch (e: any) {
        setErr(e.message); setState("error");
      }
    })();
  }, [token]);

  return (
    <AuthCard title="Verify your email" subtitle="Click the link we sent to your inbox to activate your account.">
      {!token && (
        <p className="text-sm text-slate-300">
          We’ve sent you a secure link. Didn’t get it? Check spam or{" "}
          <Link href="/signin" className="text-emerald-400 underline underline-offset-4">sign in</Link> to resend.
        </p>
      )}

      {token && state === "verifying" && <p className="text-sm text-slate-300">Verifying your email…</p>}
      {state === "success" && (
        <div className="rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-200">
          Email verified. You can now{" "}
          <Link className="underline underline-offset-4" href="/signin">sign in</Link>.
        </div>
      )}
      {state === "error" && <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-200">{err}</p>}
    </AuthCard>
  );
}
