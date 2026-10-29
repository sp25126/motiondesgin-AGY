import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

const BRAND_NAME = "ANTIGRAVITY";

export const HeroText: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Mask slide-up
	const maskY = interpolate(
		frame,
		[15, 65],
		[140, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const opacity = interpolate(
		frame,
		[15, 40, 290, 315],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const tagOpacity = interpolate(
		frame,
		[40, 70, 110, 130],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Transform to Top-Left during SEC 2 (Frame 120-170)
	const posX = interpolate(
		frame,
		[120, 170],
		[0, -660],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const posY = interpolate(
		frame,
		[120, 170],
		[0, -425],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const scale = interpolate(
		frame,
		[120, 170],
		[1, 0.42],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const floatY = Math.sin(frame / 14) * 5;

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: `translate(calc(-50% + ${posX}px), calc(-50% + ${posY + floatY}px)) scale(${scale})`,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 15,
				opacity,
			}}
		>
			{/* Eyebrow Pill Tag */}
			<div
				style={{
					opacity: tagOpacity,
					transform: `translateY(${maskY * 0.3}px)`,
					marginBottom: '14px',
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
					backgroundColor: 'rgba(255, 255, 255, 0.05)',
					border: '1px solid rgba(255, 255, 255, 0.12)',
					padding: '6px 16px',
					borderRadius: '20px',
					backdropFilter: 'blur(10px)',
				}}
			>
				<span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38BDF8' }} />
				<span
					style={{
						fontSize: '12px',
						fontWeight: 700,
						fontFamily: 'monospace',
						letterSpacing: '0.25em',
						color: '#94A3B8',
						textTransform: 'uppercase',
					}}
				>
					01 // MOTION ENGINE v4.0
				</span>
			</div>

			{/* Main Brand Title with Letter Springs */}
			<div style={{ overflow: 'hidden', padding: '10px 40px' }}>
				<div style={{ display: 'flex', transform: `translateY(${maskY}px)` }}>
					{BRAND_NAME.split('').map((char, index) => {
						const charDelay = 15 + index * 3.5;
						const charSpring = spring({
							frame: frame - charDelay,
							fps,
							config: { stiffness: 140, damping: 14 },
						});

						return (
							<span
								key={index}
								style={{
									display: 'inline-block',
									fontSize: '118px',
									fontWeight: 900,
									fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
									letterSpacing: '-0.055em',
									background: 'linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 55%, #38BDF8 100%)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									transform: `scale(${charSpring})`,
									filter: 'drop-shadow(0 4px 30px rgba(56, 189, 248, 0.35))',
								}}
							>
								{char}
							</span>
						);
					})}
				</div>
			</div>

			{/* Subtitle Descriptor */}
			<div
				style={{
					marginTop: '12px',
					opacity: tagOpacity,
					transform: `translateY(${maskY * 0.4}px)`,
					display: 'flex',
					alignItems: 'center',
					gap: '14px',
				}}
			>
				<div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, transparent, #38BDF8)' }} />
				<span
					style={{
						fontSize: '17px',
						fontWeight: 600,
						fontFamily: 'Inter, sans-serif',
						letterSpacing: '0.35em',
						color: '#38BDF8',
						textTransform: 'uppercase',
					}}
				>
					PROGRAMMATIC MOTION SYSTEM
				</span>
				<div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, #38BDF8, transparent)' }} />
			</div>
		</div>
	);
};
