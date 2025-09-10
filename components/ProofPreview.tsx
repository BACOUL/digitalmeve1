"use client";

import { X, Download } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  json: any | null;
  onDownload: () => void;
};

export default function ProofPreview({ open, onClose, json, onDownload }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-[1001] w-[min(92vw,800px)] max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h3 className="text-sm font-medium text-slate-200">.MEVE Proof — Preview</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
            >
              <Download className="h-4 w-4" /> Download .meve.json
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="overflow-auto p-4">
          <pre className="whitespace-pre-wrap break-words rounded-xl bg-slate-900/60 p-4 text-xs leading-5 text-slate-200">
            {JSON.stringify(json, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
