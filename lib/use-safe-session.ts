'use client';
import { useSession as useNextSession } from 'next-auth/react';

export function useSafeSession() {
  if (typeof window === 'undefined') {
    // En build/prerender, on renvoie un objet stable
    return { data: null as any, status: 'unauthenticated' as const };
  }
  try {
    const s = useNextSession?.();
    return {
      data: s?.data ?? null,
      status: (s?.status ?? 'unauthenticated') as 'authenticated' | 'unauthenticated' | 'loading',
    };
  } catch {
    return { data: null as any, status: 'unauthenticated' as const };
  }
}
