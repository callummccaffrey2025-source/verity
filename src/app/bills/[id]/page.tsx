import { loadJSON } from "@/utils/load";
import StageTracker from "@/components/bills/StageTracker";
import DiffViewer from "@/components/bills/DiffViewer";
import ReceiptList from "@/components/ReceiptList";
export const dynamic="force-static";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const { params, searchParams } = props as any;
  const { id } = await params;
  const data = await loadJSON<{items: unknown[]}>("/data/bills.json");
  const bill = (data.items as { id: string }[]).find(x => x.id===id);
  if(!bill) return <div className="card p-6">Bill not found.</div>;
  return (<div>
    <h1 className="font-extrabold">{(bill as any).title}</h1>
    <p className="mt-1 text-neutral-100">{(bill as any).stage}</p>
    <StageTracker stage={(bill as any).stage}/>
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <h3 className="font-semibold">Diff</h3>
        <DiffViewer v1={(bill as any).v1} v2={(bill as any).v2}/>
      </div>
      <aside className="">
        <div className="card p-4">
          <div className="font-semibold">Receipts</div>
          <ReceiptList items={(bill as any).receipts}/>
          <a href={(bill as any).registerUrl} className="btn mt-3">Open register →</a>
          <div className="mt-4 text-sm text-neutral-100">{(bill as any).notes}</div>
        </div>
      </aside>
    </div>
  </div>);
}
