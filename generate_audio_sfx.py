import os
import subprocess
import numpy as np
import wave

AUDIO_DIR = r"c:\Users\saumy\OneDrive\Desktop\motion design\antigravity-motion-demo\public\stage_assets\audio"
os.makedirs(AUDIO_DIR, exist_ok=True)
SAMPLE_RATE = 44100

def write_wav(filename, samples):
    path = os.path.join(AUDIO_DIR, filename)
    samples = np.clip(samples, -1.0, 1.0)
    int_samples = (samples * 32767).astype(np.int16)
    with wave.open(path, 'w') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SAMPLE_RATE)
        w.writeframes(int_samples.tobytes())
    print(f"Generated {filename}")

# 1. UI Pop (Crisp tactile feedback pop for comment cards)
t = np.linspace(0, 0.12, int(SAMPLE_RATE * 0.12), False)
pop = np.sin(2 * np.pi * (600 - t * 3000) * t) * np.exp(-t * 35)
write_wav("ui_pop.wav", pop)

# 2. Tech Ping (Lock-on pin drop on DOM element)
t = np.linspace(0, 0.5, int(SAMPLE_RATE * 0.5), False)
ping = (np.sin(2 * np.pi * 1760 * t) * 0.7 + np.sin(2 * np.pi * 3520 * t) * 0.3) * np.exp(-t * 9)
write_wav("pin_drop.wav", ping)

# 3. Cinematic Sub-Bass Impact (Scene transitions)
t = np.linspace(0, 1.4, int(SAMPLE_RATE * 1.4), False)
freq = 75 * np.exp(-t * 2.2)
sub = np.sin(2 * np.pi * freq * t) * np.exp(-t * 1.8) * 0.95
write_wav("sub_impact.wav", sub)

# 4. Modern Cyber Whoosh / Swipe
t = np.linspace(0, 0.35, int(SAMPLE_RATE * 0.35), False)
noise = np.random.uniform(-1, 1, len(t))
envelope = np.sin(np.pi * (t / 0.35)) ** 2
freq_mod = np.sin(2 * np.pi * (200 + 800 * (t / 0.35)) * t)
whoosh = (noise * 0.4 + freq_mod * 0.6) * envelope * 0.8
write_wav("whoosh_swipe.wav", whoosh)

# 5. Electronic Tech Riser
t = np.linspace(0, 1.5, int(SAMPLE_RATE * 1.5), False)
pitch_rise = 120 + 700 * (t / 1.5) ** 2
riser = np.sin(2 * np.pi * pitch_rise * t) * (t / 1.5) * 0.75
write_wav("tech_riser.wav", riser)

# 6. Driving Tech BGM Loop (124 BPM, deep analog pulse + kick sidechain + hi-hat)
BPM = 124
BEAT_DUR = 60 / BPM
TOTAL_DUR = 50.0  # 50 seconds to cover full 46s video + tails
t_bgm = np.linspace(0, TOTAL_DUR, int(SAMPLE_RATE * TOTAL_DUR), False)
bgm = np.zeros_like(t_bgm)

# Generate repeating synth bass pulse + minimal kicks + crisp hi-hats
for i in range(int(TOTAL_DUR / (BEAT_DUR / 2))):
    start_time = i * (BEAT_DUR / 2)
    start_idx = int(start_time * SAMPLE_RATE)
    # Bass note
    note_dur = BEAT_DUR * 0.4
    n_samples = min(int(note_dur * SAMPLE_RATE), len(bgm) - start_idx)
    if n_samples > 0:
        t_note = np.linspace(0, note_dur, n_samples, False)
        # 16th bassline pattern (D2 - F2 - G2 - D2)
        pattern = [73.42, 73.42, 87.31, 98.00, 73.42, 110.00, 98.00, 73.42]
        f0 = pattern[i % len(pattern)]
        bass_note = (np.sin(2 * np.pi * f0 * t_note) + 0.35 * np.sin(2 * np.pi * f0 * 2 * t_note)) * np.exp(-t_note * 8)
        bgm[start_idx:start_idx + n_samples] += bass_note * 0.35

    # Kick on every full beat (i % 2 == 0)
    if i % 2 == 0:
        kick_dur = 0.22
        k_samples = min(int(kick_dur * SAMPLE_RATE), len(bgm) - start_idx)
        if k_samples > 0:
            t_k = np.linspace(0, kick_dur, k_samples, False)
            f_k = 130 * np.exp(-t_k * 24)
            kick = np.sin(2 * np.pi * f_k * t_k) * np.exp(-t_k * 14)
            bgm[start_idx:start_idx + k_samples] += kick * 0.55

    # Hi-hat on offbeat (i % 2 == 1)
    if i % 2 == 1:
        hh_dur = 0.05
        hh_samples = min(int(hh_dur * SAMPLE_RATE), len(bgm) - start_idx)
        if hh_samples > 0:
            hh_noise = np.random.uniform(-1, 1, hh_samples) * np.exp(-np.linspace(0, 1, hh_samples) * 30)
            bgm[start_idx:start_idx + hh_samples] += hh_noise * 0.18

# Master fade in and fade out
fade_in_len = int(SAMPLE_RATE * 1.0)
fade_out_len = int(SAMPLE_RATE * 2.5)
bgm[:fade_in_len] *= np.linspace(0, 1, fade_in_len)
bgm[-fade_out_len:] *= np.linspace(1, 0, fade_out_len)

write_wav("stage_tech_bgm.wav", bgm * 0.65)
print("Complete procedural sound suite generated!")
