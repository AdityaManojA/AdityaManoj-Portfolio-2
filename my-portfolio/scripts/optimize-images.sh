#!/usr/bin/env bash
# Builds the web versions of the project screenshots that the site actually loads.
#
# The originals in public/ProjectImages are up to 3840px wide and several MB each. For every
# PNG/JPEG there, this writes two WebP files into public/ProjectImages/web:
#   <name>.webp     up to 1920px wide, for the project grid
#   <name>-sm.webp  up to 480px wide, for the spinning cloud on the landing page
#
# Re-run it after adding or replacing a screenshot:  bash scripts/optimize-images.sh
# Requires ffmpeg with libwebp.
set -euo pipefail

cd "$(dirname "$0")/../public/ProjectImages"
mkdir -p web

for src in *.png *.jpg *.jpeg; do
  [ -e "$src" ] || continue
  name="${src%.*}"
  # scale=min(W,iw):-2 never upscales and keeps the height even.
  ffmpeg -loglevel error -y -i "$src" -vf "scale='min(1920,iw)':-2:flags=lanczos" \
    -c:v libwebp -quality 86 -compression_level 6 "web/$name.webp"
  ffmpeg -loglevel error -y -i "$src" -vf "scale='min(480,iw)':-2:flags=lanczos" \
    -c:v libwebp -quality 80 -compression_level 6 "web/$name-sm.webp"
done

du -sh web | awk '{print "web/ total: " $1}'
