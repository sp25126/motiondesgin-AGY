import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';
import { RedditAngryFeed } from './components/RedditAngryFeed';
import { StagePristineCanvas } from './components/StagePristineCanvas';

export const Scene2RedditToBlueprint: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── ACT I & II: 0.8s CURSOR SWEEP & ALPHA MATTE WIPE (Frames 80 - 128) ──
	// Exactly 0.8 seconds = 48 frames at 60 FPS
	const sweepStartFrame = 80;
	const sweepEndFrame = 128; // 80 + 48 = 128 frames (0.800 seconds)

	// Required Easing: cubic-bezier(0.7, 0, 0.3, 1)
	const sweepProgress = interpolate(frame, [sweepStartFrame, sweepEndFrame], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.7, 0, 0.3, 1),
	});

	const sweepPercent = sweepProgress * 100;
	const cursorX = interpolate(sweepProgress, [0, 1], [-80, 2000]);
	const cursorY = 540 + Math.sin(sweepProgress * Math.PI) * -90; // Natural organic dynamic arc
	const isSweepActive = frame >= sweepStartFrame && frame <= sweepEndFrame + 10;

	// Cursor entrance & exit opacity
	const cursorOpacity = interpolate(
		frame,
		[sweepStartFrame - 6, sweepStartFrame, sweepEndFrame, sweepEndFrame + 8],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);


	// Subtle camera push into the pristine canvas after wipe
	const cameraZoomProgress = interpolate(frame, [130, 240], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const cameraZoom = interpolate(cameraZoomProgress, [0, 1], [1.0, 1.04]);
	const cameraPanY = interpolate(cameraZoomProgress, [0, 1], [0, -10]);

	// Success pill entrance
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
				backgroundColor: '#07090E',
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* ── LAYER A: PRISTINE DARK-MODE STAGE CANVAS (UNDERNEATH) ── */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					zIndex: 10,
					transform: `scale(${cameraZoom}) translateY(${cameraPanY}px)`,
					transformOrigin: 'center center',
				}}
			>
				<StagePristineCanvas />
			</div>

			{/* ── LAYER B: BLURRY REDDIT FEED (ALPH MATTE ERASED BY CURSOR WIPE) ── */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					zIndex: 20,
					// The wipe reveals the canvas underneath by clipping the Reddit layer away
					clipPath: `polygon(${sweepPercent}% 0, 100% 0, 100% 100%, ${sweepPercent}% 100%)`,
				}}
			>
				<RedditAngryFeed />
			</div>

			{/* ── LAYER C: VOLUMETRIC CYAN LASER WIPE EDGE ── */}
			{isSweepActive && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: `${sweepPercent}%`,
						transform: 'translateX(-50%)',
						width: 4,
						backgroundColor: '#FFFFFF',
						boxShadow: `
							0 0 12px #FFFFFF,
							0 0 30px #00F0FF,
							0 0 70px #0066FF,
							0 0 120px rgba(0, 240, 255, 0.9)
						`,
						zIndex: 40,
						pointerEvents: 'none',
					}}
				>
					{/* Laser Head Flare Bead */}
					<div
						style={{
							position: 'absolute',
							top: `${(cursorY / 1080) * 100}%`,
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: 18,
							height: 140,
							borderRadius: '50%',
							backgroundColor: '#FFFFFF',
							boxShadow: '0 0 40px #00F0FF, 0 0 80px #0066FF',
							filter: 'blur(1.5px)',
						}}
					/>
					{/* Trailing Volumetric Light Ribbon */}
					<div
						style={{
							position: 'absolute',
							top: 0,
							bottom: 0,
							right: 0,
							width: 120,
							background: 'linear-gradient(to left, rgba(0, 240, 255, 0.4) 0%, rgba(0, 102, 255, 0.15) 50%, transparent 100%)',
							pointerEvents: 'none',
						}}
					/>
				</div>
			)}

			{/* ── LAYER D: SLEEK STAGE CURSOR ACTING AS ALPHA MATTE AGENT ── */}
			{cursorOpacity > 0 && (
				<div
					style={{
						position: 'absolute',
						left: cursorX,
						top: cursorY,
						transform: 'translate(-12px, -8px)',
						zIndex: 50,
						pointerEvents: 'none',
						opacity: cursorOpacity,
					}}
				>
					{/* Glowing Blue STAGE Precision Pointer SVG */}
					<svg width="44" height="44" viewBox="0 0 36 36" fill="none">
						<defs>
							<filter id="cursorNeonGlow">
								<feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00F0FF" floodOpacity="0.9" />
								<feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#0066FF" floodOpacity="0.7" />
							</filter>
						</defs>
						<path
							d="M 6,4 L 6,28 L 13,21 L 20,33 L 25,30 L 18,18 L 27,18 Z"
							fill="#0066FF"
							stroke="#FFFFFF"
							strokeWidth="2.5"
							strokeLinejoin="round"
							filter="url(#cursorNeonGlow)"
						/>
					</svg>

					{/* Cursor Author Tag */}
					<div
						style={{
							position: 'absolute',
							left: 28,
							top: 24,
							backgroundColor: '#0066FF',
							color: '#FFFFFF',
							fontFamily: '"JetBrains Mono", monospace',
							fontSize: 10,
							fontWeight: 800,
							padding: '3px 8px',
							borderRadius: 6,
							boxShadow: '0 0 16px rgba(0, 102, 255, 0.8), 0 4px 10px rgba(0,0,0,0.5)',
							border: '1px solid #38BDF8',
							whiteSpace: 'nowrap',
						}}
					>
						STAGE // WIPE
					</div>
				</div>
			)}

			{/* ── 3. BOTTOM SUCCESS METRIC PILL ── */}
			{frame >= 220 && (
				<div
					style={{
						position: 'absolute',
						bottom: 36,
						zIndex: 60,
						transform: `translateY(${metricY}px)`,
						opacity: metricOpacity,
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						backgroundColor: 'rgba(10, 15, 28, 0.88)',
						backdropFilter: 'blur(16px)',
						border: '1px solid rgba(0, 240, 255, 0.35)',
						boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 240, 255, 0.2)',
						padding: '10px 24px',
						borderRadius: 30,
						color: '#FFFFFF',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<span style={{ fontSize: 16 }}>⚡</span>
						<span style={{ fontSize: 13, fontWeight: 700, color: '#00F0FF' }}>
							0.8s Fast Whipping Transition
						</span>
					</div>
					<div style={{ width: 1, height: 16, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
					<div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12.5, color: 'rgba(255, 255, 255, 0.85)' }}>
						<span>🚫 Reddit Complaints Erased</span>
						<span>•</span>
						<span>📐 STAGE Proxy Canvas Active</span>
						<span>•</span>
						<span>🚀 3 Blueprints Ready</span>
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};
