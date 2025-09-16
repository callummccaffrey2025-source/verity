"use client";
import SeoJsonLd from "./seo-jsonld";

export default function SiteJsonLd() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://verity.run").replace(/\/+$/,"");
  const org = {
    "@context":"https://schema.org","@type":"Organization",
    name:"Verity", url: base, logo: `${base}/og.png`
  };
  const website = {
    "@context":"https://schema.org","@type":"WebSite",
    name:"Verity", url: base,
    potentialAction:{ "@type":"SearchAction", target:`${base}/search?q={query}`, "query-input":"required name=query" }
  };
  return (<>
    <SeoJsonLd id="org-jsonld" data={org} />
    <SeoJsonLd id="website-jsonld" data={website} />
  </>);
}
