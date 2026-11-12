#!/usr/bin/env bash
# Renders the designed images in scripts/covers/*.html to PNGs, using headless Edge or
# Chrome:
#   promptops.html -> public/ProjectImages/Promptops.png  (project tile, 1600 × 1000 at 2x)
#   share.html     -> public/og.png                       (link-preview image, 1200 × 630)
# Run scripts/optimize-images.sh afterwards so the tile's WebP copies are rebuilt.
#
#   bash scripts/render-covers.sh
set -euo pipefail

cd "$(dirname "$0")/.."

BROWSER="${BROWSER:-}"
for candidate in \
  "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "/usr/bin/google-chrome" \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
  [ -z "$BROWSER" ] && [ -x "$candidate" ] && BROWSER="$candidate"
done
[ -n "$BROWSER" ] || { echo "No browser found. Set BROWSER to an Edge or Chrome executable." >&2; exit 1; }

profile="$(mktemp -d)"
trap 'rm -rf "$profile"' EXIT

# pwd -W gives a Windows path under Git Bash; elsewhere plain pwd is already right.
here() { (cd "$1" && (pwd -W 2>/dev/null || pwd)); }

render() { # <cover name> <output file, relative to the project> <width> <height> <scale>
  "$BROWSER" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
    --user-data-dir="$profile" --window-size="$3,$4" --force-device-scale-factor="$5" \
    --virtual-time-budget=6000 --screenshot="$(here "$(dirname "$2")")/$(basename "$2")" \
    "file:///$(here scripts/covers)/$1.html" >/dev/null 2>&1
  echo "rendered $2"
}

render promptops public/ProjectImages/Promptops.png 1600 1000 2
render share public/og.png 1200 630 1
