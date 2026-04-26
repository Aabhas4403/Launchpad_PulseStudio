'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/products';
import { resolveProductIcon } from '@/lib/icons';

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const Icon = resolveProductIcon(product.icon);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative rounded-2xl border border-white/8 bg-[var(--color-surface)] p-7 hover:bg-[var(--color-surface-2)] transition-all overflow-hidden hover:-translate-y-1 hover:brand-glow"
    >
      {/* accent line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent opacity-60" />
      {/* hover wash */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-brand)]/0 group-hover:bg-[var(--color-brand)]/15 blur-3xl rounded-full transition-all duration-500" />

      <div className="relative space-y-6">
        <header className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/30 inline-flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-[var(--color-brand)]" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-brand)]">
              {product.verb}
            </p>
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter">
              {product.name}
            </h3>
          </div>
        </header>

        <p className="text-[var(--color-muted)] text-base leading-relaxed">
          {product.pitch}
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 text-sm">
          {product.features.slice(0, 4).map((f) => (
            <li key={f.title} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--color-brand)]" />
              <span className="text-white/85 font-medium">{f.title}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-3 gap-2 pt-2">
          {product.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg bg-black/30 border border-white/5 px-3 py-2.5"
            >
              <p className="text-base font-black tracking-tighter">{s.value}</p>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-faint)] mt-0.5 truncate">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm font-black text-[var(--color-brand)] hover:gap-3 transition-all"
          >
            See it in action <ArrowRight className="w-4 h-4" />
          </Link>
          {product.links?.[0] && (
            <a
              href={product.links[0].href}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-faint)] hover:text-white transition"
            >
              {product.links[0].label} →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
