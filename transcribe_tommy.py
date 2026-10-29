import os
import subprocess
from faster_whisper import WhisperModel

src_video = r"C:\Users\saumy\Downloads\stage-website-feedback-on-the-live-page-no-install-review.webm"
sample_wav = r"c:\Users\saumy\OneDrive\Desktop\motion design\antigravity-motion-demo\out\tommy_sample.wav"

if not os.path.exists(sample_wav):
    subprocess.run(['ffmpeg', '-y', '-ss', '00:00:00', '-i', src_video, '-t', '120', '-vn', '-ac', '1', '-ar', '16000', sample_wav], check=True)

model = WhisperModel("tiny", device="cpu", compute_type="int8")
segments, info = model.transcribe(sample_wav, beam_size=5)

print(f"Detected language '{info.language}' with probability {info.language_probability}")
for segment in segments:
    print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
