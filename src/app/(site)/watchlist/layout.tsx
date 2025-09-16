import type { ReactNode } from "react";

export const metadata = { title: "Watchlist", description: "Save topics and get briefings.", alternates: { canonical: "/watchlist" } , openGraph: { images: ["/og?title=Watchlist"] } }

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
