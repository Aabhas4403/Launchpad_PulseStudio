#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# Pulse Studio — boot all three services together.
#
# Brings up:
#   1. Launchpad (this repo)            -> http://localhost:3000   (Next.js)
#   2. Content Pulse  (content-pulse-india)
#        backend (FastAPI)              -> http://localhost:8000
#        frontend (Vite)                -> http://localhost:5173
#   3. Shelf Pulse   (Ecommerce_scrapper)
#        backend (FastAPI)              -> http://localhost:8000  (default,
#                                          overridden to 8010 here to avoid
#                                          a clash with Content Pulse)
#        frontend (Vite)                -> http://localhost:5500
#
# Layout assumed (siblings of this repo):
#     ../content-pulse-india
#     ../Ecommerce_scrapper
#
# Override paths via env vars:
#     CONTENT_PULSE_DIR=/path/to/content-pulse-india \
#     SHELF_PULSE_DIR=/path/to/Ecommerce_scrapper \
#     ./scripts/start-all.sh
#
# Logs stream to ./logs/. Ctrl-C tears everything down.
# -----------------------------------------------------------------------------
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PARENT_DIR="$(cd "$ROOT_DIR/.." && pwd)"

CONTENT_PULSE_DIR="${CONTENT_PULSE_DIR:-$PARENT_DIR/content-pulse-india}"
SHELF_PULSE_DIR="${SHELF_PULSE_DIR:-$PARENT_DIR/Ecommerce_scrapper}"

LAUNCHPAD_PORT="${LAUNCHPAD_PORT:-3000}"
CP_BACKEND_PORT="${CP_BACKEND_PORT:-8000}"
CP_FRONTEND_PORT="${CP_FRONTEND_PORT:-5173}"
SP_BACKEND_PORT="${SP_BACKEND_PORT:-8010}"
SP_FRONTEND_PORT="${SP_FRONTEND_PORT:-5500}"

# Python interpreter for the Content Pulse backend. Defaults to a sibling
# .venv if it exists, otherwise the conda env `content-pulse`, otherwise
# whichever `python3` is on PATH. Override with CP_PYTHON=/path/to/python.
if [[ -z "${CP_PYTHON:-}" ]]; then
  if [[ -x "$CONTENT_PULSE_DIR/.venv/bin/python" ]]; then
    CP_PYTHON="$CONTENT_PULSE_DIR/.venv/bin/python"
  elif [[ -x "$HOME/miniforge3/envs/content-pulse/bin/python" ]]; then
    CP_PYTHON="$HOME/miniforge3/envs/content-pulse/bin/python"
  else
    CP_PYTHON="python3"
  fi
fi

# Python interpreter for the Shelf Pulse backend. Defaults to a sibling
# .venv if it exists, otherwise the conda env `ecom_scraper`, otherwise
# whichever `python3` is on PATH. Override with SP_PYTHON=/path/to/python.
if [[ -z "${SP_PYTHON:-}" ]]; then
  if [[ -x "$SHELF_PULSE_DIR/.venv/bin/python" ]]; then
    SP_PYTHON="$SHELF_PULSE_DIR/.venv/bin/python"
  elif [[ -x "$HOME/miniforge3/envs/ecom_scraper/bin/python" ]]; then
    SP_PYTHON="$HOME/miniforge3/envs/ecom_scraper/bin/python"
  else
    SP_PYTHON="python3"
  fi
fi

LOG_DIR="$ROOT_DIR/logs"
mkdir -p "$LOG_DIR"

log()  { printf "\033[1;36m[start-all]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[warn]\033[0m      %s\n" "$*"; }
die()  { printf "\033[1;31m[err]\033[0m       %s\n" "$*" >&2; exit 1; }

[[ -d "$CONTENT_PULSE_DIR" ]] || die "Content Pulse repo not found at $CONTENT_PULSE_DIR"
[[ -d "$SHELF_PULSE_DIR"   ]] || die "Shelf Pulse repo not found at $SHELF_PULSE_DIR"

PIDS=()
cleanup() {
  log "Shutting down all services..."
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
  wait 2>/dev/null || true
  log "Bye."
}
trap cleanup EXIT INT TERM

# --- 1. Launchpad (Next.js) --------------------------------------------------
if [[ ! -d "$ROOT_DIR/node_modules" ]]; then
  log "Installing launchpad-site deps..."
  ( cd "$ROOT_DIR" && npm install --no-audit --no-fund )
fi

# Make sure the launchpad knows where the live apps are.
if [[ ! -f "$ROOT_DIR/.env.local" ]]; then
  log "Writing default .env.local with NEXT_PUBLIC_*_URL"
  cat > "$ROOT_DIR/.env.local" <<EOF
