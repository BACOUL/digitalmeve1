// app/api/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  extractProofFromHtml,
  extractProofFromPdf,
  extractProofFromPng,
  verifyAgainstOriginal,
  MeveProof,
} from "@/lib/extract-proof";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const original = form.get("original");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: true, details: "Aucun fichier reçu." }, { status: 400 });
    }
    const origFile = original instanceof File ? original : undefined;

    // route par type
    let proof: MeveProof | null = null;
    const mime = (file.type || "").toLowerCase();
    const name = (file.name || "").toLowerCase();

    if (mime.includes("html") || name.endsWith(".html")) {
      proof = await extractProofFromHtml(file);
    } else if (mime.includes("pdf") || name.endsWith(".pdf")) {
      proof = await extractProofFromPdf(file);
    } else if (mime.includes("png") || name.endsWith(".png")) {
      proof = await extractProofFromPng(file);
    } else {
      // fallback : tenter HTML heuristique
      proof = await extractProofFromHtml(file);
    }

    if (!proof) {
      return NextResponse.json(
        { error: false, status: "unsupported_or_not_found", reason: "Preuve non trouvée dans ce fichier." },
        { status: 200 }
      );
    }

    const integ = await verifyAgainstOriginal(proof, origFile);

    return NextResponse.json(
      {
        error: false,
        status: integ.ok ? "valid" : "invalid",
        reason: integ.reason,
        created_at: proof.created_at,
        doc: proof.doc,
        issuer: proof.issuer,
        version: proof.version,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: true, details: e?.message ?? "Erreur de vérification" },
      { status: 500 }
    );
  }
}
