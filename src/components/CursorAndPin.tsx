import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const CursorAndPin: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Cursor Movement Path (Target Button Position: x ~ 530, y ~ 640)
	const cursorX = interpolate(
		frame,
		[40, 90],
		[820, 520],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const cursorY = interpolate(
		frame,
		[40, 90],
		[780, 640],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const cursorClickScale = interpolate(
		frame,
		[88, 93, 105],
		[1, 0.82, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const cursorOpacity = interpolate(
		frame,
		[0, 35, 130, 150],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Heavy Tactile Spring Pin Drop (#1) (Starts at Frame 90)
	const pinSpring = spring({
		frame: frame - 90,
		fps,
		config: { stiffness: 180, damping: 10 },
	});

	const pinOpacity = interpolate(
		frame,
		[88, 92],
		[0, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Cobalt Blue Ripple Ring Expansion (Frame 90 to 160)
	const ripple1Scale = interpolate(
		frame,
		[90, 150],
		[0.2, 2.4],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const ripple1Opacity = interpolate(
		frame,
		[90, 105, 150],
		[0, 0.8, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const ripple2Scale = interpolate(
		frame,
		[98, 160],
		[0.2, 2.8],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const ripple2Opacity = interpolate(
		frame,
		[98, 115, 160],
		[0, 0.6, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Pin Morph to Sage-Green Checkmark (Frame 360 to 410)
	const morphProgress = interpolate(
		frame,
		[360, 410],
		[0, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const pinColor = interpolateColorHex(
		morphProgress,
		'#2563EB', // Soft Cobalt Blue
		'#10B981'  // Calm Sage Green
	);

	return (
		<div style={{ position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none' }}>
			{/* Cobalt Blue Ripple Ring 1 */}
			{frame >= 90 && frame <= 160 && (
				<div
					style={{
						position: 'absolute',
						left: '520px',
						top: '640px',
						width: '100px',
						height: '100px',
						marginLeft: '-50px',
						marginTop: '-50px',
						borderRadius: '50%',
						border: '2px solid #2563EB',
						transform: `scale(${ripple1Scale})`,
						opacity: ripple1Opacity,
						boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)',
					}}
				/>
			)}

			{/* Cobalt Blue Ripple Ring 2 */}
			{frame >= 98 && frame <= 160 && (
				<div
					style={{
						position: 'absolute',
						left: '520px',
						top: '640px',
						width: '100px',
						height: '100px',
						marginLeft: '-50px',
						marginTop: '-50px',
						borderRadius: '50%',
						border: '1.5px solid #60A5FA',
						transform: `scale(${ripple2Scale})`,
						opacity: ripple2Opacity,
					}}
				/>
			)}

			{/* Numbered Pin Marker (#1) -> Morphing to Sage Green Checkmark */}
			{frame >= 88 && (
				<div
					style={{
						position: 'absolute',
						left: '520px',
						top: '640px',
						transform: `translate(-50%, -100%) scale(${pinSpring})`,
						opacity: pinOpacity,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.25))',
					}}
				>
					{/* Pin Badge Circle */}
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
							fontSize: morphProgress > 0.5 ? '18px' : '16px',
							fontFamily: 'Inter, sans-serif',
							border: '2px solid #FFFFFF',
							boxShadow: `0 0 25px ${pinColor}80`,
							transition: 'background-color 0.3s ease',
						}}
					>
						{morphProgress > 0.5 ? '✓' : '1'}
					</div>

					{/* Pin Stem Pointer */}
					<div
						style={{
							width: '0',
							height: '0',
							borderLeft: '7px solid transparent',
							borderRight: '7px solid transparent',
							borderTop: `10px solid ${pinColor}`,
							marginTop: '-2px',
						}}
					/>
				</div>
			)}

			{/* Minimal SVG Mouse Cursor */}
			<div
				style={{
					position: 'absolute',
					left: `${cursorX}px`,
					top: `${cursorY}px`,
					transform: `scale(${cursorClickScale})`,
					opacity: cursorOpacity,
					filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))',
				}}
			>
				<svg width="28" height="28" viewBox="0 0 24 24" fill="none">
					<path
						d="M3 3L10.07 19.97L13.58 12.58L20.97 9.07L3 3Z"
						fill="#0F172A"
						stroke="#FFFFFF"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	);
};

// Helper hex color interpolator
function interpolateColorHex(progress: number, color1: string, color2: string): string {
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
