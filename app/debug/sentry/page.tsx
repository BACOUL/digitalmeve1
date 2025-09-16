'use client';

import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';

const DEBUG_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_SENTRY_DEBUG === 'true' ||
  process.env.NODE_ENV !== 'production'; // visible en dev, masquée en prod sauf override

export default function SentryDebugPage() {
  const [eventId, setEventId] = useState<string | null>(null);

  if (!DEBUG_ENABLED) {
    // rien à afficher en prod
    return null;
  }

  const throwUnhandled = () => {
    // non interceptée → unhandled error
    setTimeout(() => {
      // @ts-ignore test
      throw new Error('DMV: unhandled client error');
    }, 0);
  };

  const sendMessage = () => {
    const id = Sentry.captureMessage('DMV: test message (client)', {
      level: 'info',
      tags: { area: 'debug' },
    });
    setEventId(typeof id === 'string' ? id : null);
    alert('Message envoyé. Vérifie Sentry dans ~10–30 s.');
  };

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Debug Sentry</h1>

      <div className="rounded border p-4 mb-6">
        <p>SDK initialisé : {Sentry.isInitialized() ? 'oui ✅' : 'non ❌'}</p>
        <p>Env : {process.env.NODE_ENV}</p>
        <p>Dernier eventId : {eventId ?? '—'}</p>
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={throwUnhandled} className="rounded bg-white/10 px-4 py-2">
          Throw client error (unhandled)
        </button>
        <button onClick={sendMessage} className="rounded bg-white/10 px-4 py-2">
          Capture message (client)
        </button>
      </div>
    </main>
  );
}
