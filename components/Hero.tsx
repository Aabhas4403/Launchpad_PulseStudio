'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowRight,
  PlayCircle,
  ShoppingBag,
  Sparkles,
  Wand2,
  ArrowDown,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 brand-gradient pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          {/* LEFT — copy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 h-7 rounded-full border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-brand)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] pulse-dot" />
              Now in private beta
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.92] text-balance"
            >
              Decode the shelf.
              <br />
              <span className="shimmer-text">Pre-test the message.</span>
              <br />
              Refine before you spend.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-xl text-lg md:text-xl text-[var(--color-muted)] font-medium leading-relaxed"
            >
              Scrape what's already winning the e-commerce shelf. Simulate how
              real consumers will react to your creative. Get principle-targeted
              rewrites — all in one flow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="#products"
                className="h-12 px-7 inline-flex items-center gap-2 bg-[var(--color-brand)] text-black font-black uppercase text-[11px] tracking-[0.18em] rounded-full hover:scale-[1.03] hover:bg-[var(--color-brand-hover)] transition brand-glow"
              >
                Explore the products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#demo"
                className="h-12 px-7 inline-flex items-center gap-2 border border-white/15 text-white font-black uppercase text-[11px] tracking-[0.18em] rounded-full hover:border-white/30 hover:bg-white/5 transition"
              >
                <PlayCircle className="w-4 h-4" /> Watch the demo
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — flow panel */}
          <FlowPanel />
        </div>
      </div>
    </section>
  );
}

interface Step {
  Icon: typeof Sparkles;
  product: string;
  title: string;
  sub: string;
  chip: string;
}

const STEPS: Step[] = [
  {
    Icon: ShoppingBag,
    product: 'Shelf Pulse',
    title: 'Scrape the shelf',
    sub: 'Top 20 organic · Amazon · "face wash"',
    chip: 'LIVE',
  },
  {
    Icon: Sparkles,
    product: 'Content Pulse',
    title: 'Pre-test the creative',
    sub: '1,000 synthetic consumers · India',
    chip: '72',
  },
  {
    Icon: Wand2,
    product: 'Refine',
    title: 'Rewrite, grounded',
    sub: 'Targeted at low-scoring principles',
    chip: '+18',
  },
];

function FlowPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      <div className="relative rounded-2xl border border-white/8 bg-[var(--color-surface)] p-6 shadow-2xl brand-glow-lg overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[var(--color-brand)]/20 blur-3xl rounded-full" />

        <div className="relative flex items-center justify-between mb-5">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-muted)]">
            How it flows
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-brand)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] pulse-dot" />
            Live pipeline
          </span>
        </div>

        <div className="relative space-y-2">
          {STEPS.map((s, i) => (
            <FlowRow
              key={s.product}
              step={s}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>

        <div className="relative mt-6 grid grid-cols-3 gap-2 text-center">
          {[
            { v: '5', l: 'E-com sites' },
            { v: '6', l: 'Principles' },
            { v: '< 60s', l: 'Loop time' },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-xl bg-black/40 border border-white/5 p-3"
            >
              <p className="text-lg font-black tracking-tighter">{s.v}</p>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-faint)] mt-1">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 rounded-2xl bg-[var(--color-accent)]/15 blur-2xl float-slow" />
    </motion.div>
  );
}

function FlowRow({
  step,
  index,
  isLast,
}: {
  step: Step;
  index: number;
  isLast: boolean;
}) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.25 + index * 0.12 }}
        className="flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:bg-[var(--color-surface-2)] transition"
      >
        <div className="w-10 h-10 rounded-lg bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/30 inline-flex items-center justify-center flex-shrink-0">
          <step.Icon className="w-4 h-4 text-[var(--color-brand)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-faint)]">
            {step.product}
          </p>
          <p className="text-sm font-black truncate text-white">{step.title}</p>
          <p className="text-[11px] text-[var(--color-muted)] truncate">
            {step.sub}
          </p>
        </div>
        <span className="px-2 h-5 inline-flex items-center bg-[var(--color-brand)] text-black text-[10px] font-black tracking-wider rounded">
          {step.chip}
        </span>
      </motion.div>
      {!isLast && (
        <div className="flex justify-center py-1.5">
          <ArrowDown className="w-3.5 h-3.5 text-[var(--color-faint)]" />
        </div>
      )}
    </div>
  );
}
