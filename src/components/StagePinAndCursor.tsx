import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const StagePinAndCursor: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Teardrop Cursor Glide Path (Target Coordinate: x = 530, y = 635)
	const cursorX = interpolate(
		frame,
		[65, 120],
		[840, 530],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const cursorY = interpolate(
		frame,
		[65, 120],
		[780, 635],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const cursorClickScale = interpolate(
		frame,
		[118, 122, 135],
		[1, 0.82, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const cursorOpacity = interpolate(
		frame,
		[0, 50, 160, 180],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Developer Cursor Entrance for "Mark as Fixed" (Frame 250 to 280)
	const devCursorX = interpolate(
		frame,
		[250, 275],
		[1100, 895],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const devCursorY = interpolate(
		frame,
		[250, 275],
		[540, 530],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const devCursorClickScale = interpolate(
		frame,
		[273, 277, 290],
		[1, 0.82, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const devCursorOpacity = interpolate(
		frame,
		[245, 255, 330, 350],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Pin #1 Impact Drop Physics (Starts at Frame 120)
	// Spring config: damping = 18, stiffness = 320, mass = 1.2
	const pinSpring = spring({
		frame: frame - 120,
		fps,
		config: { stiffness: 320, damping: 18, mass: 1.2 },
	});

	const pinOpacity = interpolate(
		frame,
		[118, 122],
		[0, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Shockwave Ripple Expansion (Radius 14px to 48px, Frame 120 to 138)
	const rippleRadius = interpolate(
		frame,
		[120, 138],
		[14, 48],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const rippleOpacity = interpolate(
		frame,
		[120, 124, 138],
		[0, 0.8, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Color Shift & Checkmark Morph (Frame 276 to 290)
	const morphProgress = interpolate(
		frame,
		[276, 290],
		[0, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const pinColor = interpolateHexColor(
		morphProgress,
		'#2B4CFF', // Cobalt Blue (Urgent Bug)
		'#137333'  // Pastel Sage Green (Resolved)
	);

	// Floating Toast Entrance (Frame 280+)
	const toastSpring = spring({
		frame: frame - 280,
		fps,
		config: { stiffness: 140, damping: 14 },
	});

	const toastOpacity = interpolate(
		frame,
		[278, 295, 340, 360],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	return (
		<div style={{ position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none' }}>
			{/* Cobalt Shockwave Ripple */}
			{frame >= 120 && frame <= 140 && (
				<div
					style={{
						position: 'absolute',
						left: '530px',
						top: '635px',
						width: `${rippleRadius * 2}px`,
						height: `${rippleRadius * 2}px`,
						marginLeft: `-${rippleRadius}px`,
						marginTop: `-${rippleRadius}px`,
						borderRadius: '50%',
						border: '2px solid #2B4CFF',
						opacity: rippleOpacity,
						boxShadow: '0 0 16px rgba(43, 76, 255, 0.6)',
					}}
				/>
			)}

			{/* Numbered Pin Marker (#1) -> Morphing to Sage Green Checkmark */}
			{frame >= 118 && (
				<div
					style={{
						position: 'absolute',
						left: '530px',
						top: '635px',
						transform: `translate(-50%, -100%) scale(${pinSpring})`,
						opacity: pinOpacity,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						filter: 'drop-shadow(0 12px 24px rgba(22, 20, 26, 0.25))',
					}}
				>
					{/* Pin Head Sphere */}
					<div
						style={{
							width: '38px',
							height: '38px',
							borderRadius: '50%',
							backgroundColor: pinColor,
							color: '#FFFFFF',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontWeight: 900,
							fontSize: '16px',
							fontFamily: 'Bricolage Grotesque, Inter, sans-serif',
							border: '2px solid #FFFFFF',
							boxShadow: `0 0 25px ${pinColor}80`,
						}}
					>
						{morphProgress > 0.5 ? (
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="20 6 9 17 4 12" />
							</svg>
						) : (
							'1'
						)}
					</div>

					{/* Stem Pointer */}
					<div
						style={{
							width: 0,
							height: 0,
							borderLeft: '7px solid transparent',
							borderRight: '7px solid transparent',
							borderTop: `10px solid ${pinColor}`,
							marginTop: '-2px',
						}}
					/>
				</div>
			)}

			{/* Primary User Teardrop Cursor (#16141A) */}
			<div
				style={{
					position: 'absolute',
					left: `${cursorX}px`,
					top: `${cursorY}px`,
					transform: `scale(${cursorClickScale})`,
					opacity: cursorOpacity,
					filter: 'drop-shadow(0 6px 12px rgba(22, 20, 26, 0.3))',
				}}
			>
				<svg width="28" height="28" viewBox="0 0 24 24" fill="none">
					<path
						d="M3 3L10.07 19.97L13.58 12.58L20.97 9.07L3 3Z"
						fill="#16141A"
						stroke="#FFFFFF"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
				</svg>
			</div>

			{/* Developer Cursor for "Mark as Fixed" */}
			<div
				style={{
					position: 'absolute',
					left: `${devCursorX}px`,
					top: `${devCursorY}px`,
					transform: `scale(${devCursorClickScale})`,
					opacity: devCursorOpacity,
					filter: 'drop-shadow(0 6px 12px rgba(22, 20, 26, 0.3))',
				}}
			>
				<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
					<path
						d="M3 3L10.07 19.97L13.58 12.58L20.97 9.07L3 3Z"
						fill="#2B4CFF"
						stroke="#FFFFFF"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
				</svg>
			</div>

			{/* Floating Toast Notification (Frame 280+) */}
			{frame >= 278 && (
				<div
					style={{
						position: 'absolute',
						top: '40px',
						left: '50%',
						transform: `translateX(-50%) translateY(${interpolate(toastSpring, [0, 1], [-30, 0])}px)`,
						opacity: toastOpacity,
						backgroundColor: '#16141A',
						color: '#FFFFFF',
						padding: '10px 22px',
						borderRadius: '30px',
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
						fontSize: '13px',
						fontFamily: 'Inter, sans-serif',
						fontWeight: 600,
						boxShadow: '0 10px 30px rgba(22, 20, 26, 0.3)',
						border: '1px solid rgba(255, 255, 255, 0.15)',
					}}
				>
					<span style={{ color: '#137333', backgroundColor: '#E6F4EA', padding: '2px 6px', borderRadius: '50%', fontWeight: 900 }}>✓</span>
					<span>Comment posted. Team sees it on this exact spot.</span>
					<span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#7C4DFF', backgroundColor: 'rgba(124, 77, 255, 0.2)', padding: '2px 8px', borderRadius: '10px' }}>
						GitHub Synced
					</span>
				</div>
			)}
		</div>
	);
};

function interpolateHexColor(progress: number, color1: string, color2: string): string {
	const c1 = parseInt(color1.slice(1), 16);
	const c2 = parseInt(color2.slice(1), 16);

	const r1 = (c1 >> 16) & 0xff;
	const g1 = (c1 >> 8) & 0xff;
	const b1 = c1 & 0xff;

	const r2 = (c2 >> 16) & 0xff;
	const g2 = (c2 >> 8) & 0xff;
	const b2 = c2 & 0xff;

	const r = Math.round(r1 + (r2 - r1) * progress);
	const g = Math.round(g1 + (g2 - g1) * progress);
	const b = Math.round(b1 + (b2 - b1) * progress);

	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
