import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CmdPalette from "@/components/CmdPalette";
import PersonaSwitcher from "@/components/PersonaSwitcher";

const inter = Inter({ subsets:["latin"], variable:"--font-inter", display:"swap" });

export const metadata: Metadata = {
  title: { default: "Verity", template: "%s · Verity" },
  description: "Truth-first briefings, bills, MPs, ownership.",
  metadataBase: new URL("http://localhost:3000")
};

export default function RootLayout({ children }:{ children:React.ReactNode }){
  return(<html lang="en" className={inter.variable}><body>
    <a className="skip-link" href="#content">Skip to content</a>
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
    <main id="content" className="mx-auto max-w-6xl p-6">{children}</main>
    <Footer />
    <CmdPalette />
  </body></html>);
}
