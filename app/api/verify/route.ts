// app/api/verify/route.ts
// Runtime Node (on a besoin de 'crypto')
export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// util SHA-256 hex
function sha256Hex(buf: Buffer) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

// essaie d'extraire un JSON de preuve depuis XMP (PDF) : <meve:proof>{...}</meve:proof>
function extractProofFromPdfXmp(buf: Buffer) {
  // on lit en latin1 pour conserver les octets ASCII tels quels
  const txt = buf.toString("latin1");
  const start = txt.indexOf("<x:xmpmeta");
  const end = txt.indexOf("</x:xmpmeta>");
  if (start === -1 || end === -1) return null;

  const xmp = txt.slice(start, end + "</x:xmpmeta>".length);
  const m = xmp.match(/<meve:proof>([\s\S]*?)<\/meve:proof>/i);
  if (!m) return null;

  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const anyFile = form.get("file");
    if (!(anyFile instanceof File)) {
      return NextResponse.json({ error: true, reason: "No file" }, { status: 400 });
    }

    // charge le binaire
    const ab = await anyFile.arrayBuffer();
    const buf = Buffer.from(ab);

    const filename = anyFile.name || "file";
    const mime = anyFile.type || "application/octet-stream";

    // 1) PDF : tenter de lire la preuve depuis XMP
    let proof: any = null;
    if (mime.includes("pdf") || filename.toLowerCase().endsWith(".pdf")) {
      proof = extractProofFromPdfXmp(buf);
    }

    if (!proof) {
      // pas de preuve intégrée trouvée
      return NextResponse.json({
        status: "invalid",
        reason: "Proof not found in file (no <meve:proof> in PDF XMP).",
      });
    }

    // 2) comparer l’empreinte
    const expected = proof?.doc?.sha256;
    if (!expected) {
      return NextResponse.json({
        status: "invalid",
        reason: "Missing doc.sha256 in proof.",
      });
    }

    // convention simple V1 : on compare à l’empreinte du fichier tel qu’uploadé
    const actual = sha256Hex(buf);
    const status = actual === expected ? "valid" : "invalid";
    const reason = status === "valid" ? "OK" : "SHA-256 mismatch";

    // badge "ambre" si l’issuer n’est pas de domaine vérifié
    const ambre =
      status === "valid" && proof?.issuer && proof.issuer.verified_domain === false;

    return NextResponse.json({
      status: ambre ? "valid_document_missing" : status, // on réutilise ce statut pour l'ambre
      reason,
      created_at: proof.created_at,
      doc: {
        name: filename,
        mime,
        size: buf.length,
        sha256: expected,
      },
      issuer: proof.issuer || undefined,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: true, reason: e?.message ?? "Verify error" },
      { status: 500 }
    );
  }
      }
