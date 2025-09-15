// app/(auth)/verify-email/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify email — DigitalMeve",
  description: "Confirm your email to secure your account."
};

type Search = { [key: string]: string | string[] | undefined };

export default function VerifyEmailPage({ searchParams }: { searchParams?: Search }) {
  const token = typeof searchParams?.token === "string" ? searchParams.token : "";
  const email = typeof searchParams?.email === "string" ? searchParams.email : "";
  const status = typeof searchParams?.status === "string" ? searchParams.status : undefined;

  return (
    <main className="mx-auto max-w-md px-6 py-16 text-gray-900">
      <h1 className="text-2xl font-semibold">Confirm your email</h1>
      <p className="mt-2 text-sm text-gray-600">
        Click the button below to confirm <span className="font-medium">{email || "your email"}</span>.
      </p>

      <form className="mt-6 space-y-3" action="/api/auth/verify-email" method="POST">
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={email} />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Confirm email
        </button>
      </form>

      {status === "ok" && (
        <p className="mt-4 text-sm text-emerald-700">Email verified. You can close this page.</p>
      )}
      {status === "invalid" && (
        <p className="mt-4 text-sm text-red-600">Invalid or expired link. Request a new one.</p>
      )}
    </main>
  );
}
