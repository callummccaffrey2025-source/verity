import "./globals.css";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Verity — Civic intelligence for Australia",
  description: "Personalized, source-linked clarity on MPs, bills, and news.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Verity — Civic intelligence for Australia",
    description: "Personalized, source-linked clarity on MPs, bills, and news.",
    url: "http://localhost:3000",
    siteName: "Verity",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Verity", description: "Civic intelligence for Australia.", images: ["/og.svg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[var(--bg)] text-[var(--fg)]`}>
        <Nav />
        <main id="content" className="container-verity py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
