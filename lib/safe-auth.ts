// lib/safe-auth.ts
"use client";

import * as React from "react";

// lazy import pour éviter tout chargement côté serveur
let nextAuth: typeof import("next-auth/react") | null = null;
function getNextAuth() {
  if (!nextAuth) {
    try {
      nextAuth = require("next-auth/react");
    } catch {
      nextAuth = null;
    }
  }
  return nextAuth;
}

// Hook safe: ne JAMAIS déstructurer ce retour côté appelant
export function useSessionSafe() {
  const na = getNextAuth();
  // Si indisponible (build/prerender), on retourne un faux objet stable
  if (!na) {
    return {
      data: undefined,
      status: "unauthenticated",
      update: async () => null,
    } as const;
  }
  // Ne pas déstructurer pour éviter les cas undefined
  return na.useSession();
}

export async function signOutSafe(opts?: Parameters<NonNullable<typeof nextAuth>["signOut"]>[0]) {
  const na = getNextAuth();
  if (!na) return;
  return na.signOut?.(opts as any);
}

export async function signInSafe(...args: any[]) {
  const na = getNextAuth();
  if (!na) return { error: "next-auth not available" };
  // @ts-ignore
  return na.signIn?.(...args);
}
