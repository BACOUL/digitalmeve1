"use client";

import Link from "next/link";

export default function LimitModal({
  open,
  onClose,
  count,
  resetDayUTC,
}: {
  open: boolean;
  onClose: () => void;
  count?: number;
  resetDayUTC?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900">Daily free limit reached</h3>
        <p className="mt-2 text-sm text-gray-700">
          You’ve used your free quota for today{typeof count === "number" ? ` (${count} actions)` : ""}.
          Create a free account to continue, or try again tomorrow (UTC date {resetDayUTC ?? "—"}).
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white hover:brightness-105"
          >
            Create a free account
          </Link>
          <button
            onClick={onClose}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Close
          </button>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          We won’t store your documents. Personal use runs locally in your browser.
        </p>
      </div>
    </div>
  );
}
