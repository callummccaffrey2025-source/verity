import "@fontsource-variable/inter";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Verity', template: '%s · Verity' },
  description: 'AI-powered civic intelligence for Australia',
};

// Use system stack to avoid remote fetch flakiness; swap to next/font if you want.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-950">
      <body  className="bg-neutral-950 text-neutral-100 antialiased ${inter.variable}">
        {children}
      </body>
    </html>
  );
}
