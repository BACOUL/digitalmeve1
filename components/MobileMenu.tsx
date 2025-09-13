// components/MobileMenu.tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Portal from "@/components/Portal";
import {
  Users,
  FilePlus2,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Mail,
  Info,
  X,
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };

// petite utilitaire pour classes
function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

// garde “safe” pour pathname
function useSafePathname() {
  try {
    return usePathname() || "";
  } catch {
    return "";
  }
}

export default function MobileMenu({ open, onClose }: Props) {
  // IMPORTANT : ne rien rendre si fermé (ta version faisait ça, on garde)
  if (!open) return null;

  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = useSafePathname();

  // Empêche le scroll derrière
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Fermer avec ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Focus initial (tolérant)
  useEffect(() => {
    try {
      const first = panelRef.current?.querySelector<HTMLElement>(
        "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
      );
      first?.focus?.();
    } catch {
      /* no-op */
    }
  }, []);

  // Focus trap (ne fait rien si pas de focusables)
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = panelRef.current;
    if (!root) return;

    const all = root.querySelectorAll<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    const list = Array.from(all).filter(
      (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
    );
    if (list.length === 0) return;

    const first = list[0];
    const last = list[list.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    }
  }, []);

  // style actif (tolérant)
  const isActive = (href: string) => {
    if (!pathname) return false;
    return href === "/" ? pathname === "/" : (pathname === href || pathname.startsWith(href + "/"));
  };

  // click overlay/lien
  const closeOnClick: React.MouseEventHandler = () => onClose();

  return (
    <Portal>
      {/* overlay cliquable */}
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
      />

      {/* panneau clair */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white"
        onKeyDown={onKeyDown}
      >
        {/* barre supérieure */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link href="/" onClick={closeOnClick} className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-emerald-600">Digital</span>
              <span className="text-sky-600">Meve</span>
            </span>
            <span className="sr-only">DigitalMeve</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* contenu scrollable */}
        <nav className="flex-1 overflow-y-auto px-2 pb-24 pt-2 text-slate-700">
          {/* PRODUCTS */}
          <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Products
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/generate"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/generate") && "bg-emerald-50 ring-1 ring-emerald-200"
                )}
                aria-current={isActive("/generate") ? "page" : undefined}
              >
                <FilePlus2 className="h-5 w-5 text-emerald-600" />
                <span>Generate</span>
              </Link>
            </li>
            <li>
              <Link
                href="/verify"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/verify") && "bg-emerald-50 ring-1 ring-emerald-200"
                )}
                aria-current={isActive("/verify") ? "page" : undefined}
              >
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span>Verify</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* SOLUTIONS */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-sky-600">
            Solutions
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/personal"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/personal") && "bg-sky-50 ring-1 ring-sky-200"
                )}
                aria-current={isActive("/personal") ? "page" : undefined}
              >
                <Users className="h-5 w-5 text-sky-600" />
                <span>For Individuals</span>
              </Link>
            </li>
            <li>
              <Link
                href="/pro"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/pro") && "bg-sky-50 ring-1 ring-sky-200"
                )}
                aria-current={isActive("/pro") ? "page" : undefined}
              >
                <Briefcase className="h-5 w-5 text-sky-600" />
                <span>For Business</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* RESOURCES */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Resources
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/pricing"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/pricing") && "bg-gray-50 ring-1 ring-gray-200"
                )}
                aria-current={isActive("/pricing") ? "page" : undefined}
              >
                <BookOpen className="h-5 w-5 text-slate-600" />
                <span>Pricing</span>
              </Link>
            </li>
            <li>
              <Link
                href="/developers"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/developers") && "bg-gray-50 ring-1 ring-gray-200"
                )}
                aria-current={isActive("/developers") ? "page" : undefined}
              >
                <BookOpen className="h-5 w-5 text-slate-600" />
                <span>Developers</span>
              </Link>
            </li>
            <li>
              <Link
                href="/security"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/security") && "bg-gray-50 ring-1 ring-gray-200"
                )}
                aria-current={isActive("/security") ? "page" : undefined}
              >
                <ShieldCheck className="h-5 w-5 text-slate-600" />
                <span>Security</span>
              </Link>
            </li>
            <li>
              <Link
                href="/status"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/status") && "bg-gray-50 ring-1 ring-gray-200"
                )}
                aria-current={isActive("/status") ? "page" : undefined}
              >
                <Info className="h-5 w-5 text-slate-600" />
                <span>Status</span>
              </Link>
            </li>
            <li>
              <Link
                href="/changelog"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/changelog") && "bg-gray-50 ring-1 ring-gray-200"
                )}
                aria-current={isActive("/changelog") ? "page" : undefined}
              >
                <BookOpen className="h-5 w-5 text-slate-600" />
                <span>Changelog</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* COMPANY */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Company
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/about"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/about") && "bg-gray-50 ring-1 ring-gray-200"
                )}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                <Info className="h-5 w-5 text-slate-600" />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/contact") && "bg-gray-50 ring-1 ring-gray-200"
                )}
                aria-current={isActive("/contact") ? "page" : undefined}
              >
                <Mail className="h-5 w-5 text-slate-600" />
                <span>Contact</span>
              </Link>
            </li>
            <li>
              <Link
                href="/legal"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50",
                  isActive("/legal") && "bg-gray-50 ring-1 ring-gray-200"
                )}
                aria-current={isActive("/legal") ? "page" : undefined}
              >
                <BookOpen className="h-5 w-5 text-slate-600" />
                <span>Legal</span>
              </Link>
            </li>
          </ul>

          {/* badge bas de menu */}
          <div className="mt-6 px-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs text-slate-600">
              <Users className="h-4 w-4" />
              Private by design · No signup
            </div>
          </div>
        </nav>
      </div>
    </Portal>
  );
                }
