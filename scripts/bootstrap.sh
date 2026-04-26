#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# Pulse Studio — zero-to-running bootstrap.
#
# One command takes you from nothing to all 5 services up:
#
#     bash <(curl -fsSL https://raw.githubusercontent.com/Aabhas4403/Launchpad_PulseStudio/main/scripts/bootstrap.sh)
#
# or, after cloning launchpad-site:
#
#     ./scripts/bootstrap.sh
#
# It will:
#   1. Verify prerequisites (git, node, python3, conda — installs Playwright).
#   2. Create ~/projects/pulse-studio/ (override with PULSE_ROOT=/path).
#   3. Clone all three repos as siblings (skips if they already exist).
#   4. Install Node + Python deps for every repo.
#   5. Install the Playwright Chromium browser (Shelf Pulse needs it).
#   6. Hand off to scripts/start-all.sh, which boots all 5 services.
#
# Re-running is safe — every step is idempotent.
#
# Override knobs:
#   PULSE_ROOT       parent dir for the three repos (default ~/projects/pulse-studio)
#   SKIP_RUN=1       set up everything but don't launch
#   USE_VENV=1       use a local .venv for Content Pulse instead of conda
# -----------------------------------------------------------------------------
set -euo pipefail

PULSE_ROOT="${PULSE_ROOT:-$HOME/projects/pulse-studio}"
SKIP_RUN="${SKIP_RUN:-0}"
USE_VENV="${USE_VENV:-0}"

LAUNCHPAD_REPO="${LAUNCHPAD_REPO:-https://github.com/Aabhas4403/Launchpad_PulseStudio.git}"
CONTENT_PULSE_REPO="${CONTENT_PULSE_REPO:-https://github.com/Aabhas4403/ContentPulse.git}"
SHELF_PULSE_REPO="${SHELF_PULSE_REPO:-https://github.com/jithendra-roy/Ecommerce_scrapper.git}"

LAUNCHPAD_DIR="$PULSE_ROOT/launchpad-site"
CONTENT_PULSE_DIR="$PULSE_ROOT/content-pulse-india"
SHELF_PULSE_DIR="$PULSE_ROOT/Ecommerce_scrapper"

# --- pretty output -----------------------------------------------------------
c_cyan="\033[1;36m"; c_yellow="\033[1;33m"; c_red="\033[1;31m"
c_green="\033[1;32m"; c_dim="\033[2m"; c_off="\033[0m"
step()  { printf "${c_cyan}[bootstrap]${c_off} %s\n" "$*"; }
ok()    { printf "${c_green}    ✓${c_off} %s\n" "$*"; }
warn()  { printf "${c_yellow}[warn]${c_off}      %s\n" "$*"; }
die()   { printf "${c_red}[err]${c_off}       %s\n" "$*" >&2; exit 1; }

# --- 1. Prereqs --------------------------------------------------------------
step "Checking prerequisites..."

require() {
  command -v "$1" >/dev/null 2>&1 || die "$1 not found. $2"
}
require git    "Install: https://git-scm.com/downloads"
require node   "Install Node.js >= 18: https://nodejs.org/"
require npm    "Ships with Node.js."
require python3 "Install Python >= 3.10: https://www.python.org/downloads/"

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
[[ "$NODE_MAJOR" -ge 18 ]] || die "Node.js 18+ required (found $(node -v))."

PY_VER="$(python3 -c 'import sys;print(f"{sys.version_info[0]}.{sys.version_info[1]}")')"
ok "git $(git --version | awk '{print $3}'), node $(node -v), python $PY_VER"

HAS_CONDA=0
CONDA_BIN=""
if command -v conda >/dev/null 2>&1; then
  CONDA_BIN="$(command -v conda)"; HAS_CONDA=1
else
  for p in \
      "$HOME/miniforge3/bin/conda" \
      "$HOME/miniconda3/bin/conda" \
      "$HOME/anaconda3/bin/conda" \
      "/opt/miniconda3/bin/conda" \
      "/opt/homebrew/Caskroom/miniconda/base/bin/conda" \
      "/opt/anaconda3/bin/conda"; do
    [[ -x "$p" ]] && { CONDA_BIN="$p"; HAS_CONDA=1; break; }
  done
fi
[[ "$HAS_CONDA" -eq 1 ]] && ok "conda at $CONDA_BIN" || warn "conda not found — will use venv fallback for Content Pulse"

# --- 2. Project folder -------------------------------------------------------
step "Preparing $PULSE_ROOT"
mkdir -p "$PULSE_ROOT"
ok "Project root ready: $PULSE_ROOT"

# --- 3. Clone repos ----------------------------------------------------------
clone_or_update() {
  local url="$1" dest="$2"
  if [[ -d "$dest/.git" ]]; then
    ok "$(basename "$dest") already cloned, fetching..."
    git -C "$dest" fetch --quiet origin || warn "fetch failed for $dest (offline?)"
  else
    step "Cloning $url -> $dest"
    git clone --quiet "$url" "$dest"
    ok "cloned $(basename "$dest")"
  fi
}
clone_or_update "$LAUNCHPAD_REPO"     "$LAUNCHPAD_DIR"
clone_or_update "$CONTENT_PULSE_REPO" "$CONTENT_PULSE_DIR"
clone_or_update "$SHELF_PULSE_REPO"   "$SHELF_PULSE_DIR"

# --- 4. Launchpad deps -------------------------------------------------------
step "Installing Launchpad (Next.js) deps"
( cd "$LAUNCHPAD_DIR" && npm install --no-audit --no-fund --silent )
ok "Launchpad deps installed"

