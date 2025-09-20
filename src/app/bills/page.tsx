import Link from "next/link";
import { BILLS } from "@/lib/data/bills";
import type { Bill } from "@/lib/types-compat";
import { Badge } from "@/components/ui/badge";

export default function BillsPage() {
  const bills: Bill[] = BILLS;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Bills</h1>
      <p className="mt-2 text-sm text-neutral-300">
        Track the progress and likely impact of legislation.
      </p>

      <ul className="mt-6 space-y-4">
        {bills.map((bill) => (
          <li key={bill.id} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link href={`/bills/${bill.id}`} className="text-lg font-semibold hover:underline">
                  {bill.title}
                </Link>
                <p className="mt-1 text-sm text-neutral-300">
                  {bill.summary ?? "Plain-language summary coming soon."}
                </p>
              </div>
              <Badge variant="outline" className="whitespace-nowrap">Stage: {bill.stage}</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="success">
                Predicted pass {(bill.predictedPassPct ?? 62)}%
              </Badge>
              <Badge variant="secondary">
                Your MP: {bill.yourMPPosition ?? "—"}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
