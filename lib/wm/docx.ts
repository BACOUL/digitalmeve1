// /lib/wm/docx.ts
// Filigrane *invisible* pour DOCX via docProps/custom.xml
// - On encode le payload sous forme "MEVE{...}EVEM" dans une propriété personnalisée.
// - Lecture : on lit docProps/custom.xml, on retrouve le marqueur et on le décode.
//
// ⚠️ Le contenu visible n’est pas modifié : le document reste 100% lisible par Word/LibreOffice.
// ⚠️ Nécessite "jszip" dans les dépendances.

import JSZip from "jszip";
import {
  MARKER_PREFIX,
  MARKER_SUFFIX,
  encodeInvisibleWatermark,
  decodeInvisibleWatermark,
  InvisibleWatermarkPayload,
} from "./marker";

// MIME officiel DOCX (évite que certains OS l’affichent comme .zip)
const DOCX_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

// ---------- Helpers texte/binaire ----------

function textToUint8(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}
function uint8ToText(b: Uint8Array): string {
  return new TextDecoder("utf-8", { fatal: false }).decode(b);
}

// Recherche d'un motif entre PREFIX et SUFFIX dans une string
function findMarkerInText(s: string): string | null {
  const i = s.indexOf(MARKER_PREFIX);
  if (i < 0) return null;
  const j = s.indexOf(MARKER_SUFFIX, i + MARKER_PREFIX.length);
  if (j < 0) return null;
  return s.slice(i, j + MARKER_SUFFIX.length);
}

// Ajoute l'Override content-type pour docProps/custom.xml si absent
function ensureContentTypesForCustomProps(ctXml: string): string {
  if (ctXml.includes('PartName="/docProps/custom.xml"')) {
    return ctXml; // déjà présent
  }

  // On insère juste avant la balise fermante </Types>
  const insert =
    `  <Override PartName="/docProps/custom.xml" ` +
    `ContentType="application/vnd.openxmlformats-officedocument.custom-properties+xml"/>`;

  if (ctXml.includes("</Types>")) {
    return ctXml.replace("</Types>", `${insert}\n</Types>`);
  }
  // Fallback : encapsuler proprement
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
${insert}
</Types>`;
}

// Construit/actualise docProps/custom.xml avec une propriété `meve_marker`
function buildOrUpdateCustomPropsXml(
  existingXml: string | null,
  marker: string
): string {
  const NS_CP =
    "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";
  const NS_VT =
    "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes";
  const HEADER = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`;
  const OPEN = `<Properties xmlns="${NS_CP}" xmlns:vt="${NS_VT}">`;
  const CLOSE = `</Properties>`;
  const FMTID = `{D5CDD505-2E9C-101B-9397-08002B2CF9AE}`; // fmtid standard MS

  // Génère un bloc <property> propre
  const meveProperty = (pid: number) =>
    `  <property fmtid="${FMTID}" pid="${pid}" name="meve_marker">
    <vt:lpwstr>${escapeXml(marker)}</vt:lpwstr>
  </property>`;

  if (!existingXml) {
    // Créer le fichier custom.xml de zéro
    const pid = 2; // pid arbitraire >= 2
    return `${HEADER}\n${OPEN}\n${meveProperty(pid)}\n${CLOSE}`;
  }

  // Mettre à jour si la propriété existe déjà
  if (existingXml.includes('name="meve_marker"')) {
    // Remplacer le contenu entre <vt:lpwstr>...</vt:lpwstr> pour meve_marker
    return existingXml.replace(
      /(<property[^>]+name="meve_marker"[^>]*>\s*<vt:lpwstr>)([\s\S]*?)(<\/vt:lpwstr>\s*<\/property>)/,
      (_m, p1, _old, p3) => `${p1}${escapeXml(marker)}${p3}`
    );
  }

  // Sinon, insérer un nouveau <property> avant </Properties>
  // Calculer pid suivant : on lit tous les pid existants et on prend max+1
  const pids = [...existingXml.matchAll(/pid="(\d+)"/g)]
    .map((m) => parseInt(m[1], 10))
    .filter((n) => Number.isFinite(n));
  const pidNext = (pids.length ? Math.max(...pids) : 1) + 1;

  if (existingXml.includes("</Properties>")) {
    return existingXml.replace(
      "</Properties>",
      `\n${meveProperty(pidNext)}\n</Properties>`
    );
  }

  // Fallback : réécrire proprement
  return `${HEADER}\n${OPEN}\n${meveProperty(pidNext)}\n${CLOSE}`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---------- API publique ----------

/**
 * Injecte un filigrane invisible dans un DOCX (Blob -> Blob).
 * Le payload (hash/ts/issuer) est encodé en "MEVE{...}EVEM" et stocké
 * dans docProps/custom.xml (propriétés personnalisées).
 */
export async function embedInvisibleWatermarkDocx(
  inputDocx: Blob,
  payload: { hash: string; ts: string; issuer?: string }
): Promise<Blob> {
  const zip = await JSZip.loadAsync(inputDocx);

  // 1) Construire le marqueur MEVE
  const marker = encodeInvisibleWatermark({
    alg: "sha256",
    hash: payload.hash,
    ts: payload.ts,
    issuer: payload.issuer,
  });

  // 2) Lire ou créer docProps/custom.xml
  let customXml: string | null = null;
  const customPath = "docProps/custom.xml";
  if (zip.file(customPath)) {
    customXml = await zip.file(customPath)!.async("string");
  }

  const nextCustomXml = buildOrUpdateCustomPropsXml(customXml, marker);
  zip.file(customPath, nextCustomXml);

  // 3) S'assurer que [Content_Types].xml déclare l'Override
  const ctPath = "[Content_Types].xml";
  const ctXml = zip.file(ctPath) ? await zip.file(ctPath)!.async("string") : null;
  const nextCtXml = ensureContentTypesForCustomProps(
    ctXml ?? defaultContentTypesXml()
  );
  zip.file(ctPath, nextCtXml);

  // 4) Sauver le ZIP en DOCX **avec le bon MIME**
  const u8 = await zip.generateAsync({ type: "uint8array" });
  return new Blob([u8], { type: DOCX_MIME });
}

/**
 * Lecture du filigrane invisible (DOCX -> payload ou null).
 * On inspecte docProps/custom.xml et on cherche "MEVE{...}EVEM".
 */
export async function readInvisibleWatermarkDocx(
  inputDocx: Blob
): Promise<InvisibleWatermarkPayload | null> {
  const zip = await JSZip.loadAsync(inputDocx);
  const customPath = "docProps/custom.xml";
  const f = zip.file(customPath);
  if (!f) return null;

  const xml = await f.async("string");
  const raw = findMarkerInText(xml);
  if (!raw) return null;

  return decodeInvisibleWatermark(raw);
}

// ---------- Fallback [Content_Types].xml minimal ----------
function defaultContentTypesXml(): string {
  // Ce fallback couvre l'ajout de custom.xml. Les autres parts existantes
  // restent inchangées car ce fichier n'est utilisé que si absent (cas rarissime).
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Override PartName="/docProps/custom.xml" ContentType="application/vnd.openxmlformats-officedocument.custom-properties+xml"/>
</Types>`;
}
