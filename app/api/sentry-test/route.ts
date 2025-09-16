// app/api/sentry-test/route.ts
import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

// Force Node runtime pour que ce soit capturé par sentry.server.config
export const runtime = 'nodejs';

export async function GET() {
  try {
    throw new Error('DMV server test error');
  } catch (err) {
    // On capture explicitement (Next captera aussi l’unhandled)
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return NextResponse.json({ ok: false, sentry: 'captured' }, { status: 500 });
  }
}
