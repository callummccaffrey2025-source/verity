import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const paths = ['/', '/news', '/bills', '/mps', '/pricing', '/join'];
  const now = new Date().toISOString();
  return paths.map(p => ({
    url: `${base}${p}`,
    lastModified: now,
    changefreq: p === '/' ? 'hourly' : 'daily',
    priority: p === '/' ? 1 : 0.6,
  }));
}
