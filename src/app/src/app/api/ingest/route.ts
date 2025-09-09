// src/app/api/ingest/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import crypto from "node:crypto";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

function toDomain(u?: string) {
  try {
    return u ? new URL(u).hostname.replace(/^www\./, "") : "";
  } catch {
    return "";
  }
}

function toEpochDays(iso?: string) {
  const t = iso ? Date.parse(iso) : NaN;
  return Number.isFinite(t) ? Math.floor(t / 86_400_000) : undefined;
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function chunkText(text: string, size = 800, overlap = 150) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const out: string[] = [];
  for (let i = 0; i < words.length; ) {
    const end = Math.min(words.length, i + size);
    out.push(words.slice(i, end).join(" "));
    i = end - overlap;
    if (i < 0) i = 0;
  }
  return out.filter(Boolean);
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "ingest" });
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY || !process.env.PINECONE_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY or PINECONE_API_KEY" },
      { status: 500 }
    );
  }

  const indexName = process.env.VERITY_INDEX_NAME || "verity-index";
  const index = pc.index(indexName);

  let body: {
    url?: string;
    title?: string;
    text?: string;
    date?: string;            // ISO yyyy-mm-dd
    jurisdiction?: string;    // e.g. "NSW"
    isOfficial?: boolean;
    chunkSize?: number;       // default 800 word-ish
    chunkOverlap?: number;    // default 150
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { url, title = "", text, date, jurisdiction, isOfficial } = body;
  if (!url && !text) {
    return NextResponse.json({ error: "Provide url or text" }, { status: 400 });
  }

  // 1) get text (prefer provided `text`, else fetch & strip)
  let sourceText = (text || "").trim();
  if (!sourceText && url) {
    try {
      const r = await fetch(url, { headers: { "user-agent": "VerityBot/1.0" } });
      const html = await r.text();
      sourceText = stripHtml(html);
    } catch (e: any) {
      return NextResponse.json(
        { error: `Fetch failed for ${url}: ${String(e)}` },
        { status: 502 }
      );
    }
  }
  if (!sourceText) {
    return NextResponse.json({ error: "No text to ingest" }, { status: 400 });
  }

  // 2) chunk
  const chunkSize = typeof body.chunkSize === "number" ? body.chunkSize : 800;
  const chunkOverlap =
    typeof body.chunkOverlap === "number" ? body.chunkOverlap : 150;
  const chunks = chunkText(sourceText, chunkSize, chunkOverlap);
  if (chunks.length === 0) {
    return NextResponse.json({ error: "Empty content after chunking" }, { status: 400 });
  }

  // 3) embed
  const emb = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: chunks,
  });
  const vectors = emb.data.map((d, i) => ({
    id: crypto
      .createHash("sha1")
      .update((url || "text://local") + "#" + i)
      .digest("hex"),
    values: d.embedding,
    metadata: {
      url,
      title,
      text: chunks[i],
      domain: toDomain(url),
      date,
      epochDays: toEpochDays(date),
      jurisdiction,
      isOfficial: Boolean(isOfficial),
      chunkIndex: i,
      chunkCount: chunks.length,
    } as Record<string, any>,
  }));

  // 4) upsert
  await index.upsert(vectors);

  return NextResponse.json({
    ok: true,
    upserts: vectors.length,
    index: indexName,
    url,
    title,
  });
}
