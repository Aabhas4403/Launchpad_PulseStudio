import Link from 'next/link';
import { Github, Mail, Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5 bg-black/40">
      <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5 font-black tracking-tighter text-lg">
            <span className="relative inline-flex w-7 h-7 items-center justify-center rounded-full bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/40">
              <Activity className="w-3.5 h-3.5 text-[var(--color-brand)]" />
            </span>
            Pulse Studio
          </div>
          <p className="text-sm text-[var(--color-muted)] max-w-sm">
            Synthesize the market before you spend on it. Two products, one
            playbook for modern brand and growth teams.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-faint)]">
            Products
          </p>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/products/content-pulse" className="hover:text-white">
                Content Pulse
              </Link>
            </li>
            <li>
              <Link href="/products/shelf-pulse" className="hover:text-white">
                Shelf Pulse
              </Link>
            </li>
            <li>
              <Link href="/#waitlist" className="hover:text-white">
                Join the waitlist
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-faint)]">
            Connect
          </p>
          <ul className="space-y-2 text-sm text-[var(--color-muted)]">
            <li>
              <a
                href="https://github.com/Aabhas4403"
                className="inline-flex items-center gap-2 hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@pulsestudio.example.com"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Mail className="w-4 h-4" /> hello@pulsestudio
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-faint)]">
          <p>© {new Date().getFullYear()} Pulse Studio</p>
          <p>Made for marketers who'd rather know than guess.</p>
        </div>
      </div>
    </footer>
  );
}
