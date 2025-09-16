export const runtime = "edge";
export const revalidate = 3600;

import { CHANGELOG } from "@/lib/changelog";
function esc(s: string){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

export async function GET(req: Request) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin).replace(/\/+$/,"");
  const self = `${base}/changelog/rss.xml`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Verity Changelog</title>
    <link>${base}/changelog</link>
    <description>Product updates</description>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    ${CHANGELOG.map(c => `
    <item>
      <title>${esc(c.title)}</title>
      <link>${base}/changelog#${c.slug}</link>
      <guid isPermaLink="false">${c.slug}</guid>
      <pubDate>${new Date(c.date).toUTCString()}</pubDate>
      <description>${esc(c.items.join(" • "))}</description>
    </item>`).join("\n")}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
