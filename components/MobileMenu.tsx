"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  X,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  User2,
  Globe,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const { data: session } = useSession();
  const [lang, setLang] = useState<"en" | "fr">(
    (typeof window !== "undefined" &&
      (localStorage.getItem("dm_lang") as "en" | "fr")) || "en"
  );

  // Empêche le scroll derrière le menu
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  if (!open) return null;

  const role =
    (session?.user as any)?.role === "BUSINESS"
      ? "Business"
      : (session?.user as any)?.role === "INDIVIDUAL"
      ? "Individual"
      : undefined;

  function toggleLang() {
    const next = lang === "en" ? "fr" : "en";
    setLang(next);
    try {
      localStorage.setItem("dm_lang", next);
    } catch {}
    // si plus tard tu ajoutes i18n avec des routes /en /fr, redirige ici
    // window.location.href = `/${next}${window.location.pathname}`;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex bg-black/40"
      onClick={onClose}
    >
      {/* Drawer */}
      <div
        role="document"
        className="ml-auto h-dvh w-full max-w-sm bg-[var(--bg)] text-[var(--fg)] outline-none md:rounded-l-2xl md:shadow-2xl animate-[slideIn_220ms_cubic-bezier(0.22,0.61,0.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-4 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="text-lg font-semibold"
            aria-label="DigitalMeve home"
          >
            <span className="text-[var(--accent)]">Digital</span>
            <span className="text-[var(--cta)]">Meve</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Lang switch (EN/FR) */}
            <button
              onClick={toggleLang}
              aria-label="Switch language"
              className="inline-flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_88%,black_12%)] px-3 py-1.5 text-xs hover:brightness-110"
            >
              <Globe className="h-4 w-4 opacity-90" />
              {lang.toUpperCase()}
            </button>

            <button
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:brightness-110"
            >
              <X className="h-5 w-5 opacity-90" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100dvh-4rem)] flex-col">
          <nav className="flex-1 overflow-y-auto overscroll-y-contain px-4 py-6">
            {/* CTAs rapides */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link href="/generate" onClick={onClose} className="btn btn-accent">
                Generate
              </Link>
              <Link href="/verify" onClick={onClose} className="btn btn-neutral">
                Verify
              </Link>
            </div>

            {/* PRODUCT */}
            <Section title="Product">
              <Item href="/generate" onClose={onClose} label="Generate" />
              <Item href="/verify" onClose={onClose} label="Verify" />
              <Item href="/how-it-works" onClose={onClose} label="How it works" />
              <Item href="/formats" onClose={onClose} label="Formats & compatibility" />
              <Item href="/pricing" onClose={onClose} label="Pricing" />
            </Section>

            {/* SOLUTIONS */}
            <Section title="Solutions">
              <Item href="/personal" onClose={onClose} label="For Individuals" />
              <Item href="/pro" onClose={onClose} label="For Professionals" />
              <Item href="/developers" onClose={onClose} label="Integrations & API" />
            </Section>

            {/* TRUST / COMPLIANCE */}
            <Section title="Trust & Compliance">
              <Item href="/security" onClose={onClose} label="Security" />
              <Item href="/privacy" onClose={onClose} label="Privacy" />
              <Item href="/trust-center" onClose={onClose} label="Trust Center / Compliance" />
              <Item href="/status" onClose={onClose} label="Status" />
              <Item href="/changelog" onClose={onClose} label="Changelog" />
            </Section>

            {/* COMPANY */}
            <Section title="Company">
              <Item href="/about" onClose={onClose} label="About" />
              <Item href="/contact" onClose={onClose} label="Contact" />
              <Item href="/press" onClose={onClose} label="Press" />
              <Item href="/careers" onClose={onClose} label="Careers" />
            </Section>

            {/* LEGAL */}
            <Section title="Legal">
              <Item href="/terms" onClose={onClose} label="Terms" />
              <Item href="/cookies" onClose={onClose} label="Cookies" />
              <Item href="/legal" onClose={onClose} label="Legal notice" />
              {/* plus tard: /dpa, /sla */}
            </Section>
          </nav>

          {/* Account panel */}
          <div className="border-t border-[var(--border)] p-4 bg-[var(--bg)]">
            {session?.user ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-[var(--border)] p-3 bg-[var(--surface)]">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-white/5">
                      <User2 className="h-5 w-5 opacity-90" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{session.user.email}</p>
                      {role && <p className="text-xs opacity-70 leading-tight">{role}</p>}
                    </div>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm hover:brightness-110"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600/10 px-4 py-2 text-sm font-medium text-rose-400 hover:bg-rose-600/15"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" onClick={onClose} className="btn btn-neutral">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link href="/register" onClick={onClose} className="btn btn-primary">
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* petite anim CSS */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(8%);
            opacity: 0.4;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-70">
        {title}
      </p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function Item({
  href,
  label,
  onClose,
}: {
  href: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className="block py-2 text-[15px] hover:opacity-90"
      >
        {label}
      </Link>
    </li>
  );
              }
