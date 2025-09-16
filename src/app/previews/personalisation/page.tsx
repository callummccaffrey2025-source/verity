import { getPersona, Persona } from "@/lib/persona";
import PersonaSwitcher from "@/components/PersonaSwitcher";
import PreviewCard from "@/components/PreviewCard";

type Item = { title: string; subtitle?: string; href: string; img?: string; meta?: Record<string,string|number> };

const CARDS: Record<Persona, Item[]> = {
  citizen: [
    { title: "Daily Briefing", subtitle: "Top 5 facts in 60s", href: "/briefings/budget-2025", meta: { layout: "simple" } },
    { title: "Bills Today", subtitle: "What’s moving", href: "/bills", meta: { filters: "auto" } },
    { title: "Find Your MP", subtitle: "Quick lookup", href: "/mps", meta: { action: "search" } }
  ],
  power: [
    { title: "Bill Diffs", subtitle: "Compare amendments", href: "/bills", meta: { view: "diff" } },
    { title: "Amendment Watch", subtitle: "High-impact changes", href: "/bills", meta: { alerts: "on" } },
    { title: "Roll-call Votes", subtitle: "Track outcomes", href: "/mps", meta: { export: "csv" } }
  ],
  journalist: [
    { title: "Source Pack", subtitle: "Docs & provenance", href: "/briefings/budget-2025", meta: { citations: "inline" } },
    { title: "Ownership Map", subtitle: "Media links", href: "/ownership", meta: { mode: "investigate" } },
    { title: "Fact-check Kit", subtitle: "Claims & evidence", href: "/search", meta: { tools: 6 } }
  ],
};

export const revalidate = 0;

export default async function PersonalisationPreview() {
  const persona = getPersona();
  const items = CARDS[persona];
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Personalisation Preview</h1>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>Persona:</span>
          <PersonaSwitcher value={persona} />
        </div>
      </div>

      <p className="text-zinc-400 mt-2">
        This shows what a <span className="font-medium text-zinc-200">{persona}</span> sees. Switch persona to preview variants.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => <PreviewCard key={i} {...it} />)}
      </div>

      <div className="mt-8 text-xs text-zinc-500">
        Cookie: <code className="bg-zinc-900 px-2 py-1 rounded">v_persona={persona}</code>
      </div>
    </div>
  );
}