# --- 5. Content Pulse env + deps --------------------------------------------
step "Setting up Content Pulse"
CP_PY=""
if [[ "$USE_VENV" == "1" || "$HAS_CONDA" -eq 0 ]]; then
  if [[ ! -d "$CONTENT_PULSE_DIR/.venv" ]]; then
    python3 -m venv "$CONTENT_PULSE_DIR/.venv"
  fi
  CP_PY="$CONTENT_PULSE_DIR/.venv/bin/python"
  "$CP_PY" -m pip install --upgrade pip --quiet
  "$CP_PY" -m pip install -r "$CONTENT_PULSE_DIR/requirements.txt" --quiet
  ok "Content Pulse: venv at .venv/, deps installed"
else
  CONDA_BASE="$("$CONDA_BIN" info --base)"
  # shellcheck disable=SC1091
  source "$CONDA_BASE/etc/profile.d/conda.sh"
  if conda env list | awk '{print $1}' | grep -qx "content-pulse"; then
    ok "Content Pulse: conda env 'content-pulse' already exists"
  else
    step "  creating conda env 'content-pulse' (python=3.12)"
    conda create -y -q -n content-pulse python=3.12 >/dev/null
  fi
  conda activate content-pulse
  CP_PY="$(which python)"
  "$CP_PY" -m pip install --upgrade pip --quiet
  "$CP_PY" -m pip install -r "$CONTENT_PULSE_DIR/requirements.txt" --quiet
  conda deactivate
  ok "Content Pulse: conda env ready, deps installed"
fi

step "Installing Content Pulse frontend deps"
( cd "$CONTENT_PULSE_DIR/content-pulse" && npm install --no-audit --no-fund --silent )
ok "Content Pulse frontend ready"

# --- 6. Shelf Pulse env + deps -----------------------------------------------
step "Setting up Shelf Pulse"
SP_PY=""
if [[ "$HAS_CONDA" -eq 1 ]]; then
  CONDA_BASE="$("$CONDA_BIN" info --base)"
  # shellcheck disable=SC1091
  source "$CONDA_BASE/etc/profile.d/conda.sh"
  if conda env list | awk '{print $1}' | grep -qx "ecom_scraper"; then
    ok "Shelf Pulse: conda env 'ecom_scraper' already exists"
  else
    step "  creating conda env 'ecom_scraper' (python=3.12)"
    conda create -y -q -n ecom_scraper python=3.12 >/dev/null
  fi
  conda activate ecom_scraper
  SP_PY="$(which python)"
  "$SP_PY" -m pip install --upgrade pip --quiet
  "$SP_PY" -m pip install -r "$SHELF_PULSE_DIR/requirements.txt" --quiet
  step "  installing Playwright Chromium (~150 MB, one-time)"
  "$SP_PY" -m playwright install chromium --with-deps >/dev/null 2>&1 \
    || "$SP_PY" -m playwright install chromium >/dev/null
  conda deactivate
  ok "Shelf Pulse: conda env + Playwright ready"
else
  if [[ ! -d "$SHELF_PULSE_DIR/.venv" ]]; then
    python3 -m venv "$SHELF_PULSE_DIR/.venv"
  fi
  SP_PY="$SHELF_PULSE_DIR/.venv/bin/python"
  "$SP_PY" -m pip install --upgrade pip --quiet
  "$SP_PY" -m pip install -r "$SHELF_PULSE_DIR/requirements.txt" --quiet
  "$SP_PY" -m playwright install chromium >/dev/null
  ok "Shelf Pulse: venv + Playwright ready"
fi

step "Installing Shelf Pulse frontend deps"
# The upstream Ecommerce_scrapper repo currently .gitignores its package.json
# and a few sibling files, so a fresh clone is missing them. Patch them in
# from the bundled fallback copy if they're missing.
SP_FALLBACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/sp-frontend-fallback"
SP_FRONT="$SHELF_PULSE_DIR/frontend"
for f in package.json index.html tsconfig.json tsconfig.app.json tsconfig.node.json; do
  if [[ ! -f "$SP_FRONT/$f" && -f "$SP_FALLBACK_DIR/$f" ]]; then
    cp "$SP_FALLBACK_DIR/$f" "$SP_FRONT/$f"
    ok "patched in missing frontend/$f"
  fi
done
( cd "$SP_FRONT" && npm install --no-audit --no-fund --silent )
ok "Shelf Pulse frontend ready"

# --- 7. Hand off to start-all -----------------------------------------------
printf "\n${c_green}============================================================${c_off}\n"
printf "${c_green}  Setup complete.${c_off}\n"
printf "  Repos in: ${c_dim}%s${c_off}\n" "$PULSE_ROOT"
printf "  Content Pulse python: ${c_dim}%s${c_off}\n" "$CP_PY"
printf "  Shelf Pulse python:   ${c_dim}%s${c_off}\n" "$SP_PY"
printf "${c_green}============================================================${c_off}\n\n"

if [[ "$SKIP_RUN" == "1" ]]; then
  step "SKIP_RUN=1 — exiting before launch."
  step "To start everything:"
  printf "    cd %s && SP_PYTHON=%s ./scripts/start-all.sh\n\n" "$LAUNCHPAD_DIR" "$SP_PY"
  exit 0
fi

step "Launching all services via scripts/start-all.sh ..."
exec env \
  CONTENT_PULSE_DIR="$CONTENT_PULSE_DIR" \
  SHELF_PULSE_DIR="$SHELF_PULSE_DIR" \
  SP_PYTHON="$SP_PY" \
  bash "$LAUNCHPAD_DIR/scripts/start-all.sh"
