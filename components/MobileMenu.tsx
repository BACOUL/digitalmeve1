"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { X } from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Ferme avec ESC / clique sur backdrop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus initial sur le bouton "Close"
  useEffect(() => {
    if (open) {
      closeBtnRef.current?.focus();
    }
  }, [open]);

  // Trap de focus minimal (boucle TAB dans le menu)
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = containerRef.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const current = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
      if (current === first || !focusables.includes(current as HTMLElement)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (current === last || !focusables.includes(current as HTMLElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  // Style actif selon la page
  const activeClass = useCallback(
    (href: string) =>
      pathname === href
        ? "text-emerald-700 font-semibold"
        : "text-slate-800 hover:text-emerald-700",
    [pathname]
  );

  // Navigation (tu peux ajuster les sections facilement ici)
  const nav = useMemo(
    () => [
      {
        title: "Products",
        items: [
          { href: "/generate", label: "Generate" },
          { href: "/verify", label: "Verify" },
        ],
      },
      {
        title: "Solutions",
        items: [
          { href: "/personal", label: "For Individuals" },
          { href: "/pro", label: "For Business" },
        ],
      },
      {
        title: "Resources",
        items: [
          { href: "/pricing", label: "Pricing" },
          { href: "/developers", label: "Developers" },
          { href: "/security", label: "Security" },
          { href: "/status", label: "Status" },
          { href: "/changelog", label: "Changelog" },
        ],
      },
      {
        title: "Company",
        items: [
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
          { href: "/legal", label: "Legal" },
        ],
      },
    ],
    []
  );

  if (!open) return null;

  return (
    <div
      aria-hidden={!open}
      className="fixed inset-0 z-[1000]"
    >
      {/* Backdrop */}
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-black/30 transition-opacity animate-[fadeIn_180ms_ease-out] md:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        ref={containerRef}
        onKeyDown={onKeyDown}
        className="absolute inset-0 ml-auto h-dvh w-full bg-white outline-none md:max-w-sm md:rounded-l-2xl md:shadow-2xl
                   overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]
                   animate-[slideIn_220ms_cubic-bezier(0.22,0.61,0.36,1)]"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <Link
            href="/"
            onClick={onClose}
            className="text-lg font-semibold"
          >
            <span className="text-emerald-600">Digital</span>
            <span className="text-sky-600">Meve</span>
          </Link>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* Links */}
        <nav className="px-4 py-6 space-y-8">
          {nav.map((group) => (
            <div key={group.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {group.title}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`block rounded-lg px-2 py-2 transition ${activeClass(item.href)}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Divider */}
          <hr className="my-2 border-gray-200/70" />

          {/* CTA area */}
          <div className="space-y-3">
            <Link
              href="/login"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              href="/generate"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white hover:brightness-105"
            >
              Get Started Free
            </Link>
          </div>

          {/* Footer mini */}
          <div className="pt-4 text-xs text-slate-500">
            <p>
              Need help?{" "}
              <Link href="/contact" onClick={onClose} className="underline underline-offset-4 hover:text-slate-700">
                Contact us
              </Link>
            </p>
          </div>
        </nav>
      </div>

      {/* Anim keyframes (Tailwind arbitrary via @layer is idéal, ici inline via CSS global si besoin) */}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateY(8%); opacity: 0 }
          to   { transform: translateY(0); opacity: 1 }
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
      `}</style>
    </div>
  );
    }
