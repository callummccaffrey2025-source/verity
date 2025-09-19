'use client';
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold text-zinc-100">Something went wrong</h1>
      <p className="mt-2 text-neutral-100">{error?.message ?? "Unexpected error"}</p>
      <button onClick={reset} className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2">
        Try again
      </button>
    </main>
  );
}
