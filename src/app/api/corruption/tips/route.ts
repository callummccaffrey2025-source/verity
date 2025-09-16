import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { message, files, consent } = body || {};
  if (!message) return NextResponse.json({ ok:false, error:"message required" }, { status: 400 });
  // TODO: persist securely; no promises of action or confidentiality.
  return NextResponse.json({ ok:true, received:{ message, files: files?.length ?? 0, consent: !!consent } });
}
