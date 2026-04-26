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

## Run the full stack (launchpad + both apps)

The launchpad is the front door. The "Launch app" buttons on each product
page open the live React/Vite app for that product, which in turn calls its
own FastAPI backend.

### One-command bootstrap (zero to running)

If you have **git, node 18+, python 3.10+, and conda** installed, this single
line goes from nothing to all 5 services running. It creates a `pulse-studio/`
folder inside whatever directory you're currently in, clones every repo there,
installs every dependency, and launches everything:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/Aabhas4403/Launchpad_PulseStudio/main/scripts/bootstrap.sh)
```

> Run it from any folder — the script will create `./pulse-studio/` for you.
> Override with `PULSE_ROOT=/full/path` if you want a custom location.

Or if you've already cloned this repo:

```bash
./scripts/bootstrap.sh
```

Knobs (all optional):

| Variable      | Default                          | Effect                                       |
| ------------- | -------------------------------- | -------------------------------------------- |
| `PULSE_ROOT`  | `$PWD/pulse-studio`              | Full path for the project root               |
| `SKIP_RUN=1`  | unset                            | Set up everything, don't launch              |
| `USE_VENV=1`  | unset                            | Use a venv for Content Pulse instead of conda |

The script is **idempotent** — re-running just refetches and re-installs.
When it finishes, jump to <http://localhost:3000>.

### Manual setup (if you want full control)

#### Prerequisites

- **Node.js >= 18** (`node -v`)
- **Python 3.10+** with `pip`
- **conda** (Miniforge / Miniconda) — used by Content Pulse's `setup.sh` and
  recommended for Shelf Pulse
- **git**
- macOS / Linux. On Windows use WSL2.

### 1. Clone all three repos as siblings

The launcher expects this layout:

```
projects/
├── launchpad-site/          (this repo)
├── content-pulse-india/
└── Ecommerce_scrapper/
```

```bash
mkdir -p ~/projects && cd ~/projects
git clone https://github.com/Aabhas4403/Launchpad_PulseStudio.git launchpad-site
git clone https://github.com/Aabhas4403/ContentPulse.git           content-pulse-india
git clone https://github.com/jithendra-roy/Ecommerce_scrapper.git     Ecommerce_scrapper
```

### 2. Install dependencies (one-time per repo)

**Launchpad** (Next.js):

```bash
cd ~/projects/launchpad-site
npm install
```

**Content Pulse** (FastAPI + Vite). Easiest is its own setup script — it
creates a conda env named `content-pulse`, installs Python + Node deps, and
exits without booting:

```bash
cd ~/projects/content-pulse-india
./setup.sh --setup-only
```

If you prefer a venv instead of conda:

```bash
cd ~/projects/content-pulse-india
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
( cd content-pulse && npm install )
deactivate
```

**Shelf Pulse** (FastAPI + Vite):

```bash
cd ~/projects/Ecommerce_scrapper
# create a dedicated env (recommended)
conda create -y -n ecom_scraper python=3.12
conda activate ecom_scraper
pip install -r requirements.txt
python -m playwright install chromium    # one-time, ~150 MB
( cd frontend && npm install )
conda deactivate
```

### 3. Boot everything with one command

```bash
cd ~/projects/launchpad-site
./scripts/start-all.sh
```

That starts:

| Service                | URL                                  |
| ---------------------- | ------------------------------------ |
| Launchpad (Next.js)    | http://localhost:3000                |
| Content Pulse UI       | http://localhost:5173                |
| Content Pulse API      | http://localhost:8000                |
| Shelf Pulse UI         | http://localhost:5500                |
| Shelf Pulse API        | http://localhost:8010                |

Open http://localhost:3000 — the **Launch app** buttons on each product
page open the corresponding running app. Logs stream into [logs/](logs/);
**Ctrl-C** tears everything down.

The script writes a `.env.local` with the right `NEXT_PUBLIC_*_URL` values so
the launchpad's "Launch app" buttons point at the local instances. Override
those env vars (or any port via `LAUNCHPAD_PORT`, `CP_BACKEND_PORT`, etc.) to
point at deployed instances instead.

### Configuration knobs

All environment variables read by `scripts/start-all.sh`:

| Variable             | Default                                | Purpose                                            |
| -------------------- | -------------------------------------- | -------------------------------------------------- |
| `CONTENT_PULSE_DIR`  | `../content-pulse-india`               | Path to the Content Pulse repo                     |
| `SHELF_PULSE_DIR`    | `../Ecommerce_scrapper`                | Path to the Shelf Pulse repo                       |
| `LAUNCHPAD_PORT`     | `3000`                                 | Next.js port                                       |
| `CP_BACKEND_PORT`    | `8000`                                 | Content Pulse FastAPI                              |
| `CP_FRONTEND_PORT`   | `5173`                                 | Content Pulse Vite                                 |
| `SP_BACKEND_PORT`    | `8010`                                 | Shelf Pulse FastAPI (moved off 8000 to avoid clash) |
| `SP_FRONTEND_PORT`   | `5500`                                 | Shelf Pulse Vite                                   |
| `SP_PYTHON`          | auto-detected (`.venv` → conda → PATH) | Python interpreter for Shelf Pulse backend         |

Example overrides:

```bash
CONTENT_PULSE_DIR=/abs/path/to/content-pulse-india \
SHELF_PULSE_DIR=/abs/path/to/Ecommerce_scrapper \
SP_PYTHON=$HOME/miniforge3/envs/ecom_scraper/bin/python \
./scripts/start-all.sh
```

### Troubleshooting

- **Port already in use** — kill the listener:
  `lsof -tiTCP:3000 -sTCP:LISTEN | xargs kill` (replace `3000` as needed).
- **Shelf Pulse backend fails: `No module named uvicorn`** — `SP_PYTHON` is
  pointing at a Python without the deps. Activate the right env or set
  `SP_PYTHON` explicitly.
- **Content Pulse backend fails: `ModuleNotFoundError`** — the launcher uses
  the `.venv` inside `content-pulse-india/` if present; otherwise falls back
  to the `python3` on `PATH`. Activate the conda env first or create a
  `.venv` inside that repo.
- **"Launch app" buttons 404** — make sure all five services show `200`:
  ```bash
  for u in http://localhost:3000 http://localhost:5173 http://localhost:5500 \
           http://localhost:8000/api/health http://localhost:8010/api/health; do
    printf "%-40s " "$u"; curl -s -m 3 -o /dev/null -w "%{http_code}\n" "$u"
  done
  ```

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
