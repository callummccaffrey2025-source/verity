import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const bill = db.bills().find(b => b.id === id);
  if (!bill) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const related = (bill.sources || []).map(id => db.sources().find(s => s.id === id)).filter(Boolean);
  return NextResponse.json({ bill, related }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
}
