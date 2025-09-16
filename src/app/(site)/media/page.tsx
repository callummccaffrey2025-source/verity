"use client";
import Section from "../../../components/section";
import Container from "../../../components/container";
import { useState } from "react";
import { RELEASES, ARTICLES } from "@/lib/media";

export default function Media() {
  const [tab, setTab] = useState<"releases"|"coverage"|"compare">("releases");
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold">Media monitor</h1>
        <div className="mt-4 flex gap-2">
          <button className={`btn-ghost ${tab==="releases" ? "underline underline-offset-4" : ""}`} onClick={()=>setTab("releases")}>Releases</button>
          <button className={`btn-ghost ${tab==="coverage" ? "underline underline-offset-4" : ""}`} onClick={()=>setTab("coverage")}>Coverage</button>
          <button className={`btn-ghost ${tab==="compare" ? "underline underline-offset-4" : ""}`} onClick={()=>setTab("compare")}>Compare</button>
        </div>

        {tab==="releases" && (
          <div className="mt-6 space-y-3">
            {RELEASES.map(r => (
              <a key={r.id} href={r.url} className="card p-5 block">
                <div className="text-emerald-300 font-semibold">{r.title}</div>
                <div className="text-sm text-neutral-400">{r.date} • {r.source}</div>
              </a>
            ))}
          </div>
        )}

        {tab==="coverage" && (
          <div className="mt-6 space-y-3">
            {ARTICLES.map(a => (
              <a key={a.id} href={a.url} className="card p-5 block">
                <div className="text-emerald-300 font-semibold">{a.title}</div>
                <div className="text-sm text-neutral-400">{a.date} • {a.outlet}</div>
              </a>
            ))}
          </div>
        )}

        {tab==="compare" && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {ARTICLES.filter(a => a.relatedReleaseId).map(a => {
              const r = RELEASES.find(x => x.id === a.relatedReleaseId);
              return (
                <div key={a.id} className="card p-5">
                  <div className="text-xs text-neutral-400 mb-1">Release</div>
                  <div className="font-semibold">{r?.title}</div>
                  <div className="text-xs text-neutral-500">{r?.source} • {r?.date}</div>
                  <div className="h-px my-3 bg-white/10" />
                  <div className="text-xs text-neutral-400 mb-1">Coverage</div>
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-xs text-neutral-500">{a.outlet} • {a.date}</div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}