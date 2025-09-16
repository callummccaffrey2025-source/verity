import type { ReactNode } from "react";
import AskSection from "@/components/product/AskSection";
import SearchSection from "@/components/product/SearchSection";
import BillsSection from "@/components/product/BillsSection";
import MPsSection from "@/components/product/MPsSection";
import AlertsBriefingsSection from "@/components/product/AlertsBriefingsSection";

export const metadata = {
  title: "Product — Verity",
  description: "Ask with citations, search sources, track bills, browse MPs, build alerts.",
  alternates: { canonical: "/product" },
  openGraph: { images: ["/og?title=Product"] },
};

function Card({ id, title, subtitle, children }:{
  id: string; title: string; subtitle: string; children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id + "-h"} className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
      <h3 id={id + "-h"} className="text-emerald-400 font-semibold">{title}</h3>
      <p className="text-sm text-neutral-400 mb-3">{subtitle}</p>
      <div className="rounded-lg bg-neutral-900/40 border border-neutral-800 p-3">{children}</div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card id="ask"    title="Ask"     subtitle="Clear answers with citations."><AskSection /></Card>
        <Card id="search" title="Search"  subtitle="Bills, Hansard, press releases in one place."><SearchSection /></Card>
        <Card id="bills"  title="Bill tracker" subtitle="Follow changes over time with diffs."><BillsSection /></Card>
        <Card id="mps"    title="MP profiles"  subtitle="Positions, voting, integrity signals."><MPsSection /></Card>
        <Card id="alerts" title="Alerts & briefings" subtitle="Daily updates on topics, bills, or MPs."><AlertsBriefingsSection /></Card>
      </div>
    </main>
  );
}
