import Link from "next/link";

export function Header() {
  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-900/80 backdrop-blur px-6 py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
      <Link href="/" className="text-lg font-semibold text-white hover:text-emerald-400">
        Verity
      </Link>
      <nav className="text-sm text-zinc-400 flex gap-4 mt-2 sm:mt-0">
        <Link className="hover:text-emerald-400" href="/legislation">Legislation</Link>
        <Link className="hover:text-emerald-400" href="/roadmap">Roadmap</Link>
      </nav>
    </header>
  );
}
