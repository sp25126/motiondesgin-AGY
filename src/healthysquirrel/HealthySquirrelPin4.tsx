import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	Easing,
} from 'remotion';
import { HEALTHY_SQUIRREL_THEME } from './BrandTokens';

export const HealthySquirrelPin4: React.FC = () => {
	const frame = useCurrentFrame();

	// Overall entrance animation for phone and outer card
	const entranceProgress = interpolate(frame, [4, 22], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	// Sticky CTA Animation Spec:
	// "Enter from bottom transform: translateY(100%) to transform: translateY(0) using transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)."
	// "Background dims via a pseudo-element overlay transitioning opacity: 0 to opacity: 0.4."
	// 0.4s at 30fps = 12 frames. Triggered from Frame 30 to Frame 42.
	const stickyStartFrame = 30;
	const stickyDuration = 12; // 0.4s = 12 frames @ 30fps

	// Sticky container translation: 100% to 0%
	const stickyTranslateY = interpolate(
		frame,
		[stickyStartFrame, stickyStartFrame + stickyDuration],
		[100, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.16, 1, 0.3, 1),
		}
	);

	// Background overlay dimming: opacity 0 to 0.4
	const overlayOpacity = interpolate(
		frame,
		[stickyStartFrame, stickyStartFrame + stickyDuration],
		[0, 0.4],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.16, 1, 0.3, 1),
		}
	);

	// Subtle button micro-state after locking in (Frame 48 to 60) - strictly under 4% overshoot
	const buttonScale = interpolate(
		frame,
		[stickyStartFrame + stickyDuration + 6, stickyStartFrame + stickyDuration + 14, stickyStartFrame + stickyDuration + 22],
		[1, 1.03, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.16, 1, 0.3, 1),
		}
	);

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
				overflow: 'hidden',
			}}
		>
			{/* Top Brand Header */}
			<div
				style={{
					position: 'absolute',
					top: 56,
					left: 56,
					right: 56,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingBottom: 20,
					borderBottom: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
					zIndex: 30,
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
							Mobile viewport · Bottom sticky action
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
					Pin #4 · Sticky CTA
				</div>
			</div>

			{/* Main Layout Area */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 28,
					opacity: entranceProgress,
					transform: `translateY(${(1 - entranceProgress) * 16}px)`,
					zIndex: 10,
				}}
			>
				{/* Headline & Meta Badge */}
				<div style={{ textAlign: 'center', maxWidth: 680 }}>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 8,
							padding: '6px 14px',
							backgroundColor: '#F3F4F6',
							borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
							border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
							marginBottom: 12,
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
							Mobile Conversion Flow
						</span>
					</div>

					<h1
						style={{
							fontSize: 40,
							fontWeight: 800,
							color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
							letterSpacing: '-0.02em',
							margin: 0,
							lineHeight: 1.15,
						}}
					>
						Frictionless commitment at peak workout readiness.
					</h1>
				</div>

				{/* ── Mobile Viewport (iPhone frame) ── */}
				<div
					style={{
						position: 'relative',
						width: 420,
						height: 840,
						borderRadius: 48,
						backgroundColor: '#1E242B', // Outer bezel color
						padding: 12,
						boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.06)',
						boxSizing: 'border-box',
					}}
				>
					{/* Phone side buttons */}
					<div
						style={{
							position: 'absolute',
							left: -3,
							top: 140,
							width: 3,
							height: 48,
							backgroundColor: '#374151',
							borderRadius: '2px 0 0 2px',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							left: -3,
							top: 200,
							width: 3,
							height: 48,
							backgroundColor: '#374151',
							borderRadius: '2px 0 0 2px',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							right: -3,
							top: 170,
							width: 3,
							height: 72,
							backgroundColor: '#374151',
							borderRadius: '0 2px 2px 0',
						}}
					/>

					{/* ── Inner Phone Screen ── */}
					<div
						style={{
							position: 'relative',
							width: '100%',
							height: '100%',
							backgroundColor: '#FFFFFF',
							borderRadius: 38,
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						{/* Dynamic Island Notch */}
						<div
							style={{
								position: 'absolute',
								top: 10,
								left: '50%',
								transform: 'translateX(-50%)',
								width: 110,
								height: 28,
								backgroundColor: '#000000',
								borderRadius: 20,
								zIndex: 60,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
								paddingRight: 10,
								boxSizing: 'border-box',
							}}
						>
							{/* Camera lens dot */}
							<div
								style={{
									width: 10,
									height: 10,
									borderRadius: '50%',
									backgroundColor: '#1E293B',
								}}
							/>
						</div>

						{/* Phone Status Bar */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '14px 24px 8px 24px',
								fontSize: 13,
								fontWeight: 600,
								color: '#111827',
								zIndex: 20,
							}}
						>
							<span>9:41</span>
							<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
								{/* Cellular signal */}
								<svg width="14" height="12" viewBox="0 0 14 12" fill="none">
									<rect x="0" y="8" width="2" height="4" rx="0.5" fill="#111827" />
									<rect x="3.5" y="6" width="2" height="6" rx="0.5" fill="#111827" />
									<rect x="7" y="3" width="2" height="9" rx="0.5" fill="#111827" />
									<rect x="10.5" y="0" width="2" height="12" rx="0.5" fill="#111827" />
								</svg>
								{/* Wifi */}
								<svg width="14" height="12" viewBox="0 0 14 12" fill="none">
									<path
										d="M1 3C4.5 -0.5 9.5 -0.5 13 3M3 6C5.5 3.5 8.5 3.5 11 6M5.5 9C6.5 8 7.5 8 8.5 9M7 11.5h0"
										stroke="#111827"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
								</svg>
								{/* Battery */}
								<div
									style={{
										width: 20,
										height: 10,
										border: '1.5px solid #111827',
										borderRadius: 3,
										padding: 1,
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<div
										style={{
											width: '85%',
											height: '100%',
											backgroundColor: '#111827',
											borderRadius: 1,
										}}
									/>
								</div>
							</div>
						</div>

						{/* Phone App Content (Scrollable background view) */}
						<div
							style={{
								flex: 1,
								padding: '8px 20px 100px 20px',
								overflowY: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								gap: 16,
								position: 'relative',
							}}
						>
							{/* App Nav Header */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									paddingBottom: 10,
									borderBottom: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<div
										style={{
											width: 28,
											height: 28,
											borderRadius: 7,
											backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
											color: '#FFFFFF',
											fontSize: 13,
											fontWeight: 800,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										HS
									</div>
									<span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>
										Today's Plan
									</span>
								</div>
								<span
									style={{
										fontSize: 12,
										fontWeight: 600,
										color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
										backgroundColor: '#F0FDF4',
										padding: '4px 10px',
										borderRadius: HEALTHY_SQUIRREL_THEME.radius.pill,
									}}
								>
									READY
								</span>
							</div>

							{/* Hero Training Card inside App */}
							<div
								style={{
									padding: 16,
									backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
									borderRadius: 14,
									border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
									display: 'flex',
									flexDirection: 'column',
									gap: 10,
								}}
							>
								<div
									style={{
										fontSize: 11,
										fontWeight: 700,
										color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
										textTransform: 'uppercase',
										letterSpacing: '0.04em',
									}}
								>
									Session 14 · Endurance Base
								</div>
								<div
									style={{
										fontSize: 18,
										fontWeight: 800,
										color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
										lineHeight: 1.25,
									}}
								>
									Aerobic Zone 2 Threshold Builder
								</div>
								<div
									style={{
										fontSize: 13,
										color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
										lineHeight: 1.4,
									}}
								>
									45 mins total volume targeting mitochondrial density and lactate clearance.
								</div>
							</div>

							{/* Metric Cards Row */}
							<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
								<div
									style={{
										padding: 12,
										backgroundColor: '#FFFFFF',
										border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
										borderRadius: 12,
									}}
								>
									<div style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>
										Target Heart Rate
									</div>
									<div
										style={{
											fontSize: 20,
											fontWeight: 800,
											color: '#111827',
											marginTop: 4,
										}}
									>
										138–146{' '}
										<span style={{ fontSize: 11, fontWeight: 500, color: '#6B7280' }}>
											BPM
										</span>
									</div>
								</div>
								<div
									style={{
										padding: 12,
										backgroundColor: '#FFFFFF',
										border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
										borderRadius: 12,
									}}
								>
									<div style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>
										Recovery Index
									</div>
									<div
										style={{
											fontSize: 20,
											fontWeight: 800,
											color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
											marginTop: 4,
										}}
									>
										92%{' '}
										<span style={{ fontSize: 11, fontWeight: 500, color: '#6B7280' }}>
											OPTIMAL
										</span>
									</div>
								</div>
							</div>

							{/* Workout Segments Breakdown */}
							<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
								<div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
									Prescribed Segments
								</div>
								{[
									{ label: 'Dynamic Joint Activation', duration: '8 min', tag: 'Warmup' },
									{ label: 'Steady Pace Cadence (Zone 2)', duration: '30 min', tag: 'Main' },
									{ label: 'Parasympathetic Down-regulation', duration: '7 min', tag: 'Cooldown' },
								].map((seg, idx) => (
									<div
										key={idx}
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											padding: '10px 12px',
											backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
											borderRadius: 10,
											border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
										}}
									>
										<div>
											<div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>
												{seg.label}
											</div>
											<div style={{ fontSize: 11, color: '#6B7280' }}>{seg.duration}</div>
										</div>
										<span
											style={{
												fontSize: 10,
												fontWeight: 700,
												color: '#4B5563',
												backgroundColor: '#E5E7EB',
												padding: '3px 7px',
												borderRadius: 4,
											}}
										>
											{seg.tag}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* ── Background Dimming Overlay ── */}
						{/* Spec: "Background dims via a pseudo-element overlay transitioning opacity: 0 to opacity: 0.4." */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: '#000000',
								opacity: overlayOpacity,
								pointerEvents: 'none',
								zIndex: 40,
							}}
						/>

						{/* ── Developer CSS/DOM Specs: Sticky Container ── */}
						{/* Spec: position: fixed; bottom: 0; left: 0; right: 0; background: #FFFFFF; padding: 16px; padding-bottom: env(safe-area-inset-bottom, 16px); border-top: 1px solid #E5E7EB; box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.05); z-index: 50; */}
						{/* Animation: Enter from bottom transform: translateY(100%) to transform: translateY(0) using transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1). */}
						<div
							style={{
								position: 'absolute', // Acts as fixed inside the mobile viewport container
								bottom: 0,
								left: 0,
								right: 0,
								backgroundColor: '#FFFFFF',
								padding: '16px',
								paddingBottom: '24px', // Safe area inset bottom
								borderTop: '1px solid #E5E7EB',
								boxShadow: '0 -4px 6px -1px rgba(0,0,0,0.05)',
								zIndex: 50,
								transform: `translateY(${stickyTranslateY}%)`,
								boxSizing: 'border-box',
							}}
						>
							{/* Spec: Button: width: 100%; height: 48px; border-radius: 9999px; background: #2E8661; color: #FFFFFF; font-weight: 600; display: flex; justify-content: center; align-items: center; */}
							<button
								style={{
									width: '100%',
									height: 48,
									borderRadius: 9999,
									backgroundColor: '#2E8661',
									color: '#FFFFFF',
									fontWeight: 600,
									fontSize: 15,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									border: 'none',
									cursor: 'pointer',
									boxShadow: '0 2px 4px rgba(46, 134, 97, 0.25)',
									transform: `scale(${buttonScale})`,
									fontFamily: HEALTHY_SQUIRREL_THEME.typography.fontFamily,
								}}
							>
								Start verified session
							</button>

							{/* Spec: Subtext: text-align: center; font-size: 12px; color: #6B7280; margin-top: 8px; */}
							<div
								style={{
									textAlign: 'center',
									fontSize: 12,
									color: '#6B7280',
									marginTop: 8,
									fontWeight: 500,
								}}
							>
								Free 14-day trial · Cancel anytime · Clinical safety backed
							</div>

							{/* iPhone Home Indicator Bar */}
							<div
								style={{
									width: 130,
									height: 4,
									backgroundColor: '#111827',
									borderRadius: 2,
									margin: '14px auto 0 auto',
									opacity: 0.2,
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Trust Seal */}
			<div
				style={{
					position: 'absolute',
					bottom: 40,
					display: 'flex',
					alignItems: 'center',
					gap: 20,
					fontSize: 14,
					fontWeight: 500,
					color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
					zIndex: 20,
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
