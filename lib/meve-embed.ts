// lib/meve-embed.ts
// Construit une preuve MEVE v1 à partir des infos disponibles
// N’implémente pas la signature réelle (pro/dm_cert) → c’est simulé ici.

import { MeveProofV1, MeveOrgSig, MeveDmCert } from "./meve-schema";

type Mode = "free" | "ind_pro" | "org_pro";

export async function buildMeveProof(params: {
  kind: "pdf" | "docx" | "image";
  hash: string;
  ts: string;
  mode: Mode;
  issuer?: string;      // email particulier (si ind_pro)
  domain?: string;      // domaine org (si org_pro)
}): Promise<MeveProofV1> {
  const { kind, hash, ts, mode, issuer, domain } = params;

  // Base commune
  const proof: MeveProofV1 = {
    v: 1,
    kind,
    hash,
    ts,
    issuer: undefined,
    org: null,
    dm_cert: null,
  };

  if (mode === "free") {
    // ✅ Rien de plus : anonyme
    return proof;
  }

  if (mode === "ind_pro") {
    proof.issuer = issuer ?? null;
    proof.dm_cert = fakeDmCert({
      tier: "ind_pro",
      subject: issuer ?? "unknown@example.com",
    });
    return proof;
  }

  if (mode === "org_pro") {
    proof.issuer = null; // pas d’email
    proof.org = fakeOrgSig(domain ?? "example.com");
    proof.dm_cert = fakeDmCert({
      tier: "org_pro",
      subject: domain ?? "example.com",
    });
    return proof;
  }

  return proof;
}

/* ---------------------- helpers de simulation ---------------------- */

/**
 * Simule une signature org (normalement générée après validation DNS + clé locale)
 */
function fakeOrgSig(domain: string): MeveOrgSig {
  return {
    domain,
    key_id: "org-local-key-1",
    sig: "FAKE_SIGNATURE_BASE64",
  };
}

/**
 * Simule un certificat DM délivré par l’autorité DigitalMeve
 */
function fakeDmCert(args: { tier: "ind_pro" | "org_pro"; subject: string }): MeveDmCert {
  const now = new Date().toISOString();
  return {
    tier: args.tier,
    subject: args.subject,
    cert_id: "DM-" + Math.random().toString(36).slice(2, 8),
    iat: now,
    exp: null,
    sig: "FAKE_DM_SIG_BASE64",
  };
}
