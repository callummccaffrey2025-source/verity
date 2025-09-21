import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  // Add any dynamic URLs here later
  const staticPaths = ['', '/news', '/mps', '/bills', '/search', '/dashboard'];
  const now = new Date().toISOString();
  return staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: p === '' ? 1 : 0.7,
  }));
}
