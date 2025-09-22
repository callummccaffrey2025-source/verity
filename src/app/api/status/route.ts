import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function GET(){
  try{
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok:true });
  }catch(e:any){
    return NextResponse.json({ ok:false, error:e?.message||"db error" },{ status:500 });
  }
}
