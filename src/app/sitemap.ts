export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const routes = ["", "features", "join", "status", "changelog", "today"].map(p => ({
    url: `${base}/${p}`, lastModified: new Date().toISOString(),
  }));
  return routes;
}
