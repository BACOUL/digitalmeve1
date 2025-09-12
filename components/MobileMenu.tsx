"use client";

import { useEffect, useRef } from "react";
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
  DollarSign,
  Code2,
  Scale,
  Activity,
  FileText,
  X,
  ChevronRight,
  Tag,
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // focus
  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, []);

  // close on route change
  useEffect(() => {
    if (open && pathname) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ✅ type très simple et compatible partout
  const closeOnClick: React.MouseEventHandler = () => {
    onClose();
  };

  return (
    <Portal>
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link href="/" onClick={closeOnClick} className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-emerald-600">Digital</span>
              <span className="text-sky-600">Meve</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-24 pt-2 text-slate-700">
          {/* PRODUCTS */}
          <SectionTitle>Products</SectionTitle>
          <ul className="px-1">
            <MenuItem
              href="/generate"
              icon={<FilePlus2 className="h-5 w-5 text-emerald-600" />}
              title="Generate"
              subtitle="Create a .MEVE file"
              onClick={closeOnClick}
            />
            <MenuItem
              href="/verify"
              icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}
              title="Verify"
              subtitle="Check a .MEVE file"
              onClick={closeOnClick}
            />
          </ul>

          <Divider />

          {/* SOLUTIONS */}
          <SectionTitle>Solutions</SectionTitle>
          <ul className="px-1">
            <MenuItem
              href="/personal"
              icon={<Users className="h-5 w-5 text-sky-600" />}
              title="For Individuals"
              subtitle="Free, no storage"
              onClick={closeOnClick}
            />
            <MenuItem
              href="/pro"
              icon={<Briefcase className="h-5 w-5 text-sky-600" />}
              title="For Business"
              subtitle="API & domain-verified issuer"
              onClick={closeOnClick}
            />
          </ul>

          <Divider />

          {/* PRICING */}
          <SectionTitle>Pricing</SectionTitle>
          <ul className="px-1">
            <MenuItem
              href="/pricing"
              icon={<Tag className="h-5 w-5 text-emerald-600" />}
              title="Pricing"
              subtitle="Free for individuals"
              onClick={closeOnClick}
            />
          </ul>

          <Divider />

          {/* RESOURCES */}
          <SectionTitle>Resources</SectionTitle>
          <ul className="px-1">
            <MenuItem
              href="/developers"
              icon={<Code2 className="h-5 w-5 text-slate-600" />}
              title="Developers"
              subtitle="API — coming soon"
              onClick={closeOnClick}
            />
            <MenuItem
              href="/security"
              icon={<ShieldCheck className="h-5 w-5 text-slate-600" />}
              title="Security"
              subtitle="Overview & FAQ"
              onClick={closeOnClick}
            />
            <MenuItem
              href="/status"
              icon={<Activity className="h-5 w-5 text-slate-600" />}
              title="Status"
              subtitle="Uptime & checks"
              onClick={closeOnClick}
            />
            <MenuItem
              href="/changelog"
              icon={<FileText className="h-5 w-5 text-slate-600" />}
              title="Changelog"
              subtitle="Releases & fixes"
              onClick={closeOnClick}
            />
          </ul>

          <Divider />

          {/* COMPANY */}
          <SectionTitle>Company</SectionTitle>
          <ul className="px-1">
            <MenuItem
              href="/about"
              icon={<Info className="h-5 w-5 text-slate-600" />}
              title="About"
              subtitle="Who we are"
              onClick={closeOnClick}
            />
            <MenuItem
              href="/contact"
              icon={<Mail className="h-5 w-5 text-slate-600" />}
              title="Contact"
              subtitle="Support & sales"
              onClick={closeOnClick}
            />
            <MenuItem
              href="/legal"
              icon={<Scale className="h-5 w-5 text-slate-600" />}
              title="Legal"
              subtitle="Terms • Privacy • Cookies"
              onClick={closeOnClick}
            />
          </ul>
        </nav>

        {/* CTA bas */}
        <div className="pointer-events-auto fixed inset-x-0 bottom-0 z-[1001] bg-white/95 backdrop-blur border-t border-gray-200 p-3">
          <div className="mx-auto flex max-w-3xl gap-3">
            <Link
              href="/generate"
              onClick={closeOnClick}
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-3 text-white font-medium"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              onClick={closeOnClick}
              className="flex-1 inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-700 font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </Portal>
  );
}

/* helpers */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="my-4 h-px bg-gray-200" />;
}

function MenuItem({
  href,
  icon,
  title,
  subtitle,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: React.MouseEventHandler; // ✅ type générique compatible
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="group flex items-center justify-between gap-3 rounded-2xl px-3 py-3 hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          {icon}
          <div className="flex flex-col">
            <span className="text-base text-slate-800">{title}</span>
            {subtitle && (
              <span className="text-xs text-slate-500">{subtitle}</span>
            )}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-gray-400" />
      </Link>
    </li>
  );
            }
