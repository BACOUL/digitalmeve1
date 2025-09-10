"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X } from "lucide-react";

type Props = {
  onSelected: (file: File | null) => void;
  /** Évite image/* et video/* pour ne pas faire apparaître la Caméra sur Android */
  accept?: string;
  maxSizeMB?: number;
  label?: string;
};

export default function FileDropzone({
  onSelected,
  // ✅ Par défaut : liste d’extensions/MIME “documents” sans wildcards média
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
      <label
        htmlFor="file-input"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={[
          "block cursor-pointer rounded-2xl border border-dashed p-6 text-center transition",
          "bg-slate-900/60 border-white/15 hover:border-emerald-400/40 hover:bg-white/5",
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
          // 🔒 Ne pas mettre capture pour éviter l’appareil photo
          // capture={undefined}
          aria-describedby="file-help"
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-6 w-6 text-slate-300" aria-hidden />
          <p className="text-slate-200 font-medium">{label}</p>
          <p id="file-help" className="text-xs text-slate-500">
            Drag & drop or click to select. Max {maxSizeMB} MB.
          </p>
        </div>
      </label>

      {file && (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
          <div className="min-w-0">
            <p className="truncate text-sm text-slate-200">{file.name}</p>
            <p className="text-xs text-slate-500">
              {formatBytes(file.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={remove}
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 hover:bg-white/10"
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
