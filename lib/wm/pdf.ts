// lib/wm/pdf.ts
// Injection & lecture d'un filigrane *invisible* dans un PDF
// Principe : insérer une ligne de commentaire juste avant %%EOF
// Forme : %MEVE{<base64>}EVEM
//
// ⚠️ N'altère pas la structure du PDF (xref inchangé), car on
// n'insère qu'une ligne AVANT %%EOF, après la table xref.

import {
  MARKER_PREFIX,
  MARKER_SUFFIX,
  encodeInvisibleWatermark,
  decodeInvisibleWatermark,
  InvisibleWatermarkPayload,
} from "./marker";

// ---------- Helpers binaires ----------

function toUint8(src: ArrayBufferLike | Uint8Array): Uint8Array {
  // Normalise toute source en Uint8Array indépendant
  return src instanceof Uint8Array ? new Uint8Array(src) : new Uint8Array(src);
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

function textBytes(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

function bytesText(b: Uint8Array): string {
  return new TextDecoder("utf-8", { fatal: false }).decode(b);
}

function findLast(data: Uint8Array, needle: string): number {
  const n = textBytes(needle);
  for (let i = data.length - n.length; i >= 0; i--) {
    let ok = true;
    for (let j = 0; j < n.length; j++) {
      if (data[i + j] !== n[j]) { ok = false; break; }
    }
    if (ok) return i;
  }
  return -1;
}

// Copie en ArrayBuffer "classique" puis crée un Blob propre
function u8ToBlob(u8: Uint8Array, type: string): Blob {
  const copy = new Uint8Array(u8); // force un buffer non-partagé
  return new Blob([copy.buffer], { type });
}

// ---------- API publique ----------

/**
 * Injecte un filigrane invisible dans un PDF (Blob -> Blob).
 * Le payload est encodé en base64 (MEVE{...}EVEM) et inséré comme commentaire
 * AVANT le dernier "%%EOF".
 */
export async function embedInvisibleWatermarkPdf(
  inputPdf: Blob,
  payload: { hash: string; ts: string; issuer?: string }
): Promise<Blob> {
  const pdfAB = await inputPdf.arrayBuffer();
  const pdf = toUint8(pdfAB);

  // 1) Construire le marqueur texte à partir du payload
  const marker = encodeInvisibleWatermark({
    alg: "sha256",
    hash: payload.hash,
    ts: payload.ts,
    issuer: payload.issuer,
  });
  // Un commentaire PDF commence par "%"
  const commentLine = textBytes(`\n%${marker}\n`);

  // 2) Trouver le dernier %%EOF
  const eofPos = findLast(pdf, "%%EOF");
  if (eofPos < 0) {
    // PDF atypique : on append quand même en fin (la plupart des lecteurs tolèrent)
    const merged = concatBytes([pdf, commentLine, textBytes("%%EOF\n")]);
    return u8ToBlob(merged, "application/pdf");
  }

  // 3) Insérer AVANT %%EOF sans toucher au xref déjà présent
  const head = pdf.slice(0, eofPos);
  const tail = pdf.slice(eofPos); // commence à "%%EOF"
  const merged = concatBytes([head, commentLine, tail]);

  return u8ToBlob(merged, "application/pdf");
}

/**
 * Extrait le filigrane invisible d'un PDF (Blob -> payload ou null).
 * On scanne la fin du fichier (256 Ko) pour trouver MEVE{...}EVEM.
 */
export async function readInvisibleWatermarkPdf(
  inputPdf: Blob
): Promise<InvisibleWatermarkPayload | null> {
  const pdfAB = await inputPdf.arrayBuffer();
  const pdf = toUint8(pdfAB);

  // Limiter la zone de recherche aux ~256 Ko de fin (suffisant pour notre commentaire)
  const windowSize = Math.min(256 * 1024, pdf.length);
  const slice = pdf.slice(pdf.length - windowSize);
  const text = bytesText(slice);

  const payload = decodeInvisibleWatermark(text);
  return payload;
}

/**
 * Extrait UNIQUEMENT la chaîne brute du marqueur (utile pour debug).
 * Retourne par ex. "MEVE{...}EVEM" ou null.
 */
export async function findRawMarkerPdf(inputPdf: Blob): Promise<string | null> {
  const pdfAB = await inputPdf.arrayBuffer();
  const pdf = toUint8(pdfAB);
  const windowSize = Math.min(256 * 1024, pdf.length);
  const slice = pdf.slice(pdf.length - windowSize);
  const text = bytesText(slice);

  const i = text.indexOf(MARKER_PREFIX);
  if (i < 0) return null;
  const j = text.indexOf(MARKER_SUFFIX, i + MARKER_PREFIX.length);
  if (j < 0) return null;
  return text.slice(i, j + MARKER_SUFFIX.length);
}
