/**
 * Resolves the live app URL for each product. Reads `NEXT_PUBLIC_*` env
 * variables so the same build works for local dev (localhost) and prod
 * (your deployed app domains).
 *
 * Defaults match the ports used by `scripts/start-all.sh`:
 *   - Content Pulse Vite dev server: http://localhost:5173
 *   - Shelf Pulse Vite dev server:   http://localhost:5500
 *
 * Set them in `.env.local` (dev) or in your hosting provider's env settings
 * (prod) to point at the deployed instances.
 */
import type { ProductSlug } from './products';

const DEFAULTS: Record<ProductSlug, string> = {
  'content-pulse': 'http://localhost:5173',
  'shelf-pulse': 'http://localhost:5500',
};

export function getAppUrl(slug: ProductSlug): string {
  if (slug === 'content-pulse') {
    return process.env.NEXT_PUBLIC_CONTENT_PULSE_URL || DEFAULTS[slug];
  }
  return process.env.NEXT_PUBLIC_SHELF_PULSE_URL || DEFAULTS[slug];
}
