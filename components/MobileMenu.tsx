// components/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Portal from "@/components/Portal";
import {
  PlusSquare,
  ShieldCheck,
  Tag,
  Code2,
  Shield,
  Info,
  Activity,
  History,
  Mail,
  Scale,
  FileText,
  Cookie,
  X,
  ChevronRight,
  Users,
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  const panelRef = useRef<HTMLDivElement>(null);

  // lock scroll + ESC
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // focus first
  useEffect(() => {
    panelRef.current
      ?.querySelector<HTMLElement>("button,[href]")
      ?.focus();
  }, []);

  const Row = ({
    href,
    icon,
    label,
    hint,
    tint = "emerald",
  }: {
    href: string;
    icon: JSX.Element;
    label: string;
    hint?: string;
    /** emerald | sky | slate */
    tint?: "emerald" | "sky" | "slate";
  }) => {
    const side =
      tint === "emerald"
        ? "bg-emerald-500/20 group-hover:bg-emerald-500/30"
        : tint === "sky"
        ? "bg-sky-500/20 group-hover:bg-sky-500/30"
        : "bg-slate-300/30 group-hover:bg-slate-300/40";

    return (
      <li>
        <Link
          href={href}
          onClick={onClose}
          className="group relative flex items-center justify-between rounded-2xl px-3 py-3.5 transition"
        >
          {/* accent bar */}
          <span
            className={`absolute left-1 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full ${side} transition-colors`}
          />
          <div className="min-w-0 ml-3 flex items-center gap-3">
            <span className="shrink-0">{icon}</span>
            <div className="min-w-0">
              <p className="truncate text-base text-gray-900">{label}</p>
              {hint && (
                <p className="truncate text-sm text-gray-500">{hint}</p>
              )}
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-gray-400" />
        </Link>
      </li>
    );
  };

  const Section = ({
    title,
    badge,
    color = "emerald",
    children,
  }: {
    title: string;
    badge?: string;
    color?: "emerald" | "sky" | "slate";
    children: React.ReactNode;
  }) => {
    const badgeClasses =
      color === "emerald"
        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
        : color === "sky"
        ? "bg-sky-50 text-sky-700 ring-1 ring-sky-100"
        : "bg-slate-100 text-slate-700 ring-1 ring-slate-200";

    return (
      <div className="px-3">
        <div className="flex items-center gap-2 px-1 pt-5 pb-2">
          <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
            {title}
          </p>
          {badge && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] ${badgeClasses}`}>
              {badge}
            </span>
          )}
        </div>
        <ul className="space-y-1.5">{children}</ul>
      </div>
    );
  };

  return (
    <Portal>
      {/* overlay avec léger dégradé */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="fixed inset-0 z-[998] bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-sm"
      />
      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[999] flex flex-col bg-white"
      >
        {/* top bar gradient + brand */}
        <div className="relative border-b border-gray-200 px-4 py-4">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_0%_0%,rgba(16,185,129,0.08),transparent_60%),radial-gradient(60%_60%_at_100%_0%,rgba(56,189,248,0.08),transparent_60%)]" />
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2"
              aria-label="DigitalMeve Home"
            >
              <span className="text-lg font-semibold tracking-tight">
                <span className="text-emerald-600">Digital</span>
                <span className="text-sky-600">Meve</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* content */}
        <nav className="flex-1 overflow-y-auto py-2">
          <Section title="Actions" badge="Start here" color="emerald">
            <Row
              href="/generate"
              icon={<PlusSquare className="h-5 w-5 text-emerald-600" />}
              label="Generate"
              hint="Create a certified copy"
              tint="emerald"
            />
            <Row
              href="/verify"
              icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}
              label="Verify"
              hint="Check a .MEVE document"
              tint="emerald"
            />
          </Section>

          <Section title="Products" color="sky">
            <Row
              href="/pricing"
              icon={<Tag className="h-5 w-5 text-sky-600" />}
              label="Pricing"
              hint="Free for individuals"
              tint="sky"
            />
            <Row
              href="/developers"
              icon={<Code2 className="h-5 w-5 text-sky-600" />}
              label="Developers"
              hint="API — coming soon"
              tint="sky"
            />
          </Section>

          <Section title="Company" color="slate">
            <Row href="/security" icon={<Shield className="h-5 w-5 text-slate-600" />} label="Security" tint="slate" />
            <Row href="/about" icon={<Info className="h-5 w-5 text-slate-600" />} label="About" tint="slate" />
            <Row href="/status" icon={<Activity className="h-5 w-5 text-slate-600" />} label="Status" tint="slate" />
            <Row href="/changelog" icon={<History className="h-5 w-5 text-slate-600" />} label="Changelog" tint="slate" />
            <Row href="/contact" icon={<Mail className="h-5 w-5 text-slate-600" />} label="Contact" tint="slate" />
          </Section>

          <Section title="Legal" color="slate">
            <Row href="/privacy" icon={<FileText className="h-5 w-5 text-slate-600" />} label="Privacy" tint="slate" />
            <Row href="/terms" icon={<Scale className="h-5 w-5 text-slate-600" />} label="Terms" tint="slate" />
            <Row href="/cookies" icon={<Cookie className="h-5 w-5 text-slate-600" />} label="Cookies" tint="slate" />
          </Section>
        </nav>

        {/* bottom pill gradient */}
        <div className="border-t border-gray-200 px-4 py-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-sky-50 px-3 py-1 text-xs ring-1 ring-emerald-100">
            <Users className="h-4 w-4 text-emerald-600" />
            <span className="text-gray-700">Free for Individuals</span>
          </div>
        </div>
      </div>
    </Portal>
  );
}
