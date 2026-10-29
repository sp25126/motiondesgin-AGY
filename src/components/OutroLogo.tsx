import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const OutroLogo: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// 1. Collapsing Singularity Dot (Frames 480 - 520)
	const dotOpacity = interpolate(
		frame,
		[480, 495, 510, 520],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const dotScale = interpolate(
		frame,
		[480, 500, 515],
		[0.1, 1.2, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const dotBlink = Math.sin((frame - 480) * 0.9) > 0 ? 1 : 0.3;

	// 2. Main Outro Brand Reveal Phase (Frames 515 - 600)
	const logoSpring = spring({
		frame: frame - 520,
		fps,
		config: { stiffness: 120, damping: 14 },
	});

	const logoOpacity = interpolate(
		frame,
		[520, 545],
		[0, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const subtitleSpring = spring({
		frame: frame - 535,
		fps,
		config: { stiffness: 120, damping: 14 },
	});

	const badgeOpacity = interpolate(
		frame,
		[550, 570],
		[0, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const floatY = Math.sin(frame / 12) * 8;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 40,
				pointerEvents: 'none',
			}}
		>
			{/* Collapsing Singularity Dot */}
			{frame >= 480 && frame <= 525 && (
				<div
					style={{
						position: 'absolute',
						width: '28px',
						height: '28px',
						borderRadius: '50%',
						backgroundColor: '#38BDF8',
						boxShadow: '0 0 50px #818CF8, 0 0 100px #38BDF8',
						transform: `scale(${dotScale})`,
						opacity: dotOpacity * dotBlink,
					}}
				/>
			)}

			{/* Outro Brand Reveal */}
			{frame >= 515 && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						transform: `translateY(${floatY}px)`,
						opacity: logoOpacity,
					}}
				>
					{/* Glowing Icon Mark */}
					<div
						style={{
							width: '96px',
							height: '96px',
							borderRadius: '26px',
							background: 'linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #C084FC 100%)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '48px',
							boxShadow: '0 0 70px rgba(129, 140, 248, 0.65)',
							transform: `scale(${logoSpring})`,
							marginBottom: '26px',
						}}
					>
						✨
					</div>

					{/* Main Title */}
					<h1
						style={{
							margin: 0,
							fontSize: '98px',
							fontWeight: 900,
							fontFamily: 'Inter, system-ui, sans-serif',
							letterSpacing: '-0.05em',
							background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 50%, #818CF8 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							transform: `scale(${logoSpring})`,
							textAlign: 'center',
							filter: 'drop-shadow(0 0 40px rgba(129, 140, 248, 0.4))',
						}}
					>
						ANTIGRAVITY
					</h1>

					{/* Tagline */}
					<p
						style={{
							margin: '14px 0 0 0',
							fontSize: '22px',
							fontWeight: 600,
							color: '#94A3B8',
							fontFamily: 'Inter, sans-serif',
							letterSpacing: '0.2em',
							textTransform: 'uppercase',
							transform: `scale(${subtitleSpring})`,
						}}
					>
						Programmatic Motion Graphics Engine
					</p>

					{/* Tech Stack Pills */}
					<div
						style={{
							display: 'flex',
							gap: '16px',
							marginTop: '36px',
							opacity: badgeOpacity,
						}}
					>
						{['Remotion Engine', 'React 19 Core', 'TypeScript', 'FFmpeg Pipeline'].map((tech, i) => (
							<span
								key={i}
								style={{
									fontSize: '13px',
									fontFamily: 'monospace',
									fontWeight: 600,
									color: '#F8FAFC',
									backgroundColor: 'rgba(255, 255, 255, 0.06)',
									border: '1px solid rgba(255, 255, 255, 0.14)',
									padding: '8px 20px',
									borderRadius: '30px',
									backdropFilter: 'blur(12px)',
									boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
								}}
							>
								{tech}
							</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
