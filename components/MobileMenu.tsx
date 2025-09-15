// components/MobileMenu.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  X,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  User2,
} from "lucide-react";

/**
 * ✅ Soft import de next-auth/react pour éviter le crash au prerender.
 * - En SSG, le module peut ne pas être initialisé : on fournit des fallbacks no-op.
 */
let nextAuthMod: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  nextAuthMod = require("next-auth/react");
} catch {
  // no-op (build/prerender)
}
const useSessionSafe: () => { data: any; status?: string } =
  nextAuthMod?.useSession ?? (() => ({ data: null, status: "unauthenticated" }));
const signOutSafe: (args?: any) => void =
  nextAuthMod?.signOut ?? (() => {});

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const { data: session } = useSessionSafe();
  const pathname = usePathname();

  const role =
    (session?.user as any)?.role === "BUSINESS"
      ? "Business"
      : (session?.user as any)?.role === "INDIVIDUAL"
      ? "Individual"
      : undefined;

  // Refs accessibilité / interactions
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFocusRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLButtonElement | null>(null);

  // Swipe-to-close
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  // Lock scroll + focus trap + ESC
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const to = window.setTimeout(() => {
      (firstFocusRef.current ?? panelRef.current)?.focus();
    }, 0);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusable = getFocusable(panelRef.current);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            (last as HTMLElement).focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            (first as HTMLElement).focus();
          }
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(to);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Gestuelle (glisser → droite)
  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  }
  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
    if (panelRef.current && deltaX.current > 0) {
      const t = Math.min(80, deltaX.current);
      panelRef.current.style.transform = `translateX(${t}px)`;
    }
  }
  function onTouchEnd() {
    if (panelRef.current) panelRef.current.style.transform = "";
    if (deltaX.current > 60) onClose();
    startX.current = null;
    deltaX.current = 0;
  }

  // Items
  const products = useMemo(
    () => [
      { href: "/generate", label: "Generate" },
      { href: "/verify", label: "Verify" },
    ],
    []
  );
  const solutions = useMemo(
    () => [
      { href: "/personal", label: "For Individuals" },
      { href: "/pro", label: "For Business" },
    ],
    []
  );
  const resources = useMemo(
    () => [
      { href: "/pricing", label: "Pricing" },
      { href: "/developers", label: "Developers" },
      { href: "/security", label: "Security" },
      { href: "/status", label: "Status" },
      { href: "/changelog", label: "Changelog" },
    ],
    []
  );
  const company = useMemo(
    () => [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/legal", label: "Legal" },
    ],
    []
  );

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobilemenu-title"
      className="fixed inset-0 z-[1000] flex bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        role="document"
        className="ml-auto flex h-dvh w-full max-w-sm flex-col bg-slate-950 outline-none md:rounded-l-2xl md:shadow-2xl animate-[mmSlideIn_220ms_cubic-bezier(0.22,0.61,0.36,1)] focus-visible:ring-2 focus-visible:ring-emerald-400/40"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-4">
          <Link href="/" onClick={onClose} className="text-lg font-semibold">
            <span className="text-emerald-400">Digital</span>
            <span className="text-sky-400">Meve</span>
          </Link>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
          >
            <X className="h-5 w-5 text-slate-200" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100dvh-4rem)] flex-col">
          <nav className="flex-1 overflow-y-auto overscroll-y-contain px-4 py-6">
            <h2 id="mobilemenu-title" className="sr-only">
              Main navigation
            </h2>

            {/* CTA rapides */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              <Link
                href="/generate"
                onClick={onClose}
                className="text-center rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-medium text-white hover:brightness-110"
              >
                Generate
              </Link>
              <Link
                href="/verify"
                onClick={onClose}
                className="text-center rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
              >
                Verify
              </Link>
            </div>

            <Section title="Products">
              {products.map((it) => (
                <Item
                  key={it.href}
                  href={it.href}
                  label={it.label}
                  active={isActive(pathname, it.href)}
                  onClose={onClose}
                />
              ))}
            </Section>

            <Section title="Solutions">
              {solutions.map((it) => (
                <Item
                  key={it.href}
                  href={it.href}
                  label={it.label}
                  active={isActive(pathname, it.href)}
                  onClose={onClose}
                />
              ))}
            </Section>

            <Section title="Resources">
              {resources.map((it) => (
                <Item
                  key={it.href}
                  href={it.href}
                  label={it.label}
                  active={isActive(pathname, it.href)}
                  onClose={onClose}
                />
              ))}
            </Section>

            <Section title="Company">
              {company.map((it) => (
                <Item
                  key={it.href}
                  href={it.href}
                  label={it.label}
                  active={isActive(pathname, it.href)}
                  onClose={onClose}
                />
              ))}
            </Section>
          </nav>

          {/* Account panel */}
          <div className="border-t border-slate-800 p-4">
            {session?.user ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-800">
                      <User2 className="h-5 w-5 text-slate-200" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-100">
                        {session.user.email}
                      </p>
                      {role && <p className="text-xs text-slate-400">{role}</p>}
                    </div>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <button
                  ref={lastFocusRef}
                  onClick={() => signOutSafe({ callbackUrl: "/" })}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600/20 px-4 py-2 text-sm font-medium text-rose-300 hover:bg-rose-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:brightness-105"
                >
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes mmSlideIn {
          from {
            transform: translateX(8%);
            opacity: 0.4;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[mmSlideIn_220ms_cubic-bezier(0.22,0.61,0.36,1)] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
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
  active,
}: {
  href: string;
  label: string;
  onClose: () => void;
  active?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className={[
          "block rounded-lg px-2 py-2 text-[15px] transition",
          active
            ? "bg-slate-900 text-white"
            : "text-slate-200 hover:bg-slate-900 hover:text-white",
        ].join(" ")}
        aria-current={active ? "page" : undefined}
      >
        {label}
      </Link>
    </li>
  );
}

/* ---------- Utils ---------- */

function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  const selectors = [
    "a[href]",
    "button",
    "input",
    "select",
    "textarea",
    "[tabindex]:not([tabindex='-1'])",
  ];
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(selectors.join(",")));
  return nodes.filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      !el.getAttribute("aria-hidden") &&
      el.tabIndex !== -1
  );
}

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
        }
