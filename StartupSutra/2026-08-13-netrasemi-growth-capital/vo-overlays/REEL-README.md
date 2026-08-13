# Netrasemi voiceover reel — finished video (natural neural voice)

`netrasemi-vo-reel.mp4` — 27.6s, 1080x1920. Narrated studio/data-slide reel built
100% in our own pipeline: no Gemini, no ElevenLabs, no paid credits, no web tools.

## The voice
Natural neural TTS via **Kokoro** (82M, open-source, MIT), running offline on CPU
in the build container. Voice: `af_heart`. This is a real human-sounding voice,
not the earlier robotic espeak scratch.

## How it's made (fully reproducible + free)
1. Model weights (one-time, ~350MB) pulled from the Kokoro GitHub release
   (github.com/thewh1teagle/kokoro-onnx, model-files-v1.0). HuggingFace is blocked
   by the egress proxy; GitHub releases are not, so we fetch from there.
2. `kokoro_build.py` synthesizes each narration line, measures real durations, and
   writes `studio_timeline.js` (subtitle + data-card timings) + `vo_kokoro.wav`.
3. `studio-source.html` renders the animated studio (mic, equalizer, data cards,
   burned-in subtitles) frame-by-frame on that timeline via Playwright.
4. ffmpeg encodes + mixes the voice with a soft music bed.

## Changing the voice
Edit `VOICE` in `kokoro_build.py`. Options include af_heart, af_bella, af_sarah,
am_michael, am_adam, bf_emma, bf_isabella, bm_george (US/UK male & female).
Kokoro has no native Indian-English voice; af_heart / bf_emma read cleanest.
Adjust `SPEED` (0.95 = calm documentary pace).

## Templating for every episode
The pipeline is subject-agnostic: swap the 7 lines + card text + pillar color and
it produces a VO reel for any episode, free and unattended.
