import { NextRequest, NextResponse } from "next/server";
import { buildBriefing } from "@/lib/briefings";
import type { AlertsType } from "@/lib/briefings";

export function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams.get("alerts");
  let alerts: AlertsType = {};
  try {
    if (p) alerts = JSON.parse(Buffer.from(p, "base64").toString("utf8"));
  } catch {}
  const items = buildBriefing(alerts);
  return NextResponse.json({ items }, { headers: { "Cache-Control": "no-store" } });
}
