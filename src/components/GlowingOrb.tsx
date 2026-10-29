import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const GlowingOrb: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Spring entrance physics
	const scaleSpring = spring({
		frame,
		fps,
		config: { stiffness: 90, damping: 11 },
	});

	// Micro floating displacement
	const floatY = Math.sin(frame / 14) * 16;
	const floatX = Math.cos(frame / 17) * 12;
	const pulseScale = 1 + Math.sin(frame / 8) * 0.06;

	// Scale & opacity choreography
	const sceneScale = interpolate(
		frame,
		[0, 110, 140, 290, 470, 510, 600],
		[1, 1, 0.38, 0.5, 0.04, 0, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const opacity = interpolate(
		frame,
		[0, 20, 470, 505],
		[0, 1, 0.85, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const r1 = (frame * 0.6) % 360;
	const r2 = (-frame * 1.1) % 360;
	const r3 = (frame * 1.8) % 360;

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '760px',
				height: '760px',
				marginLeft: '-380px',
				marginTop: '-380px',
				transform: `translate(${floatX}px, ${floatY}px) scale(${scaleSpring * sceneScale * pulseScale})`,
				opacity,
				pointerEvents: 'none',
				zIndex: 2,
			}}
		>
			{/* Multi-tier Volumetric Atmospheric Backlight */}
			<div
				style={{
					position: 'absolute',
					inset: '40px',
					borderRadius: '50%',
					background: 'radial-gradient(circle at 40% 35%, rgba(6, 182, 212, 0.45) 0%, rgba(37, 99, 235, 0.35) 45%, rgba(124, 58, 237, 0.25) 75%, transparent 100%)',
					filter: 'blur(80px)',
					transform: `rotate(${r1}deg)`,
				}}
			/>

			{/* Precision SVG Technical Orbital Rings */}
			<svg
				width="760"
				height="760"
				viewBox="0 0 760 760"
				style={{
					position: 'absolute',
					inset: 0,
					transform: `rotate(${r2}deg)`,
				}}
			>
				{/* Outer Compass Ticks */}
				<circle
					cx="380"
					cy="380"
					r="350"
					fill="none"
					stroke="rgba(255, 255, 255, 0.08)"
					strokeWidth="1"
				/>
				<circle
					cx="380"
					cy="380"
					r="350"
					fill="none"
					stroke="rgba(6, 182, 212, 0.4)"
					strokeWidth="2"
					strokeDasharray="20 40 80 40"
				/>
				<circle
					cx="380"
					cy="380"
					r="280"
					fill="none"
					stroke="rgba(124, 58, 237, 0.35)"
					strokeWidth="1.5"
					strokeDasharray="60 120"
				/>
			</svg>

			{/* Inner Rotating Aperture Ticks */}
			<svg
				width="760"
				height="760"
				viewBox="0 0 760 760"
				style={{
					position: 'absolute',
					inset: 0,
					transform: `rotate(${r3}deg)`,
				}}
			>
				<circle
					cx="380"
					cy="380"
					r="210"
					fill="none"
					stroke="rgba(255, 255, 255, 0.25)"
					strokeWidth="1"
					strokeDasharray="4 8"
				/>
			</svg>

			{/* High-Density Core Glass Sphere */}
			<div
				style={{
					position: 'absolute',
					top: '210px',
					left: '210px',
					width: '340px',
					height: '340px',
					borderRadius: '50%',
					background: 'radial-gradient(circle at 32% 28%, #38BDF8 0%, #2563EB 30%, #4F46E5 70%, #0F172A 100%)',
					boxShadow: '0 0 120px rgba(6, 182, 212, 0.7), inset 0 0 70px rgba(255, 255, 255, 0.75)',
				}}
			/>

			{/* Specular Refractive Light Arc */}
			<div
				style={{
					position: 'absolute',
					top: '225px',
					left: '225px',
					width: '310px',
					height: '310px',
					borderRadius: '50%',
					border: '1.5px solid rgba(255, 255, 255, 0.5)',
					background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 50%)',
					pointerEvents: 'none',
				}}
			/>
		</div>
	);
};
