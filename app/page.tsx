// components/Page.tsx
import { PropsWithChildren } from "react";
import Link from "next/link";

/** Conteneur commun */
function Page({ children }: PropsWithChildren) {
  return <main className="mx-auto max-w-3xl px-6 py-16">{children}</main>;
}

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header>
      <h1 className="text-4xl font-bold tracking-tight text-white">{title}</h1>
      {subtitle ? <p className="mt-3 text-sm text-[var(--fg-muted)]">{subtitle}</p> : null}
    </header>
  );
}

function Section({ children }: PropsWithChildren) {
  return <section className="space-y-4">{children}</section>;
}

function H2({ children }: PropsWithChildren) {
  return <h2 className="text-2xl font-semibold text-white">{children}</h2>;
}

function P({ children }: PropsWithChildren) {
  return <p className="text-[var(--fg-muted)] leading-7">{children}</p>;
}

/** Lien cohérent (couleur accent) */
function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[var(--accent-1)] hover:opacity-90 underline">
      {children}
    </Link>
  );
}

/** Surlignage discret et élégant pour mots-clés importants */
function Highlight({ children }: PropsWithChildren) {
  return (
    <span className="relative rounded-md px-1.5 font-semibold text-[var(--accent-1)]">
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-emerald-500/10 to-sky-500/10"
      />
      {children}
    </span>
  );
}

export default Page;
export { PageHeader, Section, H2, P, A, Highlight };
