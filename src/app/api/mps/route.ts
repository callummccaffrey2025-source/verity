import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function GET(){ 
  const mps = await db.mP.findMany({ orderBy:{ name:"asc" }});
  return NextResponse.json(mps);
}
