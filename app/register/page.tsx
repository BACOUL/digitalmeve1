"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Loader2, Mail, LockKeyhole, Building2, User } from "lucide-react";
import { signIn } from "next-auth/react";

type Role = "INDIVIDUAL" | "BUSINESS";

export default function RegisterPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<Role>("INDIVIDUAL");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim().toLowerCase();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    // Call our API to create user
    const resp = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const json = await resp.json().catch(() => null);
    if (!resp.ok || !json?.ok) {
      setBusy(false);
      setError(json?.error ?? "Unable to create account.");
      return;
    }

    // Auto-login
    const login = await signIn("credentials", { redirect: false, email, password });
    setBusy(false);
    if (!login || login.error) {
      window.location.href = "/login";
    } else {
      window.location.href = role === "BUSINESS" ? "/business" : "/";
    }
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-md px-4 py-14">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-gray-600">
            Individuals stay free. Businesses get higher limits, API & support.
          </p>
        </div>

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
                  placeholder="you@company.com"
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

            {/* Role selector */}
            <fieldset className="rounded-xl border border-gray-200 p-3">
              <legend className="px-1 text-xs font-medium text-gray-600">Account type</legend>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("INDIVIDUAL")}
                  className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm ring-1 transition ${
                    role === "INDIVIDUAL"
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                      : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"
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
                      : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"
                  }`}
                  aria-pressed={role === "BUSINESS"}
                >
                  <Building2 className="h-4 w-4" />
                  Business
                </button>
              </div>
            </fieldset>

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <button
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:brightness-105 disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Create account
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-700 hover:underline">
              Log in
            </Link>
            .
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          You can still generate & verify without an account. Limits apply.
        </p>
      </section>
    </main>
  );
            }
