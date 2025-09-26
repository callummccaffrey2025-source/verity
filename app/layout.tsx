import "./globals.css";
import Script from "next/script";

// Site-wide metadata
export const metadata = {
  title: "Verity — Clear, trustworthy Australian politics",
  description:
    "Verity helps Australians understand Parliament with plain-English bill summaries, MP voting records, and live updates. Non-partisan. Privacy-minded.",
  openGraph: {
    title: "Verity — Clear, trustworthy Australian politics",
    description:
      "Plain-English bill summaries, MP voting records, and live updates. Non-partisan. Privacy-minded.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    siteName: "Verity",
    images: [
      {
        url:
          (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") +
          "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Verity preview",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verity — Clear, trustworthy Australian politics",
    description:
      "Plain-English bill summaries, MP voting records, and live updates.",
    images: [
      (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") +
        "/og-default.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Plausible (env-guarded) */}
        {process.env.NEXT_PUBLIC_ENABLE_PLAUSIBLE === "1" &&
        process.env.PLAUSIBLE_DOMAIN ? (
          <>
            <link rel="preconnect" href="https://plausible.io" />
            <Script
              src="https://plausible.io/js/script.js"
              defer
              data-domain={process.env.PLAUSIBLE_DOMAIN}
              strategy="afterInteractive"
            />
          </>
        ) : null}
      </head>
      <body>
        {children}
        {/* JSON-LD Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Verity",
              url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
              logo:
                (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") +
                "/og-default.png",
              sameAs: ["https://twitter.com/", "https://www.linkedin.com/"],
            }),
          }}
        />
      </body>
    </html>
  );
}
