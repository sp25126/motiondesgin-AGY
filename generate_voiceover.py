import asyncio
import os
import subprocess
import edge_tts

VOICE = "en-US-AndrewMultilingualNeural"
RATE = "+10%"  # 10% faster for modern high-retention YouTube tech pacing
PITCH = "+0Hz"

AUDIO_DIR = r"c:\Users\saumy\OneDrive\Desktop\motion design\antigravity-motion-demo\public\stage_assets\audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

SCENES = [
    {
        "id": "scene1_hook",
        "text": "Stop taking messy screenshots and sending 50 confusing Slack messages just to review a website change."
    },
    {
        "id": "scene2_old_roast",
        "text": "When we first launched STAGE, our homepage was cluttered. And our users did not hold back."
    },
    {
        "id": "scene3_community",
        "text": "Rajat pointed out the text was unreadable. Andriy called out the lack of real proof. And Daymon caught that our mobile experience was dragging."
    },
    {
        "id": "scene4_transform",
        "text": "So we did what every founder should do: we used our own tool to fix it. We watched the homepage evolve directly from live visual pins."
    },
    {
        "id": "scene5_product_demo",
        "text": "Zero browser extensions. You just drop a link, click anywhere on the live DOM, and drop your exact feedback with automatic viewport and style telemetry."
    },
    {
        "id": "scene6_outro",
        "text": "Our new homepage is officially live at stage dot entrext dot com. Now it's your turn: click the link, and roast our live page right now."
    }
]

async def main():
    for item in SCENES:
        out_path = os.path.join(AUDIO_DIR, f"{item['id']}.mp3")
        communicate = edge_tts.Communicate(item["text"], VOICE, rate=RATE, pitch=PITCH)
        await communicate.save(out_path)
        print(f"Generated {out_path}")

if __name__ == "__main__":
    asyncio.run(main())
