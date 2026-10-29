import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { GlowingOrb } from './components/GlowingOrb';
import { HeroText } from './components/HeroText';
import { CodeWindow } from './components/CodeWindow';
import { ExplodingGrid } from './components/ExplodingGrid';
import { OutroLogo } from './components/OutroLogo';

export const AntigravityLaunch: React.FC = () => {
	const frame = useCurrentFrame();

	// Background camera micro-zoom
	const cameraScale = 1 + Math.sin(frame / 45) * 0.02;

	// Background pulse during Climax (Sec 5-8, frame 300-480)
	const bgPulseOpacity = interpolate(
		frame,
		[300, 360, 420, 480],
		[0.1, 0.35, 0.2, 0.05],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const bgGridOffset = (frame * 0.7) % 40;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#09090D',
				color: '#FFFFFF',
				fontFamily: 'Inter, sans-serif',
				overflow: 'hidden',
				position: 'relative',
				transform: `scale(${cameraScale})`,
			}}
		>
			{/* Precision Animated Micro-Grid Background */}
			<div
				style={{
					position: 'absolute',
					top: -50,
					left: -50,
					right: -50,
					bottom: -50,
					backgroundImage: `
						linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
					`,
					backgroundSize: '40px 40px',
					transform: `translateY(${bgGridOffset}px)`,
					opacity: 0.75,
				}}
			/>

			{/* Dynamic Climax Pulse Radial Ambient */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.35) 0%, rgba(129, 140, 248, 0.25) 50%, transparent 80%)',
					opacity: bgPulseOpacity,
					pointerEvents: 'none',
					filter: 'blur(70px)',
				}}
			/>

			{/* Main Motion Elements */}
			<GlowingOrb />
			<HeroText />
			<CodeWindow />
			<ExplodingGrid />
			<OutroLogo />
		</AbsoluteFill>
	);
};
