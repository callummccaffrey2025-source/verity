export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold text-zinc-100">Page not found</h1>
      <p className="mt-2 text-neutral-100">Try the homepage or features.</p>
      <div className="mt-6 space-x-3">
        <a href="/" className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2">Home</a>
        <a href="/features" className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2">Features</a>
      </div>
    </main>
  );
}