NEXT_PUBLIC_CONTENT_PULSE_URL=http://localhost:$CP_FRONTEND_PORT
NEXT_PUBLIC_SHELF_PULSE_URL=http://localhost:$SP_FRONTEND_PORT
EOF
fi

log "Starting Launchpad on :$LAUNCHPAD_PORT"
( cd "$ROOT_DIR" && PORT="$LAUNCHPAD_PORT" npm run dev ) \
  > "$LOG_DIR/launchpad.log" 2>&1 &
PIDS+=($!)

# --- 2. Content Pulse --------------------------------------------------------
log "Starting Content Pulse backend on :$CP_BACKEND_PORT (python: $CP_PYTHON)"
(
  cd "$CONTENT_PULSE_DIR"
  exec "$CP_PYTHON" -m uvicorn app.api:app --host 0.0.0.0 --port "$CP_BACKEND_PORT"
) > "$LOG_DIR/content-pulse-backend.log" 2>&1 &
PIDS+=($!)

if [[ ! -d "$CONTENT_PULSE_DIR/content-pulse/node_modules" ]]; then
  log "Installing Content Pulse frontend deps..."
  ( cd "$CONTENT_PULSE_DIR/content-pulse" && npm install --no-audit --no-fund )
fi

log "Starting Content Pulse frontend on :$CP_FRONTEND_PORT"
(
  cd "$CONTENT_PULSE_DIR/content-pulse"
  PULSE_API_URL="http://localhost:$CP_BACKEND_PORT" \
    npm run dev -- --port "$CP_FRONTEND_PORT"
) > "$LOG_DIR/content-pulse-frontend.log" 2>&1 &
PIDS+=($!)

# --- 3. Shelf Pulse ----------------------------------------------------------
log "Starting Shelf Pulse backend on :$SP_BACKEND_PORT"
(
  cd "$SHELF_PULSE_DIR"
  # backend_api.py hardcodes port 8000 in __main__, but uvicorn import works.
  # Allow CORS from both the SP frontend and the launchpad, and point the
  # frontend at the right backend via VITE_API_BASE.
  export SCRAPER_CORS_ORIGINS="http://localhost:$SP_FRONTEND_PORT,http://127.0.0.1:$SP_FRONTEND_PORT,http://localhost:$LAUNCHPAD_PORT"
  exec "$SP_PYTHON" -m uvicorn --app-dir "$SHELF_PULSE_DIR" backend_api:app --host 0.0.0.0 --port "$SP_BACKEND_PORT"
) > "$LOG_DIR/shelf-pulse-backend.log" 2>&1 &
PIDS+=($!)

if [[ ! -d "$SHELF_PULSE_DIR/frontend/node_modules" ]]; then
  log "Installing Shelf Pulse frontend deps..."
  ( cd "$SHELF_PULSE_DIR/frontend" && npm install --no-audit --no-fund )
fi

log "Starting Shelf Pulse frontend on :$SP_FRONTEND_PORT"
(
  cd "$SHELF_PULSE_DIR/frontend"
  VITE_API_BASE="http://127.0.0.1:$SP_BACKEND_PORT" \
    npm run dev -- --port "$SP_FRONTEND_PORT"
) > "$LOG_DIR/shelf-pulse-frontend.log" 2>&1 &
PIDS+=($!)

sleep 2
printf "\n"
printf "\033[1;32m============================================================\033[0m\n"
printf "\033[1;32m  Pulse Studio is up\033[0m\n"
printf "  ➜  Launchpad        http://localhost:%s\n" "$LAUNCHPAD_PORT"
printf "  ➜  Content Pulse UI http://localhost:%s\n" "$CP_FRONTEND_PORT"
printf "  ➜  Content Pulse API http://localhost:%s\n" "$CP_BACKEND_PORT"
printf "  ➜  Shelf Pulse UI   http://localhost:%s\n" "$SP_FRONTEND_PORT"
printf "  ➜  Shelf Pulse API  http://localhost:%s\n" "$SP_BACKEND_PORT"
printf "\033[1;32m============================================================\033[0m\n\n"
log "Tailing logs (Ctrl-C to stop everything)..."
tail -n +1 -f \
  "$LOG_DIR/launchpad.log" \
  "$LOG_DIR/content-pulse-backend.log" \
  "$LOG_DIR/content-pulse-frontend.log" \
  "$LOG_DIR/shelf-pulse-backend.log" \
  "$LOG_DIR/shelf-pulse-frontend.log"
