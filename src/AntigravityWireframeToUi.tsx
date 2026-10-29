import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	staticFile,
	Audio,
	Easing,
} from 'remotion';
import { HEALTHY_SQUIRREL_THEME } from './healthysquirrel/BrandTokens';
import { WireframeToUiShowcase } from './components/WireframeToUiShowcase';
import { AntigravityGeneratedOutro } from './components/AntigravityGeneratedOutro';

export const AntigravityWireframeToUi: React.FC = () => {
	const frame = useCurrentFrame();

	// ── ACT I: WIREFRAMES FLOATING GENTLY (Frames 0 - 240) ──
	const initialEntrance = interpolate(frame, [0, 45], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	// ── ACT II: SOLID GREEN SCANNER LINE SWEEP (Frames 240 - 480) ──
	// Sweeps horizontally across the screen from x = -40px to x = 1960px
	const scannerProgress = interpolate(frame, [240, 470], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.linear,
	});
	const scannerX = interpolate(scannerProgress, [0, 1], [-40, 1960]);
	const isScannerActive = frame >= 240 && frame <= 475;

	// Scanner line visual opacity
	const scannerOpacity = interpolate(frame, [240, 248, 465, 475], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Subtle mechanical snap visual flashes when cards lock in
	const snapFlash1 = interpolate(frame, [285, 290, 305], [0, 0.25, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const snapFlash2 = interpolate(frame, [355, 360, 375], [0, 0.25, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const snapFlash3 = interpolate(frame, [425, 430, 445], [0, 0.25, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const totalFlash = Math.max(snapFlash1, snapFlash2, snapFlash3);

	// ── ACT III: POLISHED UI CARDS FOLD BACKWARD (Frames 480 - 540) ──
	const cardsFoldProgress = interpolate(frame, [480, 540], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.2, 0.0, 0.1, 1),
	});

	// Studio ambient diffuse lighting vignette
	const studioVignetteOpacity = interpolate(frame, [480, 550], [0.4, 0.8], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: HEALTHY_SQUIRREL_THEME.colors.background, // Warm off-white #F9FAFB
				fontFamily: HEALTHY_SQUIRREL_THEME.typography.fontFamily,
				overflow: 'hidden',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* Soft Diffuse Studio Lighting Background Gradient */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `
						radial-gradient(ellipse 90% 70% at 50% 35%, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.4) 60%, rgba(243, 244, 246, 0.9) 100%)
					`,
					pointerEvents: 'none',
				}}
			/>

			{/* Soft Studio Vignette */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.02) 100%)',
					opacity: studioVignetteOpacity,
					pointerEvents: 'none',
				}}
			/>

			{/* Top Brand Context Header */}
			<div
				style={{
					position: 'absolute',
					top: 48,
					left: 56,
					right: 56,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingBottom: 20,
					borderBottom: `1px solid ${HEALTHY_SQUIRREL_THEME.colors.border}`,
					zIndex: 30,
					opacity: interpolate(frame, [480, 520], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
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
						AG
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
							Antigravity Motion Engine
						</div>
						<div
							style={{
								fontSize: 13,
								fontWeight: 500,
								color: HEALTHY_SQUIRREL_THEME.colors.textSecondary,
							}}
						>
							{frame < 240
								? 'Minimalist UI wireframes · Floating preview'
								: frame < 480
								? 'Scanner transform · Instant DOM render'
								: 'Generated 100% by Antigravity AI'}
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
					{frame < 240 ? 'Phase 1: Wireframe' : frame < 480 ? 'Phase 2: Solid Scan' : 'Phase 3: Automated'}
				</div>
			</div>

			{/* ── ACT I & II: FLOATING WIREFRAMES & SCANNER WIPE SHOWCASE ── */}
			<div style={{ opacity: initialEntrance, width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
				<WireframeToUiShowcase
					frame={frame}
					scannerX={scannerX}
					cardsFoldProgress={cardsFoldProgress}
				/>
			</div>

			{/* ── ACT II: CRISP SOLID GREEN SCANNER LINE (#2E8661) ── */}
			{isScannerActive && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: scannerX,
						width: 3,
						backgroundColor: HEALTHY_SQUIRREL_THEME.colors.primaryGreen,
						boxShadow: `
							0 0 16px rgba(46, 134, 97, 0.75),
							0 0 45px rgba(46, 134, 97, 0.35)
						`,
						opacity: scannerOpacity,
						zIndex: 50,
						pointerEvents: 'none',
					}}
				>
					{/* Top Emitter Beacon */}
					<div
						style={{
							position: 'absolute',
							top: 140,
							left: '50%',
							transform: 'translateX(-50%)',
							width: 9,
							height: 9,
							borderRadius: '50%',
							backgroundColor: '#FFFFFF',
							border: '2px solid #2E8661',
							boxShadow: '0 0 12px #2E8661',
						}}
					/>
					{/* Bottom Emitter Beacon */}
					<div
						style={{
							position: 'absolute',
							bottom: 140,
							left: '50%',
							transform: 'translateX(-50%)',
							width: 9,
							height: 9,
							borderRadius: '50%',
							backgroundColor: '#FFFFFF',
							border: '2px solid #2E8661',
							boxShadow: '0 0 12px #2E8661',
						}}
					/>
				</div>
			)}

			{/* Mechanical Snap Visual Pulse */}
			{totalFlash > 0 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundColor: '#FFFFFF',
						opacity: totalFlash,
						pointerEvents: 'none',
						zIndex: 55,
					}}
				/>
			)}

			{/* ── ACT III: FOLD BACKWARD & MORPH INTO "GENERATED 100% BY ANTIGRAVITY AI" ── */}
			{frame >= 485 && (
				<AntigravityGeneratedOutro frame={frame} />
			)}

			{/* ── AUDIO: Crisp Mechanical Click-and-Lock Sound Effects ── */}
			{/* Triggered exactly when the scanner line transforms the wireframes */}
			{frame >= 285 && frame < 320 && (
				<Audio src={staticFile('click_lock.wav')} volume={0.8} />
			)}
			{frame >= 355 && frame < 390 && (
				<Audio src={staticFile('click_lock.wav')} volume={0.8} />
			)}
			{frame >= 425 && frame < 460 && (
				<Audio src={staticFile('click_lock.wav')} volume={0.85} />
			)}
		</AbsoluteFill>
	);
};
