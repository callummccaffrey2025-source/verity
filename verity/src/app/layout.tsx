import "./globals.css";

import { getSiteUrl } from "@/lib/env";
import { Header } from "@/components/Header";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Verity",
  description: "Track real legislation in plain English.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-900 text-zinc-100">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
