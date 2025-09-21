import { db } from "./db";

export type Hit = {
  sourceId: string;
  title: string;
  url: string;
  date?: string;
  snippet: string;
  score: number;
};

/**
 * Simple but effective ranking:
 * - Field boosts: title > text > url
 * - Exact word > prefix > substring
 * - Whole-phrase bonus
 * - Gentle recency boost (exp decay over ~1 year)
 * - Optional limit (default 50) for compatibility with callers
 */
export function search(q: string, limit = 50): Hit[] {
  const normQ = normalize(q);
  const terms = unique(tokenize(normQ).filter(t => t.length >= 2));
  if (terms.length === 0) return [];

  const phrase = escapeRegex(normQ.trim());
  const phraseRe = phrase ? new RegExp(`\\b${phrase}\\b`, "i") : null;

  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  const results: Hit[] = [];

  for (const s of db.sources()) {
    const titleRaw = String(s.title ?? "");
    const textRaw = String((s as any).text ?? "");
    const urlRaw = String(s.url ?? "");
    const dateRaw = s.date ? String(s.date) : undefined;

    const title = normalize(titleRaw);
    const body = normalize(textRaw);
    const url = normalize(urlRaw);

    let score = 0;

    for (const t of terms) {
      const w = escapeRegex(t);
      const wordRe = new RegExp(`\\b${w}\\b`, "g");
      const prefixRe = new RegExp(`\\b${w}[a-z0-9_-]*`, "g");

      score += 3 * count(title, wordRe);
      score += 2 * count(title, prefixRe);
      if (title.includes(t)) score += 1;

      score += 1 * count(body, wordRe);
      score += 0.5 * count(body, prefixRe);
      if (body.includes(t)) score += 0.25;

      if (url.includes(t)) score += 0.3;
    }

    if (phraseRe && (phraseRe.test(title) || phraseRe.test(body))) {
      score += 2;
    }

    if (dateRaw) {
      const ts = Date.parse(dateRaw);
      if (!Number.isNaN(ts)) {
        const days = Math.max(0, (now - ts) / dayMs);
        const recency = Math.exp(-days / 365);
        score *= 1 + 0.5 * recency;
      }
    }

    if (score > 0) {
      results.push({
        sourceId: String((s as any).id ?? ""),
        title: titleRaw,
        url: urlRaw,
        date: dateRaw,
        snippet: String((s as any).snippet ?? ""),
        score,
      });
    }
  }

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const at = a.date ? Date.parse(a.date) : NaN;
    const bt = b.date ? Date.parse(b.date) : NaN;
    const aValid = !Number.isNaN(at);
    const bValid = !Number.isNaN(bt);
    if (aValid && bValid && bt !== at) return bt - at;
    if (aValid !== bValid) return bValid ? 1 : -1;
    return a.title.localeCompare(b.title);
  });

  return results.slice(0, Math.max(1, limit));
}

/* ---------- helpers ---------- */

function normalize(s: string): string {
  const lower = s.toLowerCase();
  try {
    return lower.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  } catch {
    return lower.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  }
}

function tokenize(s: string): string[] {
  return s.split(/[^a-z0-9_-]+/i).filter(Boolean);
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function count(hay: string, re: RegExp): number {
  let c = 0;
  re.lastIndex = 0;
  for (let m = re.exec(hay); m; m = re.exec(hay)) c++;
  return c;
}
