type Receipt = { label: string; url: string };
function toReceipts(x: unknown): Receipt[] {
  if (!Array.isArray(x)) return [];
  const out: Receipt[] = [];
  for (const r of x) {
    if (typeof r === "object" && r && "label" in r && "url" in r) {
      const label = String((r as {label:unknown}).label);
      const url   = String((r as {url:unknown}).url);
      out.push({ label, url });
    }
  }
  return out;
}
type BillDetail = { title?: string; stage?: string; v1?: string; v2?: string; receipts?: unknown[]; registerUrl?: string; notes?: string };
import { loadJSON } from "@/utils/load";
import StageTracker from "@/components/bills/StageTracker";
import DiffViewer from "@/components/bills/DiffViewer";
import ReceiptList from "@/components/ReceiptList";

import type { Metadata } from "next";
export async function generateMetadata({ params }:{ params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const title = "Bill · " + id;
  const description = "Bill details, stage and predicted passage.";
  return {
    title,
    description,
    alternates: { canonical: "/bills/" + id },
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export const dynamic="force-static";
 
export default async function Page({ params }: { params: Promise<{ id: string }> }){
  
  const { id } = await params;
  const data = await loadJSON<{items: unknown[]}>("/data/bills.json");
  const bill = (data.items as { id: string }[]).find(x => x.id===id);
  if(!bill) return <div className="card p-6">Bill not found.</div>;
  return (<div>
    <h1 className="font-extrabold">{(bill as BillDetail).title}</h1>
    <p className="mt-1 text-neutral-100">{(bill as BillDetail).stage}</p>
    <StageTracker stage={(bill as BillDetail).stage ?? ""} />
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <h3 className="font-semibold">Diff</h3>
        <DiffViewer v1={(bill as BillDetail).v1 ?? ""} v2={(bill as BillDetail).v2 ?? ""} />
      </div>
      <aside className="">
        <div className="card p-4">
          <div className="font-semibold">Receipts</div>
          <ReceiptList items={toReceipts((bill as BillDetail).receipts)} />
          <a href={(bill as BillDetail).registerUrl} className="btn mt-3">Open register →</a>
          <div className="mt-4 text-sm text-neutral-100">{(bill as BillDetail).notes}</div>
        </div>
      </aside>
    </div>
  </div>);
}
