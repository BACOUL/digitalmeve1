// lib/read-meve-from-pdf.ts
// Lecture "pragmatique" des marqueurs MEVE dans un PDF :
// 1) tente d'extraire le bloc XMP et lire <meve:...>
// 2) si rien, tente de lire le dictionnaire /Info avec /Meve... (...)
// NB: ce parsing est volontairement simple et robuste pour Vercel/Node.

export type MevePdfMeta = {
  docSha256?: string;
  proofHash?: string;
  version?: string;
  createdAt?: string;
  issuer?: string;
};

// Petit helper
function between(hay: string, start: string, end: string): string | null {
  const i = hay.indexOf(start);
  if (i < 0) return null;
  const j = hay.indexOf(end, i + start.length);
  if (j < 0) return null;
  return hay.slice(i + start.length, j);
}

// Cherche <meve:tag>...</meve:tag> dans une string XML
function pickTag(xml: string, tag: string): string | undefined {
  const re = new RegExp(`<\\s*meve:${tag}[^>]*>([\\s\\S]*?)<\\/\\s*meve:${tag}\\s*>`, "i");
  const m = xml.match(re);
  const val = m?.[1]?.trim();
  return val || undefined;
}

// /Info entries du type /MeveDocSha256 (xxxxxxxx)
function pickInfo(content: string, key: string): string | undefined {
  // parenthèses PDF -> capturer jusqu'à la parenthèse fermante non échappée (cas simples)
  const re = new RegExp(`\\/${key}\\s*\\(([^)]+)\\)`, "i");
  const m = content.match(re);
  const val = m?.[1]?.trim();
  return val || undefined;
}

export function extractMeveMetaFromPdfBytes(bytes: Uint8Array): MevePdfMeta | null {
  // On décode en UTF-8 pour chercher XMP/Info (les zones texte restent lisibles)
  const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes);

  // 1) XMP
  const xmp = between(text, "<x:xmpmeta", "</x:xmpmeta>");
  if (xmp) {
    const xmpFull = "<x:xmpmeta" + xmp + "</x:xmpmeta>";
    const metaXmp: MevePdfMeta = {
      docSha256: pickTag(xmpFull, "docSha256"),
      proofHash: pickTag(xmpFull, "proofHash"),
      version: pickTag(xmpFull, "version"),
      createdAt: pickTag(xmpFull, "createdAt"),
      issuer: pickTag(xmpFull, "issuer"),
    };
    // Si au moins une clé est trouvée, on considère que XMP est présent
    if (Object.values(metaXmp).some(Boolean)) return metaXmp;
  }

  // 2) /Info fallback
  // On cherche le dictionnaire Info (approche pragmatique)
  // "/Info << ... >>" peut apparaître; on scanne des blocs "<<" ">>" autour de /Info
  const infoIdx = text.indexOf("/Info");
  if (infoIdx >= 0) {
    // on cherche un bloc << >> dans une fenêtre raisonnable
    const start = text.indexOf("<<", infoIdx);
    const end = text.indexOf(">>", start + 2);
    if (start >= 0 && end > start) {
      const infoBlock = text.slice(start, end + 2);
      const metaInfo: MevePdfMeta = {
        docSha256: pickInfo(infoBlock, "MeveDocSha256"),
        proofHash: pickInfo(infoBlock, "MeveProofHash"),
        version: pickInfo(infoBlock, "MeveVersion"),
        createdAt: pickInfo(infoBlock, "MeveCreatedAt"),
        issuer: pickInfo(infoBlock, "MeveIssuer"),
      };
      if (Object.values(metaInfo).some(Boolean)) return metaInfo;
    }
  }

  // pas trouvé
  return null;
}
