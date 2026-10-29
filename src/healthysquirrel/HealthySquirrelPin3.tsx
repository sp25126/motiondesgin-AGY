import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	Easing,
} from 'remotion';
import { HEALTHY_SQUIRREL_THEME } from './BrandTokens';

export const HealthySquirrelPin3: React.FC = () => {
	const frame = useCurrentFrame();

	// Line animation: 0% to 100% over exactly 1.2s (36 frames at 30fps), from Frame 20 to Frame 56
	const lineDuration = 36;
	const lineStart = 20;
	const lineProgress = interpolate(
		frame,
		[lineStart, lineStart + lineDuration],
		[0, 100],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.inOut(Easing.ease),
		}
	);

	// Row 1: Line passes top row around Frame 24 (~10% of line travel)
	const row1Opacity = interpolate(frame, [18, 28], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.ease),
	});
	// Checkmark ping (Frame 26 to 40) - strict max scale 1.04 (no overshoot exceeding 4%)
	const check1Ping = interpolate(frame, [26, 33, 40], [0.6, 1.04, 1.0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.ease),
	});
	const check1Opacity = interpolate(frame, [26, 32], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Row 2: Line passes middle row around Frame 38 (~50% of line travel)
	const row2Opacity = interpolate(frame, [34, 44], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.ease),
	});
	// Checkmark ping (Frame 40 to 54) - strict max scale 1.04
	const check2Ping = interpolate(frame, [40, 47, 54], [0.6, 1.04, 1.0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.ease),
	});
	const check2Opacity = interpolate(frame, [40, 46], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Row 3: Line passes bottom row around Frame 52 (~90% of line travel)
	const row3Opacity = interpolate(frame, [48, 58], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.ease),
	});
	// Checkmark ping (Frame 54 to 68) - strict max scale 1.04
	const check3Ping = interpolate(frame, [54, 61, 68], [0.6, 1.04, 1.0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.ease),
	});
	const check3Opacity = interpolate(frame, [54, 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Main card entrance
	const cardProgress = interpolate(frame, [4, 22], [0, 1], {
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
							Verified safety checkpoints
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
						fontWeight: 600,
						color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
					}}
				>
					Safety protocol v2.4
				</div>
			</div>

			{/* Main Surface Card */}
			<div
				style={{
					width: '100%',
					maxWidth: 920,
					backgroundColor: HEALTHY_SQUIRREL_THEME.colors.surface,
					border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
					borderRadius: HEALTHY_SQUIRREL_THEME.radius.card,
					boxShadow: HEALTHY_SQUIRREL_THEME.shadows.card,
					padding: '60px 56px',
					display: 'flex',
					flexDirection: 'column',
					gap: 36,
					opacity: cardProgress,
					transform: `translateY(${(1 - cardProgress) * 12}px)`,
					boxSizing: 'border-box',
				}}
			>
				{/* Section Header */}
				<div>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 8,
							padding: '6px 14px',
							backgroundColor: '#F3F4F6',
							borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
							border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
							marginBottom: 16,
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
							Tri-layer protocol
						</span>
					</div>

					<h2
						style={{
							fontSize: 38,
							fontWeight: 800,
							color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
							letterSpacing: '-0.02em',
							margin: 0,
							lineHeight: 1.2,
						}}
					>
						Three continuous checkpoints safeguard every workout.
					</h2>
				</div>

				{/* ── Developer CSS/DOM Specs: Container ── */}
				{/* Spec: display: flex; flex-direction: column; gap: 24px; position: relative; padding-left: 32px; */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 24,
						position: 'relative',
						paddingLeft: 32,
						boxSizing: 'border-box',
					}}
				>
					{/* ── Developer CSS/DOM Specs: Connecting Line ── */}
					{/* Spec: position: absolute; left: 11px; top: 10px; bottom: 10px; width: 2px; background: #2E8661; */}
					{/* Track line (subtle background line) */}
					<div
						style={{
							position: 'absolute',
							left: 11,
							top: 10,
							bottom: 10,
							width: 2,
							background: '#E5E7EB',
							zIndex: 1,
						}}
					>
						{/* Animated Solid Green Line: height animates 0% to 100% over 1.2s ease-in-out */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: 2,
								height: `${lineProgress}%`,
								background: '#2E8661',
								borderRadius: 1,
							}}
						/>
					</div>

					{/* ── ROW 1: User Icon ── */}
					{/* Spec: Row Structure: display: flex; align-items: center; gap: 16px; */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
							opacity: row1Opacity,
							transform: `translateX(${(1 - row1Opacity) * 8}px)`,
							position: 'relative',
						}}
					>
						{/* Spec: Icons: width: 24px; height: 24px; color: #111827; inside a background: #FFFFFF; border: 2px solid #2E8661; border-radius: 50%; z-index: 10; */}
						<div
							style={{
								width: 24,
								height: 24,
								minWidth: 24,
								minHeight: 24,
								marginLeft: -32,
								background: '#FFFFFF',
								border: '2px solid #2E8661',
								borderRadius: '50%',
								zIndex: 10,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#111827',
								boxSizing: 'border-box',
							}}
						>
							{/* User Icon */}
							<svg
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#111827"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
								<circle cx="12" cy="7" r="4" />
							</svg>
						</div>

						{/* Row Content Card */}
						<div
							style={{
								flex: 1,
								padding: '18px 24px',
								backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
								borderRadius: '12px',
								border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
							}}
						>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
								<div
									style={{
										fontSize: 17,
										fontWeight: 700,
										color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
										letterSpacing: '-0.01em',
									}}
								>
									Athlete baseline assessment
								</div>
								<div
									style={{
										fontSize: 14,
										color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
										fontWeight: 500,
										lineHeight: 1.4,
									}}
								>
									Individual HR zones, training history & biomechanical capacity.
								</div>
							</div>

							{/* Pinging green checkmark on safe row */}
							{check1Opacity > 0.05 && (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 6,
										padding: '6px 14px',
										backgroundColor: '#F0FDF4',
										border: '1px solid #BBF7D0',
										borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
										opacity: check1Opacity,
										transform: `scale(${check1Ping})`,
										flexShrink: 0,
									}}
								>
									<svg width="15" height="15" viewBox="0 0 16 16" fill="none">
										<path
											d="M3.5 8.5L6.5 11.5L12.5 4.5"
											stroke="#2E8661"
											strokeWidth="2.2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<span
										style={{
											fontSize: 12,
											fontWeight: 700,
											color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
											letterSpacing: '0.02em',
										}}
									>
										SAFE ROW
									</span>
								</div>
							)}
						</div>
					</div>

					{/* ── ROW 2: Coach Whistle Icon ── */}
					{/* Spec: Row Structure: display: flex; align-items: center; gap: 16px; */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
							opacity: row2Opacity,
							transform: `translateX(${(1 - row2Opacity) * 8}px)`,
							position: 'relative',
						}}
					>
						{/* Spec: Icons: width: 24px; height: 24px; color: #111827; inside a background: #FFFFFF; border: 2px solid #2E8661; border-radius: 50%; z-index: 10; */}
						<div
							style={{
								width: 24,
								height: 24,
								minWidth: 24,
								minHeight: 24,
								marginLeft: -32,
								background: '#FFFFFF',
								border: '2px solid #2E8661',
								borderRadius: '50%',
								zIndex: 10,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#111827',
								boxSizing: 'border-box',
							}}
						>
							{/* Coach Whistle Icon */}
							<svg
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#111827"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M10 5a5 5 0 0 0-5 5v1a5 5 0 0 0 10 0v-1a5 5 0 0 0-5-5z" />
								<path d="M15 11h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-7" />
								<circle cx="10" cy="11" r="1.5" />
								<path d="M10 2v3" />
							</svg>
						</div>

						{/* Row Content Card */}
						<div
							style={{
								flex: 1,
								padding: '18px 24px',
								backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
								borderRadius: '12px',
								border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
							}}
						>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
								<div
									style={{
										fontSize: 17,
										fontWeight: 700,
										color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
										letterSpacing: '-0.01em',
									}}
								>
									Coach volume calibration
								</div>
								<div
									style={{
										fontSize: 14,
										color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
										fontWeight: 500,
										lineHeight: 1.4,
									}}
								>
									Weekly workload adjusted to autonomic recovery & sleep readiness.
								</div>
							</div>

							{/* Pinging green checkmark on safe row */}
							{check2Opacity > 0.05 && (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 6,
										padding: '6px 14px',
										backgroundColor: '#F0FDF4',
										border: '1px solid #BBF7D0',
										borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
										opacity: check2Opacity,
										transform: `scale(${check2Ping})`,
										flexShrink: 0,
									}}
								>
									<svg width="15" height="15" viewBox="0 0 16 16" fill="none">
										<path
											d="M3.5 8.5L6.5 11.5L12.5 4.5"
											stroke="#2E8661"
											strokeWidth="2.2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<span
										style={{
											fontSize: 12,
											fontWeight: 700,
											color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
											letterSpacing: '0.02em',
										}}
									>
										SAFE ROW
									</span>
								</div>
							)}
						</div>
					</div>

					{/* ── ROW 3: Padlock Icon ── */}
					{/* Spec: Row Structure: display: flex; align-items: center; gap: 16px; */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
							opacity: row3Opacity,
							transform: `translateX(${(1 - row3Opacity) * 8}px)`,
							position: 'relative',
						}}
					>
						{/* Spec: Icons: width: 24px; height: 24px; color: #111827; inside a background: #FFFFFF; border: 2px solid #2E8661; border-radius: 50%; z-index: 10; */}
						<div
							style={{
								width: 24,
								height: 24,
								minWidth: 24,
								minHeight: 24,
								marginLeft: -32,
								background: '#FFFFFF',
								border: '2px solid #2E8661',
								borderRadius: '50%',
								zIndex: 10,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#111827',
								boxSizing: 'border-box',
							}}
						>
							{/* Padlock Icon */}
							<svg
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#111827"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
								<path d="M7 11V7a5 5 0 0 1 10 0v4" />
							</svg>
						</div>

						{/* Row Content Card */}
						<div
							style={{
								flex: 1,
								padding: '18px 24px',
								backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
								borderRadius: '12px',
								border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
							}}
						>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
								<div
									style={{
										fontSize: 17,
										fontWeight: 700,
										color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
										letterSpacing: '-0.01em',
									}}
								>
									Encrypted health data & injury guard
								</div>
								<div
									style={{
										fontSize: 14,
										color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
										fontWeight: 500,
										lineHeight: 1.4,
									}}
								>
									Strict load ceilings eliminate overtraining and soft-tissue injury risk.
								</div>
							</div>

							{/* Pinging green checkmark on safe row */}
							{check3Opacity > 0.05 && (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 6,
										padding: '6px 14px',
										backgroundColor: '#F0FDF4',
										border: '1px solid #BBF7D0',
										borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
										opacity: check3Opacity,
										transform: `scale(${check3Ping})`,
										flexShrink: 0,
									}}
								>
									<svg width="15" height="15" viewBox="0 0 16 16" fill="none">
										<path
											d="M3.5 8.5L6.5 11.5L12.5 4.5"
											stroke="#2E8661"
											strokeWidth="2.2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<span
										style={{
											fontSize: 12,
											fontWeight: 700,
											color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
											letterSpacing: '0.02em',
										}}
									>
										SAFE ROW
									</span>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Primary Green Action Pill */}
				<div style={{ alignSelf: 'flex-start', marginTop: 8 }}>
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
							boxShadow: '0 2px 4px rgba(46, 134, 97, 0.2)',
							fontFamily: HEALTHY_SQUIRREL_THEME.typography.fontFamily,
						}}
					>
						<span>Explore verified training plans</span>
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

			{/* Bottom Trust Seal */}
			<div
				style={{
					position: 'absolute',
					bottom: 56,
					display: 'flex',
					alignItems: 'center',
					gap: 20,
					fontSize: 14,
					fontWeight: 500,
					color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
				}}
			>
				<span>Zero burnout guarantee</span>
				<span>•</span>
				<span>Evidence-based progression</span>
				<span>•</span>
				<span>Clinical training safety</span>
			</div>
		</AbsoluteFill>
	);
};

