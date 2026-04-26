'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/products/content-pulse', label: 'Content Pulse' },
  { href: '/products/shelf-pulse', label: 'Shelf Pulse' },
  { href: '/#demo', label: 'Demo' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#121212]/70 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-black tracking-tighter text-lg group"
        >
          <span className="relative inline-flex w-7 h-7 items-center justify-center rounded-full bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/40">
            <Activity className="w-3.5 h-3.5 text-[var(--color-brand)]" />
            <span className="absolute inset-0 rounded-full bg-[var(--color-brand)]/30 pulse-dot" />
          </span>
          <span>Pulse Studio</span>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  'hidden sm:inline-flex items-center px-3 h-9 rounded-full text-[12px] font-bold transition',
                  active
                    ? 'text-white bg-white/5'
                    : 'text-[var(--color-muted)] hover:text-white hover:bg-white/5',
                )}
              >
                {n.label}
              </Link>
            );
          })}
          <Link
            href="/#waitlist"
            className="ml-2 inline-flex items-center px-5 h-9 bg-white text-black rounded-full font-black text-[11px] uppercase tracking-[0.18em] hover:scale-[1.03] transition"
          >
            Get access
          </Link>
        </nav>
      </div>
    </header>
  );
}
