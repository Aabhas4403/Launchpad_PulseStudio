import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import FeatureGrid from '@/components/FeatureGrid';
import WaitlistForm from '@/components/WaitlistForm';
import { getProduct } from '@/lib/products';
import { resolveProductIcon } from '@/lib/icons';
import { getAppUrl } from '@/lib/appUrls';

const product = getProduct('shelf-pulse');
const Icon = resolveProductIcon(product.icon);
const appUrl = getAppUrl('shelf-pulse');

export const metadata: Metadata = {
  title: product.name,
  description: product.tagline,
};

export default function ShelfPulsePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-12 text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-brand)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] pulse-dot" />
            Product · Shelf Pulse
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/30 inline-flex items-center justify-center">
              <Icon className="w-6 h-6 text-[var(--color-brand)]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
              {product.name}
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-white font-bold tracking-tight max-w-3xl mx-auto text-balance">
            {product.tagline}
          </p>
          <p className="text-base md:text-lg text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
            {product.pitch}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={appUrl}
              target="_blank"
              rel="noreferrer"
              className="h-12 px-7 inline-flex items-center gap-2 bg-[var(--color-brand)] text-black font-black uppercase text-[11px] tracking-[0.18em] rounded-full hover:scale-[1.03] hover:bg-[var(--color-brand-hover)] transition brand-glow"
            >
              Launch app <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="#waitlist"
              className="h-12 px-7 inline-flex items-center gap-2 border border-white/15 text-white font-black uppercase text-[11px] tracking-[0.18em] rounded-full hover:border-white/30 hover:bg-white/5 transition"
            >
              {product.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </Link>
            {product.links?.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="h-12 px-7 inline-flex items-center border border-white/15 text-white font-black uppercase text-[11px] tracking-[0.18em] rounded-full hover:border-white/30 hover:bg-white/5 transition"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-8 max-w-xl mx-auto">
            {product.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-[var(--color-surface)] border border-white/8 px-4 py-3"
              >
                <p className="text-2xl font-black tracking-tighter">{s.value}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-faint)] mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid product={product} />

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6 space-y-10">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand)]">
              Built for
            </p>
            <ul className="space-y-2.5">
              {product.audience.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-3 text-[var(--color-muted)] text-base"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--color-brand)]" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <WaitlistForm defaultProduct="shelf-pulse" />
        </div>
      </section>
    </>
  );
}
