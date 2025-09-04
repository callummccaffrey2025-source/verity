import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";
import { getIndex } from "@/lib/pinecone";

export const runtime = "nodejs";

type AskBody = { q: string; pageSize?: number };

export async function POST(req: NextRequest) {
  let body: AskBody;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const q = body.q?.trim();
  const pageSize = typeof body.pageSize === "number" && body.pageSize > 0 ? body.pageSize : 3;
  if (!q) return NextResponse.json({ error: "Missing query" }, { status: 400 });

  const emb = await openai.embeddings.create({ model: "text-embedding-3-small", input: q });
  const vector = emb.data[0].embedding;

  const index = getIndex("verity-index");
  const queryRes = await index.query({ topK: pageSize, vector, includeMetadata: true });
  const matches = queryRes.matches ?? [];
  const context = matches
    .map((m) => (m.metadata as Record<string, unknown> | undefined)?.["text"])
    .filter(Boolean)
    .join("\n\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are Verity, a political explainer. Always cite sources." },
      { role: "user", content: `Question: ${q}\n\nContext:\n${context}` },
    ],
  });

  return NextResponse.json({
    answer: completion.choices[0]?.message?.content ?? "",
    sources: matches
      .map((m) => (m.metadata as Record<string, unknown> | undefined)?.["url"])
      .filter(Boolean),
  });
}
