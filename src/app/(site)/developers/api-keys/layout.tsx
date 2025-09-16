import type { ReactNode } from "react";

export const metadata = {
  title: "API Keys",
  description: "Create and manage developer API keys (demo).",
  alternates: { canonical: "/developers/api-keys" },
  openGraph: { images: ["/og?title=API%20Keys&tag=Developers&tag2=Demo"] },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
