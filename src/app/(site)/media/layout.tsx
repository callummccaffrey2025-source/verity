import type { ReactNode } from "react";

export const metadata = { title: "Media", description: "Releases, coverage, and framing.", alternates: { canonical: "/media" } , openGraph: { images: ["/og?title=Media"] } }

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
