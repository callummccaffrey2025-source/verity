import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function GET(){ 
  const bills = await db.bill.findMany({ orderBy:{ introduced:"desc" }});
  return NextResponse.json(bills);
}
