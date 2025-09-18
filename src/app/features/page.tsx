export default function FeaturesPage() {
  const items = [
    { title: "Collect", body: "Ingest from major outlets and registers with provenance." },
    { title: "Compare", body: "Side-by-side receipts with bias bars and ownership context." },
    { title: "Brief",   body: "Bill diffs, stage trackers, MP signals — all cited." },
    { title: "Share",   body: "Export and share receipts anywhere in one click." },
  ];
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold text-zinc-100">Features</h1>
      <p className="mt-2 text-zinc-400">What you get for $1/month.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <article key={it.title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <h2 className="text-lg font-medium text-zinc-100">{it.title}</h2>
            <p className="mt-2 text-sm text-zinc-400">{it.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
