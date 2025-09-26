'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Newspaper, Gavel, Users, DollarSign } from 'lucide-react';

const items = [
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/bills', label: 'Bills', icon: Gavel },
  { href: '/mps', label: 'MPs', icon: Users },
  { href: '/pricing', label: 'Pricing', icon: DollarSign },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex items-center gap-6 ml-8">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link key={href} className={`nav-link ${active ? 'text-white' : ''}`} href={href}>
            <Icon className="h-4 w-4 inline mr-2" />{label}
          </Link>
        );
      })}
    </nav>
  );
}
