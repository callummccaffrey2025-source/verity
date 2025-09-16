import "./globals.css";
import type { Metadata } from "next";
import PersonaSwitcher from "@/components/PersonaSwitcher";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Verity",
  description: "Truth-first briefings, bills, MPs, ownership.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header px-4 py-3">
          <div className="mx-auto max-w-6xl flex items-center justify-between">
            <a href="/" className="font-semibold text-lg" style={{color:"var(--brand)"}}>Verity</a>
            <Nav />
            <div className="flex items-center gap-3">
              <a href="/join-waitlist" className="text-sm text-zinc-300 hover:text-white">Join $1</a>
              <PersonaSwitcher />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}
