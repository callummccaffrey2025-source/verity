import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verity",
  description: "Truth-first briefings, bills, MPs, ownership.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-zinc-800 px-4 py-3">
          <div className="mx-auto max-w-6xl flex items-center justify-between">
            <a href="/" className="font-semibold">Verity</a>
            <nav className="text-sm text-zinc-400 flex gap-4">
              <a href="/previews/site">Previews</a>
              <a href="/bills">Bills</a>
              <a href="/mps">MPs</a>
              <a href="/ownership">Ownership</a>
              <a href="/search">Search</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}
