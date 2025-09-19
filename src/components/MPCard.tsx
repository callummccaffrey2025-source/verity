import type { MP } from "@/lib/types";
export default function MPCard({ mp }: { mp: MP }) {
  return (
    <article className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 hover:border-emerald-500/40">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500" />
        <div><h4 className="font-semibold">{mp.name}</h4><p className="text-xs text-neutral-100">{mp.electorate} • {mp.party} • Since {mp.since}</p></div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3"><div className="text-[11px] text-neutral-100">Attendance</div><div className="mt-1 text-lg font-semibold">{mp.attendancePct}%</div></div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3"><div className="text-[11px] text-neutral-100">Party line</div><div className="mt-1 text-lg font-semibold">{mp.partyLinePct}%</div></div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3"><div className="text-[11px] text-neutral-100">Integrity score</div><div className="mt-1 text-lg font-semibold">{mp.integrityGrade}</div></div>
      </div>
      <div className="mt-4 text-xs text-neutral-100">Recent votes: {mp.recentVotes.map(v => `${v.position} – ${v.title.replace("Bill","Amdt")}`).join("; ")}.</div>
    </article>
  );
}
