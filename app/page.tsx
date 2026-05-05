import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import WaitlistForm from '@/components/WaitlistForm';
import { PRODUCTS } from '@/lib/products';
import {
  PlayCircle,
  Upload,
  Pencil,
  Activity,
  Wand2,
  RefreshCw,
  Share2,
  Rocket,
  Languages,
  Globe,
  ShieldAlert,
  History,
  Trophy,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Building2,
  Megaphone,
  LineChart,
  Briefcase,
} from 'lucide-react';

/**
 * Six-step user journey, mirroring the in-app flow:
 *   Onboard -> Past Campaigns -> Compose -> Simulate -> Refine -> Re-test/Export.
 */
const HOW = [
  {
    Icon: Rocket,
    title: '1 — Onboard',
    body: 'Pick a country and brand. Pulse auto-pulls public brand intel from Wikipedia, Reddit, GDELT and your own scraper to seed the audience model.',
  },
  {
    Icon: Upload,
    title: '2 — Upload past winners',
    body: 'Drop in last quarter’s metrics CSV plus the creative files. We mine your winning hooks, power words, CTAs, tones and visual palette.',
  },
  {
    Icon: Pencil,
    title: '3 — Compose',
    body: 'Paste the new draft (copy + optional image/video). Pick a historical analysis as your prior, or run cold.',
  },
  {
    Icon: Activity,
    title: '4 — Simulate',
    body: '200 synthetic consumers stream their reactions live across 6 principles, with regional cuts, action breakdown and verbatim quotes.',
  },
  {
    Icon: Wand2,
    title: '5 — Refine',
    body: 'One-click rewrite biased toward your past winners and competitor SERP patterns. Claims, prices and certifications stay verbatim.',
  },
  {
    Icon: RefreshCw,
    title: '6 — Re-test & ship',
    body: 'Re-simulate the rewrite against the same audience inline. See per-principle deltas before you export to your media-buying or agency team.',
  },
];

/**
 * Seven prioritized use cases, ordered by buyer urgency.
 */
const USE_CASES = [
  {
    Icon: Megaphone,
    title: 'Pre-launch creative QA',
    body: 'Catch flops before media spend. The week-1 disaster you usually only learn about from the dashboard.',
    buyer: 'Brand managers · Performance leads',
  },
  {
    Icon: Languages,
    title: 'Localization sanity check',
    body: 'Festival, regional and language landmines flagged before they become a Twitter thread.',
    buyer: 'Regional marketing',
  },
  {
    Icon: TrendingUp,
    title: 'Multi-variant copy testing',
    body: 'Score 5 hooks, pick 1. Stop burning A/B budget on losers when synthetic shows the same signal in minutes.',
    buyer: 'Performance marketers',
  },
  {
    Icon: History,
    title: 'Past-winner-aware rewriting',
    body: 'Institutional learnings stop dying in PPT decks. Every rewrite carries forward what worked for you.',
    buyer: 'Content & CRM teams',
  },
  {
    Icon: Globe,
    title: 'Trend-jacking',
    body: 'Live Google Trends + GDELT events overlay the audience so newsroom marketing doesn’t lag behind the news.',
    buyer: 'Social media managers',
  },
  {
    Icon: ShieldAlert,
    title: 'Brand-safety screening',
    body: 'Controversy and "report" actions surface as risk callouts. Lower boycott exposure on sensitive moments.',
    buyer: 'Legal · Brand',
  },
  {
    Icon: Briefcase,
    title: 'Agency creative review',
    body: 'Turn subjective feedback into a measurable scorecard. Agencies submit one variant; you get five — with reasoning.',
    buyer: 'Brand-side reviewers',
  },
];

/**
 * Differentiator vs adjacent categories.
 */
const COMPARE = [
  {
    name: 'Quant survey panels',
    examples: 'Ipsos · YouGov · Toluna',
    cost: '₹5–25L · 2–4 weeks',
    pulse: 'Minutes · same directional signal',
  },
  {
    name: 'Western copy-testing',
    examples: 'Zappi · Swayable · System1',
    cost: 'No India fluency · enterprise-only',
    pulse: 'India-native demographics built in',
  },
  {
    name: 'Generic LLM tools',
    examples: 'ChatGPT · Jasper · Gemini',
    cost: 'No audience model · no metrics',
    pulse: '200-agent panel + closed-loop refine',
  },
];

/**
 * Ideal customer profile callouts.
 */
