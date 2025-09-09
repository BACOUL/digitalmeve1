"use client";

import { useCallback, useState } from "react";

type Props = {
  onSelected: (file: File) => void;
  maxMB?: number; // default 25
  accept?: string; // ex: "*/*"
};

export default function FileDropzone({ onSelected, maxMB = Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_MB ?? 25), accept = "*/*" }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFiles = useCallback(
    (files: FileList | null) => {
      setError(null);
      if (!files || files.length === 0) return;
      const file = files[0];
      const maxBytes = maxMB * 1024 * 1024;
      if (file.size > maxBytes) {
        setError(`File is too large. Max ${maxMB} MB.`);
        return;
      }
      onSelected(file);
    },
    [maxMB, onSelected]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        onFiles(e.dataTransfer.files);
      }}
      className={`rounded-2xl border border-white/15 bg-slate-900/60 backdrop-blur-md p-6 text-center transition ${
        dragActive ? "border-emerald-400/60" : "hover:border-emerald-400/30"
      }`}
    >
      <input
        id="file-input"
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />

      <label htmlFor="file-input" className="block cursor-pointer">
        <div className="text-slate-200 font-medium">Drop your file here</div>
        <div className="mt-1 text-sm text-slate-400">or click to browse (max {maxMB} MB)</div>
      </label>

      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
    </div>
  );
}
