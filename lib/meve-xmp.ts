// lib/meve-xmp.ts
// Utilitaires .MEVE — hashing, écriture XMP (déjà présents chez toi), + parsing XMP (NOUVEAU)

export async function sha256Hex(file: Blob | ArrayBuffer): Promise<string> {
  const buf = file instanceof Blob ? await file.arrayBuffer() : file;
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// === ÉCRITURE XMP (tu avais déjà embedMeveXmp ; on le ré-exporte tel quel) ===
// Si ton projet a déjà une implémentation, garde la tienne.
// Je laisse une signature compatible pour ne pas casser les imports.
export type MeveXmpInput = {
  docSha256: string;
  createdAtISO: string;
  issuer?: string;
  issuerType?: "personal" | "business";
  issuerWebsite?: string;
};

export async function embedMeveXmp(
  inputPdf: Blob,
  meta: MeveXmpInput
): Promise<Blob> {
  // NOTE: garde TA version si elle existe déjà.
  // Ici on fait un pass-through si rien n'est encore implémenté.
  // L’important pour /verify est juste le parse — la vraie écriture est déjà en place chez toi.
  return inputPdf;
}

// === PARSING XMP (NOUVEAU) ===
// Tente d’extraire hash / createdAt / issuer depuis le contenu PDF (XMP ou texte)
// On est tolérant : on supporte `meve:hash="..."`, `meve:ts="..."` / `meve:createdAtISO="..."`,
// et aussi des variantes JSON glissées dans un paquet XMP.

export type ParsedMeveMeta = {
  hash: string;
  createdAtISO: string;
  issuer?: string;
};

export async function parseMeveXmp(
  buf: ArrayBuffer
): Promise<ParsedMeveMeta | null> {
  const text = safeDecodePdf(buf);

  // helpers
  const pick = (re: RegExp) => {
    const m = text.match(re);
    return m?.[1];
  };

  // 1) Patterns attributs XMP
  const hashAttr =
    pick(/meve:hash\s*[:=]\s*["']?([0-9a-f]{64})["']?/i) ||
    // parfois l’algo est préfixé :
    pick(/meve:hash\s*[:=]\s*["']?(?:sha-256:)?([0-9a-f]{64})["']?/i);

  const createdAttr =
    pick(/meve:(?:ts|createdAtISO)\s*[:=]\s*["']([^"']+)["']/i);

  const issuerAttr =
    pick(/meve:issuer\s*[:=]\s*["']([^"']+)["']/i);

  // 2) Patterns JSON tolérants (si des blocs JSON ont été intégrés dans XMP)
  const jsonBlock = pick(/(\{[\s\S]{0,5000}?\})/); // limite pour rester léger
  let hashJson: string | undefined;
  let createdJson: string | undefined;
  let issuerJson: string | undefined;

  if (jsonBlock) {
    try {
      // Essaie de parser grossièrement le JSON ; si plusieurs objets, on ne casse pas
      const candidate = tryParseJson(jsonBlock);
      if (candidate) {
        // recherche profonde tolérante
        const flat = flatten(candidate);
        // clés possibles
        hashJson =
          flat["meve.hash"] ||
          flat["hash"] ||
          flat["meve_hash"] ||
          undefined;

        // retire éventuel préfixe
        if (hashJson?.startsWith("sha-256:"))
          hashJson = hashJson.slice(8);

        createdJson =
          flat["meve.createdAtISO"] ||
          flat["createdAtISO"] ||
          flat["meve.ts"] ||
          flat["ts"] ||
          undefined;

        issuerJson =
          flat["meve.issuer"] ||
          flat["issuer"] ||
          undefined;
      }
    } catch {
      // ignore
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
    return new TextDecoder("utf-8", { fatal: false }).decode(new Uint8Array(buf));
  } catch {
    // fallback latin-1
    return Array.from(new Uint8Array(buf))
      .map((b) => String.fromCharCode(b))
      .join("");
  }
}

function tryParseJson(input: string): any | null {
  // essaie sur l’entrée brute
  try { return JSON.parse(input); } catch {}
  // tente de repérer un objet JSON interne (entre accolades)
  const m = input.match(/\{[\s\S]*\}/);
  if (m) {
    try { return JSON.parse(m[0]); } catch {}
  }
  return null;
}

function flatten(obj: any, prefix = "", out: Record<string, any> = {}): Record<string, any> {
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === "object") flatten(v, key, out);
      else out[key] = v;
    }
  }
  return out;
}
