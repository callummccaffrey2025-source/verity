
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata = { title: "MPs — Verity", description: "Browse MPs." };

export default function MPsIndex() {
  const rows = db.mps().slice(0, 100);
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-serif font-extrabold">MPs</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((m) => (
          <Link
            key={m.id}
            href={"/mps/" + m.id}
            className="block rounded border border-neutral-900 p-4 hover:border-emerald-600"
          >
            <div className="font-medium">{m.name}</div>
            <div className="text-sm text-neutral-400">
              {m.party} · {m.electorate}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
