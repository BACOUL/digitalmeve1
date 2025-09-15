// app/(auth)/verify-email/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Info, MailCheck, ShieldAlert, TriangleAlert } from "lucide-react";

// Empêche le prerender à la build (car dépend des query params + appel API)
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify your email — DigitalMeve",
  description:
    "Confirm your email to secure your DigitalMeve account and enable trusted actions.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/verify-email" },
  openGraph: {
    title: "Verify your email — DigitalMeve",
    description:
      "Confirm your email to secure your DigitalMeve account and enable trusted actions.",
    url: "/verify-email",
    type: "website",
  },
};

type VerifyEmailPageProps = {
  searchParams: {
    token?: string;
    email?: string;
  };
};

type VerifyApiResponse = {
  ok: boolean;
  status: "ok" | "already_verified" | "expired" | "invalid";
  email?: string;
  verifiedAt?: string;
  reason?: string | null;
};

async function verifyOnServer(token: string, email: string): Promise<VerifyApiResponse> {
  // Appel relatif côté serveur (Next re-route vers l’API interne)
  // On utilise POST JSON, comme votre route API.
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // @ts-ignore body peut accepter string
      body: JSON.stringify({ token, email }),
      // Important: ne pas cacher, on veut la réponse "live"
      cache: "no-store",
    });

    if (!res.ok) {
      // Normalise un état "invalid" en cas d’erreur API
      return { ok: false, status: "invalid", reason: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as VerifyApiResponse;
    // Sanity fallback si l’API ne renvoie pas exactement ce qu’on attend
    if (!data || !("status" in data)) {
      return { ok: false, status: "invalid", reason: "malformed_response" };
    }
    return data;
  } catch (e) {
    return { ok: false, status: "invalid", reason: "network_error" };
  }
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const token = (searchParams.token ?? "").trim();
  const email = (searchParams.email ?? "").trim().toLowerCase();

  let result: VerifyApiResponse | null = null;
  if (token && email) {
    result = await verifyOnServer(token, email);
  }

  return (
    <main className="min-h-[60vh] bg-white text-gray-900">
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-xl px-4 py-14 sm:py-18 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-gray-900">
            Verify your email
          </h1>
          <p className="mt-3 text-gray-600">
            Confirm your address to enable trusted actions and notifications.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-4 py-10">
        {/* Cas 1 : pas de token/email dans l’URL */}
        {!token || !email ? (
          <Card>
            <CardHeader
              icon={<Info className="h-6 w-6 text-sky-600" />}
              title="A confirmation link was sent"
              subtitle="Open it from your inbox to finish verifying your email."
            />

            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <p>
                Didn’t get it? Check spam and promotions. You can also request a new link below.
              </p>

              <ResendForm />
            </div>

            <CardFooter />
          </Card>
        ) : null}

        {/* Cas 2 : token/email présents → montrer résultat */}
        {token && email && result ? (
          <>
            {result.status === "ok" && (
              <Card intent="success">
                <CardHeader
                  icon={<CheckCircle2 className="h-6 w-6 text-emerald-600" />}
                  title="Email verified"
                  subtitle="Your address is confirmed. You’re all set."
                />
                <div className="mt-4 text-sm text-gray-700">
                  <p>
                    You can now continue using{" "}
                    <span className="font-medium">DigitalMeve</span> with full features.
                  </p>
                </div>
                <PrimaryActions />
              </Card>
            )}

            {result.status === "already_verified" && (
              <Card intent="info">
                <CardHeader
                  icon={<MailCheck className="h-6 w-6 text-sky-600" />}
                  title="Already verified"
                  subtitle="This address was confirmed previously."
                />
                <div className="mt-4 text-sm text-gray-700">
                  <p>No further action is required.</p>
                </div>
                <PrimaryActions />
              </Card>
            )}

            {result.status === "expired" && (
              <Card intent="warn">
                <CardHeader
                  icon={<ShieldAlert className="h-6 w-6 text-amber-600" />}
                  title="Link expired"
                  subtitle="Your confirmation link is no longer valid."
                />
                <div className="mt-4 text-sm text-gray-700">
                  <p>Request a fresh link below and try again.</p>
                  <ResendForm presetEmail={email} />
                </div>
                <CardFooter />
              </Card>
            )}

            {result.status === "invalid" && (
              <Card intent="error">
                <CardHeader
                  icon={<TriangleAlert className="h-6 w-6 text-rose-600" />}
                  title="Invalid link"
                  subtitle="We couldn’t validate your token."
                />
                <div className="mt-4 text-sm text-gray-700">
                  <p>Make sure you opened the latest email. You can request a new link:</p>
                  <ResendForm presetEmail={email} />
                </div>
                <CardFooter />
              </Card>
            )}
          </>
        ) : null}
      </section>
    </main>
  );
}

/* ---------------- UI helpers (SSR-safe, pas de use client) ---------------- */

function Card({
  children,
  intent,
}: {
  children: React.ReactNode;
  intent?: "success" | "info" | "warn" | "error";
}) {
  const ring =
    intent === "success"
      ? "ring-emerald-200"
      : intent === "info"
      ? "ring-sky-200"
      : intent === "warn"
      ? "ring-amber-200"
      : intent === "error"
      ? "ring-rose-200"
      : "ring-gray-200";
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-6 ring-1 ${ring}`}>
      {children}
    </div>
  );
}

function CardHeader({
  icon,
  title,
  subtitle,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon ? <div className="mt-0.5">{icon}</div> : null}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {subtitle ? <p className="text-sm text-gray-600">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function CardFooter() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        href="/"
        className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Back to home
      </Link>
      <Link
        href="/contact"
        className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50"
      >
        Contact support
      </Link>
    </div>
  );
}

function PrimaryActions() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        href="/generate"
        className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        Protect a file
      </Link>
      <Link
        href="/verify"
        className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50"
      >
        Verify a file
      </Link>
    </div>
  );
}

/** Formulaire SSR simple (POST direct vers /api/auth/verify-email/resend) */
function ResendForm({ presetEmail }: { presetEmail?: string }) {
  return (
    <form
      action="/api/auth/verify-email/resend"
      method="POST"
      className="mt-4 flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        name="email"
        required
        defaultValue={presetEmail}
        placeholder="your@email.com"
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        Resend link
      </button>
    </form>
  );
        }
