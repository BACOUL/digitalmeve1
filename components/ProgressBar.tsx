"use client";

import { cn } from "@/lib/utils";

type Props = {
  /** 0..100 = déterminé. undefined => indéterminé (processing) */
  value?: number;
  /** Petit texte au-dessus (ex: "Uploading") */
  label?: string;
  /** Couleur/état visuel */
  variant?: "brand" | "success" | "warning" | "danger";
  /** Hauteur de la barre */
  size?: "sm" | "md" | "lg";
  /** Affiche le pourcentage à droite du label (si déterminé) */
  showPercent?: boolean;
  className?: string;
};

export default function ProgressBar({
  value,
  label,
  variant = "brand",
  size = "md",
  showPercent = true,
  className,
}: Props) {
  const determinate = typeof value === "number";
  const clamped = determinate ? Math.max(0, Math.min(100, value!)) : undefined;

  const heightCls =
    size === "sm" ? "h-1.5 sm:h-2" : size === "lg" ? "h-3.5 sm:h-4" : "h-2.5 sm:h-3";

  const trackCls = "w-full overflow-hidden rounded-full bg-white/10 border border-white/10";

  const variantBar =
    variant === "success"
      ? "from-emerald-400 to-emerald-300"
      : variant === "warning"
      ? "from-amber-400 to-amber-300"
      : variant === "danger"
      ? "from-rose-400 to-rose-300"
      : "from-emerald-400 to-sky-400"; // brand

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
          <span className="truncate">{label}</span>
          {determinate && showPercent && (
            <span className="tabular-nums text-slate-400">{clamped}%</span>
          )}
        </div>
      )}

      <div
        className={cn(heightCls, trackCls)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={determinate ? clamped : undefined}
        aria-label={label || "progress"}
      >
        {determinate ? (
          <div
            className={cn(
              "h-full transition-[width] duration-200 rounded-full",
              "bg-gradient-to-r shadow-[0_0_20px_rgba(34,211,238,0.25)]",
              variantBar
            )}
            style={{ width: `${clamped}%` }}
          />
        ) : (
          <div className={cn("h-full w-1/2 rounded-full bg-gradient-to-r", variantBar, "indeterminate")} />
        )}
      </div>

      {/* Animations locales (indéterminé) */}
      <style jsx>{`
        .indeterminate {
          animation: slide 1.1s ease-in-out infinite;
        }
        @keyframes slide {
          0% {
            transform: translateX(-110%);
          }
          50% {
            transform: translateX(10%);
          }
          100% {
            transform: translateX(110%);
          }
        }
      `}</style>
    </div>
  );
}
