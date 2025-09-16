import { NextRequest, NextResponse } from "next/server";
import { search } from "@/lib/search";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { q } = await req.json().catch(() => ({ q: "" as string }));
  const question = (q || "").trim();
  if (!question) return NextResponse.json({ answer: "", citations: [] });

  const hits = search(question, 3);
  const citations = hits.map(h => {
    const s = db.sources().find(x => x.id === h.sourceId)!;
    return { sourceId: s.id, url: s.url, title: s.title, snippet: s.snippet };
  });

  // naive answer composer
  const bullets = hits.map((h, i) => `• ${h.title} [${i+1}]`).join("\n");
  const answer =
`Here’s what the record shows:
${bullets}

Each point links to its source.`;

  return NextResponse.json({ answer, citations }, { headers: { "Cache-Control": "no-store" } });
}
