import React from 'react';
import { useCurrentFrame } from 'remotion';

export const StagePaperCanvas: React.FC = () => {
	const frame = useCurrentFrame();

	// Cinematic lighting orbit — slow, majestic sweep across the surface
	const lightX = 50 + Math.sin(frame / 55) * 8;
	const lightY = 38 + Math.cos(frame / 70) * 5;

	// 3-layer parallax grid offsets (different speeds = depth)
	const gridOffsetFar    = (frame * 0.18) % 80;  // Background: slow drift
	const gridOffsetMid    = (frame * 0.35) % 60;  // Midground: medium
	const gridOffsetNear   = (frame * 0.55) % 40;  // Foreground: faster

	// Subtle ambient pulsing vignette
	const vignetteStrength = 0.08 + Math.sin(frame / 80) * 0.03;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				backgroundColor: '#FAF8F5',
				overflow: 'hidden',
				zIndex: 1,
			}}
		>
			{/* === LAYER 0: Key Light — orbital studio lamp === */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `
						radial-gradient(ellipse 70% 65% at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.98) 0%, rgba(250, 248, 245, 0.6) 55%, transparent 100%),
						radial-gradient(circle at 88% 92%, rgba(255, 240, 220, 0.25) 0%, transparent 55%),
						radial-gradient(circle at 8% 85%, rgba(220, 235, 255, 0.15) 0%, transparent 50%)
					`,
				}}
			/>

			{/* === LAYER 1 (FAR): Coarse architectural grid — slowest parallax === */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `
						linear-gradient(to right, rgba(22, 20, 26, 0.025) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(22, 20, 26, 0.025) 1px, transparent 1px)
					`,
					backgroundSize: '80px 80px',
					backgroundPosition: `${gridOffsetFar}px ${gridOffsetFar * 0.6}px`,
					opacity: 0.9,
				}}
			/>

			{/* === LAYER 2 (MID): Finer sub-grid — medium parallax === */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `
						linear-gradient(to right, rgba(22, 20, 26, 0.018) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(22, 20, 26, 0.018) 1px, transparent 1px)
					`,
					backgroundSize: '40px 40px',
					backgroundPosition: `${gridOffsetMid}px ${gridOffsetMid * 0.7}px`,
					opacity: 0.85,
				}}
			/>

			{/* === LAYER 3 (NEAR): Micro dot grid — fastest, foreground === */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `radial-gradient(circle, rgba(22, 20, 26, 0.06) 1px, transparent 1px)`,
					backgroundSize: '20px 20px',
					backgroundPosition: `${gridOffsetNear}px ${gridOffsetNear * 0.85}px`,
					opacity: 0.7,
				}}
			/>

			{/* === Animated French Paper Grain (SVG turbulence, per-frame seed variation) === */}
			<svg
				width="100%"
				height="100%"
				style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', mixBlendMode: 'multiply' }}
			>
				<filter id="stagePaperGrain" x="0%" y="0%" width="100%" height="100%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.72"
						numOctaves="4"
						seed={Math.floor(frame / 2) % 99}
						stitchTiles="stitch"
					/>
					<feColorMatrix type="saturate" values="0" />
				</filter>
				<rect width="100%" height="100%" filter="url(#stagePaperGrain)" />
			</svg>

			{/* === Soft ambient vignette around edges === */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(22, 20, 26, ${vignetteStrength}) 100%)`,
					pointerEvents: 'none',
				}}
			/>

			{/* === Subtle diagonal light streak (lens flare artifact) === */}
			<div
				style={{
					position: 'absolute',
					top: '0',
					left: '0',
					width: '100%',
					height: '100%',
					background: `linear-gradient(135deg, rgba(255, 255, 255, ${0.04 + Math.sin(frame / 90) * 0.02}) 0%, transparent 40%)`,
					pointerEvents: 'none',
				}}
			/>
		</div>
	);
};
