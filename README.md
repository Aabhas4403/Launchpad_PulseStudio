# Pulse Studio — Marketing Site

A single-domain home for two products:

- **Content Pulse** — pre-test marketing creative against synthetic consumers
- **Shelf Pulse** — decode the live e-commerce shelf

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and
**Framer Motion**. Designed to deploy to **Vercel** in one click and point at a
custom domain (Namecheap, GoDaddy, etc.).

---

## Run locally

```bash
npm install
npm run dev
```

Site runs at http://localhost:3000.

A `data/waitlist.json` file is created on first signup in dev. It's gitignored
and is not used in production.

## Project structure

```
app/
  layout.tsx              # Navbar + Footer wrapper, metadata
  page.tsx                # Landing page (hero · product cards · demo · waitlist)
  products/
    content-pulse/page.tsx
    shelf-pulse/page.tsx
  api/
    waitlist/route.ts     # POST /api/waitlist (zod-validated)
components/               # Navbar · Footer · Hero · ProductCard · FeatureGrid · WaitlistForm
lib/
  products.ts             # Single source of truth for product metadata
  utils.ts                # cn() helper
```

To add a third product: append an object to `PRODUCTS` in [lib/products.ts](lib/products.ts)
and create one page under `app/products/<slug>/page.tsx`. The landing page picks
it up automatically.

## Waitlist

The `/api/waitlist` route currently:

1. Validates `{email, product}` with zod.
2. Logs the entry to stdout (visible in `next dev` and `vercel logs`).
3. Appends to `data/waitlist.json` in local dev.

To wire up real delivery, edit [app/api/waitlist/route.ts](app/api/waitlist/route.ts)
and uncomment / add a call to your provider of choice. Suggested options:

| Provider | What it gives you | Env var |
| --- | --- | --- |
| Resend  | Transactional confirmation emails | `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_NOTIFY` |
| Loops   | Marketing list + drip campaigns | `LOOPS_API_KEY` |
| Supabase / Convex | Durable list you can query | provider-specific |

See `.env.example` for the variable names already referenced.

## Deploy to Vercel

### Option A — GitHub-connected (recommended)

1. `git init && git add . && git commit -m "init"` then push to a new GitHub repo.
2. Go to <https://vercel.com/new>, import the repo. Vercel auto-detects Next.js.
3. (Optional) Add env vars under **Project · Settings · Environment Variables**.
4. Click **Deploy**.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel       # first run sets up the project
vercel --prod
```

## Custom domain (Namecheap / GoDaddy)

Once deployed, attach a domain in **Vercel · Project · Settings · Domains**:

1. Add the apex (e.g. `pulsestudio.io`) and `www` subdomain in Vercel.
2. In your registrar's DNS panel, choose ONE of:
   - **Easiest:** Change the nameservers to Vercel's (`ns1.vercel-dns.com` and
     `ns2.vercel-dns.com`). Vercel manages all DNS.
   - **Keep your registrar's DNS:**
     - `A` record on `@` → `76.76.21.21`
     - `CNAME` on `www` → `cname.vercel-dns.com`
3. Vercel issues an SSL certificate automatically once DNS resolves.

## Analytics

No third-party trackers are bundled by default. To enable lightweight analytics:

- Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to your Plausible site domain and add the
  Plausible script tag in `app/layout.tsx`, **or**
- Enable **Vercel Analytics** in the Vercel dashboard (zero-config, no script
  edits needed).

## Notes on attribution

The waitlist form attributes signups via the `product` field (`content-pulse`,
`shelf-pulse`, or `both`). Per-product CTAs pre-select the right value, so you
can split-test demand from one inbox.
