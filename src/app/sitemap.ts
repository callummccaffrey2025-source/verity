import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/,"");
  const paths = [
    "/", "/product", "/pricing", "/trust", "/integrity", "/status",
    "/compare/theyvoteforme", "/join-waitlist", "/contact",
    "/blog", "/blog/rss.xml", "/feed.json", "/case-studies", "/solutions", "/mps",
    "/explainer/privacy-amendment-2025", "/your-mp", "/watchlist", "/diff", "/media",
    "/developers", "/developers/api-keys", "/analytics", "/search",
    "/changelog", "/changelog/rss.xml",
    "/legal/terms", "/legal/privacy", "/legal/cookies",
    "/embed/bill/privacy-amendment-2025", "/embed/mp/doe-anne"
  ];
  return paths.map((p) => ({ url: `${base}${p}`, changefreq: "weekly", priority: p === "/" ? 1 : 0.7 }));
}
