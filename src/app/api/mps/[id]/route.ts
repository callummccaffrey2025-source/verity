import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const mp = db.mps().find(m => m.id === id);
  if (!mp) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const related = db.sources().filter(s => s.text.includes(mp.name) || s.title.includes(mp.name)).slice(0,10);
  return NextResponse.json({ mp, related }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
}
