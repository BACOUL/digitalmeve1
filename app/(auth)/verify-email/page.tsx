// app/(auth)/verify-email/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify your email — DigitalMeve",
  description:
    "Confirm your email to activate your DigitalMeve account and keep your organization secure.",
};

export const dynamic = "force-dynamic";

type VerifySearchParams = {
  token?: string;
  email?: string;
  status?: "ok" | "expired" | "invalid";
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  // Next 15: searchParams peut être un Promise
  searchParams: Promise<VerifySearchParams> | VerifySearchParams;
}) {
  const sp: VerifySearchParams =
    typeof (searchParams as any)?.then === "function"
      ? await (searchParams as Promise<VerifySearchParams>)
      : (searchParams as VerifySearchParams);

  const token = sp?.token;
  const email = sp?.email;
  const status = sp?.status;
  const hasToken = typeof token === "string" && token.length > 0;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-lg px-6 py-20">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Verify your email</h1>
          <p className="mt-3 text-slate-300">
            {email ? (
              <>We sent a secure link to <span className="font-medium text-white">{email}</span>.</>
            ) : (
              <>Click the verification link we sent to your inbox.</>
            )}
          </p>
        </header>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          {status === "ok" && <SuccessCard />}
          {status === "expired" && <ExpiredCard email={email} />}
          {status === "invalid" && <InvalidCard />}

          {!status && hasToken && (
            <form method="POST" action="/api/auth/verify-email" className="space-y-4">
              <input type="hidden" name="token" value={token} />
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                aria-label="Confirm email verification"
              >
                Confirm verification
              </button>
              <p className="text-xs text-slate-400">
                For your security, this link expires shortly and can only be used once.
              </p>
            </form>
          )}

          {!status && !hasToken && <NoTokenCard />}
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Wrong address?{" "}
          <Link href="/signup" className="text-emerald-400 underline underline-offset-4">
            Create a new account
          </Link>{" "}
          or{" "}
          <Link href="/signin" className="text-emerald-400 underline underline-offset-4">
            sign in
          </Link>
          .
        </p>
      </section>
    </main>
  );
}

/* ---------- UI Partials ---------- */

function SuccessCard() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
        Your email is verified. Welcome to DigitalMeve.
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/generate"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Protect a document
        </Link>
        <Link
          href="/verify"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-sky-300 ring-1 ring-slate-700 hover:bg-slate-800"
        >
          Verify a document
        </Link>
      </div>
    </div>
  );
}

function ExpiredCard({ email }: { email?: string }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
        This verification link has expired.
      </div>
      <form method="POST" action="/api/auth/verify-email/resend" className="space-y-3">
        {email && <input type="hidden" name="email" value={email} />}
        <button
          type="submit"
          className="w-full rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 ring-1 ring-slate-700"
        >
          Resend verification email
        </button>
        <p className="text-xs text-slate-400">
          We’ll send a fresh link. Check your spam folder if you don’t see it.
        </p>
      </form>
    </div>
  );
}

function InvalidCard() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-200">
        Invalid or already-used link.
      </div>
      <p className="text-sm text-slate-300">
        Request a new verification email from your account page, or start over.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/signin"
          className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 ring-1 ring-slate-700"
        >
          Go to sign in
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-sky-300 ring-1 ring-slate-700 hover:bg-slate-800"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}

function NoTokenCard() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">
        Open the email from <span className="text-white font-medium">DigitalMeve</span> and click
        the verification button. If you can’t find it, request a new email:
      </p>
      <form method="POST" action="/api/auth/verify-email/resend" className="space-y-3">
        <label className="block">
          <span className="text-xs text-slate-400">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="you@company.com"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 ring-1 ring-slate-700"
        >
          Resend verification email
        </button>
      </form>
      <p className="text-xs text-slate-400">
        Tip: add <span className="text-slate-200">no-reply@digitalmeve.com</span> to your contacts.
      </p>
    </div>
  );
}
