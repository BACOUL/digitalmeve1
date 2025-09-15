// app/(auth)/reset/confirm/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetConfirmPage() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  const email = (sp.get("email") || "").toLowerCase();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const disabled = useMemo(() => {
    if (!token || !email) return true;
    if (!password || password.length < 8) return true;
    if (password !== password2) return true;
    return state === "submitting";
  }, [token, email, password, password2, state]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;

    setState("submitting");
    setMessage(null);

    try {
      const res = await fetch("/api/auth/reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      if (!res.ok) throw new Error("Unable to update password");

      setState("done");
      setMessage("Your password has been updated. You can now sign in.");
      setPassword("");
      setPassword2("");
    } catch (err: any) {
      setState("error");
      setMessage(err.message ?? "Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Create a new password</h1>
        <p className="mt-2 text-slate-300">
          Choose a strong password (8+ characters). This link may expire after 60 minutes.
        </p>

        {!token || !email ? (
          <div className="mt-6 rounded-lg bg-slate-900 border border-slate-800 p-4 text-sm text-slate-300">
            This reset link is invalid. Request a new one from{" "}
            <Link href="/reset" className="text-emerald-400 underline underline-offset-4">
              Reset
            </Link>
            .
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 text-sm">
              <div className="text-slate-400 text-xs mb-1">Email</div>
              <div className="font-mono text-slate-200 break-all">{email}</div>
            </div>

            <label className="block">
              <span className="text-sm text-slate-300">New password</span>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="********"
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Confirm password</span>
              <input
                type="password"
                required
                minLength={8}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="********"
              />
            </label>

            <button
              type="submit"
              disabled={disabled}
              className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {state === "submitting" ? "Updating…" : "Update password"}
            </button>

            {message && (
              <div
                className={`rounded-lg px-3 py-2 text-sm ${
                  state === "error" ? "bg-red-500/10 text-red-200" : "bg-emerald-500/10 text-emerald-200"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        )}

        <p className="mt-6 text-sm text-slate-400">
          Back to{" "}
          <Link href="/signin" className="text-emerald-400 underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
        }
