"use client";

type Props = {
  value?: number; // 0..100 ; undefined = indéterminé
};

export default function ProgressBar({ value }: Props) {
  const indeterminate = value === undefined;

  return (
    <div className="relative w-full h-1 overflow-hidden rounded-full bg-white/10 mt-1">
      {indeterminate ? (
        <div className="absolute left-0 top-0 h-full w-1/3 animate-[progress_1.2s_infinite] rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" />
      ) : (
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-[width]"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      )}

      <style jsx>{`
        @keyframes progress {
          0% {
            margin-left: -35%;
            width: 35%;
          }
          50% {
            margin-left: 20%;
            width: 45%;
          }
          100% {
            margin-left: 100%;
            width: 35%;
          }
        }
      `}</style>
    </div>
  );
}
