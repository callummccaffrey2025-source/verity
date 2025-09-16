export const metadata = { title: "Corruption", description: "Corruption", alternates: { canonical: "/corruption" }, openGraph: { images: ["/og?title=Corruption"] } };

export const dynamic = "force-dynamic";

async function getJSON(path: string) {
  const r = await fetch(path, { cache: "no-store" });
  if (!r.ok) throw new Error(`Fetch failed: ${path}`);
  return r.json();
}

export default async function CorruptionPage() {
  const [signals, cases, entities] = await Promise.all([
    getJSON("/api/corruption/signals"),
    getJSON("/api/corruption/cases"),
    getJSON("/api/corruption/entities"),
  ]);

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">
      <section className="rounded-2xl p-4 border">
        <h1 className="text-2xl font-semibold">Corruption signals (NSW-first)</h1>
        <p className="text-sm opacity-70">Signals are risk indicators, not findings. Every item links to its sources.</p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl p-4 border">
          <h2 className="font-medium mb-2">Today’s signals</h2>
          <ul className="space-y-3">
            {signals.items.map((s: any) => (
              <li key={s.id} className="text-sm">
                <div className="font-medium">{s.title}</div>
                <div className="opacity-80">{s.reason} <span>[{s.citations.join(", ")}]</span></div>
                <div className="opacity-60">Score: {s.score}/5 • {s.jurisdiction}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl p-4 border">
          <h2 className="font-medium mb-2">Open cases</h2>
          <ul className="space-y-3">
            {cases.items.map((c: any) => (
              <li key={c.id} className="text-sm">
                <div className="font-medium">{c.title}</div>
                <div className="opacity-80">{c.status} • Updated {c.updated}</div>
                <div className="opacity-80">[{c.citations.join(", ")}]</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl p-4 border">
          <h2 className="font-medium mb-2">Entities</h2>
          <ul className="space-y-3">
            {entities.items.map((e: any) => (
              <li key={e.id} className="text-sm">
                <div className="font-medium">{e.name}</div>
                <div className="opacity-80">{e.type} • {e.jurisdiction}</div>
                <div className="opacity-80">Linked cases: {e.caseCount}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
