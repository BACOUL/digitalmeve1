// app/(auth)/verify-email/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify your email — DigitalMeve",
  description: "Confirm your email address to secure your DigitalMeve account.",
};

// Empêche le prerender statique afin d’appeler l’API côté serveur à la req.
export const dynamic = "force-dynamic";

type SearchParamsPromise = Promise<Record<string, string | string[] | undefined>>;

function first(param?: string | string[]) {
  if (Array.isArray(param)) return param[0];
  return param;
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) {
  const sp = await searchParams;
  const token = first(sp.token);
  const email = first(sp.email);

  // États possibles : 'needs_params' | 'ok' | 'already_verified' | 'expired' | 'invalid' | 'error'
  let status: string = "needs_params";

  if (token && email) {
    try {
      const base = process.env.NEXT_PUBLIC_APP_URL ?? "";
      const url = `${base}/api/auth/verify-email?token=${encodeURIComponent(
        token
      )}&email=${encodeURIComponent(email)}`;

      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        status = data.status ?? (data.ok ? "ok" : "invalid");
      } else {
        status = "error";
      }
    } catch {
      status = "error";
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16 text-slate-900">
      <h1 className="text-2xl font-semibold tracking-tight">Email verification</h1>
      <p className="mt-2 text-sm text-slate-600">
        Confirm your email to finish securing your account.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        {status === "needs_params" && (
          <div>
            <p className="text-sm text-slate-700">
              The link seems incomplete. Open the link from the verification email we sent you.
            </p>
            <ResendForm />
          </div>
        )}

        {status === "ok" && (
          <Success
            title="You're verified!"
            tip="You can now sign in safely."
            ctaHref="/signin"
            ctaLabel="Continue"
          />
        )}

        {status === "already_verified" && (
          <Success
            title="Already verified"
            tip="Nothing else to do."
            ctaHref="/signin"
            ctaLabel="Sign in"
          />
        )}

        {status === "expired" && (
          <Problem
            title="Link expired"
            tip="No worries — request a fresh verification email."
          >
            <ResendForm email={email} />
          </Problem>
        )}

        {status === "invalid" && (
          <Problem
            title="Invalid link"
            tip="The link is not valid. Request a new verification email."
          >
            <ResendForm />
          </Problem>
        )}

        {status === "error" && (
          <Problem
            title="Something went wrong"
            tip="Please try again in a moment or request a new verification email."
          >
            <ResendForm />
          </Problem>
        )}
      </div>
    </main>
  );
}

/* ---------- UI helpers ---------- */

function Success({
  title,
  tip,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  tip: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="text-slate-800">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{tip}</p>
      <a
        href={ctaHref}
        className="mt-4 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        {ctaLabel}
      </a>
    </div>
  );
}

function Problem({
  title,
  tip,
  children,
}: {
  title: string;
  tip: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="text-slate-800">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{tip}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ResendForm({ email }: { email?: string }) {
  return (
    <form
      action="/api/auth/verify-email/resend"
      method="post"
      className="flex flex-col gap-3"
    >
      <input
        type="email"
        name="email"
        required
        defaultValue={email}
        placeholder="your@email.com"
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Resend verification email
      </button>
      <p className="text-xs text-slate-500">
        We’ll send a new link if the address exists.
      </p>
    </form>
  );
            }
