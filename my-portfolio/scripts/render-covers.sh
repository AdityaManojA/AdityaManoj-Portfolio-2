#!/usr/bin/env bash
# Renders the designed cover images in scripts/covers/*.html to PNGs in
# public/ProjectImages, using headless Edge or Chrome. Each cover is laid out at
# 1600 × 1000 and rendered at 2x. Run scripts/optimize-images.sh afterwards.
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

render() { # <cover html name> <output png name>
  local src out
  src="$(cd scripts/covers && pwd -W 2>/dev/null || pwd)/$1.html"
  out="$(cd public/ProjectImages && pwd -W 2>/dev/null || pwd)/$2.png"
  "$BROWSER" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
    --user-data-dir="$profile" --window-size=1600,1000 --force-device-scale-factor=2 \
    --virtual-time-budget=6000 --screenshot="$out" "file:///$src" >/dev/null 2>&1
  echo "rendered $2.png"
}

render promptops Promptops
