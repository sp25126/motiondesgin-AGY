import React from 'react';
import { interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { HEALTHY_SQUIRREL_THEME } from '../healthysquirrel/BrandTokens';

interface AntigravityGeneratedOutroProps {
	frame: number;
}

export const AntigravityGeneratedOutro: React.FC<AntigravityGeneratedOutroProps> = ({ frame }) => {
	const { fps } = useVideoConfig();

	// Outro starts at Frame 490 (08.16s), runs to 720 (12.0s)
	const outroSpring = spring({
		frame: frame - 495,
		fps,
		config: { damping: 14, stiffness: 140 },
	});

	const typographyScale = interpolate(outroSpring, [0, 1], [0.92, 1.0]);
	const typographyOpacity = interpolate(frame, [495, 525], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Subtle, calm ease-out breathing drift
	const breathe = Math.sin((frame - 520) / 45) * 3;

	// Staggered badges entrance
	const badgesOpacity = interpolate(frame, [530, 560], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});
	const badgesY = interpolate(badgesOpacity, [0, 1], [16, 0]);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: 'none',
				zIndex: 40,
			}}
		>
			{/* Main Outro Content */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					transform: `scale(${typographyScale}) translateY(${breathe}px)`,
					opacity: typographyOpacity,
					maxWidth: 1100,
				}}
			>
				{/* Top Small Meta Pill */}
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 8,
						padding: '8px 18px',
						backgroundColor: '#FFFFFF',
						border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
						borderRadius: 9999,
						boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
						marginBottom: 28,
					}}
				>
					<span
						style={{
							width: 8,
							height: 8,
							borderRadius: '50%',
							backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
						}}
					/>
					<span
						style={{
							fontSize: 13,
							fontWeight: 700,
							color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
							letterSpacing: '0.08em',
							textTransform: 'uppercase',
						}}
					>
						Autonomous Motion Engine
					</span>
				</div>

				{/* ── REQUIRED BOLD TYPOGRAPHY: "GENERATED 100% BY ANTIGRAVITY AI" ── */}
				<h1
					style={{
						fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						fontSize: 66,
						fontWeight: 900,
						color: '#111827',
						letterSpacing: '-0.03em',
						lineHeight: 1.15,
						margin: 0,
					}}
				>
					GENERATED <span style={{ color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen }}>100%</span> BY ANTIGRAVITY AI
				</h1>

				{/* Subtitle */}
				<p
					style={{
						fontSize: 20,
						fontWeight: 500,
						color: '#6B7280',
						marginTop: 18,
						marginBottom: 0,
						letterSpacing: '-0.01em',
						maxWidth: 720,
						lineHeight: 1.5,
					}}
				>
					Zero manual keyframing. Production DOM and design tokens transformed directly into 60fps motion graphics.
				</p>

				{/* Feature Capability Badges */}
				<div
					style={{
						display: 'flex',
						gap: 16,
						marginTop: 36,
						opacity: badgesOpacity,
						transform: `translateY(${badgesY}px)`,
					}}
				>
					{[
						{ label: 'Zero Cursors or Timelines', check: true },
						{ label: 'Strict Brand System Locked', check: true },
						{ label: 'Pixel-Perfect Remotion Rendering', check: true },
					].map((feat, i) => (
						<div
							key={i}
							style={{
								padding: '10px 18px',
								backgroundColor: '#FFFFFF',
								borderRadius: 9999,
								border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
								boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								fontSize: 14,
								fontWeight: 600,
								color: '#111827',
							}}
						>
							<span style={{ color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen, fontWeight: 800 }}>✓</span>
							<span>{feat.label}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
