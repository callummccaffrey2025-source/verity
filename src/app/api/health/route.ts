import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, any> = {
    openaiKey: Boolean(process.env.OPENAI_API_KEY),
    pineconeKey: Boolean(process.env.PINECONE_API_KEY),
    indexName: process.env.VERITY_INDEX_NAME || "verity-index",
  };

  try {
    if (checks.openaiKey) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      await openai.models.list();
      checks.openaiOK = true;
    }
  } catch (e: any) {
    checks.openaiOK = false;
    checks.openaiError = String(e?.message ?? e);
  }

  try {
    if (checks.pineconeKey) {
      const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
      const idx = pc.index(checks.indexName);
      await idx.describeIndexStats();
      checks.pineconeOK = true;
    }
  } catch (e: any) {
    checks.pineconeOK = false;
    checks.pineconeError = String(e?.message ?? e);
  }

  return NextResponse.json({ ok: true, checks });
}
