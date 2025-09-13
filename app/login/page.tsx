"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Loader2, LockKeyhole, Mail } from "lucide-react";

export default function LoginPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim().toLowerCase();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await signIn("credentials", { redirect: false, email, password });
    setBusy(false);

    if (!res || res.error) {
      setError("Invalid email or password.");
      return;
    }
    // Redirige page d’accueil
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-md px-4 py-14">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Log in to <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">DigitalMeve</span>
          </h1>
          <p className="mt-2 text-gray-600">Use your email and password to continue.</p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-800">Email</label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  className="h-10 w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-800">Password</label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3">
                <LockKeyhole className="h-4 w-4 text-gray-500" />
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="h-10 w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <button
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:brightness-105 disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Log in
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            No account?{" "}
            <Link href="/register" className="text-emerald-700 hover:underline">
              Create one
            </Link>
            .
          </p>
        </div>

        {/* Trust note */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Personal use remains free without an account. Creating an account unlocks higher limits.
        </p>
      </section>
    </main>
  );
}
