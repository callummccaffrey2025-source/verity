export const metadata = {
  title: "Verity — Receipts, not spin",
  description: "Radical transparency for Australia.",
};
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <header className="sticky top-0 z-30 bg-black/70 backdrop-blur border-b border-neutral-900">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2"><div className="h-5 w-5 bg-green-600 rounded" /><span className="font-semibold">Verity</span></div>
            <nav className="hidden md:flex items-center gap-5 text-neutral-300">
              <a className="hover:text-white" href="/news">News</a>
              <a className="hover:text-white" href="/mp">MP</a>
              <a className="hover:text-white" href="/bills">Bills</a>
              <a className="hover:text-white" href="/ownership">Ownership</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-neutral-900 bg-black py-10 text-sm text-neutral-400 text-center">
          <p>Receipts, not spin. Radical transparency for everyone.</p>
        </footer>
      </body>
    </html>
  );
}
