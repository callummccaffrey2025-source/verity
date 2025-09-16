import Section from "../../../components/section";
import Container from "../../../components/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Find any page or section on Verity.",
  alternates: { canonical: "/search" },
  openGraph: { images: ["/og?title=Search&tag=Site"] },
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  let items: { title: string; href: string; group?: string }[] = [];

  if (q.trim()) {
    const base = (process.env.NEXT_PUBLIC_SITE_URL || "");
    const url = `${base}/api/search?q=${encodeURIComponent(q)}&limit=50`;
    try {
      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();
      items = json.items || [];
    } catch {
      items = [];
    }
  }

  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold">Search</h1>
        <p className="mt-2 text-neutral-400">Search pages and sections. Use <kbd className="rounded bg-white/10 px-1">⌘K</kbd> anytime.</p>

        <form method="get" className="mt-6 flex gap-2 max-w-2xl">
          <input
            name="q"
            defaultValue={q}
            placeholder="e.g. MP profiles, pricing, integrity"
            className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2"
            aria-label="Search query"
          />
          <button className="btn-primary">Search</button>
        </form>

        {!q && <p className="mt-6 text-neutral-500">Try a query above, or press <kbd className="rounded bg-white/10 px-1">⌘K</kbd>.</p>}

        {q && (
          <div className="mt-6">
            <div className="text-neutral-400 text-sm">Results for “{q}”</div>
            <div className="mt-3 grid gap-2">
              {items.length === 0 && <div className="text-neutral-500">No results.</div>}
              {items.map((it) => (
                <a key={it.href} className="card card-hover p-4 block" href={it.href}>
                  <div className="text-neutral-200">{it.title}</div>
                  {it.group && <div className="text-xs text-neutral-500 mt-1">{it.group}</div>}
                </a>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
