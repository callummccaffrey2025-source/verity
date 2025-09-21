

import "@fontsource-variable/inter";
import SiteJSONLD from '@/components/site-jsonld';
import "./globals.css";
import type { Metadata } from "next";

import { Inter } from 'next/font/google'

import Nav from '@/components/shell/Nav';
import Footer from '@/components/shell/Footer';
export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/twitter-image'],
  },
  
  title: { default: 'Verity', template: '%s · Verity' },
  description: 'AI-powered civic intelligence for Australia',
};

// Use system stack to avoid remote fetch flakiness; swap to next/font if you want.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-950">
      <body className="min-h-dvh bg-ink text-white antialiased tabular"  style={{background:"var(--ink)",color:"var(--text-1)"}}>
      <SiteJSONLD />
    <a href="#main" className="sr-only focus:not-sr-only absolute left-2 top-2 z-50 rounded bg-zinc-900 px-3 py-1 text-sm border border-zinc-800">Skip to content</a>
<Nav/>
<main className="mx-auto max-w-6xl px-4 py-6">
        
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify((() => {
            const siteBase = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
            return {
              "@context":"https://schema.org",
              "@type":"WebSite",
              "name":"Verity",
              "url": siteBase,
              "potentialAction": {
                "@type":"SearchAction",
                "target": `${siteBase}/search?q={search_term_string}`,
                "query-input":"required name=search_term_string"
              }
            };
          })())
        }}
      />
  
<main id="main">{children}</main>
      </main>
      </body>
    </html>
  );
}
