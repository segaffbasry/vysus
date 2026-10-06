#!/bin/sh
# Rebuilds public/media, public/fonts and public/brand from vysusgroup.com: the homepage's own photos (largest
# variant the live srcset offers), the hero film, the Suisse Int'l files the live site self-hosts and the SVG sprite
# that holds the vector logo. Then encodes web versions. Needs curl, ffmpeg and cwebp.
set -e
cd "$(dirname "$0")/.."
RAW=_scrape/raw; OUT=public/media; mkdir -p "$RAW" "$OUT" public/fonts public/brand
B=https://www.vysusgroup.com
UA="Mozilla/5.0 (Macintosh) Chrome/130"
get() { [ -s "$RAW/$2" ] || curl -sfL -A "$UA" "$B/$1" -o "$RAW/$2"; }

# name                                                                                                   local
get assets/engineering-1080.webm                                                                          hero-1080.webm
get assets/engineering-720.webm                                                                           hero-720.webm
# The careers site's header film (careers.vysusgroup.com plays it from S3; the main site serves the same file).
get assets/header-v3.mp4                                                                                  careers.mp4
get imager/general/25246/GettyImages-91624225_2021-03-29-063809_4107e36cd9a37812ac9f8ba3c6b67317.jpg       services.jpg
get imager/general/78131/GettyImages-1252680958_786f5bc2871f2a70489f19ea669f60b1.jpg                       subscribe.jpg
get imager/general/157391/Thomas-Aas-Saethre-web_94160162de61984a551634eca5d4cadf_51fcfd2ff5a7410d126c305193335a32.jpg news-rennie.jpg
get imager/general/156842/20260325114747_ae05de936defd166352b69b1afae2002.jpg                             news-less-is-more.jpg
get imager/general/156839/20260325114732_51fcfd2ff5a7410d126c305193335a32.jpg                             news-evidence.jpg
# The four most recent case studies, as the live listing (/news-and-insights/case-studies) shows them.
get imager/general/156903/ggghhh_2026-07-06-144608_xtuz_ef3d2048961857d530cfaa9c0b229d82.jpg             case-subsea.jpg
get imager/general/156802/AdobeStock_1892001745-1_ef3d2048961857d530cfaa9c0b229d82.jpg                    case-iccp.jpg
get imager/general/156510/rbgyum_ef3d2048961857d530cfaa9c0b229d82.jpg                                     case-thermal.jpg
get imager/general/156298/oipoi_ef3d2048961857d530cfaa9c0b229d82.jpg                                      case-ground-model.jpg

# Suisse Int'l, as the live bundle.css declares it (Light = body, Regular = headings, Bold = labels).
font() { [ -s "public/fonts/$2" ] || curl -sfL -A "$UA" "$B/dist/$1" -o "public/fonts/$2"; }
font 07385ab6c3176067f1f42596e73dcfd1.woff2 suisse-intl-light.woff2
font 29dee7ae1e760931b38742a9a84eec7f.woff2 suisse-intl-regular.woff2
font 28e94b7a0af17226a6a65ac0acdc4a66.woff2 suisse-intl-bold.woff2

# The homepage HTML carries the SVG sprite with the vector logo (#sprite-icon-logo-original) and line icons.
[ -s "$RAW/home.html" ] || curl -sfL -A "$UA" "$B/" -o "$RAW/home.html"
node scripts/logo.mjs

# Hero film: H.264 for every browser plus the live WebM, silent; a poster cut from the first second.
[ -f "$OUT/hero.mp4" ] || ffmpeg -v error -y -i "$RAW/hero-1080.webm" -an -vf "scale=1440:-2" -c:v libx264 -crf 29 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT/hero.mp4"
[ -f "$OUT/hero-720.mp4" ] || ffmpeg -v error -y -i "$RAW/hero-720.webm" -an -vf "scale=960:-2" -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT/hero-720.mp4"
[ -f "$OUT/hero-poster.jpg" ] || ffmpeg -v error -y -ss 0.4 -i "$RAW/hero-1080.webm" -frames:v 1 -vf "scale=1600:-2" -q:v 3 "$OUT/hero-poster.jpg"

# Careers: the brand chevron film, silent, 1280 wide (flat graphics compress well), plus its poster.
[ -f "$OUT/careers.mp4" ] || ffmpeg -v error -y -i "$RAW/careers.mp4" -an -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT/careers.mp4"
[ -f "$OUT/careers-poster.jpg" ] || ffmpeg -v error -y -ss 9 -i "$RAW/careers.mp4" -frames:v 1 -vf "scale=1280:-2" -q:v 3 "$OUT/careers-poster.jpg"

# Who we are: a still from the same film (16s, the engineer with the plant overlay).
[ -f "$OUT/who.webp" ] || { ffmpeg -v error -y -ss 16 -i "$RAW/hero-1080.webm" -frames:v 1 "$RAW/who.png" && cwebp -quiet -q 80 "$RAW/who.png" -o "$OUT/who.webp"; }

# Photos: one webp each, 1600px for the image-led blocks, 960px for news cards.
for f in services subscribe; do
  [ -f "$OUT/$f.webp" ] || cwebp -quiet -q 76 -resize 1600 0 "$RAW/$f.jpg" -o "$OUT/$f.webp"
done
for f in news-rennie news-less-is-more news-evidence case-subsea case-iccp case-thermal case-ground-model; do
  [ -f "$OUT/$f.webp" ] || cwebp -quiet -q 78 -resize 960 0 "$RAW/$f.jpg" -o "$OUT/$f.webp"
done
echo "media ok"
