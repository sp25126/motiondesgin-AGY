import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

const PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
	x: (i * 137.5) % 100,
	y: (i * 265.3) % 100,
	size: 2 + (i % 4),
	speed: 0.3 + (i % 3) * 0.2,
	opacity: 0.2 + (i % 5) * 0.15,
}));

export const ParticleSpace: React.FC = () => {
	const frame = useCurrentFrame();

	// Background parallax offset (0.5x relative to foreground)
	const bgParallaxY = (frame * 0.4) % 50;

	// Ambient backlight intensity pulse
	const lightOpacity = interpolate(
		frame,
		[0, 90, 180, 300, 450, 900],
		[0.2, 0.45, 0.3, 0.5, 0.2, 0.15],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				backgroundColor: '#0A0A0A',
				overflow: 'hidden',
				zIndex: 1,
			}}
		>
			{/* Micro Grid Background with Parallax */}
			<div
				style={{
					position: 'absolute',
					top: -50,
					left: -50,
					right: -50,
					bottom: -50,
					backgroundImage: `
						linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
					`,
					backgroundSize: '50px 50px',
					transform: `translateY(${bgParallaxY}px)`,
					opacity: 0.7,
				}}
			/>

			{/* Floating Ambient Glow Orbs */}
			<div
				style={{
					position: 'absolute',
					top: '20%',
					left: '30%',
					width: '600px',
					height: '600px',
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(129, 140, 248, 0.15) 50%, transparent 70%)',
					filter: 'blur(90px)',
					opacity: lightOpacity,
					transform: `translate(${Math.sin(frame / 25) * 30}px, ${Math.cos(frame / 30) * 20}px)`,
				}}
			/>

			{/* Floating Particles (0.5x Parallax Depth) */}
			{PARTICLES.map((p, i) => {
				const floatY = (p.y + frame * p.speed * 0.1) % 100;
				const floatX = p.x + Math.sin((frame + i * 10) / 20) * 1.5;

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${floatX}%`,
							top: `${floatY}%`,
							width: `${p.size}px`,
							height: `${p.size}px`,
							borderRadius: '50%',
							backgroundColor: i % 2 === 0 ? '#38BDF8' : '#818CF8',
							opacity: p.opacity,
							boxShadow: `0 0 10px ${i % 2 === 0 ? '#38BDF8' : '#818CF8'}`,
						}}
					/>
				);
			})}
		</div>
	);
};
