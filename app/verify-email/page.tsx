// app/verify-email/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, XCircle, Mail, RefreshCcw, LogIn, Home } from "lucide-react";

type Status = "ok" | "expired" | "invalid" | "unknown";

export default function VerifyEmailPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const status = (sp.get("status") as Status) || "unknown";
  const emailFromUrl = (sp.get("email") || "").trim().toLowerCase();

  const [email, setEmail] = useState(emailFromUrl);
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const { title, desc, icon, tone } = useMemo(() => {
    switch (status) {
      case "ok":
        return {
          title: "Email verified",
          desc: "Your email has been confirmed. You can now sign in.",
          icon: <CheckCircle2 className="h-6 w-6 text-emerald-400" aria-hidden />,
          tone: "ok",
        };
      case "expired":
        return {
          title: "Link expired",
          desc: "This verification link is no longer valid. You can request a new one below.",
          icon: <AlertTriangle className="h-6 w-6 text-amber-400" aria-hidden />,
          tone: "warn",
        };
      case "invalid":
        return {
          title: "Invalid link",
          desc: "We couldn’t validate this verification link. You can request a new link below.",
          icon: <XCircle className="h-6 w-6 text-rose-400" aria-hidden />,
          tone: "error",
        };
      default:
        return {
          title: "Check your inbox",
          desc: "If you requested verification, look for our email and click the link inside.",
          icon: <Mail className="h-6 w-6 text-sky-400" aria-hidden />,
          tone: "info",
        };
    }
  }, [status]);

  async function onResend(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setInfo(null);

    const value = email.trim().toLowerCase();
    if (!value) {
      setErr("Please enter your email.");
      return;
    }

    try {
      setBusy(true);
      const res = await fetch("/api/auth/verify-email/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      await res.json().catch(() => ({}));
      // Toujours 200 côté API → on affiche un message neutre
      setInfo("If the address exists, a verification email has been sent.");
    } catch (e: any) {
      setErr("Unable to send verification email. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-[70vh] bg-[var(--bg)] text-[var(--fg)]">
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-lg px-4 py-12 sm:py-16">
          {/* Header card */}
          <div className="card p-6">
            <div className="flex items-center gap-2">
              {icon}
              <h1 className="text-xl font-semibold">
                {title}
              </h1>
            </div>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{desc}</p>

            {/* Primary actions */}
            {status === "ok" ? (
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/login" className="btn btn-primary inline-flex items-center gap-2">
                  <LogIn className="h-4 w-4" /> Sign in
                </Link>
                <button
                  onClick={() => router.push("/")}
                  className="btn btn-ghost inline-flex items-center gap-2"
                >
                  <Home className="h-4 w-4" /> Home
                </button>
              </div>
            ) : (
              <form onSubmit={onResend} className="mt-6 space-y-3">
                <label className="block">
                  <span className="text-sm text-[var(--fg-muted)]">Email</span>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2 text-[var(--fg)] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </label>

                {err && (
                  <p className="rounded-lg bg-rose-500/10 p-2 text-sm text-rose-200">
                    {err}
                  </p>
                )}
                {info && (
                  <p className="rounded-lg bg-emerald-500/10 p-2 text-sm text-emerald-200">
                    {info}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    disabled={busy}
                    className="btn inline-flex items-center gap-2"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    {busy ? "Sending…" : "Resend verification email"}
                  </button>

                  <Link href="/login" className="btn btn-ghost inline-flex items-center gap-2">
                    <LogIn className="h-4 w-4" /> Sign in
                  </Link>
                  <Link href="/" className="btn btn-ghost inline-flex items-center gap-2">
                    <Home className="h-4 w-4" /> Home
                  </Link>
                </div>
              </form>
            )}
          </div>

          {/* Small hint */}
          <p className="mt-4 text-center text-xs text-[var(--fg-muted)]">
            Didn’t get the email? Check your spam folder or try again in a minute.
          </p>
        </div>
      </section>
    </main>
  );
      }
