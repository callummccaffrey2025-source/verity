import type { ReactNode } from "react";

export const metadata = { title: "Integrity / Report", description: "Integrity / Report", alternates: { canonical: "/integrity/report" }, openGraph: { images: ["/og?title=Integrity%20%2F%20Report"] } }

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
