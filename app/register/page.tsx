// app/register/page.tsx
"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Loader2,
  Mail,
  LockKeyhole,
  Building2,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

type Role = "INDIVIDUAL" | "BUSINESS";

export default function RegisterPage() {
  // ⚠️ useSearchParams doit être dans un composant sous <Suspense> (Next 13+/15)
  return (
    <Suspense fallback={null}>
      <RegisterInner />
    </Suspense>
  );
}

function RegisterInner() {
  const search = useSearchParams();
  const callbackUrl = useMemo(() => search.get("callbackUrl") || "/", [search]);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<Role>("INDIVIDUAL");
  const [showPw, setShowPw] = useState(false);
  const [caps, setCaps] = useState(false);

  // SR live status
  const sr = busy ? "Creating account…" : error ? "Registration failed" : "Idle";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;

    setBusy(true);
    setError(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)
      .value.trim()
      .toLowerCase();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      // 1) Création du compte
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const json = await resp.json().catch(() => null);

      if (!resp.ok || !json?.ok) {
        setError(json?.error ?? "Unable to create account.");
        setBusy(false);
        return;
      }

      // 2) Auto-login
      const login = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      setBusy(false);

      if (!login || login.error) {
        // Si l’auto-login échoue, on redirige vers /login (et on garde callbackUrl)
        window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
        return;
      }

      // 3) Redirection finale
      window.location.href =
        login.url || (role === "BUSINESS" ? "/pro" : "/") || "/";
    } catch (err: any) {
      setBusy(false);
      setError("Network error. Please try again.");
    }
  }

  function onPwKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    const hasCaps = (e as any).getModifierState?.("CapsLock");
    if (typeof hasCaps === "boolean") setCaps(hasCaps);
  }

  // auto-clear de l’erreur après 4 s (UX douce)
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 4000);
    return () => clearTimeout(t);
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* SR status */}
      <p aria-live="polite" className="sr-only">
        {sr}
      </p>

      <section className="mx-auto max-w-md px-4 py-14">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Create your account</h1>
          <p className="mt-2 text-[var(--fg-muted)]">
            Individuals stay free. Businesses get higher limits, API &amp; support.
          </p>
        </div>

        <div className="mt-8 card p-6">
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 dark:bg-transparent">
                <Mail className="h-4 w-4 text-[var(--fg-muted)]" aria-hidden />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="h-10 w-full bg-transparent text-sm outline-none"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!error || undefined}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 dark:bg-transparent">
                <LockKeyhole className="h-4 w-4 text-[var(--fg-muted)]" aria-hidden />
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="h-10 w-full bg-transparent text-sm outline-none"
                  autoComplete="new-password"
                  onKeyUp={onPwKeyEvent}
                  onKeyDown={onPwKeyEvent}
                  onKeyPress={onPwKeyEvent}
                  aria-invalid={!!error || undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="inline-flex items-center justify-center rounded-md p-1 text-[var(--fg-muted)] hover:bg-white/5"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-[var(--fg-muted)]">Minimum 6 characters.</p>
              {caps && (
                <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Caps Lock is on</span>
                </div>
              )}
            </div>

            {/* Role selector */}
            <fieldset className="rounded-xl border border-[var(--border)] p-3">
              <legend className="px-1 text-xs font-medium text-[var(--fg-muted)]">
                Account type
              </legend>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("INDIVIDUAL")}
                  className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm ring-1 transition ${
                    role === "INDIVIDUAL"
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                      : "bg-white text-[var(--fg)] ring-[var(--border)] hover:bg-white/50"
                  }`}
                  aria-pressed={role === "INDIVIDUAL"}
                >
                  <User className="h-4 w-4" />
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => setRole("BUSINESS")}
                  className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm ring-1 transition ${
                    role === "BUSINESS"
                      ? "bg-sky-50 text-sky-700 ring-sky-200"
                      : "bg-white text-[var(--fg)] ring-[var(--border)] hover:bg-white/50"
                  }`}
                  aria-pressed={role === "BUSINESS"}
                >
                  <Building2 className="h-4 w-4" />
                  Business
                </button>
              </div>
            </fieldset>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              disabled={busy}
              className="btn btn-primary w-full justify-center gap-2 disabled:opacity-60"
              aria-disabled={busy}
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Create account
            </button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm">
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="text-[var(--accent-1)] hover:underline"
            >
              Already have an account? Log in
            </Link>
            <div className="flex items-center gap-1 text-[var(--fg-muted)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>No tracking. Security-first.</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--fg-muted)]">
          You can still generate &amp; verify without an account. Limits apply.
        </p>
      </section>
    </main>
  );
                    }
