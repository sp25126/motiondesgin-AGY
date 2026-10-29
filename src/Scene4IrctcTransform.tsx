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
import { StageBrowserFrame } from './components/StageBrowserFrame';

export const Scene4IrctcTransform: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── ACT I: PIN DROP WITH OVERSHOOT BOUNCE (Frame 35) ──
	const pinDropFrame = 35;

	// ── ACT II: BRIGHT CYAN (#00E5FF) SCANNER LINE SWEEP (Frames 80 - 200) ──
	const sweepStartFrame = 80;
	const sweepEndFrame = 195;

	const scannerProgress = interpolate(frame, [sweepStartFrame, sweepEndFrame], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.65, 0, 0.35, 1),
	});

	const isScannerActive = frame >= sweepStartFrame && frame <= sweepEndFrame + 12;
	const scannerOpacity = interpolate(
		frame,
		[sweepStartFrame, sweepStartFrame + 8, sweepEndFrame, sweepEndFrame + 12],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Banner ads fade to 0% opacity as the scanner sweeps
	const adOpacity = interpolate(
		frame,
		[sweepStartFrame + 15, sweepStartFrame + 75],
		[1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Reveal wipe percentage for modern card
	const clipPercent = scannerProgress * 100;

	// ── ACT III: ORGANIC INPUT SCALE (scale(1.05) settling back to 1 over 400ms) ──
	// 400ms at 60fps = 24 frames
	// Triggered at Frame 150 (when the scan passes the input fields)
	const organicScale = interpolate(
		frame,
		[145, 157, 169], // 24 frames total = 400ms
		[1.0, 1.05, 1.0], // EXACT SPEC: scale(1.05) settling back to 1 over 400ms
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.25, 1, 0.5, 1),
		}
	);

	// Subtle camera push into the pristine modern UI after transformation
	const cameraZoomProgress = interpolate(frame, [200, 280], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const cameraZoom = interpolate(cameraZoomProgress, [0, 1], [0.92, 0.98]);
	const cameraPanY = interpolate(cameraZoomProgress, [0, 1], [0, -18]);

	// Floating Result Metric Pill (Frames 220+)
	const metricSpring = spring({
		frame: frame - 220,
		fps,
		config: { stiffness: 180, damping: 16 },
	});
	const metricOpacity = interpolate(frame, [220, 235], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const metricY = interpolate(metricSpring, [0, 1], [25, 0]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#07090E', // Dark STAGE canvas
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* STAGE Precision Grid */}
			<div
				style={{
					position: 'absolute',
					inset: -80,
					backgroundImage: `
						radial-gradient(circle at 50% 45%, rgba(0, 102, 255, 0.16) 0%, transparent 65%),
						linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
					`,
					backgroundSize: '100% 100%, 48px 48px, 48px 48px',
					opacity: 0.9,
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
							irctc.co.in / Booking Widget Transformation
						</span>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 6,
							backgroundColor: 'rgba(0, 229, 255, 0.15)',
							border: '1px solid rgba(0, 229, 255, 0.35)',
							borderRadius: 20,
							padding: '4px 12px',
							fontSize: 11,
							color: '#00E5FF',
							fontWeight: 700,
						}}
					>
						<span
							style={{
								width: 6,
								height: 6,
								borderRadius: '50%',
								backgroundColor: '#00E5FF',
								boxShadow: '0 0 8px #00E5FF',
							}}
						/>
						Volumetric Sweep Active
					</div>
				</div>

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
					<div style={{ padding: '4px 10px', borderRadius: 6 }}>Inspect</div>
					<div
						style={{
							padding: '4px 10px',
							borderRadius: 6,
							backgroundColor: '#0066FF',
							color: '#FFF',
							fontWeight: 700,
						}}
					>
						Transform [T]
					</div>
				</div>
			</div>

			{/* ── CENTER STAGE BROWSER CHASSIS ── */}
			<div
				style={{
					position: 'relative',
					transform: `scale(${cameraZoom}) translateY(${cameraPanY}px)`,
					transformOrigin: 'center center',
					zIndex: 20,
				}}
			>
				<StageBrowserFrame
					url="https://irctc.co.in/eticket/train-search"
					shadowOpacity={1}
					isDocked={true}
				>
					{/* ── LAYER A: OLD CLUTTERED IRCTC UI (ADS FADING TO 0%) ── */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							zIndex: 10,
						}}
					>
						<StageTravelClutteredUi adOpacity={adOpacity} />
					</div>

					{/* ── LAYER B: REVEALED CLEAN MODERN CARD (WITH 1.05 ORGANIC SCALE & BORDER-RADIUS: 8PX) ── */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							zIndex: 20,
							clipPath: `polygon(0 0, 100% 0, 100% ${clipPercent}%, 0 ${clipPercent}%)`,
							transform: `scale(${organicScale})`,
							transformOrigin: 'center 60%',
						}}
					>
						<StageTravelModernUi />
					</div>

					{/* ── LAYER C: BRIGHT CYAN (#00E5FF) VOLUMETRIC SCANNER LINE ── */}
					<StageVolumetricScanner
						progress={scannerProgress}
						isActive={isScannerActive}
						opacity={scannerOpacity}
					/>

					{/* ── LAYER D: GLOWING BLUE STAGE PIN WITH OVERSHOOT BOUNCE ── */}
					<StageTravelPin
						targetX={430}
						targetY={465}
						dropStartFrame={pinDropFrame}
						authorName="Sarah Lin"
						authorRole="Principal Systems Architect"
						commentText="I drop a pin on the widget... transforming it into a clean, modern, high-contrast card with 8px rounded touch targets. Ads vanish."
						tagText="STAGE // TRANSFORM"
					/>
				</StageBrowserFrame>
			</div>

			{/* ── 3. BOTTOM SUCCESS METRIC PILL ── */}
			{frame >= 220 && (
				<div
					style={{
						position: 'absolute',
						bottom: 32,
						zIndex: 110,
						transform: `translateY(${metricY}px)`,
						opacity: metricOpacity,
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						backgroundColor: 'rgba(10, 15, 28, 0.88)',
						backdropFilter: 'blur(16px)',
						border: '1px solid rgba(0, 229, 255, 0.35)',
						boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.2)',
						padding: '10px 24px',
						borderRadius: 30,
						color: '#FFFFFF',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<span style={{ fontSize: 16 }}>✨</span>
						<span style={{ fontSize: 13, fontWeight: 700, color: '#00E5FF' }}>
							Modern Card Transform Complete
						</span>
					</div>
					<div style={{ width: 1, height: 16, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
					<div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12.5, color: 'rgba(255, 255, 255, 0.85)' }}>
						<span>🚫 100% Ads Vanished</span>
						<span>•</span>
						<span>📐 border-radius: 8px</span>
						<span>•</span>
						<span>⚡ 400ms Organic Settle (scale 1.05 &rarr; 1.0)</span>
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};
