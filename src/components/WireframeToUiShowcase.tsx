import React from 'react';
import { interpolate, Easing } from 'remotion';
import { HEALTHY_SQUIRREL_THEME } from '../healthysquirrel/BrandTokens';

interface WireframeToUiShowcaseProps {
	frame: number;
	scannerX: number; // 0 to 1920 (in pixels)
	cardsFoldProgress: number; // 0 (flat) to 1 (folded backward)
}

export const WireframeToUiShowcase: React.FC<WireframeToUiShowcaseProps> = ({
	frame,
	scannerX,
	cardsFoldProgress,
}) => {
	// Floating drift for natural motion (0 to 480 frames)
	const float1 = Math.sin(frame / 45) * 4;
	const float2 = Math.cos(frame / 50) * 5;
	const float3 = Math.sin((frame + 30) / 48) * 4;

	// Progress bar fills trigger as the scanner sweeps across (scannerX from ~1200 to ~1650)
	// Frame 350 to 440
	const fuelFill = interpolate(frame, [360, 420], [0, 84], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const recoveryFill = interpolate(frame, [380, 440], [0, 92], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	// Fold backward transformation styles
	const foldRotateX = interpolate(cardsFoldProgress, [0, 1], [0, 38]);
	const foldTranslateZ = interpolate(cardsFoldProgress, [0, 1], [0, -180]);
	const foldTranslateY = interpolate(cardsFoldProgress, [0, 1], [0, 50]);
	const foldScale = interpolate(cardsFoldProgress, [0, 1], [1, 0.88]);
	const foldOpacity = interpolate(cardsFoldProgress, [0, 0.85, 1], [1, 0.4, 0]);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: 1200,
				opacity: foldOpacity,
				transformStyle: 'preserve-3d',
				pointerEvents: 'none',
			}}
		>
			{/* Grid Layout Container of 3 UI Cards */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 36,
					width: 1720,
					transform: `
						scale(${foldScale})
						rotateX(${foldRotateX}deg)
						translateZ(${foldTranslateZ}px)
						translateY(${foldTranslateY}px)
					`,
					transformStyle: 'preserve-3d',
				}}
			>
				{/* ══════════════════════════════════════════════════════════════════
				    CARD 1 (LEFT): Hero Outcome & Proof Card
				   ══════════════════════════════════════════════════════════════════ */}
				<div
					style={{
						flex: 1,
						maxWidth: 530,
						height: 580,
						position: 'relative',
						transform: `translateY(${float1}px)`,
						transformStyle: 'preserve-3d',
					}}
				>
					{/* ── Card 1: Minimalist Wireframe Layer (Visible to the right of scanner) ── */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundColor: 'rgba(255, 255, 255, 0.65)',
							border: '1.5px dashed #D1D5DB',
							borderRadius: 20,
							padding: 36,
							display: 'flex',
							flexDirection: 'column',
							gap: 20,
							boxSizing: 'border-box',
							clipPath: `inset(0 0 0 ${Math.max(0, scannerX - 100)}px)`,
						}}
					>
						{/* Wireframe Tag Skeleton */}
						<div
							style={{
								width: 110,
								height: 24,
								borderRadius: 9999,
								border: '1px dashed #D1D5DB',
								backgroundColor: '#F3F4F6',
							}}
						/>
						{/* Wireframe Headline Skeleton Bars */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
							<div style={{ width: '92%', height: 32, borderRadius: 6, backgroundColor: '#E5E7EB' }} />
							<div style={{ width: '75%', height: 32, borderRadius: 6, backgroundColor: '#E5E7EB' }} />
						</div>
						{/* Wireframe Subtext Skeleton */}
						<div style={{ width: '85%', height: 16, borderRadius: 4, backgroundColor: '#F3F4F6' }} />

						{/* Wireframe Proof Strip Skeleton */}
						<div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
							<div style={{ flex: 1, height: 50, border: '1px dashed #D1D5DB', borderRadius: 10, backgroundColor: '#F9FAFB' }} />
							<div style={{ flex: 1, height: 50, border: '1px dashed #D1D5DB', borderRadius: 10, backgroundColor: '#F9FAFB' }} />
							<div style={{ flex: 1, height: 50, border: '1px dashed #D1D5DB', borderRadius: 10, backgroundColor: '#F9FAFB' }} />
						</div>

						{/* Wireframe Action Button Skeleton */}
						<div
							style={{
								marginTop: 'auto',
								width: 220,
								height: 48,
								borderRadius: 9999,
								border: '1.5px dashed #9CA3AF',
								backgroundColor: 'transparent',
							}}
						/>
					</div>

					{/* ── Card 1: High-Fidelity Rendered Layer (Visible to the left of scanner) ── */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundColor: '#FFFFFF',
							border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
							borderRadius: 20,
							boxShadow: HEALTHY_SQUIRREL_THEME.shadows.card,
							padding: 36,
							display: 'flex',
							flexDirection: 'column',
							gap: 20,
							boxSizing: 'border-box',
							clipPath: `inset(0 ${Math.max(0, 1920 - scannerX - (1920 - 630))}px 0 0)`,
						}}
					>
						{/* High-Fidelity Tag */}
						<div
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 8,
								padding: '4px 12px',
								backgroundColor: '#F3F4F6',
								borderRadius: 9999,
								border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
								alignSelf: 'flex-start',
							}}
						>
							<span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen }} />
							<span style={{ fontSize: 12, fontWeight: 700, color: HEALTHY_SQUIRREL_THEME.colors.textSecondary, letterSpacing: '0.04em' }}>
								CLINICAL PROGRESSION
							</span>
						</div>

						{/* High-Fidelity Headline */}
						<h3
							style={{
								fontSize: 30,
								fontWeight: 800,
								color: HEALTHY_SQUIRREL_THEME.colors.textPrimary,
								margin: 0,
								letterSpacing: '-0.02em',
								lineHeight: 1.2,
							}}
						>
							Stop guessing what your training is missing.
						</h3>

						<p style={{ fontSize: 14, color: HEALTHY_SQUIRREL_THEME.colors.textSecondary, margin: 0, lineHeight: 1.5 }}>
							Targeted endurance, power benchmarks and metabolic capacity calibrated daily.
						</p>

						{/* Proof Strip */}
						<div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
							{[
								{ num: '394', lbl: 'Active SKUs' },
								{ num: '99.4%', lbl: 'Accuracy' },
								{ num: '6-Day', lbl: 'Delivery' },
							].map((item, i) => (
								<div
									key={i}
									style={{
										flex: 1,
										padding: '12px 14px',
										backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
										borderRadius: 12,
										border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
									}}
								>
									<div style={{ fontSize: 18, fontWeight: 800, color: HEALTHY_SQUIRREL_THEME.colors.textPrimary }}>
										{item.num}
									</div>
									<div style={{ fontSize: 11, fontWeight: 600, color: HEALTHY_SQUIRREL_THEME.colors.textSecondary }}>
										{item.lbl}
									</div>
								</div>
							))}
						</div>

						{/* Primary Action Button */}
						<div style={{ marginTop: 'auto' }}>
							<button
								style={{
									backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
									color: '#FFFFFF',
									padding: '13px 26px',
									borderRadius: 9999,
									fontWeight: 600,
									fontSize: 14,
									border: 'none',
									cursor: 'pointer',
									display: 'inline-flex',
									alignItems: 'center',
									gap: 8,
									boxShadow: '0 2px 4px rgba(46, 134, 97, 0.25)',
								}}
							>
								<span>Start baseline plan</span>
								<svg width="16" height="16" viewBox="0 0 20 20" fill="none">
									<path d="M4.167 10h11.666m-5-5l5 5-5 5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* ══════════════════════════════════════════════════════════════════
				    CARD 2 (CENTER): Three-Tier Safety Verification Pipeline
				   ══════════════════════════════════════════════════════════════════ */}
				<div
					style={{
						flex: 1,
						maxWidth: 530,
						height: 580,
						position: 'relative',
						transform: `translateY(${float2}px)`,
						transformStyle: 'preserve-3d',
					}}
				>
					{/* ── Card 2: Minimalist Wireframe Layer ── */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundColor: 'rgba(255, 255, 255, 0.65)',
							border: '1.5px dashed #D1D5DB',
							borderRadius: 20,
							padding: 36,
							display: 'flex',
							flexDirection: 'column',
							gap: 24,
							boxSizing: 'border-box',
							clipPath: `inset(0 0 0 ${Math.max(0, scannerX - 600)}px)`,
						}}
					>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
							<div style={{ width: 140, height: 22, borderRadius: 9999, backgroundColor: '#F3F4F6', border: '1px dashed #D1D5DB' }} />
							<div style={{ width: '85%', height: 28, borderRadius: 6, backgroundColor: '#E5E7EB' }} />
						</div>

						{/* 3 Wireframe Rows */}
						{[1, 2, 3].map((r) => (
							<div key={r} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
								<div style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px dashed #D1D5DB', backgroundColor: '#F9FAFB' }} />
								<div style={{ flex: 1, height: 60, borderRadius: 12, border: '1px dashed #D1D5DB', backgroundColor: '#F9FAFB' }} />
							</div>
						))}

						<div style={{ marginTop: 'auto', width: 180, height: 44, borderRadius: 9999, border: '1.5px dashed #9CA3AF' }} />
					</div>

					{/* ── Card 2: High-Fidelity Rendered Layer ── */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundColor: '#FFFFFF',
							border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
							borderRadius: 20,
							boxShadow: HEALTHY_SQUIRREL_THEME.shadows.card,
							padding: 36,
							display: 'flex',
							flexDirection: 'column',
							gap: 24,
							boxSizing: 'border-box',
							clipPath: `inset(0 ${Math.max(0, 1920 - scannerX - (1920 - 1160))}px 0 0)`,
						}}
					>
						<div>
							<span style={{ fontSize: 12, fontWeight: 700, color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
								TRI-LAYER ARCHITECTURE
							</span>
							<h3 style={{ fontSize: 24, fontWeight: 800, color: HEALTHY_SQUIRREL_THEME.colors.textPrimary, margin: '6px 0 0 0' }}>
								Three continuous safety checkpoints.
							</h3>
						</div>

						{/* 3 High-Fidelity Rows */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', paddingLeft: 24 }}>
							{/* Connecting Green Line */}
							<div style={{ position: 'absolute', left: 9, top: 12, bottom: 12, width: 2, backgroundColor: '#2E8661' }} />

							{[
								{ title: 'Athlete Baseline', desc: 'HR zones & neuromuscular thresholds', icon: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
								{ title: 'Coach Calibration', desc: 'Adjusted to recovery & sleep scores', icon: 'M10 5a5 5 0 0 0-5 5v1a5 5 0 0 0 10 0v-1a5 5 0 0 0-5-5z M15 11h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-7' },
								{ title: 'Injury Guard Lock', desc: 'Strict soft-tissue fatigue protection', icon: 'M7 11V7a5 5 0 0 1 10 0v4 M3 11h18v11H3z' },
							].map((row, idx) => (
								<div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
									<div
										style={{
											width: 20,
											height: 20,
											minWidth: 20,
											marginLeft: -24,
											backgroundColor: '#FFFFFF',
											border: '2px solid #2E8661',
											borderRadius: '50%',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											zIndex: 10,
										}}
									>
										<div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#2E8661' }} />
									</div>

									<div
										style={{
											flex: 1,
											padding: '12px 16px',
											backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
											borderRadius: 12,
											border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<div>
											<div style={{ fontSize: 14, fontWeight: 700, color: HEALTHY_SQUIRREL_THEME.colors.textPrimary }}>
												{row.title}
											</div>
											<div style={{ fontSize: 11, color: HEALTHY_SQUIRREL_THEME.colors.textSecondary }}>
												{row.desc}
											</div>
										</div>
										<span style={{ fontSize: 11, fontWeight: 700, color: '#2E8661', backgroundColor: '#F0FDF4', padding: '2px 8px', borderRadius: 9999 }}>
											SAFE
										</span>
									</div>
								</div>
							))}
						</div>

						<div style={{ marginTop: 'auto' }}>
							<span style={{ fontSize: 12, fontWeight: 600, color: HEALTHY_SQUIRREL_THEME.colors.textSecondary }}>
								Zero burnout guarantee • 100% verified
							</span>
						</div>
					</div>
				</div>

				{/* ══════════════════════════════════════════════════════════════════
				    CARD 3 (RIGHT): Live Fuel & Recovery Metrics Card
				   ══════════════════════════════════════════════════════════════════ */}
				<div
					style={{
						flex: 1,
						maxWidth: 530,
						height: 580,
						position: 'relative',
						transform: `translateY(${float3}px)`,
						transformStyle: 'preserve-3d',
					}}
				>
					{/* ── Card 3: Minimalist Wireframe Layer ── */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundColor: 'rgba(255, 255, 255, 0.65)',
							border: '1.5px dashed #D1D5DB',
							borderRadius: 20,
							padding: 36,
							display: 'flex',
							flexDirection: 'column',
							gap: 20,
							boxSizing: 'border-box',
							clipPath: `inset(0 0 0 ${Math.max(0, scannerX - 1100)}px)`,
						}}
					>
						{/* Score Placeholder */}
						<div style={{ height: 90, borderRadius: 14, border: '1px dashed #D1D5DB', backgroundColor: '#F9FAFB' }} />

						{/* Wireframe Progress Bar 1 */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div style={{ width: 100, height: 16, backgroundColor: '#E5E7EB', borderRadius: 4 }} />
								<div style={{ width: 36, height: 16, backgroundColor: '#E5E7EB', borderRadius: 4 }} />
							</div>
							<div style={{ height: 8, borderRadius: 4, backgroundColor: '#E5E7EB' }} />
						</div>

						{/* Wireframe Progress Bar 2 */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div style={{ width: 120, height: 16, backgroundColor: '#E5E7EB', borderRadius: 4 }} />
								<div style={{ width: 36, height: 16, backgroundColor: '#E5E7EB', borderRadius: 4 }} />
							</div>
							<div style={{ height: 8, borderRadius: 4, backgroundColor: '#E5E7EB' }} />
						</div>

						<div style={{ marginTop: 'auto', height: 48, borderRadius: 9999, border: '1.5px dashed #9CA3AF' }} />
					</div>

					{/* ── Card 3: High-Fidelity Rendered Layer ── */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundColor: '#FFFFFF',
							border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
							borderRadius: 20,
							boxShadow: HEALTHY_SQUIRREL_THEME.shadows.card,
							padding: 36,
							display: 'flex',
							flexDirection: 'column',
							gap: 20,
							boxSizing: 'border-box',
							clipPath: `inset(0 ${Math.max(0, 1920 - scannerX - (1920 - 1720))}px 0 0)`,
						}}
					>
						{/* Capacity Score Card */}
						<div
							style={{
								padding: '18px 22px',
								backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background,
								borderRadius: 14,
								border: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<div>
								<div style={{ fontSize: 36, fontWeight: 900, color: HEALTHY_SQUIRREL_THEME.colors.textPrimary, lineHeight: 1 }}>
									88
								</div>
								<div style={{ fontSize: 13, color: HEALTHY_SQUIRREL_THEME.colors.textSecondary, marginTop: 4, fontWeight: 500 }}>
									Daily Performance Index
								</div>
							</div>
							<div
								style={{
									width: 38,
									height: 38,
									borderRadius: '50%',
									border: `3px solid ${HEALTHY_SQUIRREL_THEME.colors.primaryGreen}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
									fontWeight: 800,
									fontSize: 16,
								}}
							>
								✓
							</div>
						</div>

						{/* Progress Bar 1: Glycogen & Fuel Storage */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
								<span style={{ color: HEALTHY_SQUIRREL_THEME.colors.textPrimary }}>Glycogen & Fuel Storage</span>
								<span style={{ color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen, fontWeight: 700 }}>{Math.round(fuelFill)}%</span>
							</div>
							<div style={{ height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
								<div style={{ width: `${fuelFill}%`, height: '100%', backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen }} />
							</div>
						</div>

						{/* Progress Bar 2: Autonomic Nervous Recovery */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
								<span style={{ color: HEALTHY_SQUIRREL_THEME.colors.textPrimary }}>Autonomic Recovery</span>
								<span style={{ color: HEALTHY_SQUIRREL_THEME.colors.primaryGreen, fontWeight: 700 }}>{Math.round(recoveryFill)}%</span>
							</div>
							<div style={{ height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
								<div style={{ width: `${recoveryFill}%`, height: '100%', backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen }} />
							</div>
						</div>

						{/* Mobile Sticky CTA Trigger Button */}
						<div style={{ marginTop: 'auto' }}>
							<div
								style={{
									width: '100%',
									height: 48,
									borderRadius: 9999,
									backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
									color: '#FFFFFF',
									fontWeight: 600,
									fontSize: 15,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 2px 4px rgba(46, 134, 97, 0.2)',
								}}
							>
								Start verified session
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
