# Netrasemi voiceover reel — finished video

`netrasemi-vo-reel.mp4` — 29s, 1080x1920, narrated studio/data-slide reel, built
entirely in-pipeline (no Gemini / no paid tools). Dark teal Growth Capital studio,
animated mic + equalizer, data cards synced to the narration, burned-in subtitles,
soft music bed.

## Honest note on the voice
The narration is a FREE offline synthetic voice (espeak-ng, formant synth). It is
robotic, a scratch/placeholder, not a natural neural voice. Everything else,
visuals, timing, subtitles, music, is final and on-brand.

## Swapping in a real voice (1-minute re-mux, still free)
1. Record the script on a phone (or a free ElevenLabs / Gemini trial). Script is
   in `overlay-README.md`.
2. Drop the new voice track over `studio-source.html` output, or send the audio
   file and it gets muxed in place of the espeak track. The visual timings are in
   `studio-source.html` (CARDS / SUBS arrays) if the new VO changes the pacing.

Source: `studio-source.html` (animation), `overlay-README.md` (script + timings).
