// components/FileDropzone.tsx
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type LabelHTMLAttributes, // ⟵ ajout pour typer les props de <label>
} from "react";
import { Upload, X, AlertTriangle } from "lucide-react";

type Props = {
  onSelected: (file: File | null) => void;
  /** Pas de wildcards image/* / video/* pour éviter l’ouverture caméra sur Android */
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  hint?: string;
  /** Désactive la sélection quand on est en cours de traitement */
  disabled?: boolean;
  /** Valide le type du fichier via accept + extension. Par défaut true (sûr). */
  strictTypeCheck?: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>; // ⟵ permet role, tabIndex, aria-*, className, etc.

const DEFAULT_ACCEPT = [
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
].join(",");

export default function FileDropzone({
  onSelected,
  accept = DEFAULT_ACCEPT,
  maxSizeMB = 10, // ✅ V1: 10 MB par fichier
  label = "Choose a file",
  hint = "Drag & drop or tap to select. Max {SIZE} MB.",
  disabled = false,
  strictTypeCheck = true,
  ...rest // ⟵ récupère role, tabIndex, aria-*, className, data-*, etc.
}: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const zoneRef = useRef<HTMLLabelElement>(null);
  const dragDepthRef = useRef(0);
  const inputId = useId();

  const maxBytes = maxSizeMB * 1024 * 1024;

  // Reset drag state si on quitte la fenêtre (robustesse)
  useEffect(() => {
    const cancel = () => {
      dragDepthRef.current = 0;
      setDragOver(false);
    };
    window.addEventListener("dragend", cancel);
    window.addEventListener("drop", cancel);
    window.addEventListener("dragleave", (e) => {
      // Si on quitte la fenêtre
      if ((e as DragEvent).relatedTarget === null) cancel();
    });
    return () => {
      window.removeEventListener("dragend", cancel);
      window.removeEventListener("drop", cancel);
      window.removeEventListener("dragleave", cancel as any);
    };
  }, []);

  const clearError = () => setError(null);

  const fail = (msg: string) => {
    setError(msg);
    onSelected(null);
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const ok = (f: File) => {
    setError(null);
    setFile(f);
    onSelected(f);
  };

  // Validation extension + mimetype (sécurité douce)
  const isAllowedType = (f: File) => {
    if (!strictTypeCheck) return true;

    const allowed = accept.split(",").map((s) => s.trim().toLowerCase());
    const mime = (f.type || "").toLowerCase();
    const name = f.name.toLowerCase();

    // match MIME exact
    if (mime && allowed.includes(mime)) return true;

    // match extension
    const ext = name.slice(name.lastIndexOf("."));
    if (ext && allowed.includes(ext)) return true;

    // Pas parfaitement identifié, on tolère si accept contient des extensions usuelles
    return false;
  };

  const handleFile = useCallback(
    (f: File) => {
      clearError();
      if (disabled) return;

      if (!isAllowedType(f)) {
        fail("This file type is not supported.");
        return;
      }

      if (f.size > maxBytes) {
        fail(`File too large. Max ${maxSizeMB} MB.`);
        return;
      }

      ok(f);
    },
    [disabled, maxBytes, maxSizeMB]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current = 0;
    setDragOver(false);
    if (disabled) return;
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current += 1;
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current -= 1;
    if (dragDepthRef.current <= 0) {
      setDragOver(false);
    }
  };

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const remove = () => {
    setFile(null);
    onSelected(null);
    if (inputRef.current) inputRef.current.value = "";
    clearError();
    // Redonne le focus à la zone pour confort clavier
    zoneRef.current?.focus();
  };

  // Activation au clavier (Enter/Space) sur la zone
  const onKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPicker();
    }
  };

  return (
    <div className="space-y-2">
      {/* Zone de drop / sélection — version light */}
      <label
        ref={zoneRef}
        htmlFor={inputId}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onKeyDown={onKeyDown}
        tabIndex={0}
        className={[
          "block cursor-pointer rounded-2xl border bg-white px-5 py-6 text-center transition",
          disabled ? "cursor-not-allowed opacity-60" : "hover:bg-slate-50",
          dragOver ? "ring-2 ring-emerald-400/60 border-emerald-300" : "border-slate-300",
          rest.className || "", // ⟵ fusionne className externe
        ].join(" ")}
        aria-label="File dropzone"
        aria-disabled={disabled || undefined}
        aria-describedby={`${inputId}-help ${error ? `${inputId}-error` : ""}`.trim()}
        {...rest} // ⟵ propage role, tabIndex personnalisé, aria-*, data-*, etc.
      >
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={onInputChange}
          accept={accept}
          aria-describedby={`${inputId}-help`}
          disabled={disabled}
        />

        <div className="flex flex-col items-center gap-2">
          <Upload className="h-6 w-6 text-slate-500" aria-hidden />
          <p className="text-base font-medium text-slate-800">{label}</p>
          <p id={`${inputId}-help`} className="text-xs text-slate-500">
            {hint.replace("{SIZE}", String(maxSizeMB))}
          </p>
          <div className="mt-1 hidden sm:block">
            <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
              PDF, PNG, JPG, DOCX, XLSX, PPTX…
            </span>
          </div>
        </div>
      </label>

      {/* Fichier sélectionné */}
      {file && (
        <div className="flex items-center justify-between rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm">
          <div className="min-w-0">
            <p className="truncate text-sm text-slate-800">{file.name}</p>
            <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={remove}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            aria-label="Remove selected file"
          >
            <X className="h-4 w-4" />
            Remove
          </button>
        </div>
      )}

      {/* Erreur accessible (si besoin) */}
      <div
        id={`${inputId}-error`}
        role="alert"
        aria-live="assertive"
        className={[
          "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs",
          error ? "border-amber-300 bg-amber-50 text-amber-800" : "hidden",
        ].join(" ")}
      >
        <AlertTriangle className="h-4 w-4" />
        <span>{error}</span>
      </div>
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
