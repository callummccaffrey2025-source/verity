import type { ReactNode } from 'react';
import Link from 'next/link';
import Nav from './Nav';
import { Menu, Search, LogIn } from 'lucide-react';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-black/30">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
          <button className="md:hidden btn-outline px-3 py-2">
            <Menu className="h-4 w-4" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-brand-500 shadow-brand" />
            <span className="text-lg font-semibold">Verity</span>
          </Link>
          <Nav />
          <div className="ml-auto flex items-center gap-3">
            <Link href="/search" className="btn-outline"><Search className="h-4 w-4 mr-2" />Search</Link>
            <Link href="/join" className="btn"><LogIn className="h-4 w-4 mr-2" />Join</Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
      <footer className="mt-16 border-t border-white/10 text-center py-10 subtle">
        © {new Date().getFullYear()} Verity — Built for Australians
      </footer>
    </div>
  );
}
