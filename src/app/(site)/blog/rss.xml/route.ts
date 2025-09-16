export const runtime = "edge";
export const revalidate = 3600;

import { BLOG_POSTS } from "@/lib/blog";

function esc(s: string){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

export async function GET(req: Request) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin).replace(/\/+$/,"");
  const self = `${base}/blog/rss.xml`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Verity Blog</title>
    <link>${base}/blog</link>
    <description>Updates and thinking from Verity</description>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    ${BLOG_POSTS.map(p => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${base}/blog/${p.slug}</link>
      <guid isPermaLink="true">${base}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
    </item>`).join("\n")}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
