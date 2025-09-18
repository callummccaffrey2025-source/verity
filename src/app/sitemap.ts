import type { MetadataRoute } from 'next';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://verity.run';
  const { listAllMPs } = await import('./lib/data/mps-all');
  const mps = (await listAllMPs()).map(m => ({ url: `${base}/mps/${m.slug}`, changeFrequency: 'weekly', priority: 0.7 }));
  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/mps`, changeFrequency: 'weekly', priority: 0.8 },
    ...mps
  ];
}
