import json, numpy as np, soundfile as sf
import espeakng_loader
from kokoro_onnx import Kokoro, EspeakConfig

VOICE = "af_heart"     # warm, highest-graded Kokoro voice
SPEED = 0.95
LEAD, GAP, TAIL = 0.45, 0.30, 0.75

k = Kokoro("kokoro/kokoro-v1.0.onnx", "kokoro/voices-v1.0.bin",
           espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(),
                                       data_path=espeakng_loader.get_data_path()))

# spoken text
speak = [
    "Everyone says India can't make its own chips.",
    "One startup just proved them wrong.",
    "Netrasemi, in Kerala, raised one hundred and seven crore rupees, led by Zoho,",
    "to design edge A.I. chips in India, with its own I.P.",
    "India writes world-class software, but imports almost every chip it runs on.",
    "This money funds the hardest frontier, the silicon itself.",
    "Self-reliance is the real thesis.",
]
# on-screen subtitle html (display)
subs_html = [
    "Everyone says India can't make its own <span class='hl'>chips.</span>",
    "One startup just <span class='hl'>proved them wrong.</span>",
    "Netrasemi (Kerala) raised <span class='hl'>₹107 crore</span>, led by Zoho,",
    "to design <span class='hl'>edge-AI chips</span> in India, with its own IP.",
    "India writes world-class software, but <span class='hl'>imports almost every chip</span> it runs on.",
    "This money funds the hardest frontier: <span class='hl'>the silicon itself.</span>",
    "<span class='hl'>Self-reliance</span> is the real thesis.",
]

SR = 24000
parts, durs = [], []
for t in speak:
    samples, sr = k.create(t, voice=VOICE, speed=SPEED, lang="en-us")
    SR = sr
    samples = np.asarray(samples, dtype=np.float32)
    parts.append(samples); durs.append(len(samples)/sr)

sil = lambda s: np.zeros(int(SR*s), dtype=np.float32)
track = [sil(LEAD)]
starts = []
cursor = LEAD
for i, pcm in enumerate(parts):
    starts.append((cursor, cursor+durs[i]))
    track.append(pcm); cursor += durs[i]
    if i != len(parts)-1:
        track.append(sil(GAP)); cursor += GAP
track.append(sil(TAIL)); cursor += TAIL
audio = np.concatenate(track)
total = len(audio)/SR
sf.write("vo_kokoro.wav", audio, SR)

SUBS = [{"s": round(starts[i][0],3), "e": round(starts[i][1],3), "html": subs_html[i]}
        for i in range(len(starts))]
HOOK = {"s": 0.2, "e": round(starts[1][1]+0.15, 3)}          # lines 0-1
CARDS = [
    {"id":"c1", "s": round(starts[2][0]-0.05,3), "e": round(starts[2][1]+0.15,3)},
    {"id":"c2", "s": round(starts[3][0]-0.05,3), "e": round(starts[3][1]+0.15,3)},
    {"id":"c3", "s": round(starts[4][0]-0.05,3), "e": round(starts[4][1]+0.15,3)},
    {"id":"c4", "s": round(starts[5][0]-0.05,3), "e": round(starts[6][1]+0.25,3)},  # lines 5-6
]

with open("studio_timeline.js","w") as f:
    f.write("window.HOOK="+json.dumps(HOOK)+";\n")
    f.write("window.CARDS="+json.dumps(CARDS)+";\n")
    f.write("window.SUBS="+json.dumps(SUBS)+";\n")
    f.write("window.TOTAL="+json.dumps(round(total,3))+";\n")

print("voice:", VOICE, "| total:", round(total,2), "s | sr:", SR)
for i,s in enumerate(SUBS):
    print(f"  line{i}: {s['s']:.2f}-{s['e']:.2f}")
print("cards:", [(c['id'],c['s'],c['e']) for c in CARDS])
