import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';



interface StageCausticLightProps {
	// Position of the pin impact point
	x?: number;
	y?: number;
}

export const StageCausticLight: React.FC<StageCausticLightProps> = ({
	x = 530,
	y = 635,
}) => {
	const frame = useCurrentFrame();

	// Only active for frames 118–220 (pin impact through compose phase)
	const impactFrame = 120;
	if (frame < impactFrame - 2) return null;

	// Ambient glow at pin location (persists after rings fade)
	const glowOpacity = interpolate(
		frame,
		[120, 130, 200, 260, 290],
		[0, 0.6, 0.4, 0.25, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Cobalt ambient color light spill on the paper surface
	const colorSpillOpacity = interpolate(
		frame,
		[120, 135, 220, 280],
		[0, 0.12, 0.08, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Fixed ripple: expands once at impact (not looping)
	// After impact ripple, a gentle persistent aura remains
	const fixedRippleR = interpolate(
		frame,
		[120, 148],
		[8, 56],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);
	const fixedRippleOpacity = interpolate(
		frame,
		[120, 124, 148],
		[0, 0.9, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Secondary ripple (delayed by 8 frames)
	const secondRippleR = interpolate(
		frame,
		[128, 162],
		[8, 72],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);
	const secondRippleOpacity = interpolate(
		frame,
		[128, 132, 162],
		[0, 0.55, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	return (
		<div style={{ position: 'absolute', inset: 0, zIndex: 28, pointerEvents: 'none' }}>
			{/* Cobalt color light spill on paper surface at pin location */}
			<div style={{
				position: 'absolute',
				left: `${x}px`,
				top: `${y}px`,
				width: '400px',
				height: '400px',
				marginLeft: '-200px',
				marginTop: '-200px',
				background: `radial-gradient(circle at 50% 50%, rgba(43, 76, 255, ${colorSpillOpacity * 1.5}) 0%, rgba(129, 140, 248, ${colorSpillOpacity}) 40%, transparent 70%)`,
				mixBlendMode: 'multiply',
				borderRadius: '50%',
			}} />

			{/* Primary impact ring */}
			<div style={{
				position: 'absolute',
				left: `${x}px`,
				top: `${y}px`,
				width: `${fixedRippleR * 2}px`,
				height: `${fixedRippleR * 2}px`,
				marginLeft: `-${fixedRippleR}px`,
				marginTop: `-${fixedRippleR}px`,
				borderRadius: '50%',
				border: '2px solid #2B4CFF',
				opacity: fixedRippleOpacity,
				boxShadow: '0 0 20px rgba(43, 76, 255, 0.5), inset 0 0 20px rgba(43, 76, 255, 0.15)',
			}} />

			{/* Secondary, softer ring */}
			<div style={{
				position: 'absolute',
				left: `${x}px`,
				top: `${y}px`,
				width: `${secondRippleR * 2}px`,
				height: `${secondRippleR * 2}px`,
				marginLeft: `-${secondRippleR}px`,
				marginTop: `-${secondRippleR}px`,
				borderRadius: '50%',
				border: '1.5px solid rgba(129, 140, 248, 0.7)',
				opacity: secondRippleOpacity,
				boxShadow: '0 0 12px rgba(129, 140, 248, 0.3)',
			}} />

			{/* Persistent glow aura after rings fade */}
			<div style={{
				position: 'absolute',
				left: `${x}px`,
				top: `${y}px`,
				width: '60px',
				height: '60px',
				marginLeft: '-30px',
				marginTop: '-30px',
				borderRadius: '50%',
				background: 'radial-gradient(circle, rgba(43, 76, 255, 0.5) 0%, transparent 70%)',
				opacity: glowOpacity,
				filter: 'blur(8px)',
			}} />

			{/* Color-morph glow: transitions to sage green when pin turns to checkmark (frame 276+) */}
			<div style={{
				position: 'absolute',
				left: `${x}px`,
				top: `${y}px`,
				width: '80px',
				height: '80px',
				marginLeft: '-40px',
				marginTop: '-40px',
				borderRadius: '50%',
				background: 'radial-gradient(circle, rgba(19, 115, 51, 0.4) 0%, transparent 70%)',
				opacity: interpolate(frame, [278, 295, 350, 360], [0, 0.7, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
				filter: 'blur(10px)',
			}} />
		</div>
	);
};
