# Motion Studio Rules: The Look
- **UI Motion One-Container Rule:** Never use hard cuts for UI elements. Every state is the same element changing size, border-radius, and fill, while its content swaps behind a short blur.
- **Continuous Physics:** No element is ever fully static. Apply a micro-drift (e.g., Math.sin(frame/30) * 2px) to floating elements.
- **Easing:** BANNED: `linear`, `ease-in`, `ease-out`. 
  REQUIRED: `spring(stiffness: 150, damping: 12)` for UI pop-ins. `bezier(0.16, 1, 0.3, 1)` for elegant spatial moves.
- **Depth:** Always use a 3D perspective wrapper. Background elements must move at 0.5x speed (parallax) compared to foreground elements to establish Z-depth.
