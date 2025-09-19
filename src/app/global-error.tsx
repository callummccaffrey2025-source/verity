'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ background: '#0a0a0a', color: '#e5e7eb', padding: 24 }}>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Something went wrong</h1>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>
          {error?.message ?? 'Unexpected error'}
        </p>
        <button
          onClick={() => reset()}
          style={{
            border: '1px solid #27272a',
            background: '#18181b',
            padding: '8px 12px',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
