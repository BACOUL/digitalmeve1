// components/Page.tsx
import { PropsWithChildren } from "react";
import Link from "next/link";

/** Conteneur commun : mêmes marges, couleurs et largeur sur TOUTES les pages */
function Page({ children }: PropsWithChildren) {
  return (
    <main className="container-max py-12">
      <div className="surface p-6 sm:p-8">
        {children}
      </div>
    </main>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6">
      <h1 className="h2">{title}</h1>
      {subtitle ? <p className="sub mt-2">{subtitle}</p> : null}
    </header>
  );
}

function Section({ children }: PropsWithChildren) {
  return <section className="space-y-4">{children}</section>;
}

function H2({ children }: PropsWithChildren) {
  return <h2 className="h3">{children}</h2>;
}

function P({ children }: PropsWithChildren) {
  return <p className="sub leading-7">{children}</p>;
}

/** Lien cohérent (couleur accent) */
function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link">
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
        className="absolute inset-0 -z-10 rounded-md"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--accent-1) 12%, transparent), color-mix(in oklab, var(--accent-2) 12%, transparent))",
        }}
      />
      {children}
    </span>
  );
}

// ✅ On exporte par défaut ET on fournit les exports nommés (dont `Page`)
export default Page;
export { Page, PageHeader, Section, H2, P, A, Highlight };
