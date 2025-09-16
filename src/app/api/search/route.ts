import { NextRequest, NextResponse } from "next/server";
import { search } from "@/lib/search";

export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const hits = q ? search(q, 20) : [];
  return NextResponse.json({ hits }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
}
