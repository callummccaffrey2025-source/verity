import "./globals.css";
import type { Metadata } from "next";
import PersonaSwitcher from "@/components/PersonaSwitcher";

export const metadata: Metadata = {
  title: "Verity",
  description: "Truth-first briefings, bills, MPs, ownership.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header px-4 py-3">
          <div className="mx-auto max-w-6xl flex items-center justify-between">
            <a href="/" className="font-semibold text-lg brand hover:no-underline">Verity</a>
            <nav className="text-sm text-zinc-300 hidden md:flex gap-5">
              <a href="/previews/site">Previews</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/ground">Ground</a>
              <a href="/bills">Bills</a>
              <a href="/mps">MPs</a>
              <a href="/ownership">Ownership</a>
              <a href="/search">Search</a>
            </nav>
            <div className="flex items-center gap-4">
              <a href="/join-waitlist" className="text-sm text-zinc-300 hover:text-white">Join</a>
              <a href="/pricing" className="text-sm text-zinc-300 hover:text-white">Pricing</a>
              <PersonaSwitcher />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}
