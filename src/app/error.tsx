'use client';
export default function Error({ error, reset }:{ error: Error & { digest?: string }, reset: () => void }) {
  console.error(error);
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-zinc-400">Please try again. {error?.digest ? `Error ID: ${error.digest}` : ''}</p>
      <button onClick={reset} className="mt-6 rounded-2xl border border-zinc-800 px-3 py-1.5 hover:border-zinc-700">Reload</button>
    </main>
  );
}
