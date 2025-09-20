import Link from "next/link";
import { Suspense } from "react";
import { MPS } from "@/lib/data/mps";
import type { MP } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

function sortByName(a: MP, b: MP) {
  return a.name.localeCompare(b.name);
}

export default function MPsPage() {
  const mps = [...MPS].sort(sortByName);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Members of Parliament</h1>
      <p className="mt-2 text-sm text-neutral-300">
        Explore MPs, their attendance, voting patterns and recent positions.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="secondary">Total: {mps.length}</Badge>
        <Badge>Demo data</Badge>
      </div>

      <Suspense>
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {mps.map((mp) => (
            <li key={mp.id} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm text-zinc-200">
                  {mp.name.split(" ").map(w => w[0]).slice(0,2).join("")}
                </div>
                <div>
                  <Link href={`/mps/${mp.id}`} className="font-semibold hover:underline">
                    {mp.name}
                  </Link>
                  <div className="text-xs text-neutral-300">
                    {mp.electorate}{mp.state ? `, ${mp.state}` : ""} • {mp.party}{mp.since ? ` • Since ${mp.since}` : ""}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                  <div className="text-[11px] text-neutral-400">Attendance</div>
                  <div className="mt-1 text-lg font-semibold">{mp.attendancePct ?? "—"}%</div>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                  <div className="text-[11px] text-neutral-400">Party line</div>
                  <div className="mt-1 text-lg font-semibold">{mp.partyLinePct ?? "—"}%</div>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                  <div className="text-[11px] text-neutral-400">Integrity score</div>
                  <div className="mt-1 text-lg font-semibold">{mp.integrityGrade ?? "—"}</div>
                </div>
              </div>

              <div className="mt-3 text-xs text-neutral-300">
                Recent votes:&nbsp;
                {(mp.recentVotes ?? []).length
                  ? (mp.recentVotes ?? [])
                      .map(v => `${v.position} – ${v.title.replace("Bill","Amdt")}`)
                      .join("; ") + "."
                  : "—"}
              </div>
            </li>
          ))}
        </ul>
      </Suspense>
    </main>
  );
}
