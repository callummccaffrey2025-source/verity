import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/,"");
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", allow: "/feed.json" },
      { userAgent: "*", disallow: ["/api/"] }, // keep APIs out of indexing
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
