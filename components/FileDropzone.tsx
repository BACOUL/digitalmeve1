"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X } from "lucide-react";

type Props = {
  onSelected: (file: File | null) => void;
  /** Pas de wildcards image/* / video/* pour éviter l’ouverture caméra sur Android */
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  hint?: string;
};

export default function FileDropzone({
  onSelected,
  accept = [
    ".pdf", ".png", ".jpg", ".jpeg", ".gif", ".webp",
    ".txt", ".json", ".csv",
    ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
    "application/pdf",
    "application/json",
    "text/plain",
    "text/csv",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ].join(","),
  maxSizeMB = 100,
  label = "Choose a file",
  hint = "Drag & drop or tap to select. Max {SIZE} MB.",
}: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxBytes = maxSizeMB * 1024 * 1024;

  const handleFile = useCallback(
    (f: File) => {
      if (f.size > maxBytes) {
        alert(`File too large. Max ${maxSizeMB} MB.`);
        return;
      }
      setFile(f);
      onSelected(f);
    },
    [onSelected, maxBytes, maxSizeMB]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const remove = () => {
    setFile(null);
    onSelected(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {/* Zone de drop / sélection — contraste mobile ++ */}
      <label
        htmlFor="file-input"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={[
          "dropzone block cursor-pointer text-center",
          dragOver ? "ring-2 ring-emerald-400/60" : "",
        ].join(" ")}
        aria-label="File dropzone"
      >
        <input
          id="file-input"
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={onInputChange}
          accept={accept}
          aria-describedby="file-help"
        />

        <div className="flex flex-col items-center gap-2">
          <Upload className="h-6 w-6 text-slate-200" aria-hidden />
          <p className="text-base font-medium text-slate-100">{label}</p>
          <p id="file-help" className="text-xs text-slate-400">
            {hint.replace("{SIZE}", String(maxSizeMB))}
          </p>
          <div className="mt-1 hidden sm:block">
            <span className="badge">PDF, PNG, JPG, DOCX, XLSX, PPTX…</span>
          </div>
        </div>
      </label>

      {/* Fichier sélectionné */}
      {file && (
        <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
          <div className="min-w-0">
            <p className="truncate text-sm text-[var(--fg)]">{file.name}</p>
            <p className="text-xs text-[var(--fg-muted)]">{formatBytes(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={remove}
            className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] bg-white/5 px-2 py-1 text-xs text-[var(--fg)] hover:bg-white/10 focus-visible:focus-ring"
            aria-label="Remove selected file"
          >
            <X className="h-4 w-4" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
      }
