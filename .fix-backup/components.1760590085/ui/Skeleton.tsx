export function Skeleton({ className }: { className?: string }) {
  return <div className={["animate-pulse rounded-md bg-white/10", className].filter(Boolean).join(" ")} />;
}
