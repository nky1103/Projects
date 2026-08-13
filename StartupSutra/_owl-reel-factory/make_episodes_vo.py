import json, numpy as np, soundfile as sf
import espeakng_loader
from kokoro_onnx import Kokoro, EspeakConfig

VOICE, SPEED = "af_heart", 0.95
LEAD, GAP, TAIL = 0.45, 0.30, 0.75
CARDMAP = [(2,2),(3,4),(5,5),(6,6)]   # c1..c4 -> line ranges

k = Kokoro("kokoro/kokoro-v1.0.onnx", "kokoro/voices-v1.0.bin",
           espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(),
                                       data_path=espeakng_loader.get_data_path()))

EPS = {
 "tata": {
   "speak": [
     "Everyone thinks Indian companies are the ones that get bought.",
     "Tata just wrote a three point eight billion euro cheque to buy a European giant.",
     "In July twenty twenty five, Tata Motors agreed to buy Italy's Iveco, an eighty year old truck maker.",
     "For years, going global meant a foreign firm buying an Indian one.",
     "Now the direction of the cheque has flipped.",
     "Tata gets eighty years of Europe. Iveco's owners get a clean exit.",
     "Stop getting bought. Start buying. That is independence.",
   ],
   "subs": [
     "Everyone thinks Indian companies are the ones that get <span class='hl'>bought.</span>",
     "Tata wrote a <span class='hl'>€3.8B cheque</span> to buy a European giant.",
     "It agreed to buy Italy's <span class='hl'>Iveco</span>, an 80-year-old truckmaker.",
     "For years, going global meant a foreign firm buying an Indian one.",
     "Now the direction of the cheque has <span class='hl'>flipped.</span>",
     "Tata gets 80 years of Europe. Iveco's owners get a <span class='hl'>clean exit.</span>",
     "Stop getting bought. <span class='hl'>Start buying.</span> That is independence.",
   ],
 },
 "kurien": {
   "speak": [
     "Everyone hands charity to the poor.",
     "This man handed farmers ownership instead, and it freed millions.",
     "Verghese Kurien reached the village of Anand in nineteen forty nine, an engineer who never wanted the job.",
     "Farmers did the work. Middlemen kept the money.",
     "So he built a business the farmers themselves owned. Amul.",
     "It made India the world's largest milk producer. Thirty six lakh farmer owners.",
     "Real freedom is owning what you produce.",
   ],
   "subs": [
     "Everyone hands <span class='hl'>charity</span> to the poor.",
     "This man handed farmers <span class='hl'>ownership</span> instead, and it freed millions.",
     "Kurien reached Anand in 1949, an engineer who never wanted the job.",
     "Farmers did the work. <span class='hl'>Middlemen kept the money.</span>",
     "So he built a business the farmers themselves owned. <span class='hl'>Amul.</span>",
     "India became the world's largest milk producer. <span class='hl'>36 lakh owners.</span>",
     "Real freedom is <span class='hl'>owning what you produce.</span>",
   ],
 },
}

def build(prefix, speak, subs):
    parts, durs = [], []
    SR = 24000
    for t in speak:
        s, sr = k.create(t, voice=VOICE, speed=SPEED, lang="en-us")
        SR = sr; s = np.asarray(s, dtype=np.float32); parts.append(s); durs.append(len(s)/sr)
    sil = lambda x: np.zeros(int(SR*x), dtype=np.float32)
    track=[sil(LEAD)]; starts=[]; cur=LEAD
    for i,pcm in enumerate(parts):
        starts.append((cur,cur+durs[i])); track.append(pcm); cur+=durs[i]
        if i!=len(parts)-1: track.append(sil(GAP)); cur+=GAP
    track.append(sil(TAIL)); cur+=TAIL
    audio=np.concatenate(track); total=len(audio)/SR
    sf.write(f"vo_{prefix}.wav", audio, SR)
    SUBS=[{"s":round(starts[i][0],3),"e":round(starts[i][1],3),"html":subs[i]} for i in range(len(starts))]
    HOOK={"s":0.2,"e":round(starts[1][1]+0.15,3)}
    CARDS=[]
    for idx,(a,b) in enumerate(CARDMAP):
        CARDS.append({"id":f"c{idx+1}","s":round(starts[a][0]-0.05,3),"e":round(starts[b][1]+0.2,3)})
    with open(f"timeline_{prefix}.js","w") as f:
        f.write("window.HOOK="+json.dumps(HOOK)+";\n")
        f.write("window.CARDS="+json.dumps(CARDS)+";\n")
        f.write("window.SUBS="+json.dumps(SUBS)+";\n")
        f.write("window.TOTAL="+json.dumps(round(total,3))+";\n")
    # per-frame envelope
    a=audio; fps=30; N=int(np.ceil(len(a)/SR*fps)); env=[]; half=int(SR/60)
    for fr in range(N):
        c=int((fr/fps)*SR); s0=max(0,c-half); e0=min(len(a),c+half)
        env.append(float(np.sqrt(np.mean(a[s0:e0]**2))) if e0>s0 else 0.0)
    env=np.array(env); env=env/(env.max()+1e-6); env=np.clip((env-0.06)/0.7,0,1)**0.8
    env=np.convolve(env,np.array([0.25,0.5,0.25]),'same')
    open(f"env_{prefix}.js","w").write("window.ENV="+json.dumps([round(float(x),3) for x in env])+";\n")
    print(f"{prefix}: total {round(total,2)}s, {N} frames")

for prefix,d in EPS.items():
    build(prefix, d["speak"], d["subs"])
print("done")
