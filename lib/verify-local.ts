// lib/verify-local.ts
import { sha256Hex } from "@/lib/proof";

/**
 * On attend dans le .meve.html les marqueurs insérés par buildProofHtml :
 *   <!-- MEVE:BEGIN -->
 *   { ...canonical json... }
 *   <!-- MEVE:END -->
 */
export async function extractCanonicalFromHtml(htmlFile: File): Promise<string | null> {
  const text = await htmlFile.text();
  const m = text.match(/<!--\s*MEVE:BEGIN\s*-->\s*([\s\S]*?)\s*<!--\s*MEVE:END\s*-->/i);
  return m ? m[1].trim() : null;
}

export type VerifyOutcome =
  | { status: "valid"; reason?: string; proof: any }
  | { status: "valid_document_missing"; reason?: string; proof: any }
  | { status: "invalid"; reason?: string };

export async function verifyFromHtmlCertificate(
  htmlCertificate: File,
  originalFile?: File | null
): Promise<VerifyOutcome> {
  const canonical = await extractCanonicalFromHtml(htmlCertificate);
  if (!canonical) {
    return { status: "invalid", reason: "Certificat HTML non reconnu (marqueurs MEVE absents)." };
  }

  let proof: any;
  try {
    proof = JSON.parse(canonical);
  } catch {
    return { status: "invalid", reason: "Certificat HTML illisible (JSON invalide)." };
  }

  // S'il n'y a pas de SHA-256 dans la preuve, on ne peut rien valider
  const expected = proof?.doc?.sha256;
  if (!expected || typeof expected !== "string") {
    return { status: "invalid", reason: "Certificat sans empreinte SHA-256." };
  }

  // Si l'utilisateur n'a pas fourni l'original, on peut seulement dire
  // “preuve cohérente mais document manquant”
  if (!originalFile) {
    return {
      status: "valid_document_missing",
      reason: "Certificat lisible. Importez le document original pour valider l’intégrité.",
      proof,
    };
  }

  // Recalcule le SHA-256 de l’original fourni et compare
  const actual = await sha256Hex(originalFile);
  if (actual.toLowerCase() === expected.toLowerCase()) {
    return { status: "valid", reason: "Empreinte conforme au certificat.", proof };
  }

  return {
    status: "invalid",
    reason: "Empreinte du document ne correspond pas au certificat (fichier modifié ou erroné).",
  };
}
