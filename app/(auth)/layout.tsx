// app/(auth)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account — DigitalMeve",
  description: "Sign in, create an account, verify your email, or reset your password.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-md px-4 py-16">
        {children}
      </div>
    </main>
  );
}
