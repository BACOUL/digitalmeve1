// lib/meve-xmp.ts
// Utilitaires .MEVE — hashing, écriture XMP, parsing XMP + fallback robuste

export async function sha256Hex(file: Blob | ArrayBuffer): Promise<string> {
  const buf = file instanceof Blob ? await file.arrayBuffer() : file;
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// === Types ===
export type MeveXmpInput = {
  docSha256: string;
  createdAtISO: string;
  issuer?: string;
  issuerType?: "personal" | "business";
  issuerWebsite?: string;
};

export type ParsedMeveMeta = {
  hash: string;
  createdAtISO: string;
  issuer?: string;
};

// === ÉCRITURE XMP (mock si pas d’implémentation PDF-lib dispo) ===
export async function embedMeveXmp(
  inputPdf: Blob,
  meta: MeveXmpInput
): Promise<Blob> {
  // 🔹 Si tu as déjà ton implémentation (pdf-lib + injection XMP), garde-la.
  // Ici : simple pass-through pour ne pas casser les imports.
  return inputPdf;
}

// === Fallback : forcer métadonnées MEVE dans un commentaire PDF ===
export async function ensureMeveMetadata(
  inputPdf: Blob,
  meta: MeveXmpInput
): Promise<Blob> {
  try {
    // 1) Tente d’appeler embedMeveXmp (peut déjà insérer correctement)
    const out = await embedMeveXmp(inputPdf, meta);
    return out;
  } catch (e) {
    console.warn("embedMeveXmp failed, fallback to comment:", e);
  }

  // 2) Fallback → concatène un commentaire %MEVE en fin de PDF
  const buf = await inputPdf.arrayBuffer();
  const marker = `\n%MEVE { "hash": "${meta.docSha256}", "createdAtISO": "${meta.createdAtISO}", "issuer": "${meta.issuer || ""
    }" }\n`;
  const markerU8 = new TextEncoder().encode(marker);

  const merged = new Uint8Array(buf.byteLength + markerU8.byteLength);
  merged.set(new Uint8Array(buf), 0);
  merged.set(markerU8, buf.byteLength);

  return new Blob([merged], { type: "application/pdf" });
}

// === PARSING XMP ===
export async function parseMeveXmp(
  buf: ArrayBuffer
): Promise<ParsedMeveMeta | null> {
  const text = safeDecodePdf(buf);

  const pick = (re: RegExp) => {
    const m = text.match(re);
    return m?.[1];
  };

  // 1) Attributs XMP classiques
  const hashAttr =
    pick(/meve:hash\s*[:=]\s*["']?([0-9a-f]{64})["']?/i) ||
    pick(/meve:hash\s*[:=]\s*["']?(?:sha-256:)?([0-9a-f]{64})["']?/i);

  const createdAttr = pick(/meve:(?:ts|createdAtISO)\s*[:=]\s*["']([^"']+)["']/i);
  const issuerAttr = pick(/meve:issuer\s*[:=]\s*["']([^"']+)["']/i);

  // 2) JSON intégré
  const jsonBlock = pick(/(\{[\s\S]{0,5000}?\})/);
  let hashJson: string | undefined;
  let createdJson: string | undefined;
  let issuerJson: string | undefined;

  if (jsonBlock) {
    const candidate = tryParseJson(jsonBlock);
    if (candidate) {
      const flat = flatten(candidate);

      hashJson =
        flat["meve.hash"] ||
        flat["hash"] ||
        flat["meve_hash"] ||
        undefined;
      if (hashJson?.startsWith("sha-256:")) hashJson = hashJson.slice(8);

      createdJson =
        flat["meve.createdAtISO"] ||
        flat["createdAtISO"] ||
        flat["meve.ts"] ||
        flat["ts"] ||
        undefined;

      issuerJson = flat["meve.issuer"] || flat["issuer"] || undefined;
    }
  }

  // 3) Fallback commentaire %MEVE
  const commentMatch = text.match(/%MEVE\s+(\{[\s\S]*?\})/);
  if (commentMatch) {
    const candidate = tryParseJson(commentMatch[1]);
    if (candidate) {
      const flat = flatten(candidate);
      return {
        hash: flat["hash"],
        createdAtISO: flat["createdAtISO"],
        issuer: flat["issuer"],
      };
    }
  }

  const hash = hashAttr || hashJson;
  const createdAtISO = createdAttr || createdJson;
  const issuer = issuerAttr || issuerJson;

  if (!hash || !createdAtISO) return null;
  return { hash, createdAtISO, issuer };
}

// ---------- helpers ----------
function safeDecodePdf(buf: ArrayBuffer): string {
  try {
    return new TextDecoder("utf-8", { fatal: false }).decode(
      new Uint8Array(buf)
    );
  } catch {
    return Array.from(new Uint8Array(buf))
      .map((b) => String.fromCharCode(b))
      .join("");
  }
}

function tryParseJson(input: string): any | null {
  try {
    return JSON.parse(input);
  } catch {}
  const m = input.match(/\{[\s\S]*\}/);
  if (m) {
    try {
      return JSON.parse(m[0]);
    } catch {}
  }
  return null;
}

function flatten(
  obj: any,
  prefix = "",
  out: Record<string, any> = {}
): Record<string, any> {
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object") flatten(v, key, out);
      else out[key] = v;
    }
  }
  return out;
}
