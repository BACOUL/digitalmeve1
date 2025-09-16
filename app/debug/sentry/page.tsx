import * as Sentry from "@sentry/nextjs";

export default function DebugSentry() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Debug Sentry</h1>
      <button
        onClick={() => {
          throw new Error("Test Sentry error depuis /debug-sentry 🚨");
        }}
      >
        Déclencher une erreur
      </button>
    </div>
  );
}
