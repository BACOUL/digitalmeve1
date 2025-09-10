// components/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Users,
  FilePlus2,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Mail,
  Info,
  Globe,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Bloquer le scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Fermer avec ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus premier élément
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const first = panelRef.current.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={[
          "fixed inset-0 z-[61] flex flex-col bg-slate-950/95",
          "transition-transform duration-200",
          open ? "translate-y-0" : "-translate-y-2",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Barre du haut */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              <span className="text-emerald-300">Digital</span>
              <span className="text-sky-300">Meve</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenu */}
        <nav className="flex-1 overflow-y-auto px-3 pb-8 pt-4 space-y-6">
          {/* CTA principal */}
          <Link
            href="/generate"
            onClick={onClose}
            className="block w-full rounded-xl bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-3 text-center font-semibold text-slate-950 hover:opacity-90 transition"
          >
            Commencer gratuitement
          </Link>

          {/* Particuliers */}
          <div>
            <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-emerald-300/90">
              Particuliers
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/generate"
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
                >
                  <FilePlus2 className="h-5 w-5 text-emerald-300" />
                  Générer une preuve
                </Link>
              </li>
              <li>
                <Link
                  href="/verify"
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
                >
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  Vérifier un document
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
                >
                  <BookOpen className="h-5 w-5 text-emerald-300" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
                >
                  <Info className="h-5 w-5 text-emerald-300" />
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Pro */}
          <div>
            <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-sky-300/90">
              Professionnels
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pro"
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
                >
                  <Briefcase className="h-5 w-5 text-sky-300" />
                  Vue d’ensemble Pro
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
                >
                  <Users className="h-5 w-5 text-sky-300" />
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
                >
                  <Mail className="h-5 w-5 text-sky-300" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Simple • Universelle • Gratuite</span>
          <button
            className="flex items-center gap-1 hover:text-white transition"
            aria-label="Changer de langue"
          >
            <Globe className="h-4 w-4" />
            FR/EN
          </button>
        </div>
      </div>
    </>
  );
}
