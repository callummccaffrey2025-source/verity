// -nocheck
import { NextResponse } from 'next/server';

type TrendingItem = {
  id: string;
  title: string;
  chamber: 'House' | 'Senate' | 'Assembly' | 'Legislative Council' | 'Legislative Assembly';
  lastMovementAt: string;
  status: string;
  url?: string;
};

function parseSeed(): TrendingItem[] | null {
  if (process.env.NEXT_PUBLIC_SHOW_TRENDING !== '1') return null;
  const raw = process.env.TRENDING_JSON;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    const normalized = parsed
      .filter((x) => x && typeof x === 'object')
      .map((x: any) => ({
        id: String(x.id ?? ''),
        title: String(x.title ?? ''),
        chamber: String(x.chamber ?? ''),
        lastMovementAt: String(x.lastMovementAt ?? ''),
        status: String(x.status ?? ''),
        url: x.url ? String(x.url) : undefined,
      }))
      .filter(
        (x) =>
          x.id &&
          x.title &&
          x.chamber &&
          x.lastMovementAt &&
          x.status &&
          !Number.isNaN(Date.parse(x.lastMovementAt))
      );
    if (normalized.length === 0) return null;
    return normalized;
  } catch {
    return null;
  }
}

export const revalidate = 60;

export async function GET() {
  const data = parseSeed();
  if (!data) return new NextResponse(null, { status: 204 });
  return NextResponse.json(data);
}
