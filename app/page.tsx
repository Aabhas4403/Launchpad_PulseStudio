import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import WaitlistForm from '@/components/WaitlistForm';
import { PRODUCTS } from '@/lib/products';
import { PlayCircle, Zap, Shield, GitBranch } from 'lucide-react';

const HOW = [
  {
    Icon: Zap,
    title: '1 — Brief',
    body: 'Drop in your campaign creative or a category keyword. Pick a country (any country).',
  },
  {
    Icon: GitBranch,
    title: '2 — Simulate',
    body: 'We sample synthetic consumers, score reactions on six principles, and pull the live shelf.',
  },
  {
    Icon: Shield,
    title: '3 — Refine',
    body: 'Targeted rewrite suggestions grounded in real top-organic patterns. Claims preserved verbatim.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* PRODUCTS */}
      <section id="products" className="py-20">
        <div className="mx-auto max-w-6xl px-6 space-y-12">
          <header className="max-w-2xl space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand)]">
              Two products · One playbook
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Test the message. Read the market.
            </h2>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed">
              Pulse Studio gives marketing and insights teams two complementary
              lenses on the same problem:{' '}
              <em className="text-white not-italic font-bold">will this land</em>,
              and{' '}
              <em className="text-white not-italic font-bold">
                what's already winning
              </em>
              .
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 space-y-10">
          <header className="max-w-2xl space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand)]">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
              From brief to refined creative in one sitting.
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {HOW.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-white/8 bg-[var(--color-surface)] p-7 hover:bg-[var(--color-surface-2)] transition"
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/30 inline-flex items-center justify-center mb-5">
                  <h.Icon className="w-5 h-5 text-[var(--color-brand)]" />
                </div>
                <h4 className="font-black text-white tracking-tight mb-2">
                  {h.title}
                </h4>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative rounded-3xl border border-white/8 bg-[var(--color-surface)] p-8 md:p-14 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-brand)]/15 blur-3xl rounded-full" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--color-accent)]/12 blur-3xl rounded-full" />

            <div className="relative space-y-7 max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand)]">
                See it move
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
                A 90-second walkthrough of both products.
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl">
                Watch a real campaign get pre-tested, then refined against the
                live e-commerce shelf — all in the same flow.
              </p>
              <div className="aspect-video rounded-2xl border border-white/10 bg-black/60 flex items-center justify-center">
                {/* Replace with <iframe> (Loom / YouTube) when recorded. */}
                <div className="flex flex-col items-center gap-3 text-[var(--color-faint)]">
                  <PlayCircle className="w-12 h-12" />
                  <p className="text-[11px] font-black uppercase tracking-[0.25em]">
                    Demo video coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
