// src/app/api/ingest/route.ts
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

console.log("[INGEST ROUTE LOADED]", __filename);

export async function GET() {
  return NextResponse.json({ ok: true, method: "GET", where: __filename });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  return NextResponse.json({ ok: true, method: "POST", where: __filename, received: body });
}