const ICPS = [
  {
    Icon: Building2,
    title: 'FMCG · D2C · QSR · Fintech',
    body: 'Mid-to-large brands spending ₹2 Cr+/yr on digital creative. Local-first and on-prem keep brand creative in your perimeter.',
  },
  {
    Icon: Share2,
    title: 'Performance & creative agencies',
    body: 'Multi-brand workspaces, per-client historical isolation, and a defensible scorecard you can show clients.',
  },
  {
    Icon: LineChart,
    title: 'In-house content studios',
    body: 'Media networks and large publishers running 50+ campaigns/month who need a repeatable pre-flight check.',
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
                what&apos;s already winning
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

      {/* USE CASES */}
      <section id="use-cases" className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 space-y-10">
          <header className="max-w-2xl space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand)]">
              Use cases
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
              Seven jobs marketers hire Pulse to do.
            </h2>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed">
              Ranked by what our pilot teams asked for first. Each one replaces
              a slow, expensive or subjective step in the campaign workflow.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl border border-white/8 bg-[var(--color-surface)] p-6 hover:bg-[var(--color-surface-2)] transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/30 inline-flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <u.Icon className="w-5 h-5 text-[var(--color-brand)]" />
                </div>
                <h4 className="font-black text-white tracking-tight mb-2">
                  {u.title}
                </h4>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
                  {u.body}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-faint)]">
                  {u.buyer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 6 STEP USER JOURNEY */}
      <section id="how" className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 space-y-10">
          <header className="max-w-2xl space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand)]">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
              From brief to ship-ready creative in one sitting.
            </h2>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed">
              Six steps, ~5 minutes from paste to scored rewrite. Past
              campaigns are uploaded once and reused forever.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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

      {/* WHY PULSE — comparison vs adjacent categories */}
      <section id="why" className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 space-y-10">
          <header className="max-w-2xl space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand)]">
              Why Pulse Studio
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
              Cheaper than a panel. Smarter than a chatbot.
            </h2>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed">
              We sit between traditional research and generic AI tools — with
              the speed of one and the rigour of the other.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMPARE.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-white/8 bg-[var(--color-surface)] p-6 space-y-4"
              >
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-faint)]">
                    Today
                  </p>
                  <h4 className="font-black text-white tracking-tight">
                    {c.name}
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    {c.examples}
                  </p>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-[#E91429] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--color-muted)]">{c.cost}</span>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-brand)] mb-1">
                    With Pulse
                  </p>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#1DB954] mt-0.5 flex-shrink-0" />
                    <span className="text-white font-medium">{c.pulse}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Differentiator pillars */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-6">
            {[
              {
                Icon: Globe,
                title: 'India-native',
                body: 'Region · language · festival distributions are hand-curated, not scraped from English-Twitter.',
              },
              {
                Icon: ShieldAlert,
                title: 'Local-first',
                body: 'Runs on Ollama + your servers. PII and brand creative never leave your perimeter.',
              },
              {
                Icon: Trophy,
                title: 'Closed-loop',
                body: 'Most tools score; Pulse rewrites and re-tests, biased toward your own past winners.',
              },
              {
                Icon: TrendingUp,
                title: 'Free data sources',
                body: 'GDELT, Wikipedia, Reddit, Trends, your own scraper. Zero per-call API cost.',
              },
            ].map((d) => (
              <div
                key={d.title}
                className="rounded-xl border border-white/8 bg-[var(--color-surface)] p-5"
              >
                <d.Icon className="w-5 h-5 text-[var(--color-brand)] mb-3" />
                <p className="font-black text-white text-sm mb-1.5">
                  {d.title}
                </p>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section id="who" className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 space-y-10">
          <header className="max-w-2xl space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand)]">
              Who it&apos;s for
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
              Built for teams that ship a lot of creative.
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ICPS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/8 bg-[var(--color-surface)] p-7"
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/30 inline-flex items-center justify-center mb-5">
                  <p.Icon className="w-5 h-5 text-[var(--color-brand)]" />
                </div>
                <h4 className="font-black text-white tracking-tight mb-2">
                  {p.title}
                </h4>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative rounded-3xl border border-white/8 bg-[var(--color-surface)] p-8 md:p-14 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-brand)]/15 blur-3xl rounded-full" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--color-accent)]/12 blur-3xl rounded-full" />

            <div className="relative space-y-7 max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand)]">
                See it move
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
                A 90-second walkthrough of the full loop.
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-2xl">
                Watch a real campaign get pre-tested, refined against past
                winners, then re-simulated inline — all without leaving the
                screen.
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
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6">
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
