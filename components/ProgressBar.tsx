"use client";

type Props = {
  /** 0..100 pour déterminé. undefined => indéterminé (processing) */
  value?: number;
  label?: string;
  className?: string;
};

export default function ProgressBar({ value, label, className }: Props) {
  const determinate = typeof value === "number";

  return (
    <div className={["w-full mt-3", className].filter(Boolean).join(" ")}>
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>{label}</span>
          {determinate && <span>{value}%</span>}
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-lg bg-white/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={determinate ? value : undefined}
        aria-label={label || "progress"}
      >
        {determinate ? (
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-[width] duration-150"
            style={{ width: `${Math.max(0, Math.min(100, value!))}%` }}
          />
        ) : (
          <div className="h-full w-1/2 animate-[progress_1.2s_ease_infinite] bg-gradient-to-r from-emerald-400 to-sky-400" />
        )}
      </div>

      {/* keyframes inline via Tailwind arbitrary, compatible */}
      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(20%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
