import openai from "../openai";

export type Match = {
  id?: string;
  score?: number;
  metadata?: Record<string, any>;
};

export type Reranked = {
  id: string;
  score: number;   // vector score
  rel: number;     // 0..1 LLM relevance
  title?: string;
  url?: string;
  text?: string;
  domain?: string;
};

function domainOf(url?: string) {
  try { return url ? new URL(url).hostname.replace(/^www\./, "") : undefined; }
  catch { return undefined; }
}

/** Cheap LLM re-rank: returns topN with relevance score. */
export async function rerankMatches(q: string, matches: Match[], topN = 5): Promise<Reranked[]> {
  const items = matches.map((m, i) => {
    const md = (m.metadata ?? {}) as Record<string, unknown>;
    return {
      i,
      id: String(m.id ?? i),
      score: Number(m.score ?? 0),
      title: (md["title"] as string) || undefined,
      url: (md["url"] as string) || undefined,
      text: (md["text"] as string) || undefined,
    };
  });

  if (items.length === 0) return [];

  const prompt =
    [
      `Question: ${q}`,
      `Rate each passage's relevance 0..1 (1 = directly answers). Return JSON array of {i, rel}.`,
      ...items.map((x, idx) => `P${idx}: ${x.title ?? ""}\n${x.url ?? ""}\n${x.text ?? ""}`)
    ].join("\n\n");

  const out = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      { role: "system", content: "Only score relevance. Output JSON only." },
      { role: "user", content: prompt },
    ],
  });

  let rel = new Map<number, number>();
  try {
    const txt = out.choices?.[0]?.message?.content ?? "[]";
    const jsonish = txt.match(/\[[\s\S]*\]/)?.[0] ?? "[]";
    const arr = JSON.parse(jsonish) as Array<{ i: number; rel: number }>;
    for (const r of arr) rel.set(r.i, Math.max(0, Math.min(1, Number(r.rel) || 0)));
  } catch {}

  return items
    .map((x) => ({
      id: x.id,
      score: x.score,
      rel: rel.get(x.i) ?? 0,
      title: x.title,
      url: x.url,
      text: x.text,
      domain: domainOf(x.url),
    }))
    .sort((a, b) => (b.rel - a.rel) || (b.score - a.score))
    .slice(0, topN);
}

