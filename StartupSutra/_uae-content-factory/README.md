# UAE Content Factory — Dubai real estate, data-first

Standing format from Sep 2026: **daily reel + carousel** on Dubai/UAE real
estate. Rich Dad Poor Dad lens, global audience, **every claim backed by a
sourced number** (DLD, Bayut/Property Finder, Knight Frank, CBRE). **No
background music** — reels are silent masters; add a trending sound in-app.

## Pillars (7-day rotation)
Market Pulse (amber) · Crash Files (red) · Boom Radar (green) · Yield Lab
(teal) · Money Moves (blue) · World vs Dubai (violet) · Asset Mindset (rose).

## Two formats, one research effort
- **Reel** (`uae_reel_template.html`, 1080x1920): discovery hook. Scene types
  `text` / `bignum` / `bars` (animated growth). Silent. ~20s @30fps.
- **Carousel** (`carousel_template.html`, 1080x1350): depth + authority. Slide
  types `cover` / `bignum` / `bars` / `lesson` / `cta`. Always ends with a
  source line.

## Build
1. Write a config module (see day1_reel.js / day1_carousel.js): pillar colours
   (acc/deep/glow), `label`, scenes/slides, data arrays `{lbl,v,disp,muted}`.
2. `node render_carousel.js <config.js> <prefix>` → `out/<prefix>_sNN.png`.
   `node render_reel.js <config.js> <key>` → `rframes_<key>/`.
3. Encode reel: imageio-ffmpeg, libx264 -crf 19 yuv420p +faststart, **no audio**.
   (Carousel slides post as-is PNGs.)

Env: Chromium /opt/pw-browsers/chromium-1194/chrome-linux/chrome; playwright
/opt/node22/lib/node_modules; Inter from rsms/inter GitHub release.

## Data rule
Never invent a statistic. Pull the real figure, cite the source on the
carousel, and keep a "Not financial advice" posture in bio/captions.
