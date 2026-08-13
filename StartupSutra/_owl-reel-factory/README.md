# Owl-host reel factory (Variant B — data on the monitor)

The standing format going forward: **reels only, no carousels.** The owl is the
recurring on-screen host in its podcast studio; the branded monitor shows the
data; the beak + head tilt track the voice.

## Pieces
- `owl_template.html` — color-parameterized reel. Reads globals: ACCENT (pillar
  colors), LABEL (monitor line), HOOK_HTML, DATA (4 cards), plus a timeline
  (HOOK/CARDS/SUBS/TOTAL) and ENV (per-frame audio envelope). VARIANT defaults
  to 'screen' (data on monitor).
- `owl_scene.png` / `head_sprite.png` — the recurring host + feathered head sprite.
- `make_episodes_vo.py` — Kokoro (free, offline) voice + timeline + envelope per
  episode. Model weights live under scratch `kokoro/` (GitHub release).
- `owl_ep_render.js` — renders frames for an episode, then ffmpeg encodes + muxes
  voice with the soft music bed.
- `episodes/` — per-episode config + timeline + env (one set per reel).

## Per-episode inputs (config_<ep>.js)
ACCENT (pillar hex set), LABEL ("Exit Stories · #004"), HOOK_HTML, DATA (4 cards:
eyebrow, big value, sub, desk+screen font sizes). Voice script lives in
make_episodes_vo.py (speak + subtitle html + card->line map).

Pillars: Case Study amber, Startup Failure red, Marketing blue, Seed violet,
Growth teal, Exit rose, Founder Framework green.
