import { loadJSON } from "@/utils/load";
import StageTracker from "@/components/bills/StageTracker";
import DiffViewer from "@/components/bills/DiffViewer";
import ReceiptList from "@/components/ReceiptList";
export const dynamic="force-static";
export default async function Bill({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await loadJSON<{items:any[]}>("/data/bills.json");
  const bill = data.items.find(x=>x.id===id);
  if(!bill) return <div className="card p-6">Bill not found.</div>;
  return (<div>
    <h1 className="font-extrabold">{bill.title}</h1>
    <p className="mt-1 text-zinc-400">{bill.stage}</p>
    <StageTracker stage={bill.stage}/>
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <h3 className="font-semibold">Diff</h3>
        <DiffViewer v1={bill.v1} v2={bill.v2}/>
      </div>
      <aside className="">
        <div className="card p-4">
          <div className="font-semibold">Receipts</div>
          <ReceiptList items={bill.receipts}/>
          <a href={bill.registerUrl} className="btn mt-3">Open register →</a>
          <div className="mt-4 text-sm text-zinc-400">{bill.notes}</div>
        </div>
      </aside>
    </div>
  </div>);
}
