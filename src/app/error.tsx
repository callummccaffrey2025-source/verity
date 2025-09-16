"use client";
export default function Error({
  error,
  reset,
}: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-5xl font-serif font-extrabold">Something went wrong</h1>
      <p className="mt-3 text-neutral-400">Please try again.</p>
      <button className="btn-primary mt-6" onClick={() => reset()}>Try again</button>
    </div>
  );
}
