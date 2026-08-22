import numpy as np, wave, struct

SR = 44100
DUR = 22.5
t = np.linspace(0, DUR, int(SR*DUR), endpoint=False)
out = np.zeros_like(t)

def note(freq, start, length, amp=0.2, kind='piano'):
    n = int(SR*length); i0 = int(SR*start)
    if i0 >= len(out): return
    tt = np.linspace(0, length, n, endpoint=False)
    if kind == 'piano':
        # inharmonic partials + fast decay
        s = (np.sin(2*np.pi*freq*tt)
             + 0.5*np.sin(2*np.pi*2*freq*tt)
             + 0.28*np.sin(2*np.pi*3*freq*tt)
             + 0.16*np.sin(2*np.pi*4*freq*tt))
        env = np.exp(-tt*2.6)
    else:  # strings pad: slow attack, vibrato
        vib = 1 + 0.004*np.sin(2*np.pi*5*tt)
        s = (np.sin(2*np.pi*freq*tt*vib)
             + 0.4*np.sin(2*np.pi*2*freq*tt*vib)
             + 0.2*np.sin(2*np.pi*3*freq*tt*vib))
        atk = np.clip(tt/0.6, 0, 1)
        rel = np.clip((length-tt)/0.8, 0, 1)
        env = atk*rel
    seg = (s*env*amp).astype(np.float64)
    end = min(i0+n, len(out))
    out[i0:end] += seg[:end-i0]

# gentle progression: Am - F - C - G, calm, ~60 bpm
def nf(name):
    base = {'A2':110.00,'C3':130.81,'E3':164.81,'F3':174.61,'G3':196.00,
            'A3':220.00,'C4':261.63,'E4':329.63,'F4':349.23,'G4':392.00,'A4':440.00}
    return base[name]

bar = 3.6
chords = [
    ('A2', ['A3','C4','E4']),
    ('F3', ['F3','A3','C4']),
    ('C3', ['C4','E4','G4']),
    ('G3', ['G3','A3','E4']),
]
for c in range(6):  # ~6 bars covers 22s
    ch = chords[c % 4]
    st = c*bar
    # strings pad root
    note(nf(ch[0]), st, bar+0.4, amp=0.10, kind='strings')
    # soft piano arpeggio
    for k, nm in enumerate(ch[1]):
        note(nf(nm), st + k*0.5, 1.6, amp=0.11, kind='piano')
    # a light echo of top note
    note(nf(ch[1][-1]), st + 1.9, 1.4, amp=0.07, kind='piano')

# normalize gently and soft-limit
out = out / (np.max(np.abs(out)) + 1e-9) * 0.6
out = np.tanh(out*1.1)
# fade in/out
fi = int(SR*0.8); fo = int(SR*1.2)
out[:fi] *= np.linspace(0,1,fi)
out[-fo:] *= np.linspace(1,0,fo)

pcm = (out*32767).astype(np.int16)
with wave.open('/tmp/claude-0/-home-user-Projects/937e2e76-5251-5944-a854-94cbcb779c06/scratchpad/build/bed.wav','w') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("bed.wav written", len(pcm)/SR, "s")
