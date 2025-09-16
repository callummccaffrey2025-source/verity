import type { ReactNode } from "react";

export const metadata = { title: "Your MP", description: "Enter your postcode to see your MPs.", alternates: { canonical: "/your-mp" } , openGraph: { images: ["/og?title=Your%20MP"] } }

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
