import Link from "next/link";

import { sbRest } from "@/lib/supabase";
import type { Bill } from "@/types/bills";

type BillSummary = Pick<
  Bill,
  "id" | "title" | "chamber" | "stage" | "updated_at"
>;

export const dynamic = "force-dynamic";

export default async function Page() {
  const res = await sbRest(
    "bills_mv?select=id,title,chamber,stage,updated_at&order=title.asc",
    { next: { revalidate: 30 } }
  );
  const bills = (await res.json()) as BillSummary[];
  const hasBills = bills.length > 0;
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Legislation</h1>
      <ul className="space-y-2">
        {hasBills ? (
          bills.map((bill) => (
            <li key={bill.id}>
              <Link
                className="text-emerald-400 hover:underline"
                href={`/legislation/${bill.id}`}
              >
                {bill.title ?? "Untitled bill"}
              </Link>
              <span className="text-zinc-400 ml-2">
                ({bill.chamber ?? "Unknown chamber"} • {bill.stage ?? "Unknown stage"})
              </span>
              <div className="text-[10px] text-zinc-500">
                Updated{" "}
                {new Date(bill.updated_at ?? Date.now()).toLocaleDateString()}
              </div>
            </li>
          ))
        ) : (
          <li className="text-zinc-400">No bills found.</li>
        )}
      </ul>
    </main>
  );
}
