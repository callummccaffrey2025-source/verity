import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// in-memory token buckets per IP+route (resets on cold start)
const buckets: Map<string, { tokens: number; ts: number }> = new Map();
const WINDOW_MS = 60_000;       // 1 min window
const MAX_TOKENS = 30;          // 30 req/min per IP+route

function key(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const path = new URL(req.url).pathname.replace(/\/+/g, "/");
  return `${ip}:${path}`;
}

export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  if (!pathname.startsWith("/api/")) return NextResponse.next();

  // Very light input guard
  const q = req.method === "GET" ? (req.nextUrl.searchParams.get("q") || "") : "";
  if (q.length > 2000) return NextResponse.json({ error: "Query too long" }, { status: 400 });

  // Token bucket
  const k = key(req);
  const now = Date.now();
  const b = buckets.get(k) ?? { tokens: MAX_TOKENS, ts: now };
  const elapsed = now - b.ts;
  const refill = Math.floor(elapsed / WINDOW_MS) * MAX_TOKENS;
  b.tokens = Math.min(MAX_TOKENS, b.tokens + (refill > 0 ? refill : 0));
  b.ts = refill > 0 ? now : b.ts;

  if (b.tokens <= 0) {
    buckets.set(k, b);
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  b.tokens -= 1;
  buckets.set(k, b);
  return NextResponse.next();
}

export const config = { matcher: ["/api/:path*"] };
