// lib/wm/payload.ts
export type WatermarkPayload = {
  docHash: string;       // 64 hex chars
  ts: string;            // ISO UTC
  issuerHash: string;    // 64 hex chars (sha256 of normalized email)
  sig: Uint8Array;       // Ed25519 signature (64 bytes)
};

// -- sérialisation binaire compacte --
// format: [magic 4B] [docHash 32B] [tsLen 1B] [ts tsLenB UTF-8]
//         [issuerHash 32B] [sig 64B]
const MAGIC = new Uint8Array([0x44, 0x4D, 0x56, 0x31]); // "DMV1"

export function hexToBytes(hex: string): Uint8Array {
  const clean = hex.trim().toLowerCase();
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    out[i / 2] = parseInt(clean.slice(i, i + 2), 16);
  }
  return out;
}
export function bytesToHex(b: Uint8Array): string {
  return [...b].map(v => v.toString(16).padStart(2, "0")).join("");
}

export function encodePayload(p: WatermarkPayload): Uint8Array {
  if (p.docHash.length !== 64) throw new Error("docHash must be 64 hex chars");
  if (p.issuerHash.length !== 64) throw new Error("issuerHash must be 64 hex chars");
  const tsBytes = new TextEncoder().encode(p.ts);
  if (tsBytes.length > 255) throw new Error("ts too long");
  const docBytes = hexToBytes(p.docHash);
  const issuerBytes = hexToBytes(p.issuerHash);
  if (p.sig.length !== 64) throw new Error("sig must be 64 bytes");

  const out = new Uint8Array(4 + 32 + 1 + tsBytes.length + 32 + 64);
  let o = 0;
  out.set(MAGIC, o); o += 4;
  out.set(docBytes, o); o += 32;
  out[o++] = tsBytes.length;
  out.set(tsBytes, o); o += tsBytes.length;
  out.set(issuerBytes, o); o += 32;
  out.set(p.sig, o); o += 64;
  return out;
}

export function decodePayload(buf: Uint8Array): WatermarkPayload | null {
  if (buf.length < 4) return null;
  if (!(buf[0] === 0x44 && buf[1] === 0x4D && buf[2] === 0x56 && buf[3] === 0x31)) return null;
  let o = 4;
  if (buf.length < o + 32) return null;
  const docBytes = buf.slice(o, o + 32); o += 32;
  if (buf.length < o + 1) return null;
  const tsLen = buf[o++];
  if (buf.length < o + tsLen) return null;
  const tsBytes = buf.slice(o, o + tsLen); o += tsLen;
  if (buf.length < o + 32) return null;
  const issuerBytes = buf.slice(o, o + 32); o += 32;
  if (buf.length < o + 64) return null;
  const sig = buf.slice(o, o + 64);

  return {
    docHash: bytesToHex(docBytes),
    ts: new TextDecoder().decode(tsBytes),
    issuerHash: bytesToHex(issuerBytes),
    sig
  };
}
