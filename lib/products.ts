/**
 * Single source of truth for product metadata. Both the landing page and the
 * per-product pages read from here, so adding a third product is a one-line
 * change plus a page file.
 *
 * Brand colour is intentionally shared (`#1DA1F2`) — both products live under
 * one Pulse Studio identity. Differentiation comes from the icon and the
 * verb pair ("Pre-test" vs "Decode").
 */

export type ProductSlug = 'content-pulse' | 'shelf-pulse';
export type ProductIcon = 'sparkles' | 'shopping-bag';

export interface Product {
  slug: ProductSlug;
  name: string;
  /** Short verb-led label used on cards and in the hero. */
  verb: string;
  tagline: string;
  pitch: string;
  icon: ProductIcon;
  features: { title: string; body: string }[];
  audience: string[];
  ctaPrimary: string;
  links?: { label: string; href: string }[];
  /** Mini stats shown in product card and hero strip. */
  stats: { label: string; value: string }[];
}

export const PRODUCTS: Product[] = [
  {
    slug: 'content-pulse',
    name: 'Content Pulse',
    verb: 'Pre-test the campaign',
    tagline:
      'Pre-test marketing creative against synthetic consumers — for any country, in minutes.',
    pitch:
      'Drop in your ad copy, image, or A/B variants. We sample N synthetic consumers from culturally accurate demographics and stream their reactions live. You get the same artefacts a research panel would — six-principle scores, segment cuts, verbatim quotes, and an interactive society graph — without booking a focus group.',
    icon: 'sparkles',
    features: [
      {
        title: '6-principle scoring',
        body: 'Engagement · Cultural Relevance · Brand Trust · Purchase Intent · Clarity · Controversy. Cuts by region, age, income, language, and urbanicity.',
      },
      {
        title: 'Any country, on the fly',
        body: 'India ships pre-built. Other countries get a culturally-specific profile generated on first use and cached locally.',
      },
      {
        title: 'Mock vs real LLM',
        body: 'Mock backend for instant deterministic runs. Switch to Ollama for richer, qualitative reactions from a real local model.',
      },
      {
        title: 'Refine — guarded rewrites',
        body: 'After scoring, get principle-targeted rewrite suggestions backed by competitor SERP patterns. Claims, prices, and certifications are preserved verbatim.',
      },
      {
        title: 'Live society graph',
        body: 'Watch reactions cascade through a force-directed follow network. Per-agent ego focus, demographic charts, persona cards.',
      },
      {
        title: 'OASIS-compatible',
        body: 'Engine mirrors camel-ai/oasis (make → reset → step) so it stays swap-compatible with the 1M-agent framework.',
      },
    ],
    audience: [
      'Brand marketers pre-testing campaigns',
      'Creative agencies rapid-iterating on copy',
      'Insights teams needing directional reads in hours, not weeks',
    ],
    ctaPrimary: 'Join the Content Pulse beta',
    links: [
      { label: 'GitHub', href: 'https://github.com/Aabhas4403/ContentPulse' },
    ],
    stats: [
      { label: 'Synthetic consumers', value: '1k+' },
      { label: 'Scoring principles', value: '6' },
      { label: 'Countries supported', value: '∞' },
    ],
  },
  {
    slug: 'shelf-pulse',
    name: 'Shelf Pulse',
    verb: 'Decode the shelf',
    tagline:
      'Decode the e-commerce shelf — what wins organically, on every site, in real time.',
    pitch:
      'Run a single keyword and get a normalized snapshot of the top organic listings across Amazon, Flipkart, Blinkit, Swiggy Instamart, and Alibaba. Titles, brands, ratings, prices, sponsored vs organic, attribute formats — clean CSV out, or feed it directly into Content Pulse for refinement-grade competitive intelligence.',
    icon: 'shopping-bag',
    features: [
      {
        title: 'Multi-site adapters',
        body: 'Amazon · Flipkart · Blinkit · Swiggy Instamart · Alibaba. One contract; same shape every time.',
      },
      {
        title: 'Organic vs sponsored',
        body: 'Sponsored rows tagged so you can isolate true organic ranking signal. No noise from paid placements.',
      },
      {
        title: 'CSV out · API in',
        body: 'Hand-curate or stream it live. Same JSON contract Content Pulse consumes for the Refine feature.',
      },
      {
        title: 'Anti-bot aware',
        body: 'Built on Playwright with site-specific quirks (CAPTCHA detection, infinite-scroll, lazy-load) handled per adapter.',
      },
      {
        title: 'Job manager',
        body: 'Fire-and-forget jobs with a small run store. No babysitting required.',
      },
      {
        title: 'Cross-product synergy',
        body: 'Plug Shelf Pulse output straight into Content Pulse to ground rewrites in real top-organic patterns.',
      },
    ],
    audience: [
      'Brand teams tracking shelf positioning',
      'Category managers analyzing competitor SKUs',
      'Insights teams sizing the gap between intent and listing',
    ],
    ctaPrimary: 'Join the Shelf Pulse beta',
    links: [
      { label: 'GitHub', href: 'https://github.com/jithendra-roy/Ecommerce_scrapper' },
    ],
    stats: [
      { label: 'Sites supported', value: '5' },
      { label: 'Refresh latency', value: '< 60s' },
      { label: 'Output format', value: 'JSON · CSV' },
    ],
  },
];

export function getProduct(slug: ProductSlug): Product {
  const p = PRODUCTS.find((p) => p.slug === slug);
  if (!p) throw new Error(`Unknown product: ${slug}`);
  return p;
}
