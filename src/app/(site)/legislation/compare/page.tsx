import { BILLS } from "@/lib/data/bills";
import Link from "next/link";

export const metadata = { title: "Compare Bills • Verity" };

export default function BillsCompare() {
  const cols = ["Title","Stage","Introduced by","Predicted pass","Your MP"];
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Compare bills</h1>
      <p className="mt-2 text-sm text-neutral-300">
        Snapshot across current legislation. Click a bill for full receipts and history.
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full min-w-[720px] border-separate border-spacing-0">
          <thead className="bg-zinc-950/60 text-left text-sm text-neutral-300">
            <tr>{cols.map(c => (
              <th key={c} className="sticky top-0 z-10 border-b border-zinc-800 px-4 py-3 font-medium">{c}</th>
            ))}</tr>
          </thead>
          <tbody className="text-sm">
            {BILLS.map(b => (
              <tr key={b.id} className="odd:bg-zinc-950/40 even:bg-zinc-950/20 hover:bg-zinc-900/30">
                <td className="border-b border-zinc-800 px-4 py-3">
                  <Link href={`/bills/${b.id}`} className="font-medium hover:underline">{b.title}</Link>
                </td>
                <td className="border-b border-zinc-800 px-4 py-3">{b.stage}</td>
                <td className="border-b border-zinc-800 px-4 py-3">{(b.introduced ?? "").replace(/-/g,' ')}</td>
                <td className="border-b border-zinc-800 px-4 py-3">{b.predictedPassPct ?? "—"}%</td>
                <td className="border-b border-zinc-800 px-4 py-3">{b.yourMPPosition ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        Prediction/position values are illustrative placeholders in this demo build.
      </p>
    </main>
  );
}
