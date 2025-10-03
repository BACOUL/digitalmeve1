// lib/meve-schema.ts
// Schéma unique de la preuve .MEVE (v1) — types seulement, aucun runtime.
// Couvre : gratuit (anonyme), Particulier payant (issuer + cert DM), Pro (signature org + cert DM).

export type MeveOrgSig = {
  /** Domaine validé par DNS (ex: example.com) */
  domain: string;
  /** Identifiant de la clé locale côté entreprise (pas la clé elle-même) */
  key_id: string;
  /** Signature Ed25519 base64 sur la forme canonique "v1|hash|ts|domain|key_id" */
  sig: string;
};

export type MeveDmCert = {
  /** Palier de certification DigitalMeve */
  tier: "ind_pro" | "org_pro";
  /** Sujet certifié : email masqué (particulier) ou domaine (pro) */
  subject: string;
  /** Identifiant court de la certification (affichage) */
  cert_id: string;
  /** Date d’émission (ISO 8601) */
  iat: string;
  /** Date d’expiration optionnelle (ISO 8601) */
  exp?: string | null;
  /** Signature Ed25519 base64 par l’autorité DigitalMeve sur la forme canonique */
  sig: string;
};

export type MeveProofV1 = {
  /** Version du schéma */
  v: 1;
  /** Type de fichier supporté */
  kind: "pdf" | "docx" | "image";
  /** Empreinte SHA-256 du contenu d’origine */
  hash: string;
  /** Horodatage ISO lors de la protection */
  ts: string;

  /**
   * Identité "particulier" (email vérifié).
   * - Gratuit : null/undefined
   * - Payant particulier : email en clair dans la preuve (l’UI l’affiche masqué)
   */
  issuer?: string | null;

  /**
   * Signature locale de l’entreprise (Pro).
   * - Gratuit / Particulier : null/undefined
   * - Pro : présent avec signature Ed25519 vérifiable via DNS
   */
  org?: MeveOrgSig | null;

  /**
   * Certification DigitalMeve (CA) — uniquement offres payantes.
   * - Gratuit : null/undefined
   * - Particulier Pro : tier="ind_pro"
   * - Entreprise Pro : tier="org_pro"
   */
  dm_cert?: MeveDmCert | null;
};

/** Charge utile générique à embarquer (JSON) */
export type MevePayload = MeveProofV1;

/** Aide : étiquette lisible en fonction du mode */
export function meveTierLabel(p: MeveProofV1): "Community" | "Certified (Individual)" | "Certified (Organization)" {
  if (p.dm_cert?.tier === "ind_pro") return "Certified (Individual)";
  if (p.dm_cert?.tier === "org_pro") return "Certified (Organization)";
  return "Community";
}
