
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = { title: "Bills — Verity", description: "Browse bills." };

export default function BillsIndex() {
  const rows = db.bills().slice(0, 100);
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-serif font-extrabold">Bills</h1>
      <div className="mt-6 divide-y divide-neutral-900 border border-neutral-900 rounded-lg">
        {rows.map((b) => (
          <Link key={b.id} href={"/bills/" + b.id} className="block p-4 hover:bg-neutral-900/40">
            <div className="font-medium">{b.title}</div>
            <div className="text-sm text-neutral-400">
              {b.stage} · {(b.last_updated ? b.last_updated.slice(0, 10) : "—")}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
