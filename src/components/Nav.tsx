"use client";
import { usePathname } from "next/navigation";

const links = [
  { href: "/ground", label: "News" },
  { href: "/mps", label: "MPs" },
  { href: "/bills", label: "Bills" },
  { href: "/ownership", label: "Ownership" },
  { href: "/search", label: "Search" }
];

export default function Nav() {
  const path = usePathname() || "/";
  return (
    <nav aria-label="Primary" className="hidden md:flex gap-6 text-sm">
      {links.map(l => {
        const active = path === l.href || path.startsWith(l.href + "/");
        return (
          <a
            key={l.href}
            href={l.href}
            className={active ? "text-emerald-300" : "text-zinc-300 hover:text-white"}
            aria-current={active ? "page" : undefined}
          >
            {l.label}
          </a>
        );
      })}
    </nav>
  );
}
