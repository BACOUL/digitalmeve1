// app/api/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { extractMeveMetaFromPdfBytes } from "@/lib/read-meve-from-pdf";
import crypto from "node:crypto";

export const runtime = "nodejs"; // impératif pour avoir 'crypto' Node sur Vercel

function sha256HexBuf(buf: Buffer): string {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const original = form.get("original"); // optionnel

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing 'file'." }, { status: 400 });
    }

    // on ne gère ici que PDF pour commencer
    const filename = (file as File).name || "file";
    const isPdf = filename.toLowerCase().endsWith(".pdf") || (file as File).type === "application/pdf";
    if (!isPdf) {
      return NextResponse.json({ error: "Only .pdf is supported for now." }, { status: 400 });
    }

    // Lire bytes du meve.pdf
    const fileBuf = Buffer.from(await (file as File).arrayBuffer());

    // Extraire les marqueurs MEVE (XMP ou /Info)
    const meta = extractMeveMetaFromPdfBytes(new Uint8Array(fileBuf));
    if (!meta || !meta.docSha256) {
      return NextResponse.json(
        {
          status: "invalid",
          reason: "No MEVE markers found in PDF (docSha256 missing).",
        },
        { status: 200 }
      );
    }

    // Si l'utilisateur fournit le document original, on vérifie vraiment
    let originalSha: string | undefined;
    if (original instanceof File) {
      const origBuf = Buffer.from(await original.arrayBuffer());
      originalSha = sha256HexBuf(origBuf);
    }

    // Statut
    // - valid                : original fourni ET hash identique
    // - valid_document_missing: marqueurs présents mais original non fourni
    // - invalid              : original fourni mais hash différent, ou meta incohérentes
    let status: "valid" | "valid_document_missing" | "invalid" = "valid_document_missing";
    let reason: string | undefined;

    if (originalSha) {
      if (originalSha.toLowerCase() === meta.docSha256.toLowerCase()) {
        status = "valid";
      } else {
        status = "invalid";
        reason = "Original hash does not match docSha256 in PDF.";
      }
    } else {
      status = "valid_document_missing";
      reason = "PDF contains MEVE markers but no original file provided for full verification.";
    }

    return NextResponse.json(
      {
        status,
        reason,
        created_at: meta.createdAt,
        doc: {
          name: filename,
          mime: "application/pdf",
          sha256_original: originalSha,        // si fourni
          sha256_expected: meta.docSha256,     // attendu dans le PDF
        },
        issuer: meta.issuer
          ? { name: "DigitalMeve", identity: meta.issuer, type: "personal", website: "https://digitalmeve.com" }
          : undefined,
        proof: {
          hash: meta.proofHash, // si présent
          version: meta.version,
        },
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: true, message: e?.message ?? "Verify error" }, { status: 500 });
  }
          }
