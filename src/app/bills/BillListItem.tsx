import { ProgressBar } from "@/components/ui/progressbar";

export function BillListItem({
  title, stage, predictedPass, supportSplit,
}: { title: string; stage: string; predictedPass: number | null; supportSplit?: { support: number; oppose: number } }) {
  return (
    <div className="rounded-2xl border border-zinc-800 p-5 hover:border-zinc-700">
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-xs">{stage}</span>
        <button className="ml-auto rounded-full border border-zinc-700 px-2 py-0.5 text-xs hover:border-zinc-600" aria-pressed="false">
          Follow
        </button>
      </div>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>

      <div className="mt-4 flex items-center gap-3">
        <div className="min-w-[140px] text-sm text-zinc-400">Predicted pass</div>
        <div className="w-40"><ProgressBar value={predictedPass ?? 0} /></div>
        <div className="text-sm tabular-nums">{predictedPass ?? "—"}%</div>
      </div>

      {supportSplit && (
        <div className="mt-3 text-xs text-zinc-400">
          Support {supportSplit.support}% · Oppose {supportSplit.oppose}%
        </div>
      )}
    </div>
  );
}
