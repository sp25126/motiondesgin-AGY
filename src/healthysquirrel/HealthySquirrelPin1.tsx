import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	Easing,
} from 'remotion';
import { HEALTHY_SQUIRREL_THEME } from './BrandTokens';

export const HealthySquirrelPin1: React.FC = () => {
	const frame = useCurrentFrame();

	// Full headline string
	const fullHeadline = 'Stop guessing what your training is missing.';

	// Dynamic text typing (Frame 15 to 65)
	const typingProgress = interpolate(frame, [15, 65], [0, fullHeadline.length], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const displayedHeadline = fullHeadline.slice(0, Math.floor(typingProgress));
	const isTypingDone = frame >= 65;
	const cursorBlink = Math.floor(frame / 10) % 2 === 0;

	// Proof strip entry: Frame 60 to 90
	// Calm fade in, no excessive bounce (strict max overshoot <= 4%)
	const proofEntry = interpolate(frame, [60, 85], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.2, 0.8, 0.2, 1),
	});

	// Dynamic number count-up animations (Frame 62 to 105)
	const countEasing = Easing.bezier(0.2, 0.8, 0.2, 1);
	const workoutsCount = Math.floor(
		interpolate(frame, [62, 100], [0, 14850], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: countEasing,
		})
	);

	const adherenceCount = (
		interpolate(frame, [65, 102], [70.0, 98.4], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: countEasing,
		})
	).toFixed(1);

	const recoveryCount = (
		interpolate(frame, [68, 105], [1.0, 3.8], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: countEasing,
		})
	).toFixed(1);

	// Button entry: ScaleFade from 0.96 to 1.0, opacity 0 to 1 (Frame 90 to 115)
	// Easing: cubic-bezier(0.2, 0.8, 0.2, 1) as explicitly requested
	const btnProgress = interpolate(frame, [90, 115], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.2, 0.8, 0.2, 1),
	});

	const buttonScale = interpolate(btnProgress, [0, 1], [0.96, 1.0]);
	const buttonOpacity = btnProgress;

	// Subtle, calm training audit card entry (Frame 20 to 50)
	const cardProgress = interpolate(frame, [10, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.2, 0.8, 0.2, 1),
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '60px 48px',
				fontFamily: HEALTHY_SQUIRREL_THEME.typography.fontFamily,
				color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
				boxSizing: 'border-box',
			}}
		>
			{/* Top Brand Header */}
			<div
				style={{
					position: 'absolute',
					top: 64,
					left: 56,
					right: 56,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingBottom: 24,
					borderBottom: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					{/* Calm Athletic Squirrel Brand Mark */}
					<div
						style={{
							width: 38,
							height: 38,
							borderRadius: '10px',
							backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#FFFFFF',
							fontWeight: 800,
							fontSize: 18,
							letterSpacing: '-0.02em',
						}}
					>
						HS
					</div>
					<div>
						<div
							style={{
								fontSize: 18,
								fontWeight: 700,
								color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
								letterSpacing: '-0.01em',
							}}
						>
							Healthy Squirrel
						</div>
						<div
							style={{
								fontSize: 13,
								fontWeight: 500,
								color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
							}}
						>
							Athletic training intelligence
						</div>
					</div>
				</div>

				<div
					style={{
						padding: '6px 14px',
						backgroundColor: HEALTHY_SQUIRREL_THEME.colors.surface,
						border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
						borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
						fontSize: 13,
						fontWeight: 500,
						color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
					}}
				>
					Training audit · 2026
				</div>
			</div>

			{/* Main Container - Flat White Card Surface */}
			<div
				style={{
					width: '100%',
					maxWidth: 980,
					backgroundColor: HEALTHY_SQUIRREL_THEME.colors.surface,
					border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
					borderRadius: HEALTHY_SQUIRREL_THEME.radius.card,
					boxShadow: HEALTHY_SQUIRREL_THEME.shadows.card,
					padding: '64px 56px',
					display: 'flex',
					flexDirection: 'column',
					gap: 36,
					opacity: cardProgress,
					transform: `translateY(${(1 - cardProgress) * 12}px)`,
					boxSizing: 'border-box',
				}}
			>
				{/* Category Tag */}
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 8,
						alignSelf: 'flex-start',
						padding: '6px 14px',
						backgroundColor: '#F3F4F6',
						borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
						border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
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
							fontWeight: 600,
							color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
						}}
					>
						Performance diagnostics
					</span>
				</div>

				{/* ── Required Layout Container ── */}
				{/* Layout: display: flex; flex-direction: column; gap: 20px; align-items: flex-start; */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 20,
						alignItems: 'flex-start',
						width: '100%',
					}}
				>
					{/* ── Headline ── */}
					{/* font-size: 48px; font-weight: 800; color: #111827; letter-spacing: -0.02em; */}
					{/* Text: "Stop guessing what your training is missing." */}
					<h1
						style={{
							fontSize: 48,
							fontWeight: 800,
							color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
							letterSpacing: '-0.02em',
							lineHeight: 1.15,
							margin: 0,
							minHeight: 112,
						}}
					>
						{displayedHeadline}
						{!isTypingDone && (
							<span
								style={{
									display: 'inline-block',
									width: 3,
									height: 42,
									backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
									marginLeft: 4,
									verticalAlign: 'middle',
									opacity: cursorBlink ? 1 : 0,
								}}
							/>
						)}
					</h1>

					{/* ── Proof Strip (ul/li) ── */}
					{/* display: flex; gap: 16px; font-size: 16px; color: #4B5563; font-weight: 500; */}
					<ul
						style={{
							display: 'flex',
							gap: 16,
							fontSize: 16,
							color: HEALTHY_SQUIRREL_THEME.colors.proofText,
							fontWeight: 500,
							listStyle: 'none',
							padding: 0,
							margin: 0,
							flexWrap: 'wrap',
							alignItems: 'center',
							opacity: proofEntry,
							transform: `translateY(${(1 - proofEntry) * 8}px)`,
						}}
					>
						{/* Item 1 */}
						<li
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								padding: '8px 16px',
								backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
								borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
								border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
							}}
						>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
								<circle cx="8" cy="8" r="8" fill="#E5E7EB" />
								<path
									d="M5 8.2L7 10.2L11 6"
									stroke={HEALTHY_SQUIRREL_THEME.colors.primaryGreen}
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span>
								<strong style={{ color: HEALTHY_SQUIRREL_THEME.colors.textPrimary, fontWeight: 700 }}>
									{workoutsCount.toLocaleString()}+
								</strong>{' '}
								sessions analyzed
							</span>
						</li>

						{/* Item 2 */}
						<li
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								padding: '8px 16px',
								backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
								borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
								border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
							}}
						>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
								<circle cx="8" cy="8" r="8" fill="#E5E7EB" />
								<path
									d="M5 8.2L7 10.2L11 6"
									stroke={HEALTHY_SQUIRREL_THEME.colors.primaryGreen}
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span>
								<strong style={{ color: HEALTHY_SQUIRREL_THEME.colors.textPrimary, fontWeight: 700 }}>
									{adherenceCount}%
								</strong>{' '}
								plan adherence
							</span>
						</li>

						{/* Item 3 */}
						<li
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								padding: '8px 16px',
								backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
								borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
								border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
							}}
						>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
								<circle cx="8" cy="8" r="8" fill="#E5E7EB" />
								<path
									d="M5 8.2L7 10.2L11 6"
									stroke={HEALTHY_SQUIRREL_THEME.colors.primaryGreen}
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span>
								<strong style={{ color: HEALTHY_SQUIRREL_THEME.colors.textPrimary, fontWeight: 700 }}>
									{recoveryCount}x
								</strong>{' '}
								faster recovery
							</span>
						</li>
					</ul>

					{/* ── Button ── */}
					{/* background-color: #2E8661; color: #FFFFFF; border-radius: 9999px; padding: 14px 28px; font-weight: 600; */}
					{/* Animation: scaleFade from scale(0.96) to scale(1.0), opacity 0 to 1 */}
					<div style={{ marginTop: 8 }}>
						<button
							style={{
								backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
								color: '#FFFFFF',
								borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
								padding: '14px 28px',
								fontWeight: 600,
								fontSize: 16,
								border: 'none',
								cursor: 'pointer',
								display: 'inline-flex',
								alignItems: 'center',
								gap: 10,
								opacity: buttonOpacity,
								transform: `scale(${buttonScale})`,
								boxShadow: '0 2px 4px rgba(46, 134, 97, 0.2)',
								fontFamily: HEALTHY_SQUIRREL_THEME.typography.fontFamily,
							}}
						>
							<span>Start your training assessment</span>
							<svg
								width="18"
								height="18"
								viewBox="0 0 20 20"
								fill="none"
								style={{ display: 'inline-block' }}
							>
								<path
									d="M4.167 10h11.666m-5-5l5 5-5 5"
									stroke="#FFFFFF"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Athlete Diagnostic Preview Subcard (Calm, Trustworthy, Athletic) */}
				<div
					style={{
						marginTop: 12,
						padding: '24px 28px',
						backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
						borderRadius: '12px',
						border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
						<span
							style={{
								fontSize: 13,
								fontWeight: 600,
								color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
								textTransform: 'uppercase',
								letterSpacing: '0.04em',
							}}
						>
							Weekly training load balance
						</span>
						<span
							style={{
								fontSize: 15,
								fontWeight: 600,
								color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
							}}
						>
							Optimal aerobic base · Low systemic strain
						</span>
					</div>

					{/* Calm Progress Bar using Primary Green only */}
					<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
						<div
							style={{
								width: 140,
								height: 8,
								backgroundColor: '#E5E7EB',
								borderRadius: 999,
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									width: `${Math.min(100, Math.floor(interpolate(frame, [40, 95], [0, 84], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })))}%`,
									height: '100%',
									backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
									borderRadius: 999,
								}}
							/>
						</div>
						<span
							style={{
								fontSize: 14,
								fontWeight: 700,
								color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
								minWidth: 36,
							}}
						>
							84%
						</span>
					</div>
				</div>
			</div>

			{/* Bottom Trust Seal */}
			<div
				style={{
					position: 'absolute',
					bottom: 56,
					display: 'flex',
					alignItems: 'center',
					gap: 24,
					fontSize: 13,
					fontWeight: 500,
					color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
				}}
			>
				<span>✓ Evidence-based athletic methodology</span>
				<span>•</span>
				<span>Calm, objective feedback</span>
				<span>•</span>
				<span>Zero injury burnout guarantee</span>
			</div>
		</AbsoluteFill>
	);
};
