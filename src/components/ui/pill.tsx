type Variant = "neutral"|"success"|"danger"|"info";
const variants: Record<Variant,string> = {
  neutral: "border-zinc-700 text-zinc-300 bg-zinc-800/40",
  success: "border-emerald-600/40 text-emerald-300 bg-emerald-500/15",
  danger:  "border-rose-600/40 text-rose-300 bg-rose-500/15",
  info:    "border-sky-600/40 text-sky-300 bg-sky-500/15",
};
export default function Pill({
  children, variant="neutral", "aria-label": label, className=""
}:{ children: React.ReactNode; variant?: Variant; "aria-label"?: string; className?: string }){
  const cls = variants[variant] ?? variants.neutral;
  return (
    <span
      data-ui="pill"
      role="status"
      aria-label={label}
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${cls} ${className}`}
    >
      {children}
    </span>
  );
}
