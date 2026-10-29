import React from 'react';
import { useCurrentFrame } from 'remotion';

export const AlabasterPaper: React.FC = () => {
	const frame = useCurrentFrame();

	// Studio lighting subtle drift
	const lightX = 50 + Math.sin(frame / 40) * 4;
	const lightY = 45 + Math.cos(frame / 45) * 3;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				backgroundColor: '#F5F4F0',
				overflow: 'hidden',
				zIndex: 1,
			}}
		>
			{/* Volumetric Studio Soft Lighting Gradient */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.95) 0%, rgba(245, 244, 240, 0.6) 50%, rgba(230, 227, 218, 0.8) 100%)`,
				}}
			/>

			{/* Micro Paper Architectural Grid */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `
						linear-gradient(to right, rgba(0, 0, 0, 0.025) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(0, 0, 0, 0.025) 1px, transparent 1px)
					`,
					backgroundSize: '40px 40px',
					opacity: 0.7,
				}}
			/>

			{/* SVG Procedural Paper Grain Texture */}
			<svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }}>
				<filter id="paperNoise">
					<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
					<feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0" />
				</filter>
				<rect width="100%" height="100%" filter="url(#paperNoise)" />
			</svg>
		</div>
	);
};
