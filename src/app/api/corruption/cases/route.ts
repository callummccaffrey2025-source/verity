import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  return NextResponse.json({
    items: [
      { id: "case_1", title: "Procurement irregularities — Agency X", status: "Allegation", updated: "2025-09-07", citations: [4, 5] },
      { id: "case_2", title: "Undeclared interest — Official Y", status: "Referred",   updated: "2025-09-05", citations: [6] },
    ],
  });
}
