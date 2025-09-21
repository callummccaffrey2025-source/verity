export default function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-3">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="tabular text-lg font-semibold">{value}</div>
    </div>
  );
}
