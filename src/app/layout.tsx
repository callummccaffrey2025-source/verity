import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verity",
  description: "AI-powered political watchdog for $1/mo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
