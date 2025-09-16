import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  return NextResponse.json({
    items: [
      { id: "sig_1", title: "Donation → tender proximity (14 days)", reason: "Supplier donated within 14 days of award decision.", score: 4, jurisdiction: "NSW", citations: [1, 2] },
      { id: "sig_2", title: "Unregistered lobbyist meeting", reason: "Diary lists meeting with entity not in lobbyist register.", score: 3, jurisdiction: "NSW", citations: [3] },
    ],
  });
}
