export function ProgressBar({ value }: { value: number | null | undefined }) {
  const pct = typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
  return (
    <div className="h-2 w-full rounded-full bg-zinc-800">
      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
    </div>
  );
}
