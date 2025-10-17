/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/bills/${params.id}`).catch(()=>null);
  const bill = res && res.ok ? await res.json() : { title: `Bill ${params.id}` };
  return new ImageResponse(
    (
      <div style={{ width: "1200px", height: "630px", display: "flex", padding: 48, background: "linear-gradient(135deg,#0b0b0b,#1a1a1a)" }}>
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"space-between", width:"100%" }}>
          <div style={{ fontSize: 42, color: "white", opacity:.75 }}>Verity</div>
          <div style={{ fontSize: 64, color: "white", fontWeight: 700, lineHeight: 1.1 }}>{bill.title}</div>
          <div style={{ fontSize: 28, color: "white", opacity:.8 }}>Parliament of Australia</div>
        </div>
      </div>
    ),
    size
  );
}
