export function formatPercent(n: unknown) {
  if (typeof n !== 'number' || !Number.isFinite(n)) return '—';
  if (n > 0 && n < 10) return `${n.toFixed(1)}%`;
  return `${Math.round(n)}%`;
}

function hasMsg(e: unknown): e is { message: unknown } {
  return typeof e === "object" && e !== null && "message" in e;
}
export const errToStr = (e: unknown) => hasMsg(e) ? String((e as {message:unknown}).message) : String(e);
