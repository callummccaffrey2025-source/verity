export default function Empty({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
      <div className="text-lg font-semibold mb-1">{title}</div>
      {hint ? <div className="subtle">{hint}</div> : null}
    </div>
  );
}
