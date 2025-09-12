// components/Page.tsx
import { PropsWithChildren } from "react";
import Link from "next/link";

export function Page({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 bg-white text-gray-800">
      {children}
    </main>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">{title}</h1>
      {subtitle ? (
        <p className="mt-3 text-sm text-gray-500">{subtitle}</p>
      ) : null}
    </header>
  );
}

export function Section({ children }: PropsWithChildren) {
  return <section className="space-y-4">{children}</section>;
}

export function H2({ children }: PropsWithChildren) {
  return <h2 className="text-2xl font-semibold text-gray-900">{children}</h2>;
}

export function P({ children }: PropsWithChildren) {
  return <p className="text-gray-700 leading-7">{children}</p>;
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-emerald-600 hover:text-emerald-700 underline">
      {children}
    </Link>
  );
}
