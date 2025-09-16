import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export function GET() {
  const s = db.status() || {};
  const docCounts = { sources: db.sources().length, bills: db.bills().length, mps: db.mps().length };
  const lastIngest = s.lastIngest || { bills: null, hansard: null, media: null };
  const uptime30d = s.uptime30d || "99.9%";
  return NextResponse.json({ uptime30d, lastIngest, docCounts }, { headers:{ "Cache-Control":"s-maxage=30" }});
}
