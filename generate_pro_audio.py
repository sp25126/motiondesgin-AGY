import os
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

# 1. Heavy Cinematic Sub-Drop (Sovera / Tom Lulofs style)
t = np.linspace(0, 1.6, int(SAMPLE_RATE * 1.6), False)
freq = 95 * np.exp(-t * 2.8)
sub = (np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(2 * np.pi * freq * 0.5 * t)) * np.exp(-t * 1.6)
write_wav("sub_drop_heavy.wav", sub * 0.95)

# 2. Aerodynamic Air Whoosh (Clean friction-free camera swipe)
t = np.linspace(0, 0.42, int(SAMPLE_RATE * 0.42), False)
noise = np.random.uniform(-1, 1, len(t))
# Filtered band-pass swept envelope
envelope = np.sin(np.pi * (t / 0.42)) ** 2.5
swoop = np.sin(2 * np.pi * (180 + 1200 * (t / 0.42) ** 2) * t)
whoosh = (noise * 0.55 + swoop * 0.45) * envelope
write_wav("whoosh_air.wav", whoosh * 0.85)

# 3. Sonar Radar Ping (High-tech pin drop with crystal reverberation)
t = np.linspace(0, 0.7, int(SAMPLE_RATE * 0.7), False)
harm1 = np.sin(2 * np.pi * 2093.0 * t) * np.exp(-t * 8)    # C7
harm2 = np.sin(2 * np.pi * 4186.0 * t) * np.exp(-t * 14)   # C8
harm3 = np.sin(2 * np.pi * 1046.5 * t) * np.exp(-t * 5)    # C6
ping = (harm1 * 0.5 + harm2 * 0.3 + harm3 * 0.2)
write_wav("sonar_ping.wav", ping * 0.9)

# 4. Camera Shutter / Mechanical Lens Lock (Viewport lock-on)
t = np.linspace(0, 0.18, int(SAMPLE_RATE * 0.18), False)
click1 = np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 60)
click2 = np.sin(2 * np.pi * 1200 * (t - 0.04)) * np.exp(-(t - 0.04) * 50) * (t > 0.04)
shutter = click1 * 0.6 + click2 * 0.7
write_wav("camera_shutter.wav", shutter * 0.85)

# 5. Tactile Pop (Apple-style smooth glass tap)
t = np.linspace(0, 0.08, int(SAMPLE_RATE * 0.08), False)
pop = np.sin(2 * np.pi * (800 - t * 6000) * t) * np.exp(-t * 55)
write_wav("tactile_click.wav", pop * 0.8)

# 6. Master 62-Second 126 BPM Dynamic Tech Soundtrack (Tom Lulofs & Sovera energy)
BPM = 126
BEAT_DUR = 60 / BPM
TOTAL_DUR = 62.0
t_bgm = np.linspace(0, TOTAL_DUR, int(SAMPLE_RATE * TOTAL_DUR), False)
bgm = np.zeros_like(t_bgm)

num_beats = int(TOTAL_DUR / BEAT_DUR)

for b in range(num_beats):
    start_time = b * BEAT_DUR
    start_idx = int(start_time * SAMPLE_RATE)
    
    # Check if we are in Tommy's breakdown window (34s to 44s)
    in_tommy_breakdown = (34.0 <= start_time <= 44.0)
    breakdown_duck = 0.22 if in_tommy_breakdown else 1.0

    # 1. Kick Drum (On beats 0, 1, 2, 3 unless in breakdown)
    if not in_tommy_breakdown or (b % 4 == 0):
        k_dur = 0.2
        k_samples = min(int(k_dur * SAMPLE_RATE), len(bgm) - start_idx)
        if k_samples > 0:
            tk = np.linspace(0, k_dur, k_samples, False)
            fk = 140 * np.exp(-tk * 28)
            kick = np.sin(2 * np.pi * fk * tk) * np.exp(-tk * 15)
            bgm[start_idx:start_idx + k_samples] += kick * 0.65 * breakdown_duck

    # 2. 16th Synth Bass Arpeggio (D minor / F / G modern cyber pulse)
    for sub_i in range(4):
        sub_time = start_time + sub_i * (BEAT_DUR / 4)
        sub_idx = int(sub_time * SAMPLE_RATE)
        sub_dur = (BEAT_DUR / 4) * 0.7
        s_samples = min(int(sub_dur * SAMPLE_RATE), len(bgm) - sub_idx)
        if s_samples > 0:
            ts = np.linspace(0, sub_dur, s_samples, False)
            scale = [73.42, 87.31, 98.00, 110.00, 130.81, 98.00, 87.31, 73.42]
            f_note = scale[(b * 4 + sub_i) % len(scale)]
            synth = (np.sin(2 * np.pi * f_note * ts) + 0.4 * np.sin(2 * np.pi * f_note * 2 * ts)) * np.exp(-ts * 12)
            bgm[sub_idx:sub_idx + s_samples] += synth * 0.32 * breakdown_duck

    # 3. Off-beat Crisp Hi-Hat (except soft in breakdown)
    hh_time = start_time + (BEAT_DUR / 2)
    hh_idx = int(hh_time * SAMPLE_RATE)
    hh_dur = 0.04
    hh_samples = min(int(hh_dur * SAMPLE_RATE), len(bgm) - hh_idx)
    if hh_samples > 0:
        hh_noise = np.random.uniform(-1, 1, hh_samples) * np.exp(-np.linspace(0, 1, hh_samples) * 35)
        bgm[hh_idx:hh_idx + hh_samples] += hh_noise * (0.12 if in_tommy_breakdown else 0.22)

# Fade in and Fade out
fade_in = int(SAMPLE_RATE * 0.8)
fade_out = int(SAMPLE_RATE * 2.5)
bgm[:fade_in] *= np.linspace(0, 1, fade_in)
bgm[-fade_out:] *= np.linspace(1, 0, fade_out)

write_wav("stage_master_bgm_60s.wav", bgm * 0.7)
print("Complete updated audio assets generated!")
