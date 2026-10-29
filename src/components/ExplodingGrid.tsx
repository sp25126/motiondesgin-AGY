import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

const GRID_ITEMS = [
	{ title: 'Spring Physics Engine', value: '120 stiffness • 14 damping', icon: '⚡', color: '#38BDF8', tag: 'CORE MATH' },
	{ title: 'Frame Pipeline', value: '60 FPS • Direct FFmpeg Stream', icon: '🚀', color: '#818CF8', tag: 'GPU RENDER' },
	{ title: 'Bezier Interpolation', value: 'cubic-bezier(0.16, 1, 0.3, 1)', icon: '📈', color: '#F472B6', tag: 'EASING' },
	{ title: 'Procedural Audio Sync', value: 'FFT Spectrum Waveforms', icon: '🎵', color: '#34D399', tag: 'AUDIO' },
	{ title: 'React 19 Core', value: 'Declarative Remotion Hooks', icon: '⚛️', color: '#FBBF24', tag: 'STACK' },
	{ title: 'Automated CI/CD', value: 'Headless MP4 Generation', icon: '🛡️', color: '#22D3EE', tag: 'PIPELINE' },
];

export const ExplodingGrid: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	if (frame < 290 || frame > 510) return null;

	const containerOpacity = interpolate(
		frame,
		[295, 320, 470, 500],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const shrinkScale = interpolate(
		frame,
		[460, 500],
		[1, 0.04],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '1220px',
				height: '660px',
				marginLeft: '-610px',
				marginTop: '-330px',
				opacity: containerOpacity,
				transform: `scale(${shrinkScale})`,
				zIndex: 30,
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gridTemplateRows: 'repeat(2, 1fr)',
				gap: '24px',
				padding: '20px',
			}}
		>
			{GRID_ITEMS.map((item, index) => {
				const delay = 305 + index * 4;
				const cardSpring = spring({
					frame: frame - delay,
					fps,
					config: { stiffness: 120, damping: 14 },
				});

				const floatOffset = Math.sin((frame + index * 20) / 11) * 6;

				const explodeX = (index % 3 - 1) * interpolate(frame, [300, 340], [120, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
				const explodeY = (Math.floor(index / 3) === 0 ? -1 : 1) * interpolate(frame, [300, 340], [90, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });

				return (
					<div
						key={index}
						style={{
							backgroundColor: 'rgba(15, 15, 23, 0.92)',
							borderRadius: '20px',
							border: `1px solid ${item.color}35`,
							boxShadow: `0 15px 35px ${item.color}15, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
							padding: '28px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							transform: `translate(${explodeX}px, ${explodeY + floatOffset}px) scale(${cardSpring})`,
							backdropFilter: 'blur(20px)',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Accent Edge Line */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								height: '3px',
								background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
							}}
						/>

						{/* Top Icon & Tag */}
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span style={{ fontSize: '34px' }}>{item.icon}</span>
							<span
								style={{
									fontSize: '11px',
									fontFamily: 'monospace',
									letterSpacing: '0.15em',
									color: item.color,
									fontWeight: 700,
									backgroundColor: `${item.color}18`,
									border: `1px solid ${item.color}30`,
									padding: '4px 12px',
									borderRadius: '20px',
								}}
							>
								{item.tag}
							</span>
						</div>

						{/* Content */}
						<div>
							<h3
								style={{
									margin: '0 0 6px 0',
									fontSize: '22px',
									fontWeight: 800,
									color: '#FFFFFF',
									fontFamily: 'Inter, sans-serif',
									letterSpacing: '-0.02em',
								}}
							>
								{item.title}
							</h3>
							<p
								style={{
									margin: 0,
									fontSize: '14px',
									color: '#94A3B8',
									fontFamily: 'monospace',
								}}
							>
								{item.value}
							</p>
						</div>

						{/* Live SVG Visualizer Wave */}
						<div style={{ marginTop: '14px', height: '24px', width: '100%' }}>
							<svg width="100%" height="24" viewBox="0 0 300 24" preserveAspectRatio="none">
								<path
									d={`M 0 12 Q 75 ${12 + Math.sin((frame + index * 10) / 4) * 8}, 150 12 T 300 12`}
									fill="none"
									stroke={item.color}
									strokeWidth="2"
									strokeOpacity="0.8"
								/>
							</svg>
						</div>
					</div>
				);
			})}
		</div>
	);
};
