// app/api/verify/route.ts
import { NextRequest, NextResponse } from "next/server";

/** Util: SHA-256 -> hex */
async function sha256Hex(buf: ArrayBuffer): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Tente d'extraire une preuve JSON d’un certificat HTML.
 * On supporte deux formats:
 *  - <script id="meve-proof" type="application/json"> { ... } </script>
 *  - <!--MEVE_JSON_START-->{...}<!--MEVE_JSON_END-->
 */
function extractProofJsonFromHtml(htmlText: string): any | null {
  // 1) balise <script id="meve-proof">
  const scriptMatch = htmlText.match(
    /<script[^>]*id=["']meve-proof["'][^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/i
  );
  if (scriptMatch?.[1]) {
    try {
      return JSON.parse(scriptMatch[1]);
    } catch {}
  }

  // 2) commentaires délimités
  const commentMatch = htmlText.match(
    /<!--\s*MEVE_JSON_START\s*-->([\s\S]*?)<!--\s*MEVE_JSON_END\s*-->/i
  );
  if (commentMatch?.[1]) {
    try {
      return JSON.parse(commentMatch[1]);
    } catch {}
  }

  return null;
}

/**
 * Vérifie une preuve HTML optionnellement contre un fichier original:
 * - Si html seul: "valid_document_missing"
 * - Si html + original et sha256 correspond: "valid"
 * - Sinon "invalid" (avec raison)
 */
async function verifyHtmlCertificate(htmlFile: File, maybeOriginal?: File) {
  const htmlText = await htmlFile.text();
  const proof = extractProofJsonFromHtml(htmlText);
  if (!proof) {
    return {
      status: "invalid",
      reason: "No proof JSON found in HTML certificate.",
    };
  }

  // Infos utiles pour l’UI
  const payload = {
    created_at: proof?.created_at,
    doc: proof?.doc,
    issuer: proof?.issuer,
  };

  // Sans original: on considère la preuve lisible mais non corrélée
  if (!maybeOriginal) {
    return {
      status: "valid_document_missing",
      reason:
        "HTML certificate parsed successfully, but original file was not supplied.",
      ...payload,
    };
  }

  // Avec original: on compare sha256
  const buf = await maybeOriginal.arrayBuffer();
  const actualHash = await sha256Hex(buf);
  const expected = proof?.doc?.sha256;

  if (!expected) {
    return {
      status: "invalid",
      reason: "Certificate is missing doc.sha256 field.",
      ...payload,
    };
  }

  if (actualHash.toLowerCase() === String(expected).toLowerCase()) {
    return {
      status: "valid",
      reason: "SHA-256 matches the certificate.",
      ...payload,
    };
  }

  return {
    status: "invalid",
    reason: "SHA-256 does not match the certificate.",
    doc: { ...payload.doc, sha256_computed: actualHash },
    issuer: payload.issuer,
    created_at: payload.created_at,
  };
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const original = form.get("original");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing file" },
        { status: 400 }
      );
    }

    // Si le fichier est un certificat HTML (.html)
    const name = file.name.toLowerCase();
    const type = (file.type || "").toLowerCase();
    const isHtml =
      name.endsWith(".html") ||
      type.includes("text/html");

    if (isHtml) {
      const res = await verifyHtmlCertificate(
        file,
        original instanceof File ? original : undefined
      );
      return NextResponse.json(res);
    }

    // Sinon, on est en local: on ne sait pas (encore) lire les preuves intégrées PDF/PNG ici.
    return NextResponse.json(
      {
        status: "invalid",
        reason:
          "Local verifier currently supports only HTML certificates (.meve.html). Please upload the HTML certificate (and optionally the original file) to validate.",
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: true, message: e?.message ?? "Verify error" },
      { status: 500 }
    );
  }
    }
