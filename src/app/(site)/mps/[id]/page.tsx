import type { Metadata } from "next";

function titleCase(slug: string) {
  return slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const name = titleCase(params.id || "MP");
  return {
    title: `${name} — MP — Verity`,
    description: `${name} profile: electorate, party, votes, transparency score.`,
  };
}

export default async function MPDynamicPage({ params }: { params: { id: string } }) {
  const id = params.id;

  // Minimal server-side fetch of your static JSON (works in dev)
  // If you later move to a real API, swap this for a fetch to your backend.
  let mp: any = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/data/au/mp/andrew-hastie.json`, { cache: "no-store" });
    const data = await res.json();
    if (data.slug === id) mp = data;
  } catch (_) {}

  if (!mp) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">MP not found</h1>
        <p className="text-neutral-400">We couldn’t find <span className="text-white font-medium">{id}</span>. Try <a className="text-green-400 underline" href="/mp">the example MP</a>.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold">{mp.name}</h1>
        <div className="text-neutral-400">{mp.electorate} · {mp.party}</div>
        <div className="text-green-400 font-semibold mt-1">
          Transparency score: {Math.round((mp.transparency_score || 0)*100)}%
        </div>
      </header>

      <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 mt-4">
        <h2 className="font-semibold mb-2">Recent votes</h2>
        {(mp.recent_votes || []).map((v: any, i: number) => (
          <div key={i} className="flex items-center justify-between border-t border-neutral-800 py-2 first:border-0">
            <div>
              <div className="font-medium">{v.bill}</div>
              <div className="text-xs text-neutral-500">{v.issue} · {v.chamber} · {v.date}</div>
            </div>
            <span className={`px-2 py-1 rounded ${v.position==="For"?"bg-green-700":"bg-red-700"}`}>{v.position}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
