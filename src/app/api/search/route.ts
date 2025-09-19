import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q")||"").trim().toLowerCase();
  // TODO: swap mock for real adapters
  const data = {
    mps: q ? [{ id:"jane-citizen", name:"Jane Citizen MP", electorate:"Wentworth"}] : [],
    bills: q ? [{ id:"os-transparency-2025", title:"Online Safety (Transparency) Amendment Bill 2025"}] : [],
    news: []
  };
  return NextResponse.json(data);
}
