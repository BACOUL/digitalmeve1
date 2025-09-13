// /lib/wm/docx.ts
// Filigrane *invisible* pour DOCX via docProps/custom.xml
// - On encode le payload sous forme "MEVE{...}EVEM" dans une propriété personnalisée.
// - Lecture : on lit docProps/custom.xml, on retrouve le marqueur et on le décode.
//
// ⚠️ Contenu visible inchangé (Word/LibreOffice OK). Nécessite "jszip".

import JSZip from "jszip";
import {
  MARKER_PREFIX,
  MARKER_SUFFIX,
  encodeInvisibleWatermark,
  decodeInvisibleWatermark,
  InvisibleWatermarkPayload,
} from "./marker";

const DOCX_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

// ---------- Helpers ----------

function textToUint8(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}
function uint8ToText(b: Uint8Array): string {
  return new TextDecoder("utf-8", { fatal: false }).decode(b);
}
// Convertit un Uint8Array en ArrayBuffer *pur* (évite SharedArrayBuffer)
function u8ToArrayBuffer(u8: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(u8.byteLength);
  new Uint8Array(ab).set(u8);
  return ab;
}

function findMarkerInText(s: string): string | null {
  const i = s.indexOf(MARKER_PREFIX);
  if (i < 0) return null;
  const j = s.indexOf(MARKER_SUFFIX, i + MARKER_PREFIX.length);
  if (j < 0) return null;
  return s.slice(i, j + MARKER_SUFFIX.length);
}

function ensureContentTypesForCustomProps(ctXml: string): string {
  if (ctXml.includes('PartName="/docProps/custom.xml"')) return ctXml;
  const insert =
    `  <Override PartName="/docProps/custom.xml" ` +
    `ContentType="application/vnd.openxmlformats-officedocument.custom-properties+xml"/>`;
  if (ctXml.includes("</Types>")) return ctXml.replace("</Types>", `${insert}\n</Types>`);
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
${insert}
</Types>`;
}

function buildOrUpdateCustomPropsXml(existingXml: string | null, marker: string): string {
  const NS_CP = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";
  const NS_VT = "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes";
  const HEADER = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`;
  const OPEN = `<Properties xmlns="${NS_CP}" xmlns:vt="${NS_VT}">`;
  const CLOSE = `</Properties>`;
  const FMTID = `{D5CDD505-2E9C-101B-9397-08002B2CF9AE}`;

  const meveProperty = (pid: number) =>
    `  <property fmtid="${FMTID}" pid="${pid}" name="meve_marker">
    <vt:lpwstr>${escapeXml(marker)}</vt:lpwstr>
  </property>`;

  if (!existingXml) {
    const pid = 2;
    return `${HEADER}\n${OPEN}\n${meveProperty(pid)}\n${CLOSE}`;
  }

  if (existingXml.includes('name="meve_marker"')) {
    return existingXml.replace(
      /(<property[^>]+name="meve_marker"[^>]*>\s*<vt:lpwstr>)([\s\S]*?)(<\/vt:lpwstr>\s*<\/property>)/,
      (_m, p1, _old, p3) => `${p1}${escapeXml(marker)}${p3}`
    );
  }

  const pids = [...existingXml.matchAll(/pid="(\d+)"/g)]
    .map((m) => parseInt(m[1], 10))
    .filter((n) => Number.isFinite(n));
  const pidNext = (pids.length ? Math.max(...pids) : 1) + 1;

  if (existingXml.includes("</Properties>")) {
    return existingXml.replace("</Properties>", `\n${meveProperty(pidNext)}\n</Properties>`);
  }

  return `${HEADER}\n${OPEN}\n${meveProperty(pidNext)}\n${CLOSE}`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---------- API ----------

export async function embedInvisibleWatermarkDocx(
  inputDocx: Blob,
  payload: { hash: string; ts: string; issuer?: string }
): Promise<Blob> {
  const zip = await JSZip.loadAsync(inputDocx);

  const marker = encodeInvisibleWatermark({
    alg: "sha256",
    hash: payload.hash,
    ts: payload.ts,
    issuer: payload.issuer,
  });

  let customXml: string | null = null;
  const customPath = "docProps/custom.xml";
  if (zip.file(customPath)) {
    customXml = await zip.file(customPath)!.async("string");
  }
  const nextCustomXml = buildOrUpdateCustomPropsXml(customXml, marker);
  zip.file(customPath, nextCustomXml);

  const ctPath = "[Content_Types].xml";
  const ctXml = zip.file(ctPath) ? await zip.file(ctPath)!.async("string") : null;
  const nextCtXml = ensureContentTypesForCustomProps(ctXml ?? defaultContentTypesXml());
  zip.file(ctPath, nextCtXml);

  // Générer en Uint8Array puis convertir en ArrayBuffer “pur”
  const u8 = await zip.generateAsync({ type: "uint8array" });
  const ab = u8ToArrayBuffer(u8);
  return new Blob([ab], { type: DOCX_MIME });
}

export async function readInvisibleWatermarkDocx(
  inputDocx: Blob
): Promise<InvisibleWatermarkPayload | null> {
  const zip = await JSZip.loadAsync(inputDocx);
  const f = zip.file("docProps/custom.xml");
  if (!f) return null;

  const xml = await f.async("string");
  const raw = findMarkerInText(xml);
  if (!raw) return null;

  return decodeInvisibleWatermark(raw);
}

function defaultContentTypesXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Override PartName="/docProps/custom.xml" ContentType="application/vnd.openxmlformats-officedocument.custom-properties+xml"/>
</Types>`;
}
