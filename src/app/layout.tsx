import "@fontsource-variable/inter";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
// Use system stack to avoid remote fetch flakiness; swap to next/font if you want.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
export const metadata: Metadata = {
  title: "Verity",
  description: "AI-powered civic intelligence for Australia",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-950">
      <body  className="bg-neutral-950 text-neutral-100 antialiased ${inter.variable}">
        {children}
      </body>
    </html>
  );
}
