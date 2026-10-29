# Motion Grammar Reference (`style_reference.md`)

This document defines the mathematical, physical, and visual motion grammar extracted from top-tier programmatic motion graphics (Claude Opus 5.5 / Linear / Apple Design Tier).

---

## 1. Palette & Typography

### Palette Calibration (Dark Mode High-Contrast)
- **Background Base:** `#09090D` (Deep Obsidian Space)
- **Primary Text:** `#FFFFFF` (Pure White, 100% Opacity)
- **Secondary Text / Muted:** `#94A3B8` (Slate 400, 4.5:1 WCAG AA compliant)
- **Accent 1 (Electric Cyan):** `#38BDF8` (Used for active focus, springs, and glow borders)
- **Accent 2 (Ultraviolet):** `#818CF8` (Used for ambient radial light and 3D depth highlights)
- **Accent 3 (Deep Blue):** `#2563EB` (Core volumetric glass light)
- **Border / Hairlines:** `rgba(255, 255, 255, 0.12)` (Physical glass edge highlight)

### Typography Rules
- **Display Title:** `Inter, system-ui, sans-serif` | Weight: `900` | Tracking: `-0.055em` | Line Height: `1.0`
- **Subtitle / Body:** `Inter, sans-serif` | Weight: `600` | Tracking: `0.35em` | Transform: `uppercase`
- **Code / Mono:** `Fira Code, Consolas, monospace` | Weight: `500` | Line Height: `1.65`

---

## 2. Shot Lengths & Pacing

Total Duration: **600 frames / 10.0 seconds @ 60 FPS**

| Phase | Frame Range | Duration | Purpose | Pacing Style |
|---|---|---|---|---|
| **Phase 1: The Hook** | Frames 0 – 120 | 2.0s | Volumetric orb entrance + Masked Title reveal | Smooth spring build, high tension |
| **Phase 2: The Build** | Frames 120 – 290 | 2.8s | Hero text move + Code Window sequence typing | Rhythmic 7-frame staggered lines |
| **Phase 3: The Climax** | Frames 290 – 480 | 3.2s | 3D Perspective shift + 6-Card Grid explosion | High energy, dynamic SVG waves |
| **Phase 4: The Outro** | Frames 480 – 600 | 2.0s | Singularity dot collapse + Brand Lockup reveal | High-speed contraction into floating fade |

---

## 3. Transition Types

1. **Masked Overflow Wipe:**
   - Text elements slide up from a hidden container (`overflow: hidden`).
   - Y-displacement: `140px` $\rightarrow$ `0px` with `Easing.bezier(0.16, 1, 0.3, 1)`.
2. **3D Perspective Tilt & Dispersal:**
   - Element rotates in 3D space (`rotateX(22deg)`, `rotateY(-18deg)`, `translateZ(220px)`).
   - Card grid explodes outward along directional vectors `(x * 120px, y * 90px)` with dampening.
3. **Singularity Collapse & Burst:**
   - Grid elements shrink to `0.04` scale over 40 frames into a central 28px glowing dot (`#38BDF8`).
   - Dot blinks twice (`Math.sin(frame * 0.9)`) and dissolves, triggering the final logo spring.

---

## 4. Camera Movements

- **Continuous Push-In (Micro-Zoom):**
  - Camera scale gradually increases: `scale = 1 + Math.sin(frame / 45) * 0.02`.
- **Idle Floating Micro-Displacement:**
  - `floatY = Math.sin(frame / 14) * 16px`
  - `floatX = Math.cos(frame / 17) * 12px`
- **Dynamic Background Grid Parallax:**
  - `bgGridOffset = (frame * 0.7) % 40px`

---

## 5. Easing Curves & Physical Springs

- **Spring Physics (UI Cards & Icons):**
  - Remotion `spring()` configuration: `stiffness: 120, damping: 14`.
  - Used for buttons, glass windows, grid item entrances, and character pops.
- **Cinematic Interpolation (Camera & Position Shifts):**
  - Easing: `Easing.bezier(0.16, 1, 0.3, 1)` (Out-Quart / Smooth Deceleration).
  - Used for screen-space transitions, top-left positioning, and camera zooms.
- **NO LINEAR EASING:** All movements have acceleration, deceleration, or physical momentum.

---

## 6. Element Behaviors

- **Staggered Character Reveals:**
  - Letters pop up sequentially with a `3.5 frame` offset per character.
- **Code Generation Simulation:**
  - Code lines appear every `7 frames` with an active typing line cursor (`#60A5FA`).
- **Live SVG Waveforms:**
  - Dynamic sine wave paths recalculated per frame: `y = 12 + Math.sin((frame + index * 10) / 4) * 8`.
- **Refractive Glass Surfaces:**
  - `backdropFilter: 'blur(30px)'`, `border: '1px solid rgba(255, 255, 255, 0.14)'`, inset specular shadow.
