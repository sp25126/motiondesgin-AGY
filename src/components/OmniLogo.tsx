import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const OmniLogo: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	if (frame < 290) return null;

	// Logo reveal spring (frame 300+)
	const logoSpring = spring({
		frame: frame - 305,
		fps,
		config: { stiffness: 120, damping: 14 },
	});

	const opacity = interpolate(
		frame,
		[295, 320, 850, 900],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const titleMaskY = interpolate(
		frame,
		[320, 365],
		[100, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const badgeOpacity = interpolate(
		frame,
		[360, 390],
		[0, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Continuous 3D rotation & floating
	const rotateY = (frame * 1.2) % 360;
	const floatY = Math.sin(frame / 16) * 8;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				opacity,
				zIndex: 40,
				pointerEvents: 'none',
				transform: `translateY(${floatY}px)`,
			}}
		>
			{/* 3D Glowing Prism Icon */}
			<div
				style={{
					width: '110px',
					height: '110px',
					borderRadius: '30px',
					background: 'linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #C084FC 100%)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: '52px',
					boxShadow: '0 0 80px rgba(56, 189, 248, 0.7), inset 0 0 20px rgba(255,255,255,0.6)',
					transform: `perspective(800px) rotateY(${rotateY}deg) scale(${logoSpring})`,
					marginBottom: '28px',
				}}
			>
				⚡
			</div>

			{/* Title Mask Container */}
			<div style={{ overflow: 'hidden', padding: '10px 40px' }}>
				<h1
					style={{
						margin: 0,
						fontSize: '105px',
						fontWeight: 900,
						fontFamily: 'Inter, system-ui, sans-serif',
						letterSpacing: '-0.05em',
						background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 50%, #38BDF8 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						transform: `translateY(${titleMaskY}px)`,
						textAlign: 'center',
						filter: 'drop-shadow(0 4px 40px rgba(56, 189, 248, 0.4))',
					}}
				>
					OmniAssist
				</h1>
			</div>

			{/* Subtitle & Badges */}
			<div
				style={{
					marginTop: '16px',
					opacity: badgeOpacity,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '24px',
				}}
			>
				<p
					style={{
						margin: 0,
						fontSize: '22px',
						fontWeight: 600,
						color: '#94A3B8',
						fontFamily: 'Inter, sans-serif',
						letterSpacing: '0.25em',
						textTransform: 'uppercase',
					}}
				>
					The Autonomous AI Operating System
				</p>

				{/* Tech Pill Badges */}
				<div style={{ display: 'flex', gap: '14px' }}>
					{['Multi-Agent Orchestration', 'Real-Time Analytics', 'Self-Healing Workflows'].map((feature, i) => (
						<span
							key={i}
							style={{
								fontSize: '13px',
								fontFamily: 'monospace',
								fontWeight: 600,
								color: '#F8FAFC',
								backgroundColor: 'rgba(255, 255, 255, 0.05)',
								border: '1px solid rgba(255, 255, 255, 0.14)',
								padding: '8px 18px',
								borderRadius: '24px',
								backdropFilter: 'blur(10px)',
							}}
						>
							{feature}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
