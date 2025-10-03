// components/HeroVisual.tsx — v1 (LCP-friendly, a11y, reduced-motion safe)
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * HeroVisual
 * - Image locale optimisée pour le LCP (priority)
 * - Placeholder blur intégré
 * - Overlay soft (dégradés cohérents)
 * - Fallback élégante si image absente ou en erreur
 * - Respecte prefers-reduced-motion (pas de parallax intrusif)
 *
 * Place tes images dans /public/hero :
 *  - /public/hero/hero@2x.webp (2000×1200 environ)
 *  - /public/hero/hero@1x.webp (1200×720 environ)
 *  - /public/hero/hero-blur.jpg (20–40px côté long, très compressé)
 */

type Props = {
  className?: string;
  alt?: string;
};

export default function HeroVisual({ className, alt = "DigitalMeve — Visual concept" }: Props) {
  const [ok, setOk] = useState(true);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const reduce = useRef(false);

  // Respecte reduced motion
  useEffect(() => {
    try {
      reduce.current =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduce.current = false;
    }
  }, []);

  // Parallax très doux (désactivé si reduced)
  useEffect(() => {
    if (reduce.current || !wrapperRef.current) return;

    const root = wrapperRef.current;
    const onScroll = () => {
      const y = window.scrollY;
      const t = Math.min(18, y * 0.06); // 0 → 18px max
      root.style.setProperty("--dm-parallax", `${t}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!ok) {
    // Fallback si les fichiers ne sont pas présents
    return (
      <div
        className={[
          "relative mx-auto mt-6 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10",
          "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950",
          "shadow-[0_0_40px_rgba(56,189,248,.12)]",
          className || "",
        ].join(" ")}
        role="img"
        aria-label={alt}
        style={{ aspectRatio: "16/9" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 80% at 25% 0%, rgba(16,185,129,.16), transparent 60%), radial-gradient(60% 70% at 85% 10%, rgba(56,189,248,.14), transparent 60%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-slate-950/85 to-transparent" />
        <div className="absolute inset-4 rounded-xl border border-white/10" aria-hidden />
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={[
        "relative mx-auto mt-6 w-full max-w-5xl overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/5 backdrop-blur",
        "shadow-[0_0_40px_rgba(56,189,248,.12)]",
        className || "",
      ].join(" ")}
      style={{
        // léger parallaxe
        transform: "translateY(var(--dm-parallax, 0px))",
        transition: "transform 120ms linear",
      }}
    >
      {/* Overlay dégradé subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(60% 100% at 0% 0%, rgba(16,185,129,.10), transparent 50%), radial-gradient(60% 100% at 100% 0%, rgba(56,189,248,.09), transparent 50%)",
        }}
      />

      {/* Image LCP — locale, avec blur */}
      <Image
        src="/hero/hero@2x.webp"
        alt={alt}
        priority
        fetchPriority="high"
        width={2000}
        height={1200}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1000px"
        placeholder="blur"
        blurDataURL="/hero/hero-blur.jpg"
        onError={() => setOk(false)}
        className="relative block h-auto w-full object-cover"
        style={{ aspectRatio: "16/9" }}
      />

      {/* Ligne de séparation douce en bas (cohérence Hero) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </div>
  );
}
