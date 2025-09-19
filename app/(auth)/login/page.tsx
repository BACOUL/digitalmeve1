// app/(auth)/login/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import AuthCard from "@/components/AuthCard";

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const callbackUrl = sp.get("callbackUrl") || "/dashboard";
  const errorFromQuery = sp.get("error"); // ex: CredentialsSignin

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Normalise les messages NextAuth en messages clairs
  const prettyError = useMemo(() => {
    if (!errorFromQuery && !err) return null;
    const code = (errorFromQuery || err || "").toString();

    // Codes fréquents NextAuth
    if (/CredentialsSignin/i.test(code)) return "Invalid email or password.";
    if (/AccessDenied/i.test(code)) return "Access denied.";
    if (/OAuthAccountNotLinked/i.test(code)) return "Account not linked to this provider.";
    if (/Verification/i.test(code)) return "Please verify your email first.";
    if (/Callback/i.test(code)) return "Unable to sign you in. Please try again.";
    if (/Configuration/i.test(code)) return "Auth configuration error. Try again later.";
    if (/Default/i.test(code)) return "Authentication error.";
    // Si c’est un message libre côté app
    if (code && code !== "null") return code;

    return null;
  }, [errorFromQuery, err]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr(null);

    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false, // on contrôle la redirection nous-même
        callbackUrl,
      });

      if (!res) {
        setErr("Unable to sign in. Please try again.");
        return;
      }
      if (res.error) {
        setErr(res.error);
        return;
      }
      // Succès → on redirige (NextAuth a déjà renvoyé une URL)
      router.push(res.url || callbackUrl);
    } catch (e: any) {
      setErr(e?.message || "Unexpected error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in with your email and password."
    >
      {/* SR status */}
      <p aria-live="polite" className="sr-only">
        {busy ? "Signing in…" : "Idle"}
      </p>

      {prettyError && (
        <div
          role="alert"
          className="mb-3 rounded-lg bg-rose-500/10 p-2 text-sm text-rose-200"
        >
          {prettyError}
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
            placeholder="********"
            autoComplete="current-password"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </label>

        <div className="flex items-center justify-between text-sm">
          <Link href="/forgot" className="text-slate-300 underline hover:opacity-90">
            Forgot your password?
          </Link>
          {/* Option 'Remember me' (facultatif, pure UI) */}
          {/* <label className="inline-flex items-center gap-2 text-slate-400">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-900" />
            Remember me
          </label> */}
        </div>

        <button
          disabled={busy}
          className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-4 text-center text-xs text-slate-500">or</div>

      {/* CTA – Register */}
      <div className="text-center text-sm">
        <span className="text-slate-400">New to DigitalMeve?</span>{" "}
        <Link href="/register" className="text-slate-100 underline hover:opacity-90">
          Create an account
        </Link>
      </div>
    </AuthCard>
  );
          }
