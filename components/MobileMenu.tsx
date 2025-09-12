// components/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Portal from "@/components/Portal";
import {
  FilePlus2,
  ShieldCheck,
  Tag,
  Code2,
  Briefcase,
  Mail,
  Shield,
  Info,
  Activity,
  History,
  FileText,
  Scale,
  Cookie,
  X,
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  const panelRef = useRef<HTMLDivElement>(null);

  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // focus first
  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, []);

  return (
    <Portal>
      {/* Overlay */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white"
      >
        {/* Top bar */}
        <div className="relative border-b border-gray-200 bg-white/90 px-4 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link
              href="/"
              onClick={onClose}
              className="text-lg font-semibold tracking-tight"
            >
              <span className="text-emerald-600">Digital</span>
              <span className="text-sky-600">Meve</span>
            </Link>
            <button
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              <X className="h-5 w-5 text-slate-700" />
            </button>
          </div>
          {/* brand beam */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-sky-400"
          />
        </div>

        {/* Content */}
        <nav className="flex-1 overflow-y-auto px-2 pb-28 pt-3 text-slate-700">
          {/* ACTIONS (emerald) */}
          <Section title="Actions" accent="emerald">
            <Item href="/generate" onClose={onClose} icon={<FilePlus2 className="h-5 w-5 text-emerald-600" />}>
              Generate
              <Small>Free • No storage</Small>
            </Item>
            <Item href="/verify" onClose={onClose} icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}>
              Verify
              <Small>Check a .MEVE file</Small>
            </Item>
          </Section>

          {/* PRODUCTS (sky) */}
          <Section title="Products" accent="sky">
            <Item href="/pricing" onClose={onClose} icon={<Tag className="h-5 w-5 text-sky-600" />}>
              Pricing
              <Small>Free for individuals</Small>
            </Item>
            <Item href="/developers" onClose={onClose} icon={<Code2 className="h-5 w-5 text-sky-600" />}>
              Developers
              <Small>API — coming soon</Small>
            </Item>
          </Section>

          {/* PROFESSIONALS (indigo) */}
          <Section title="Professionals" accent="indigo">
            <Item href="/pro" onClose={onClose} icon={<Briefcase className="h-5 w-5 text-indigo-600" />}>
              Why .MEVE for business
              <Small>Issuer checks • Scale verify</Small>
            </Item>
            <Item href="/contact" onClose={onClose} icon={<Mail className="h-5 w-5 text-indigo-600" />}>
              Contact sales
              <Small>SLA & roadmap</Small>
            </Item>
          </Section>

          {/* COMPANY (neutral) */}
          <Section title="Company">
            <Item href="/security" onClose={onClose} icon={<Shield className="h-5 w-5 text-slate-500" />}>
              Security
            </Item>
            <Item href="/about" onClose={onClose} icon={<Info className="h-5 w-5 text-slate-500" />}>
              About
            </Item>
            <Item href="/status" onClose={onClose} icon={<Activity className="h-5 w-5 text-slate-500" />}>
              Status
            </Item>
            <Item href="/changelog" onClose={onClose} icon={<History className="h-5 w-5 text-slate-500" />}>
              Changelog
            </Item>
            <Item href="/contact" onClose={onClose} icon={<Mail className="h-5 w-5 text-slate-500" />}>
              Contact
            </Item>
          </Section>

          {/* LEGAL (neutral) */}
          <Section title="Legal">
            <Item href="/privacy" onClose={onClose} icon={<FileText className="h-5 w-5 text-slate-500" />}>
              Privacy
            </Item>
            <Item href="/terms" onClose={onClose} icon={<Scale className="h-5 w-5 text-slate-500" />}>
              Terms
            </Item>
            <Item href="/cookies" onClose={onClose} icon={<Cookie className="h-5 w-5 text-slate-500" />}>
              Cookies
            </Item>
          </Section>
        </nav>

        {/* Footer badge */}
        <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-[1001] flex justify-center">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-3 py-1 text-xs font-medium text-white shadow-lg ring-1 ring-black/5">
            Free for Individuals
          </div>
        </div>
      </div>
    </Portal>
  );
}

/* ---------- small building blocks ---------- */

function Section({
  title,
  children,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  accent?: "emerald" | "sky" | "indigo";
}) {
  const color =
    accent === "emerald"
      ? "text-emerald-700"
      : accent === "sky"
      ? "text-sky-700"
      : accent === "indigo"
      ? "text-indigo-700"
      : "text-slate-500";

  const divider =
    accent === "emerald"
      ? "from-emerald-200/60"
      : accent === "sky"
      ? "from-sky-200/60"
      : accent === "indigo"
      ? "from-indigo-200/60"
      : "from-gray-200/60";

  return (
    <div className="px-2 py-3">
      <div className="flex items-center gap-2 px-1">
        <span className={`text-xs font-semibold uppercase tracking-wide ${color}`}>
          {title}
        </span>
        <span className={`h-px flex-1 bg-gradient-to-r ${divider} to-transparent`} />
      </div>
      <ul className="mt-2 space-y-1">{children}</ul>
    </div>
  );
}

function Item({
  href,
  icon,
  children,
  onClose,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        {icon}
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-slate-800 group-hover:text-slate-900">
            {children}
          </span>
        </span>
      </Link>
    </li>
  );
}

function Small({ children }: { children: React.ReactNode }) {
  return <span className="text-xs text-slate-500">{children}</span>;
}
