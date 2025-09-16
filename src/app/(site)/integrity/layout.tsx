import type { ReactNode } from "react";
export const metadata = { title: "Integrity" };
export default function IntegrityLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-black text-white">{children}</div>;
}
