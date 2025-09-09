"use client";

import Link from "next/link";

export function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* Placeholder logo text – à remplacer plus tard par ton SVG officiel */}
      <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent group-hover:brightness-110 transition">
        DigitalMeve
      </span>
    </Link>
  );
}
