import type { ReactNode } from "react";

export const metadata = {
  title: "Join the waitlist",
  description: "Be first to know when we launch.",
  alternates: { canonical: "/join-waitlist" },
  openGraph: { images: ["/og?title=Join%20the%20waitlist"] } }

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
