import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  return NextResponse.json({
    items: [
      { id: "ent_p_1", name: "Official Y",        type: "person",       jurisdiction: "NSW", caseCount: 1 },
      { id: "ent_o_1", name: "Supplier Z Pty Ltd", type: "organisation", jurisdiction: "NSW", caseCount: 1 },
    ],
  });
}
