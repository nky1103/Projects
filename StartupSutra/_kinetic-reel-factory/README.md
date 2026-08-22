# Kinetic Reel Factory (post-owl standard)

Pre-owl kinetic-text reel engine, restored as the standing format. **No owl.**
Bold Inter Black text, pillar-coloured accent, faint grid glow, StartupSutra
branding, "Send this to…" outro card, soft piano/strings bed.

## Voice & strategy (locked)
- **Strategy — Rich Dad Poor Dad:** every reel turns on one money/ownership
  truth (asset vs liability, owner vs seller, own vs be paid). The familiar
  Indian company is the parable.
- **Tone — plain-mentor (Sensei, dialled down):** short sentences, everyday
  words, one calm human line to close. No poetry, no "young friend", no AI polish.
- **Structure:** hook → two-mind contrast → asset/liability turn → the money
  line → the number that proves it → plain close → "Send this to…".

## Pipeline
1. Edit the `EP` map in `render_all.js` (6 lines + cta per episode, pillar colour).
2. `node render_all.js [keys...]` → `frames_<key>/` (30fps, 1080x1920, 22s).
3. `python3 make_bed.py` → `bed.wav` (soft piano + strings, ~22s).
4. Encode: full ffmpeg (imageio-ffmpeg), libx264 -crf 19, yuv420p, +faststart,
   aac 160k, `-shortest`, muxing `bed.wav`.

Env notes: Chromium at /opt/pw-browsers/chromium-1194/chrome-linux/chrome;
playwright at /opt/node22/lib/node_modules; Inter fonts from rsms/inter GitHub
release (HuggingFace is proxy-blocked, GitHub releases + PyPI are allowed).
The Playwright ffmpeg is webm-only — use imageio-ffmpeg's binary for MP4.
