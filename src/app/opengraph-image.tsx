import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OG() {
  return new ImageResponse(
    (<div style={{display:"flex",height:"100%",width:"100%",background:"#0a0a0a",color:"#e5e7eb",padding:"60px",fontSize:64,lineHeight:1.1}}>
      <div>
        <div style={{ fontWeight:700, color:"#34d399" }}>Verity</div>
        <div>Transparency for Australia</div>
        <div style={{ fontSize:28, marginTop:16, color:"#9ca3af" }}>Receipts instead of spin — $1/month</div>
      </div>
    </div>), size
  );
}
