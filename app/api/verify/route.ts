// app/api/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sha256HexFromBlob } from "@/lib/sha256";

/**
 * Vérif locale (sans backend externe) :
 * - accepte un certificat .meve.html (généré par la page Generate) dans le champ "file"
 * - accepte en option le fichier "original" pour contrôle d’intégrité
 * - renvoie {status, reason, doc, issuer, created_at}
 *
 * Status possibles :
 *  - "valid" : la preuve est cohérente et, si original fourni, son sha256 correspond
 *  - "valid_document_missing" : preuve OK mais pas d'original pour valider l’intégrité binaire
 *  - "invalid" : preuve illisible / incohérente / hash ne correspond pas
 */

type Proof = {
  version: string;
  created_at?: string;
  doc?: { name?: string; mime?: string; size?: number; sha256?: string };
  issuer?: {
    name?: string;
    identity?: string;
    type?: "personal" | "pro" | "official";
    website?: string;
    verified_domain?: boolean;
  };
};

function extractJsonFromHtml(html: string): any | null {
  // On cherche <script id="meve-data" type="application/json"> ... </script>
  const m = html.match(
    /<script[^>]*id=["']meve-data["'][^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/i
  );
  if (!m) return null;
  const jsonText = m[1].trim();
  try {
    return JSON.parse(jsonText);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const original = form.get("original"); // optionnel

    if (!(file instanceof Blob)) {
      return NextResponse.json(
        { error: true, reason: "Aucun fichier n’a été fourni." },
        { status: 400 }
      );
    }

    // 1) Lire le HTML du certificat et extraire la charge JSON
    const html = await file.text();
    const proof = extractJsonFromHtml(html) as Proof | null;
    if (!proof || proof.version !== "meve/1") {
      return NextResponse.json(
        { status: "invalid", reason: "Certificat HTML invalide ou non reconnu." },
        { status: 200 }
      );
    }

    // 2) Si l’utilisateur a fourni l’original, calculer son SHA-256 et comparer
    if (original instanceof Blob && proof.doc?.sha256) {
      const sha = await sha256HexFromBlob(original);
      if (sha.toLowerCase() !== proof.doc.sha256.toLowerCase()) {
        return NextResponse.json(
          {
            status: "invalid",
            reason: "Le hash de l’original ne correspond pas à la preuve.",
            doc: proof.doc,
            issuer: proof.issuer,
            created_at: proof.created_at,
          },
          { status: 200 }
        );
      }
      // ok
      return NextResponse.json(
        {
          status: "valid",
          reason: "Preuve et intégrité du document confirmées.",
          doc: proof.doc,
          issuer: proof.issuer,
          created_at: proof.created_at,
        },
        { status: 200 }
      );
    }

    // 3) Pas d’original → on valide la présence/forme de la preuve uniquement
    return NextResponse.json(
      {
        status: "valid_document_missing",
        reason:
          "Certificat valide. Pour valider l’intégrité binaire, ajoute le fichier original.",
        doc: proof.doc,
        issuer: proof.issuer,
        created_at: proof.created_at,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: true, reason: e?.message ?? "Erreur de vérification" },
      { status: 500 }
    );
  }
}
