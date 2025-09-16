import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { email, consent, hp } = await req.json().catch(() => ({}) as any);

  // Honeypot: if present, just return ok without writing
  if (hp) return NextResponse.json({ ok: true });

  if (typeof email !== "string" || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  try {
    db.appendWaitlist(email, Boolean(consent));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/join] append failed", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
