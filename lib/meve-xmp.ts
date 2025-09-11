// lib/meve-xmp.ts
import { PDFDocument } from "pdf-lib";

// --- Utils -------------------------------------------------

export async function sha256Hex(blob: Blob | ArrayBuffer): Promise<string> {
  const buf = blob instanceof Blob ? await blob.arrayBuffer() : blob;
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

// XMP minimal + notre espace de noms "meve"
function buildXmpPacket(fields: {
  createdAtISO: string;
  issuer?: string;
  issuerType?: "personal" | "pro" | "official";
  issuerWebsite?: string;
  docSha256: string; // hash de l'original
}) {
  const { createdAtISO, issuer = "", issuerType = "personal", issuerWebsite = "", docSha256 } = fields;

  // ⚠️ XMP doit être bien formé et entouré de <?xpacket ... ?>
  return `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
           xmlns:dc="http://purl.org/dc/elements/1.1/"
           xmlns:meve="https://digitalmeve.com/ns/meve/1.0#">
    <rdf:Description rdf:about=""
      meve:version="meve/1"
      meve:created_at="${createdAtISO}"
      meve:issuer_identity="${escapeXml(issuer)}"
      meve:issuer_type="${issuerType}"
      meve:issuer_website="${escapeXml(issuerWebsite)}"
      meve:doc_sha256="${docSha256}">
      <dc:title>
        <rdf:Alt>
          <rdf:li xml:lang="x-default">DigitalMeve proof (.MEVE)</rdf:li>
        </rdf:Alt>
      </dc:title>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

// --- Écriture ----------------------------------------------

/**
 * Ajoute (ou remplace) les métadonnées XMP MEVE dans un PDF.
 * @param inputPDF Blob/ArrayBuffer du PDF (déjà filigrané si tu veux)
 * @param fields { docSha256, createdAtISO, issuer? ... }
 * @returns Blob PDF avec XMP MEVE
 */
export async function embedMeveXmp(
  inputPDF: Blob | ArrayBuffer,
  fields: {
    docSha256: string;      // SHA-256 de l'original AVANT transformation
    createdAtISO: string;   // new Date().toISOString()
    issuer?: string;
    issuerType?: "personal" | "pro" | "official";
    issuerWebsite?: string;
  }
): Promise<Blob> {
  const ab = inputPDF instanceof Blob ? await inputPDF.arrayBuffer() : inputPDF;
  const pdfDoc = await PDFDocument.load(ab);

  const xmp = buildXmpPacket(fields);
  // pdf-lib sait définir un XMP complet :
  // @ts-ignore (typages parfois incomplets selon versions)
  pdfDoc.setXmpMetadata?.(xmp);

  // Redondance (facultatif) dans le Info dict — pratique pour un debug rapide
  pdfDoc.setSubject("DigitalMeve");
  pdfDoc.setKeywords(["MEVE", "DigitalMeve", "proof"]);
  pdfDoc.setProducer("DigitalMeve");

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: "application/pdf" });
}

// --- Lecture / Vérif --------------------------------------

export type MeveXmpInfo = {
  version?: string;
  created_at?: string;
  issuer_identity?: string;
  issuer_type?: string;
  issuer_website?: string;
  doc_sha256?: string;
};

export async function readMeveXmp(inputPDF: Blob | ArrayBuffer): Promise<{ xmp?: string; meve?: MeveXmpInfo }> {
  const ab = inputPDF instanceof Blob ? await inputPDF.arrayBuffer() : inputPDF;
  const pdfDoc = await PDFDocument.load(ab);
  // @ts-ignore
  const xmp: string | undefined = pdfDoc.getXmpMetadata?.() || undefined;

  if (!xmp) return { xmp: undefined, meve: {} };

  const meve: MeveXmpInfo = {
    version: pickTag(xmp, "meve:version"),
    created_at: pickTag(xmp, "meve:created_at"),
    issuer_identity: pickTag(xmp, "meve:issuer_identity"),
    issuer_type: pickTag(xmp, "meve:issuer_type"),
    issuer_website: pickTag(xmp, "meve:issuer_website"),
    doc_sha256: pickTag(xmp, "meve:doc_sha256"),
  };

  return { xmp, meve };
}

function pickTag(xmp: string, tag: string): string | undefined {
  const m = xmp.match(new RegExp(`${tag}="([^"]*)"`, "i")) // attribut
        || xmp.match(new RegExp(`<${tag}>([^<]+)</${tag}>`, "i")); // ou élément
  return m?.[1];
}

/**
 * Vérifie un PDF MEVE :
 *  - si original fourni, compare son SHA-256 à meve:doc_sha256 ➜ valid/invalid
 *  - sinon, preuve trouvée mais document manquant ➜ valid_document_missing
 */
export async function verifyMevePdf(
  pdfWithMeve: Blob,
  original?: Blob
): Promise<{
  status: "valid" | "valid_document_missing" | "invalid";
  reason?: string;
  meve?: MeveXmpInfo;
}> {
  const { meve } = await readMeveXmp(pdfWithMeve);
  if (!meve?.doc_sha256) {
    return { status: "invalid", reason: "Aucun marqueur MEVE dans le XMP." };
  }

  if (!original) {
    return {
      status: "valid_document_missing",
      reason: "Preuve présente. Fournissez le document original pour valider l’intégrité.",
      meve,
    };
  }

  const actual = await sha256Hex(original);
  if (actual.toLowerCase() === meve.doc_sha256.toLowerCase()) {
    return { status: "valid", meve };
  }
  return {
    status: "invalid",
    reason: "Le SHA-256 de l’original ne correspond pas à doc_sha256 du XMP.",
    meve,
  };
  }
