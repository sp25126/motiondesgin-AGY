import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	Easing,
} from 'remotion';
import { HEALTHY_SQUIRREL_THEME } from './BrandTokens';

export const HealthySquirrelPin2: React.FC = () => {
	const frame = useCurrentFrame();

	// ── Left Side: Blurry Sliding Phone Carousel ──
	// Continuous calm slide loop
	const carouselScrollY = (frame * 3.5) % 800;

	// ── Right Side: Crisp iPhone Mockup Entry (Frames 0 to 35) ──
	const phoneEntrance = interpolate(frame, [0, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.2, 0.8, 0.2, 1),
	});
	const phoneScale = interpolate(phoneEntrance, [0, 1], [0.96, 1.0]);
	const phoneOpacity = phoneEntrance;

	// ── Callout 1 (Fuel: 84%): Pop out + 0.8s (24 frames) progress fill ──
	// Entry starts at frame 30
	const callout1Entry = interpolate(frame, [30, 48], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.2, 0.8, 0.2, 1),
	});
	const callout1Scale = interpolate(callout1Entry, [0, 1], [0.96, 1.0]);

	// Progress bar fill: 0.8s = 24 frames at 30fps (Frames 40 to 64) with ease-out
	const fuelFillProgress = interpolate(frame, [40, 64], [0, 84], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	// ── Callout 2 (Recovery: 54%): Pop out + 0.8s (24 frames) progress fill ──
	// Entry starts at frame 50
	const callout2Entry = interpolate(frame, [50, 68], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.2, 0.8, 0.2, 1),
	});
	const callout2Scale = interpolate(callout2Entry, [0, 1], [0.96, 1.0]);

	// Progress bar fill: 0.8s = 24 frames at 30fps (Frames 60 to 84) with ease-out
	const recoveryFillProgress = interpolate(frame, [60, 84], [0, 54], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: HEALTHY_SQUIRREL_THEME.typography.fontFamily,
				color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
				boxSizing: 'border-box',
				overflow: 'hidden',
			}}
		>
			{/* Top Header Badge & Navigation */}
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
							Biometric load & recovery telemetry
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
					Systemic audit view
				</div>
			</div>

			{/* Main Split Screen Presentation */}
			<div
				style={{
					width: 1080,
					height: 1400,
					display: 'flex',
					alignItems: 'center',
					position: 'relative',
					padding: '0 40px',
					boxSizing: 'border-box',
				}}
			>
				{/* ── LEFT SIDE: Blurry Sliding Phone Carousel ── */}
				<div
					style={{
						width: 360,
						height: 1200,
						position: 'relative',
						overflow: 'hidden',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						opacity: 0.65,
						maskImage:
							'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
						WebkitMaskImage:
							'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
					}}
				>
					{/* Vertical Carousel Strip sliding smoothly */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 36,
							transform: `translateY(-${carouselScrollY}px)`,
							filter: 'blur(5px)',
							pointerEvents: 'none',
						}}
					>
						{[0, 1, 2, 3, 4, 5].map((idx) => (
							<div
								key={idx}
								style={{
									width: 270,
									height: 460,
									borderRadius: 36,
									backgroundColor: '#FFFFFF',
									border: '1px solid #E5E7EB',
									boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
									padding: 20,
									display: 'flex',
									flexDirection: 'column',
									gap: 16,
									boxSizing: 'border-box',
								}}
							>
								{/* Generic blurred mock app screen */}
								<div
									style={{
										height: 24,
										width: '60%',
										backgroundColor: '#E5E7EB',
										borderRadius: 6,
									}}
								/>
								<div
									style={{
										height: 130,
										backgroundColor: '#F3F4F6',
										borderRadius: 12,
									}}
								/>
								<div
									style={{
										height: 16,
										width: '85%',
										backgroundColor: '#E5E7EB',
										borderRadius: 4,
									}}
								/>
								<div
									style={{
										height: 16,
										width: '70%',
										backgroundColor: '#E5E7EB',
										borderRadius: 4,
									}}
								/>
								<div
									style={{
										height: 48,
										backgroundColor: '#F3F4F6',
										borderRadius: 10,
										marginTop: 'auto',
									}}
								/>
							</div>
						))}
					</div>

					{/* Calm context label on left side */}
					<div
						style={{
							position: 'absolute',
							bottom: 24,
							backgroundColor: 'rgba(255, 255, 255, 0.95)',
							border: '1px solid #E5E7EB',
							borderRadius: 9999,
							padding: '6px 16px',
							fontSize: 12,
							fontWeight: 600,
							color: '#6B7280',
							boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
						}}
					>
						Noise: Generic tracking apps
					</div>
				</div>

				{/* ── RIGHT SIDE: Crisp, Massive iPhone Mockup & Callout Cards ── */}
				<div
					style={{
						position: 'relative',
						marginLeft: 80,
						width: 520,
						height: 1200,
						display: 'flex',
						alignItems: 'center',
						opacity: phoneOpacity,
						transform: `scale(${phoneScale})`,
					}}
				>
					{/* ── The Phone Mockup ── */}
					{/* CSS: position: relative; max-width: 320px; border-radius: 40px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); */}
					<div
						style={{
							position: 'relative',
							width: 320,
							height: 680,
							maxWidth: 320,
							borderRadius: 40,
							backgroundColor: '#FFFFFF',
							border: '10px solid #111827',
							boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
							display: 'flex',
							flexDirection: 'column',
							overflow: 'hidden',
							boxSizing: 'border-box',
							marginLeft: 30,
						}}
					>
						{/* iPhone Dynamic Island */}
						<div
							style={{
								width: 96,
								height: 24,
								backgroundColor: '#111827',
								borderRadius: 12,
								alignSelf: 'center',
								marginTop: 8,
								marginBottom: 16,
							}}
						/>

						{/* App Screen Content */}
						<div
							style={{
								padding: '0 20px',
								display: 'flex',
								flexDirection: 'column',
								gap: 16,
							}}
						>
							{/* Status Bar text */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<span
									style={{
										fontSize: 13,
										fontWeight: 600,
										color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
									}}
								>
									Daily Readiness
								</span>
								<span
									style={{
										fontSize: 12,
										fontWeight: 600,
										color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
										backgroundColor: '#F0FDF4',
										padding: '2px 8px',
										borderRadius: 9999,
									}}
								>
									CALIBRATED
								</span>
							</div>

							{/* Main Daily Score */}
							<div
								style={{
									padding: 16,
									backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
									borderRadius: 16,
									border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<div>
									<div
										style={{
											fontSize: 34,
											fontWeight: 800,
											color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
											lineHeight: 1,
										}}
									>
										88
									</div>
									<div
										style={{
											fontSize: 12,
											color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
											marginTop: 4,
											fontWeight: 500,
										}}
									>
										Performance capacity
									</div>
								</div>
								<div
									style={{
										width: 36,
										height: 36,
										borderRadius: '50%',
										border: `3px solid ${HEALTHY_SQUIRREL_THEME.colors.primaryGreen}`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 13,
										fontWeight: 700,
										color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
									}}
								>
									✓
								</div>
							</div>

							{/* Metric Row 1: Target Point for Callout 1 (Fuel) */}
							<div
								style={{
									padding: 14,
									backgroundColor: '#FFFFFF',
									borderRadius: 12,
									border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
									position: 'relative',
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										fontSize: 12,
										fontWeight: 600,
									}}
								>
									<span style={{ color: HEALTHY_SQUIRREL_THEME.colors.textPrimary }}>
										Glycogen & Fuel Storage
									</span>
									<span style={{ color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen }}>
										84%
									</span>
								</div>
								{/* In-app Mini Progress Bar */}
								<div
									style={{
										height: 6,
										backgroundColor: '#E5E7EB',
										borderRadius: 3,
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											width: `${fuelFillProgress}%`,
											height: '100%',
											backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
										}}
									/>
								</div>
							</div>

							{/* Metric Row 2: Target Point for Callout 2 (Recovery) */}
							<div
								style={{
									padding: 14,
									backgroundColor: '#FFFFFF',
									borderRadius: 12,
									border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
									position: 'relative',
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										fontSize: 12,
										fontWeight: 600,
									}}
								>
									<span style={{ color: HEALTHY_SQUIRREL_THEME.colors.textPrimary }}>
										Nervous System Recovery
									</span>
									<span style={{ color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen }}>
										54%
									</span>
								</div>
								{/* In-app Mini Progress Bar */}
								<div
									style={{
										height: 6,
										backgroundColor: '#E5E7EB',
										borderRadius: 3,
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											width: `${recoveryFillProgress}%`,
											height: '100%',
											backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
										}}
									/>
								</div>
							</div>

							{/* Workout Readiness Recommendation */}
							<div
								style={{
									marginTop: 4,
									padding: '12px 14px',
									backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
									borderRadius: 10,
									border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
									fontSize: 12,
									color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
									lineHeight: 1.4,
								}}
							>
								<strong style={{ color: HEALTHY_SQUIRREL_THEME.colors.textPrimary, display: 'block', marginBottom: 2 }}>
									Today&apos;s Prescription:
								</strong>
								Target Zone 2 threshold. High fuel availability allows extended duration.
							</div>
						</div>
					</div>

					{/* ── SVG Leader Lines Connecting Phone to Callouts ── */}
					<svg
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							pointerEvents: 'none',
							overflow: 'visible',
							zIndex: 15,
						}}
					>
						{/* Leader Line 1 (To Callout 1 - Fuel, popping out to Left) */}
						{callout1Entry > 0.05 && (
							<g opacity={callout1Entry}>
								<circle cx="50" cy="510" r="4" fill={HEALTHY_SQUIRREL_THEME.colors.primaryGreen} />
								<polyline
									points="50,510 -20,510 -60,430"
									fill="none"
									stroke="#9CA3AF"
									strokeWidth="1.5"
									strokeDasharray="4 2"
								/>
							</g>
						)}

						{/* Leader Line 2 (To Callout 2 - Recovery, popping out to Right) */}
						{callout2Entry > 0.05 && (
							<g opacity={callout2Entry}>
								<circle cx="330" cy="580" r="4" fill={HEALTHY_SQUIRREL_THEME.colors.primaryGreen} />
								<polyline
									points="330,580 370,580 390,620"
									fill="none"
									stroke="#9CA3AF"
									strokeWidth="1.5"
									strokeDasharray="4 2"
								/>
							</g>
						)}
					</svg>

					{/* ── CALLOUT CARD 1: Fuel (84%) ── */}
					{/* Specs: position: absolute; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px; */}
					<div
						style={{
							position: 'absolute',
							top: 360,
							left: -140,
							width: 210,
							background: '#FFFFFF',
							border: '1px solid #E5E7EB',
							borderRadius: 8,
							padding: 12,
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
							boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
							opacity: callout1Entry,
							transform: `scale(${callout1Scale}) translateX(${(1 - callout1Entry) * 20}px)`,
							zIndex: 20,
							boxSizing: 'border-box',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<span
								style={{
									fontSize: 12,
									fontWeight: 700,
									color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
								}}
							>
								Fuel status
							</span>
							<span
								style={{
									fontSize: 13,
									fontWeight: 800,
									color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
								}}
							>
								{Math.round(fuelFillProgress)}%
							</span>
						</div>

						{/* Progress Bar inside Callout 1 */}
						{/* Specs: height: 8px; background: #E5E7EB; border-radius: 4px; overflow: hidden; Inner fill: background: #2E8661; width: 84%; */}
						<div
							style={{
								height: 8,
								background: '#E5E7EB',
								borderRadius: 4,
								overflow: 'hidden',
								width: '100%',
							}}
						>
							<div
								style={{
									height: '100%',
									background: '#2E8661',
									width: `${fuelFillProgress}%`,
									borderRadius: 4,
								}}
							/>
						</div>

						<div
							style={{
								fontSize: 11,
								color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
								fontWeight: 500,
							}}
						>
							Full glycogen stores available
						</div>
					</div>

					{/* ── CALLOUT CARD 2: Recovery (54%) ── */}
					{/* Specs: position: absolute; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px; */}
					<div
						style={{
							position: 'absolute',
							top: 550,
							right: -40,
							width: 210,
							background: '#FFFFFF',
							border: '1px solid #E5E7EB',
							borderRadius: 8,
							padding: 12,
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
							boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
							opacity: callout2Entry,
							transform: `scale(${callout2Scale}) translateX(${(1 - callout2Entry) * -20}px)`,
							zIndex: 20,
							boxSizing: 'border-box',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<span
								style={{
									fontSize: 12,
									fontWeight: 700,
									color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
								}}
							>
								Recovery status
							</span>
							<span
								style={{
									fontSize: 13,
									fontWeight: 800,
									color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
								}}
							>
								{Math.round(recoveryFillProgress)}%
							</span>
						</div>

						{/* Progress Bar inside Callout 2 */}
						{/* Specs: height: 8px; background: #E5E7EB; border-radius: 4px; overflow: hidden; Inner fill: background: #2E8661; width: 54%; */}
						<div
							style={{
								height: 8,
								background: '#E5E7EB',
								borderRadius: 4,
								overflow: 'hidden',
								width: '100%',
							}}
						>
							<div
								style={{
									height: '100%',
									background: '#2E8661',
									width: `${recoveryFillProgress}%`,
									borderRadius: 4,
								}}
							/>
						</div>

						<div
							style={{
								fontSize: 11,
								color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
								fontWeight: 500,
							}}
						>
							Moderate autonomic strain
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Brand Statement */}
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
				<span>Continuous autonomic telemetry</span>
				<span>•</span>
				<span>Evidence-based pacing</span>
				<span>•</span>
				<span>Objective daily capacity</span>
			</div>
		</AbsoluteFill>
	);
};
