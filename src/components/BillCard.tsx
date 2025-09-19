import type { Bill } from "@/lib/types";
export default function BillCard({ bill }: { bill: Bill }) {
  return (
    <article className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 hover:border-emerald-500/40">
      <div className="flex items-center justify-between"><h4 className="font-semibold">{bill.title}</h4><span className="text-xs text-neutral-100">Stage: {bill.stage}</span></div>
      <p className="mt-1 text-sm text-neutral-100">{bill.summary}</p>
      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className="rounded-full bg-emerald-600/20 px-2 py-1 text-emerald-300">Predicted pass {(bill.predictedPassPct ?? 62)}%</span>
        <span className="rounded-full bg-zinc-800 px-2 py-1 text-neutral-100">Your MP: {(bill.yourMPPosition ?? "—")}</span>
      </div>
    </article>
  );
}
