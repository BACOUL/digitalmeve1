// lib/extract-proof.ts
import { sha256Hex } from "@/lib/proof";

export type MeveProof = {
  version: string;           // "meve/1"
  created_at?: string;
  doc?: {
    name?: string;
    mime?: string;
    size?: number;
    sha256: string;
    preview_b64?: string;
  };
  issuer?: {
    name?: string;
    identity?: string;
    type?: "personal" | "pro" | "official";
    website?: string;
    verified_domain?: boolean;
  };
  [k: string]: any;
};

// --------- Utilitaires communs ----------
function tryParseJson<T = any>(s: string): T | null {
  try { return JSON.parse(s); } catch { return null; }
}
function looksLikeProof(o: any): o is MeveProof {
  return !!o && typeof o === "object" && typeof o.version === "string" && o.version.startsWith("meve/");
}

// --------- HTML (.meve.html) ------------
export async function extractProofFromHtml(file: File): Promise<MeveProof | null> {
  const text = await file.text();

  // 1) <script type="application/json" id="meve-proof">...</script>
  const mScript = text.match(/<script[^>]*id=["']meve-proof["'][^>]*>([\s\S]*?)<\/script>/i);
  if (mScript) {
    const obj = tryParseJson(mScript[1]);
    if (looksLikeProof(obj)) return obj;
  }

  // 2) <!-- MEVE_PROOF ... -->
  const mCmt = text.match(/<!--\s*MEVE_PROOF\s*([\s\S]*?)\s*-->/i);
  if (mCmt) {
    const obj = tryParseJson(mCmt[1]);
    if (looksLikeProof(obj)) return obj;
  }

  // 3) Heuristique: premier bloc JSON contenant `"version":"meve/`
  const mJson = text.match(/\{[\s\S]*?"version"\s*:\s*"meve\/[0-9]+"\s*[\s\S]*?\}/i);
  if (mJson) {
    const obj = tryParseJson(mJson[0]);
    if (looksLikeProof(obj)) return obj;
  }

  return null;
}

// --------- PDF (heuristique) ------------
export async function extractProofFromPdf(file: File): Promise<MeveProof | null> {
  const buf = new Uint8Array(await file.arrayBuffer());

  // Convertir une fenêtre de texte (limiter pour perf)
  const head = new TextDecoder().decode(buf.slice(0, Math.min(buf.length, 4_000_000)));

  // 1) Marqueurs custom %%MEVE_PROOF ... %%END_MEVE_PROOF
  const mBlock = head.match(/%%MEVE_PROOF([\s\S]*?)%%END_MEVE_PROOF/);
  if (mBlock) {
    const obj = tryParseJson(mBlock[1]);
    if (looksLikeProof(obj)) return obj;
  }

  // 2) XMP <meve:proof>...</meve:proof> ou JSON dans XMP
  const mXmp = head.match(/<meve:proof>([\s\S]*?)<\/meve:proof>/i);
  if (mXmp) {
    const inner = mXmp[1].replace(/&quot;/g, '"');
    const obj = tryParseJson(inner);
    if (looksLikeProof(obj)) return obj;
  }
  const mJson = head.match(/\{[\s\S]*?"version"\s*:\s*"meve\/[0-9]+"\s*[\s\S]*?\}/i);
  if (mJson) {
    const obj = tryParseJson(mJson[0]);
    if (looksLikeProof(obj)) return obj;
  }

  // 3) Dictionnaire PDF type /MeveProof (string)
  const mDict = head.match(/\/MeveProof\s*\(([\s\S]*?)\)/);
  if (mDict) {
    const unescaped = mDict[1].replace(/\\\)/g, ')').replace(/\\\(/g, '(');
    const obj = tryParseJson(unescaped);
    if (looksLikeProof(obj)) return obj;
  }

  return null;
}

// --------- PNG (chunks iTXt/tEXt) ------
export async function extractProofFromPng(file: File): Promise<MeveProof | null> {
  const bytes = new DataView(await file.arrayBuffer());
  // signature PNG
  const sigOk =
    bytes.getUint32(0) === 0x89504e47 && bytes.getUint32(4) === 0x0d0a1a0a;
  if (!sigOk) return null;

  let off = 8;
  while (off + 8 <= bytes.byteLength) {
    const len = bytes.getUint32(off); off += 4;
    const type =
      String.fromCharCode(bytes.getUint8(off), bytes.getUint8(off + 1), bytes.getUint8(off + 2), bytes.getUint8(off + 3));
    off += 4;

    if (type === "tEXt" || type === "iTXt" || type === "zTXt") {
      const data = new Uint8Array(bytes.buffer, off, len);
      const text = new TextDecoder().decode(data);
      // format key\0value
      const nul = text.indexOf("\0");
      if (nul > 0) {
        const key = text.slice(0, nul);
        const value = text.slice(nul + 1);
        if (key.toLowerCase() === "meve_proof") {
          const obj = tryParseJson(value);
          if (looksLikeProof(obj)) return obj;
        }
      }
    }

    off += len + 4; // skip data + CRC
    if (type === "IEND") break;
  }
  return null;
}

// --------- Vérification intégrité --------
export async function verifyAgainstOriginal(proof: MeveProof, original?: File) {
  if (!proof?.doc?.sha256) return { ok: false, reason: "hash absent dans la preuve" };

  if (!original) return { ok: true, reason: "preuve parsée (sans original)" };

  const digest = await sha256Hex(original);
  const ok = digest.toLowerCase() === proof.doc.sha256.toLowerCase();
  return { ok, reason: ok ? "hash concordant" : "hash différent" };
                          }
