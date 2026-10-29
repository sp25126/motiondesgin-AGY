import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';
import { StageTravelClutteredUi } from './components/StageTravelClutteredUi';
import { StageTravelModernUi } from './components/StageTravelModernUi';
import { StageTravelPin } from './components/StageTravelPin';
import { StageVolumetricScanner } from './components/StageVolumetricScanner';

export const StageTravelRedesign: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── ACT I: CANVAS ENTRANCE (Frames 0 - 50) ──
	const canvasEntranceSpring = spring({
		frame,
		fps,
		config: { stiffness: 120, damping: 18 },
	});
	const canvasScale = interpolate(canvasEntranceSpring, [0, 1], [0.94, 1.0]);
	const canvasOpacity = interpolate(frame, [0, 24], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Subtle organic camera breathing
	const cameraFloat = Math.sin(frame / 45) * 4;

	// Camera Zoom-in during Act IV (Frames 320 - 420)
	const zoomProgress = interpolate(frame, [320, 390], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const cameraZoom = interpolate(zoomProgress, [0, 1], [1.0, 1.05]);
	const cameraPanY = interpolate(zoomProgress, [0, 1], [0, -25]);

	// ── ACT II: STAGE PIN DROP (Starts at Frame 60) ──
	const pinDropStartFrame = 60;

	// ── ACT III: VOLUMETRIC CYAN SCANNER SWEEP (Frames 160 - 320) ──
	const sweepStartFrame = 160;
	const sweepEndFrame = 310;
	const scannerProgress = interpolate(frame, [sweepStartFrame, sweepEndFrame], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.65, 0, 0.35, 1),
	});

	const isScannerActive = frame >= sweepStartFrame && frame <= sweepEndFrame + 15;
	const scannerOpacity = interpolate(
		frame,
		[sweepStartFrame, sweepStartFrame + 12, sweepEndFrame, sweepEndFrame + 15],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Ad Dissolve Opacity (Fades out as scanner sweeps)
	const adOpacity = interpolate(
		frame,
		[sweepStartFrame + 20, sweepStartFrame + 100],
		[1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Modern UI Clip Path percentage (Wipes down from top to bottom)
	const clipBottomPercent = interpolate(scannerProgress, [0, 1], [0, 100]);

	// ── ACT IV: SUCCESS METRIC PILL (Frames 340 - 480) ──
	const metricSpring = spring({
		frame: frame - 340,
		fps,
		config: { stiffness: 180, damping: 16 },
	});
	const metricOpacity = interpolate(frame, [340, 355], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const metricY = interpolate(metricSpring, [0, 1], [30, 0]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#07090E', // Sleek dark-mode STAGE obsidian canvas
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* ── 1. STAGE BLUEPRINT GRID BACKGROUND ── */}
			<div
				style={{
					position: 'absolute',
					inset: -80,
					backgroundImage: `
						radial-gradient(circle at 50% 40%, rgba(0, 102, 255, 0.12) 0%, transparent 65%),
						linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
					`,
					backgroundSize: '100% 100%, 48px 48px, 48px 48px',
					opacity: 0.85,
				}}
			/>

			{/* STAGE Top App Bar */}
			<div
				style={{
					position: 'absolute',
					top: 24,
					left: 48,
					right: 48,
					height: 48,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					zIndex: 100,
					color: '#FFFFFF',
				}}
			>
				{/* Left: STAGE Logo & Breadcrumbs */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							backgroundColor: 'rgba(255, 255, 255, 0.08)',
							border: '1px solid rgba(255, 255, 255, 0.12)',
							borderRadius: 10,
							padding: '6px 14px',
							backdropFilter: 'blur(8px)',
						}}
					>
						<div
							style={{
								width: 20,
								height: 20,
								borderRadius: '50% 50% 50% 2px',
								transform: 'rotate(-45deg)',
								backgroundColor: '#0066FF',
								boxShadow: '0 0 10px #0066FF',
							}}
						/>
						<span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', color: '#FFFFFF' }}>
							STAGE
						</span>
						<span style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 12 }}>/</span>
						<span style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
							irctc.co.in / Train Search Redesign
						</span>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 6,
							backgroundColor: 'rgba(0, 102, 255, 0.15)',
							border: '1px solid rgba(0, 102, 255, 0.3)',
							borderRadius: 20,
							padding: '4px 10px',
							fontSize: 11,
							color: '#60A5FA',
							fontWeight: 600,
						}}
					>
						<span
							style={{
								width: 6,
								height: 6,
								borderRadius: '50%',
								backgroundColor: '#00F0FF',
								boxShadow: '0 0 6px #00F0FF',
							}}
						/>
						Live Review
					</div>
				</div>

				{/* Center Canvas Tools */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 6,
						backgroundColor: 'rgba(255, 255, 255, 0.06)',
						border: '1px solid rgba(255, 255, 255, 0.1)',
						borderRadius: 10,
						padding: '4px 8px',
						backdropFilter: 'blur(8px)',
						fontSize: 12,
						color: 'rgba(255, 255, 255, 0.8)',
					}}
				>
					<div style={{ padding: '4px 10px', borderRadius: 6, backgroundColor: 'transparent' }}>Pointer</div>
					<div
						style={{
							padding: '4px 10px',
							borderRadius: 6,
							backgroundColor: '#0066FF',
							color: '#FFF',
							fontWeight: 700,
							boxShadow: '0 0 10px rgba(0,102,255,0.5)',
						}}
					>
						Pin [P]
					</div>
					<div style={{ padding: '4px 10px', borderRadius: 6, backgroundColor: 'transparent' }}>Comment</div>
					<div style={{ padding: '4px 10px', borderRadius: 6, backgroundColor: 'transparent' }}>Wipe [W]</div>
				</div>

				{/* Right: Presence & Zoom */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: -6 }}>
						<div
							style={{
								width: 28,
								height: 28,
								borderRadius: '50%',
								backgroundColor: '#0066FF',
								border: '2px solid #07090E',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 11,
								fontWeight: 700,
								color: '#FFF',
							}}
						>
							SL
						</div>
						<div
							style={{
								width: 28,
								height: 28,
								borderRadius: '50%',
								backgroundColor: '#10B981',
								border: '2px solid #07090E',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 11,
								fontWeight: 700,
								color: '#FFF',
								marginLeft: -8,
							}}
						>
							AI
						</div>
					</div>
					<div
						style={{
							fontSize: 12,
							color: 'rgba(255, 255, 255, 0.6)',
							fontWeight: 600,
							backgroundColor: 'rgba(255, 255, 255, 0.05)',
							padding: '4px 8px',
							borderRadius: 6,
						}}
					>
						100%
					</div>
				</div>
			</div>

			{/* ── 2. MAIN TRAVEL ARTBOARD CANVAS ── */}
			<div
				style={{
					width: 1480,
					height: 800,
					borderRadius: 22,
					backgroundColor: '#000000',
					boxShadow: `
						0 30px 90px -15px rgba(0, 0, 0, 0.9),
						0 0 0 1px rgba(255, 255, 255, 0.1),
						0 0 40px rgba(0, 102, 255, 0.15)
					`,
					overflow: 'hidden',
					position: 'relative',
					transform: `scale(${canvasScale * cameraZoom}) translateY(${cameraFloat + cameraPanY}px)`,
					opacity: canvasOpacity,
					transformOrigin: 'center center',
				}}
			>
				{/* ── LAYER A: BEFORE CLUTTERED UI (IRCTC STYLE) ── */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						zIndex: 10,
					}}
				>
					<StageTravelClutteredUi adOpacity={adOpacity} />
				</div>

				{/* ── LAYER B: AFTER MODERN UI (REVEALED BY SCANNER CLIP PATH) ── */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						zIndex: 20,
						clipPath: `polygon(0 0, 100% 0, 100% ${clipBottomPercent}%, 0 ${clipBottomPercent}%)`,
					}}
				>
					<StageTravelModernUi />
				</div>

				{/* ── LAYER C: VOLUMETRIC CYAN SCANNER LASER BEAM ── */}
				<StageVolumetricScanner
					progress={scannerProgress}
					isActive={isScannerActive}
					opacity={scannerOpacity}
				/>

				{/* ── LAYER D: GLOWING BLUE STAGE PIN & FROSTED GLASS TOOLTIP ── */}
				<StageTravelPin
					targetX={440}
					targetY={460}
					dropStartFrame={pinDropStartFrame}
					authorName="Sarah Lin"
					authorRole="Design Systems Lead"
					commentText="Search container has cramped 32px inputs & noisy banner ads. Transforming into high-contrast 56px touch inputs with zero ad clutter."
					tagText="STAGE // REDESIGN"
				/>
			</div>

			{/* ── 3. BOTTOM SUCCESS METRIC PILL (POST SCANNER) ── */}
			{frame >= 340 && (
				<div
					style={{
						position: 'absolute',
						bottom: 36,
						zIndex: 110,
						transform: `translateY(${metricY}px)`,
						opacity: metricOpacity,
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						backgroundColor: 'rgba(10, 15, 28, 0.85)',
						backdropFilter: 'blur(16px)',
						border: '1px solid rgba(0, 240, 255, 0.3)',
						boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 240, 255, 0.2)',
						padding: '10px 24px',
						borderRadius: 30,
						color: '#FFFFFF',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<span style={{ fontSize: 16 }}>✨</span>
						<span style={{ fontSize: 13, fontWeight: 700, color: '#00F0FF' }}>
							STAGE Transformation Complete
						</span>
					</div>
					<div style={{ width: 1, height: 16, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
					<div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12.5, color: 'rgba(255, 255, 255, 0.85)' }}>
						<span>🚫 100% Ads Removed</span>
						<span>•</span>
						<span>📐 56px Touch Targets</span>
						<span>•</span>
						<span>⚡ Real-Time Seat Availability</span>
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};
