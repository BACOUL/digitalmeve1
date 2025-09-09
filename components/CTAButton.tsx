import Link from "next/link";

export function CTAButton({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={[
        "rounded-2xl px-6 py-3 font-semibold text-slate-900",
        "bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110",
        "shadow-[0_0_40px_rgba(34,211,238,0.35)] transition",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
