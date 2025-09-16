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
    <nav className="text-sm hidden md:flex gap-5">
      {links.map(l => {
        const active = path === l.href || path.startsWith(l.href + "/");
        return (
          <a
            key={l.href}
            href={l.href}
            className={active ? "text-emerald-300" : "text-zinc-300 hover:text-white"}
          >
            {l.label}
          </a>
        );
      })}
    </nav>
  );
}
