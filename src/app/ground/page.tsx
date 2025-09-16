import NewsCard from "@/components/NewsCard";
import { loadJSON } from "@/utils/load";

type GroundData = {
  topics: string[];
  stories: {
    title: string; excerpt?: string; url: string; source: string;
    stance?: "left"|"center"|"right"|"neutral"; published_at: string; tags?: string[];
  }[];
};

export const revalidate = 0;

export default async function Ground() {
  const data = await loadJSON<GroundData>("/data/ground.json");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left rail (topics) */}
      <aside className="lg:col-span-2">
        <h2 className="text-sm font-semibold text-zinc-300 mb-2">Topics</h2>
        <ul className="space-y-1">
          {data.topics.map(t => (
            <li key={t}>
              <a href={`/ground?topic=${encodeURIComponent(t)}`} className="block rounded px-2 py-1 text-sm hover:bg-zinc-900/60">{t}</a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main feed */}
      <section className="lg:col-span-7 space-y-4">
        {data.stories.map((s, i) => <NewsCard key={i} story={s} />)}
      </section>

      {/* Right rail (compare coverage / highlights) */}
      <aside className="lg:col-span-3">
        <div className="rounded-2xl border brand-border p-4">
          <h3 className="text-sm font-semibold text-zinc-300">Compare coverage</h3>
          <p className="text-xs text-zinc-400 mt-1">Pick a topic on the left to see multi-source coverage patterns.</p>
          <div className="mt-3 text-xs text-zinc-400">
            <div>• Budget (12 sources)</div>
            <div>• Energy (9 sources)</div>
            <div>• Privacy (6 sources)</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
