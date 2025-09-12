"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Portal from "@/components/Portal";
import {
  X,
  ChevronRight,
  FilePlus2,
  ShieldCheck,
  Tag,
  Code2,
  Shield,
  Info,
  Activity,
  Mail,
  History,
  FileText,
  Scale,
  Cookie,
  User2,
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

  // focus first actionable
  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, []);

  return (
    <Portal>
      {/* overlay */}
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
      />

      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white"
      >
        {/* top bar with soft gradient */}
        <div className="relative border-b border-gray-200">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_10%_-10%,rgba(16,185,129,.18),transparent_55%),radial-gradient(120%_60%_at_90%_-10%,rgba(56,189,248,.18),transparent_55%)]"
          />
          <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <Link
              href="/"
              onClick={onClose}
              className="flex select-none items-center gap-2"
            >
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-emerald-600">Digital</span>
                <span className="text-sky-600">Meve</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white/70 backdrop-blur hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              <X className="h-5 w-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* content */}
        <nav className="flex-1 overflow-y-auto px-2 pb-28 pt-3 text-slate-800">
          {/* ACTIONS */}
          <Section title="Actions" accent="emerald">
            <MenuItem href="/generate" icon={<FilePlus2 className="h-5 w-5 text-emerald-600" />}>
              <div className="flex flex-col">
                <span className="font-medium text-slate-900">Generate</span>
                <span className="text-sm text-slate-500">Create a .MEVE proof</span>
              </div>
            </MenuItem>
            <MenuItem href="/verify" icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}>
              <div className="flex flex-col">
                <span className="font-medium text-slate-900">Verify</span>
                <span className="text-sm text-slate-500">Check any document</span>
              </div>
            </MenuItem>
          </Section>

          {/* PRODUCTS */}
          <Section title="Products" accent="sky">
            <MenuItem href="/pricing" icon={<Tag className="h-5 w-5 text-sky-600" />}>
              <div className="flex flex-col">
                <span className="font-medium text-slate-900">Pricing</span>
                <span className="text-sm text-slate-500">Free for Individuals</span>
              </div>
            </MenuItem>
            <MenuItem href="/developers" icon={<Code2 className="h-5 w-5 text-sky-600" />}>
              <div className="flex flex-col">
                <span className="font-medium text-slate-900">Developers</span>
                <span className="text-sm text-slate-500">API — coming soon</span>
              </div>
            </MenuItem>
          </Section>

          {/* COMPANY */}
          <Section title="Company" accent="slate">
            <MenuItem href="/security" icon={<Shield className="h-5 w-5 text-slate-600" />}>
              <span className="font-medium text-slate-900">Security</span>
            </MenuItem>
            <MenuItem href="/about" icon={<Info className="h-5 w-5 text-slate-600" />}>
              <span className="font-medium text-slate-900">About</span>
            </MenuItem>
            <MenuItem href="/status" icon={<Activity className="h-5 w-5 text-slate-600" />}>
              <span className="font-medium text-slate-900">Status</span>
            </MenuItem>
            <MenuItem href="/changelog" icon={<History className="h-5 w-5 text-slate-600" />}>
              <span className="font-medium text-slate-900">Changelog</span>
            </MenuItem>
            <MenuItem href="/contact" icon={<Mail className="h-5 w-5 text-slate-600" />}>
              <span className="font-medium text-slate-900">Contact</span>
            </MenuItem>
          </Section>

          {/* LEGAL */}
          <Section title="Legal" accent="light">
            <MenuItem href="/privacy" icon={<FileText className="h-5 w-5 text-slate-500" />}>
              <span className="font-medium text-slate-900">Privacy</span>
            </MenuItem>
            <MenuItem href="/terms" icon={<Scale className="h-5 w-5 text-slate-500" />}>
              <span className="font-medium text-slate-900">Terms</span>
            </MenuItem>
            <MenuItem href="/cookies" icon={<Cookie className="h-5 w-5 text-slate-500" />}>
              <span className="font-medium text-slate-900">Cookies</span>
            </MenuItem>
          </Section>
        </nav>

        {/* bottom signature bar */}
        <div className="pointer-events-auto fixed inset-x-0 bottom-0 z-[1001]">
          <button
            onClick={onClose}
            className="mx-auto mb-3 block w-[92%] rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-3 text-center text-sm font-medium text-white shadow-lg hover:brightness-105 active:translate-y-[1px]"
            aria-label="Close menu"
          >
            <span className="inline-flex items-center gap-2">
              <User2 className="h-4 w-4" />
              Free for Individuals
            </span>
          </button>
        </div>
      </div>
    </Portal>
  );
}

/* ---------- Small building blocks ---------- */

function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent: "emerald" | "sky" | "slate" | "light";
  children: React.ReactNode;
}) {
  const rail =
    accent === "emerald"
      ? "before:bg-emerald-500/70"
      : accent === "sky"
      ? "before:bg-sky-500/70"
      : accent === "slate"
      ? "before:bg-slate-400/60"
      : "before:bg-slate-300/50";

  return (
    <div className="mt-3">
      <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <div
        className={`relative rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm ${rail} before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-full`}
      >
        <ul className="divide-y divide-gray-100">{children}</ul>
      </div>
    </div>
  );
}

function MenuItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center justify-between gap-3 px-4 py-3.5"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gray-50 ring-1 ring-gray-200 group-hover:bg-white group-hover:ring-gray-300 transition">
            {icon}
          </span>
          {children}
        </div>
        <ChevronRight className="h-5 w-5 text-slate-300 transition group-hover:text-slate-500" />
      </Link>
    </li>
  );
}
