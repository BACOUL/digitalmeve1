// app/login/page.tsx
"use client";

import { FormEvent, useEffect, useMemo, useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  Loader2,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const search = useSearchParams();
  const callbackUrl = useMemo(() => search.get("callbackUrl") || "/", [search]);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [caps, setCaps] = useState(false);

  // SR live status (accessibilité)
  const srStatus = busy ? "Signing in…" : error ? "Login failed" : "Idle";

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

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    setBusy(false);

    if (!res || res.error) {
      // message générique (éviter l’énumération d’utilisateurs)
      setError("Invalid email or password.");
      return;
    }
    // Redirection côté client (on respecte callbackUrl si présent)
    window.location.href = res.url || callbackUrl || "/";
  }

  // Aide: détecte Caps Lock sur le champ mot de passe
  function onPwKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    const hasCaps = (e as any).getModifierState?.("CapsLock");
    if (typeof hasCaps === "boolean") setCaps(hasCaps);
  }

  // Annule l’erreur visuelle quand l’utilisateur tape à nouveau
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 4000);
    return () => clearTimeout(t);
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* SR status pour lecteurs d’écran */}
      <p aria-live="polite" className="sr-only">
        {srStatus}
      </p>

      <section className="mx-auto max-w-md px-4 py-14">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Log in to{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              DigitalMeve
            </span>
          </h1>
          <p className="mt-2 text-[var(--fg-muted)]">
            Use your email and password to continue.
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 card p-6">
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
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
                  placeholder="you@domain.com"
                  autoComplete="email"
                  className="h-10 w-full bg-transparent text-sm outline-none"
                  inputMode="email"
                  aria-invalid={!!error || undefined}
                />
              </div>
            </div>

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
                  autoComplete="current-password"
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

              {caps && (
                <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Caps Lock is on</span>
                </div>
              )}
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              disabled={busy}
              className="btn btn-primary w-full justify-center gap-2 disabled:opacity-60"
              aria-disabled={busy}
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Log in
            </button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm">
            <Link href="/forgot" className="text-[var(--accent-1)] hover:underline">
              Forgot password?
            </Link>
            <div className="flex items-center gap-1 text-[var(--fg-muted)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>No tracking. Security-first.</span>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-[var(--fg-muted)]">
            No account?{" "}
            <Link
              href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="text-[var(--accent-1)] hover:underline"
            >
              Create one
            </Link>
            .
          </p>
        </div>

        {/* Trust note */}
        <p className="mt-6 text-center text-xs text-[var(--fg-muted)]">
          Personal use remains free without an account. Creating an account unlocks higher limits.
        </p>
      </section>
    </main>
  );
}
