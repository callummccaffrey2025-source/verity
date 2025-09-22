import { NextRequest, NextResponse } from "next/server";
import { search } from "../../../lib/search";
export async function POST(req: NextRequest){
  const { q } = await req.json().catch(()=>({ q:"" }));
  const results = await search(q||"");
  return NextResponse.json({ ok:true, ...results });
}
