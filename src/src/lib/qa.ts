// src/lib/qa.ts
import { openai } from "@/lib/openai";

export type Match = {
  id?: string;
  score?: number;                     // vector score
  metadata?: Record<string, any>;
};

export type Reranked = {
  id: string;
  score: number;                      // vector score (if provided)
  rel: number;                        // 0..1 LLM relevance
  title?: string;
  url?: string;
  text?: string;
  domain?: string;
};

function safe<T>(v: T | undefined, d: T): T { return (v as T) ?? d; }

export async function rerankMatches(
  q: string,
  matches: Match[],
  topN = 5
): Promise<Reranked[]> {
  const items = matches.map((m, i) => {
    const md = (m.metadata ?? {}) as Record<string, unknown>;
    return {
      i,
      id: String(m.id ?? i),
      score: Number(m.score ?? 0),
      title: (md["title"] as string) || "",
      url: (md["url"] as string) || "",
      text: (md["text"] as string) || "",
      domain: (md["domain"] as string) || "",
    };
  });

  if (items.length === 0) return [];

  const prompt = [
    `You are a ranking assistant. Given a user question and a list of passages,`,
    `rate each passage's relevance to the question on a 0..1 scale (1 = directly answers).`,
    `Return STRICT JSON as an array of { "i": number, "rel": number } with no extra text.`,
    ``,
    `Question: ${q}`,
    ``,
    `Passages:`,
    ...items.map(p =>
      `[${p.i}] title: ${p.title}\nurl: ${p.url}\n${p.text}`.slice(0, 5000)
    ),
    ``,
    `JSON:`
  ].join("\n");

  const resp = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      { role: "system", content: "Return only valid JSON. No commentary." },
      { role: "user", content: prompt },
    ],
  });

  const raw = resp.choices[0]?.message?.content ?? "[]";
  let scored: { i: number; rel: number }[] = [];
  try {
    scored = JSON.parse(raw);
  } catch {
    // Fallback: equal rel if JSON parsing fails
    scored = items.map((_, i) => ({ i, rel: 0.5 }));
  }

  // Clamp and sort
  const merged = scored
    .filter(s => Number.isFinite(s.i) && s.i >= 0 && s.i < items.length)
    .map(s => ({ ...items[s.i], rel: Math.max(0, Math.min(1, Number(s.rel) || 0)) }))
    .sort((a, b) => b.rel - a.rel)
    .slice(0, topN);

  // Shape output
  return merged.map(m => ({
    id: m.id,
    score: safe(m.score, 0),
    rel: m.rel,
    title: m.title,
    url: m.url,
    text: m.text,
    domain: m.domain,
  }));
}
