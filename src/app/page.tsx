'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Newspaper, Scale, Users, BadgeDollarSign, Search, BarChart3, ScrollText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { SearchHero } from "@/components/home/SearchHero";

const mpSample = { name: "Jane Citizen MP", party: "Liberal Party", electorate: "Wentworth (NSW)", score: 82, lastVoted: "18 Sep 2025", streak: "+5" };
const billSample = { title: "Online Safety (Transparency) Amendment Bill 2025", chamber: "House of Representatives", stage: "Second Reading", updated: "18 Sep 2025", stanceSplit: { support: 56, oppose: 44 } };
const newsSample = [
  { title: "Senate committee releases report on privacy overhaul", ts: "19 Sep 2025", src: "ParlInfo" },
  { title: "Cost of living package passes lower house", ts: "18 Sep 2025", src: "Hansard" },
  { title: "High Court hears challenge on digital ID bill", ts: "17 Sep 2025", src: "ABC" },
];

export default function Page() {
  const [query, setQuery] = useState("");
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2"><Sparkles className="h-4 w-4"/><span>Alpha preview · $1/mo founding plan</span></div>
          <Button size="sm" variant="secondary" className="h-8">Join waitlist</Button>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <span className="font-semibold tracking-tight">Verity</span>
            <Badge className="text-white/90">v0.1 preview</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-100">
            <a href="/news" className="hover:text-white flex items-center gap-2"><Newspaper className="h-4 w-4"/>News</a>
            <a href="/bills" className="hover:text-white flex items-center gap-2"><ScrollText className="h-4 w-4"/>Bills</a>
            <a href="/mps" className="hover:text-white flex items-center gap-2"><Users className="h-4 w-4"/>MPs</a>
            <a href="/dashboard" className="hover:text-white flex items-center gap-2"><BarChart3 className="h-4 w-4"/>Dashboard</a>
            <a href="/pricing" className="hover:text-white flex items-center gap-2"><BadgeDollarSign className="h-4 w-4"/>Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-neutral-100 hover:text-white">Log in</Button>
            <Button variant="secondary">Join</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Australia’s civic intelligence layer
            </motion.h1>
            <p className="mt-4 text-neutral-100 text-lg leading-relaxed">
              Verity tracks bills, votes, MPs, and media—so you can see what’s real, what matters, and what changed today. Radical transparency, $1/month.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="primary">Get started <ArrowRight className="ml-2 h-4 w-4"/></Button>
              <Button variant="outline">See live demo</Button>
              <div className="flex items-center gap-2 text-neutral-100 text-sm">
                <Shield className="h-4 w-4"/> No ads · Cancel anytime
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-70">
              {["Hansard", "ParlInfo", "ABS", "AEC"].map((t) => (
                <div key={t} className="rounded-xl border border-white/10 p-3 text-center text-sm">{t}</div>
              ))}
            </div>
          </div>

          {/* Search & live tiles */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Try it</CardTitle>
                <CardDescription>Search a bill, MP, or topic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-100"/>
                    <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="e.g. Privacy Act, Voice referendum, digital ID" className="pl-9"/>
                  </div>
                  <Button variant="outline">Search</Button>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <Card className="bg-neutral-950/60">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4"/>MP Spotlight</CardTitle>
                      <CardDescription>Wentworth (NSW)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{mpSample.name}</div>
                          <div className="text-xs text-neutral-100">{mpSample.party}</div>
                        </div>
                        <Badge className="bg-emerald-600/80 text-white">Score {mpSample.score}</Badge>
                      </div>
                      <div className="text-xs text-neutral-100">Last vote: {mpSample.lastVoted} · Streak {mpSample.streak}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-neutral-950/60">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2"><Scale className="h-4 w-4"/>Bill Tracker</CardTitle>
                      <CardDescription>{billSample.chamber} · {billSample.stage}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="font-medium leading-snug">{billSample.title}</div>
                      <div className="text-xs text-neutral-100">Updated {billSample.updated}</div>
                      <div className="mt-2 h-2 w-full rounded bg-neutral-800 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${billSample.stanceSplit.support}%` }} />
                      </div>
                      <div className="text-xs text-neutral-100">Support {billSample.stanceSplit.support}% · Oppose {billSample.stanceSplit.oppose ?? 100 - billSample.stanceSplit.support}%</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* News rail */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Today</h2>
          <a href="/news" className="text-sm text-neutral-100 hover:text-white">All news</a>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {newsSample.map((n) => (
            <Card key={n.title} className="bg-neutral-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base leading-snug">{n.title}</CardTitle>
                <CardDescription>{n.src} · {n.ts}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-3xl border border-white/10 bg-neutral-900/40 p-6 md:p-10">
          <div className="grid md:grid-cols-4 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold">Founding Plan</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-100">
                {[
                  "Bill & vote tracking with alerts",
                  "MP profiles & scorecards",
                  "Bias-balanced news rail",
                  "Personal dashboard & topics",
                ].map((f) => (<li key={f} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-emerald-400"/> {f}</li>))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <Card className="bg-neutral-950/60">
                <CardHeader>
                  <CardTitle className="text-xl">$1<span className="text-sm text-neutral-100">/month</span></CardTitle>
                  <CardDescription>Cancel anytime. No ads. No trackers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="secondary" className="w-full">Start for $1</Button>
                  <div className="text-xs text-neutral-100 text-center">Student & concession pricing available</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-neutral-100 grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
              <span className="font-medium text-neutral-100">Verity</span>
            </div>
            <p className="mt-2">AI-powered civic intelligence for Australia.</p>
          </div>
          <div>
            <div className="text-neutral-100 mb-2">Product</div>
            <ul className="space-y-1">
              <li><a href="/news" className="hover:text-white">News</a></li>
              <li><a href="/bills" className="hover:text-white">Bills</a></li>
              <li><a href="/mps" className="hover:text-white">MPs</a></li>
              <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <div className="text-neutral-100 mb-2">Company</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
          <div>
            <div className="text-neutral-100 mb-2">Contact</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-white">support@verity.au</a></li>
              <li className="text-neutral-500">© {new Date().getFullYear()} Verity</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
