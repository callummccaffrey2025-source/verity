import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export function GET() {
  return NextResponse.json(db.bills(), {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
