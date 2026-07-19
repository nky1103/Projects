# Reel #001 — Instagram / Burbn (companion to Case Study #001)

**File:** `reel-001-instagram.mp4` — 1080×1920 (9:16), 36s, 30fps, H.264 + AAC voiceover

## What's in it
Kinetic-typography reel in the locked StartupSutra brand language (same fonts,
colors, cards, and grid as the carousel — documentary pacing, light zooms, no
stock footage or AI imagery). AI voiceover (George — warm storyteller) is
burned in, scene-synced to the narration via silence detection.

Beat sheet:
- 0–5s   Hook: "Imagine deleting 80% of your startup…"
- 5–13s  Story: Burbn and its four features
- 13–23s Problem → photo sharing explodes → they delete everything
- 23–27s Climax: 1,000,000 counter rolls up
- 27–36s Lesson: "remove more" → Focus > Features → follow card

## Posting checklist
1. Upload `reel-001-instagram.mp4` as a Reel
2. Paste `caption.txt` (different from the carousel caption on purpose)
3. Add Instagram Music on top at 15–20% volume — search: Documentary,
   Cinematic, Ambient, Inspirational Piano, Lo-fi. Keep it UNDER the voiceover.
4. Cover frame: pick the 80% hook moment (~2.5s in)

## Rebuilding
`source/reel.html` is the animated stage (a `seek(t)` function drives every
scene). `source/reel_render.js` captures 30fps frames via Playwright; assemble
with ffmpeg and mux `vo_fast.wav`. VO script in `voiceover-script.txt`.
