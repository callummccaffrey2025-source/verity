import { headers } from "next/headers";

// Optional: FS fallback if HTTP fetch fails (Node runtime only)
async function fsFallback<T>(path: string): Promise<T> {
  try {
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");
    const file = join(process.cwd(), "public", path.replace(/^\/+/, ""));
    const raw = await readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`Failed to load ${path} via HTTP and FS fallback`);
  }
}

/**
 * loadJSON("/data/foo.json") — loads from /public/data/foo.json
 * - Server: builds absolute URL from headers (works on Vercel + localhost)
 * - Client: relative fetch just works
 * - Fallback: tries filesystem in Node runtime if HTTP fails
 */
export async function loadJSON<T = unknown>(path: string): Promise<T> {
  if (!path) throw new Error("loadJSON: missing path");
  const isRelative = path.startsWith("/");
  const isServer = typeof window === "undefined";

  // If absolute URL was passed, just fetch it.
  if (!isRelative) {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
    return res.json() as Promise<T>;
  }

  // Relative path (e.g., "/data/ground-pro.json")
  if (isServer) {
    const h = headers();
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
    const proto =
      h.get("x-forwarded-proto") ??
      (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");
    const url = `${proto}://${host}${path}`;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<T>;
    } catch {
      // Try filesystem (works in Node runtime; will throw on Edge)
      return fsFallback<T>(path);
    }
  }

  // Client-side fetch (browser)
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.json() as Promise<T>;
}
