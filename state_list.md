# Blueprint State List: `OmniAssistShowreel`

## Audio-Sync Timing & State Mapping (120 BPM • 60 FPS • 900 Frames)

| Frame Range | Beat Event | Active Components | Component State & Motion Mathematics |
|---|---|---|---|
| **0 – 30** | `0: bass_drop` | `ParticleSpace`, `MorphContainer` (Search Mode) | Particle grid explodes outwards. Container enters at center (`width: 580px`, `height: 64px`, `borderRadius: 32px`, `spring(stiffness: 150, damping: 12)`). |
| **30 – 60** | `30: snare` | `MorphContainer` (Search Mode) | AI text prompt types out: `"Analyze Q3 revenue trends & generate action plan..."` (`7-frame char stagger`). Active blue cursor blinks. |
| **60 – 90** | `60: kick` | `MorphContainer` (Search Mode) | Container pulses (`scale: 1.03`), glow changes from Slate to Electric Blue (`#38BDF8`). |
| **90 – 120** | `90: impact` | `MorphContainer` $\rightarrow$ `DashboardContent` | **UI Morphing Transition:** Single container smoothly expands from `580x64px` to `1180x680px` (`borderRadius: 32px -> 24px`, `Easing.bezier(0.16, 1, 0.3, 1)`). Search input content blurs out while dashboard layout fades in behind glass. |
| **120 – 180** | `120: snare` / `150: hihat` | `DashboardContent` | 4 metric cards stagger entrance (`delay: 120 + i * 8`). SVG chart bars grow from height `0% -> 100%` (`spring(stiffness: 120, damping: 14)`). |
| **180 – 300** | `180: kick` / `240: snare` | `DashboardContent` | Real-time counters tick up (`$0 -> $482,910`, `+0% -> +148.2%`). Parallax cards drift on independent Z-layers (`floatY = Math.sin(frame / 30) * 4px`). 3D tilt angle (`rotateX(12deg)`). |
| **300 – 360** | `300: impact_drop` | `MorphContainer` $\rightarrow$ `OmniLogo` | Dashboard container contracts seamlessly from `1180x680px` to `110x110px` glowing 3D logo cube (`borderRadius: 28px`). |
| **360 – 450** | `360: snare` | `OmniLogo`, `HeroBrandText` | 3D logo spins (`rotateY(360deg)`). "OmniAssist" title masks up from overflow container (`letterSpacing: -0.05em`). Subtitle tag pops in. |
| **450 – 900** | `450: ambient_fade` | `OmniLogo`, `HeroBrandText`, `OutroBadges` | Background smoothly settles into pristine `#0A0A0A`. Logo holds position with continuous micro-floating (`Math.sin(frame / 20) * 6px`). Tech badges pop in at frame 600. |

---

## Motion Rules Compliance Matrix
- **One-Container Morphing:** Main container element transitions continuously from Search Bar (`580x64px`) $\rightarrow$ Dashboard (`1180x680px`) $\rightarrow$ Logo Box (`110x110px`).
- **Continuous Physics:** Background particles float continuously (`Math.sin(frame/25) * 8px`). Parallax cards drift at `0.5x` speed.
- **Easing:** All UI pops use `spring(stiffness: 150, damping: 12)`. Spatial morphing uses `bezier(0.16, 1, 0.3, 1)`.
