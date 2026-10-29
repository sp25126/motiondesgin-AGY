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
import { StageBrowserFrame } from './components/StageBrowserFrame';

export const Scene3IrctcDocking: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── ACT I: AGGRESSIVE CAMERA PUSH-IN ON MESSY BOOKING WIDGET (Frames 0 - 110) ──
	const pushInProgress = interpolate(frame, [0, 85], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	// Push camera scale from 1.0 to 1.45x into the cluttered widget
	const pushZoom = interpolate(pushInProgress, [0, 1], [1.0, 1.45]);
	const pushPanX = interpolate(pushInProgress, [0, 1], [0, -35]);
	const pushPanY = interpolate(pushInProgress, [0, 1], [0, 50]);

	// Callout highlight boxes around cluttered ads & inputs (Frames 40 - 105)
	const calloutOpacity = interpolate(frame, [40, 55, 100, 112], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── ACT II: 10% PHYSICAL SHRINK & MECHANICAL DOCK INTO STAGE (Frames 110 - 180) ──
	// At "I'm loading this into STAGE" (Frame 115)
	const dockSpring = spring({
		frame: frame - 115,
		fps,
		config: { stiffness: 220, damping: 18, mass: 0.9 },
	});

	// Physical shrink: snaps from zoomed 1.45 down to 0.90 (10% smaller than 1.0 baseline)
	const currentScale = frame < 115
		? pushZoom
		: interpolate(dockSpring, [0, 1], [1.45, 0.90]);

	const currentPanX = frame < 115
		? pushPanX
		: interpolate(dockSpring, [0, 1], [pushPanX, 0]);

	const currentPanY = frame < 115
		? pushPanY
		: interpolate(dockSpring, [0, 1], [pushPanY, 0]);

	// STAGE Dark Canvas Background Fade-in on Dock (Frames 112 - 145)
	const canvasOpacity = interpolate(frame, [112, 140], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// EXACT SPEC: Soft drop shadow box-shadow: 0 20px 40px rgba(0,0,0,0.5) activates on dock
	const shadowActivation = interpolate(dockSpring, [0, 1], [0, 1]);

	// Mechanical click snap impact flash (Frames 138 - 152)
	const snapFlash = interpolate(frame, [138, 141, 152], [0, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Impact Camera Shake on mechanical click
	const shakeDecay = Math.max(0, 1 - (frame - 140) / 20);
	const shakeX = frame >= 140 && frame <= 160 ? Math.sin(frame * 3.4) * 8 * shakeDecay : 0;
	const shakeY = frame >= 140 && frame <= 160 ? Math.cos(frame * 2.8) * 6 * shakeDecay : 0;

	// Mechanical Docking Shockwave Ring
	const shockwaveProgress = interpolate(frame, [140, 175], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const shockwaveSize = interpolate(shockwaveProgress, [0, 1], [20, 1200]);
	const shockwaveOpacity = interpolate(shockwaveProgress, [0, 0.25, 1], [0, 0.85, 0]);

	// Floating micro-drift after docking
	const floatY = frame > 160 ? Math.sin((frame - 160) / 36) * 3 : 0;

	// Floating Result Metric Pill (Frames 180+)
	const metricSpring = spring({
		frame: frame - 180,
		fps,
		config: { stiffness: 180, damping: 16 },
	});
	const metricOpacity = interpolate(frame, [180, 195], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const metricY = interpolate(metricSpring, [0, 1], [25, 0]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#07090E', // Dark STAGE obsidian canvas
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* ── 1. STAGE BLUEPRINT GRID BACKGROUND (Fades in on dock) ── */}
			<div
				style={{
					position: 'absolute',
					inset: -80,
					backgroundImage: `
						radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.16) 0%, transparent 65%),
						linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
					`,
					backgroundSize: '100% 100%, 48px 48px, 48px 48px',
					opacity: canvasOpacity * 0.9,
				}}
			/>

			{/* STAGE Top Toolbar */}
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
					opacity: canvasOpacity,
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
							irctc.co.in [IMPORTED TO PROXY]
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
							padding: '4px 12px',
							fontSize: 11,
							color: '#60A5FA',
							fontWeight: 700,
						}}
					>
						<span
							style={{
								width: 6,
								height: 6,
								borderRadius: '50%',
								backgroundColor: '#00F0FF',
								boxShadow: '0 0 8px #00F0FF',
							}}
						/>
						Browser Docked
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
					<div style={{ padding: '4px 10px', borderRadius: 6 }}>Inspect [I]</div>
					<div
						style={{
							padding: '4px 10px',
							borderRadius: 6,
							backgroundColor: '#0066FF',
							color: '#FFF',
							fontWeight: 700,
						}}
					>
						Docked [D]
					</div>
					<div style={{ padding: '4px 10px', borderRadius: 6 }}>Pin [P]</div>
				</div>
			</div>

			{/* Mechanical Docking Shockwave Ring */}
			{shockwaveProgress > 0 && shockwaveProgress < 1 && (
				<div
					style={{
						position: 'absolute',
						width: shockwaveSize,
						height: shockwaveSize,
						borderRadius: '50%',
						border: '3px solid #00F0FF',
						boxShadow: '0 0 40px #00F0FF, inset 0 0 30px rgba(0, 240, 255, 0.5)',
						opacity: shockwaveOpacity,
						pointerEvents: 'none',
						zIndex: 80,
					}}
				/>
			)}

			{/* ── 2. CENTER TRANSFORM TARGET (AGGRESSIVE PUSH-IN -> 10% SHRINK DOCK) ── */}
			<div
				style={{
					position: 'relative',
					transform: `
						translate(${currentPanX + shakeX}px, ${currentPanY + shakeY + floatY}px)
						scale(${currentScale})
					`,
					transformOrigin: 'center center',
					zIndex: 20,
				}}
			>
				{/* When Docked into STAGE Browser Wrapper */}
				<StageBrowserFrame
					url="https://irctc.co.in/eticket/train-search"
					shadowOpacity={shadowActivation}
					snapFlash={snapFlash}
					isDocked={frame >= 135}
				>
					<StageTravelClutteredUi adOpacity={1} />
				</StageBrowserFrame>

				{/* ── HUD CALLOUT BRACKETS ON CLUTTER (DURING PUSH-IN) ── */}
				{calloutOpacity > 0 && (
					<>
						{/* Left Ad Callout */}
						<div
							style={{
								position: 'absolute',
								top: 290,
								left: 30,
								border: '2px dashed #EF4444',
								backgroundColor: 'rgba(239, 68, 68, 0.15)',
								borderRadius: 8,
								padding: '6px 12px',
								color: '#FFFFFF',
								fontFamily: '"JetBrains Mono", monospace',
								fontSize: 12,
								fontWeight: 800,
								opacity: calloutOpacity,
								boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
								zIndex: 60,
							}}
						>
							⚠️ NOISY SPONSORED BANNER AD
						</div>

						{/* Cramped Search Widget Callout */}
						<div
							style={{
								position: 'absolute',
								top: 310,
								left: 320,
								width: 580,
								height: 180,
								border: '2.5px solid #F59E0B',
								borderRadius: 12,
								backgroundColor: 'rgba(245, 158, 11, 0.12)',
								boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)',
								opacity: calloutOpacity,
								pointerEvents: 'none',
								zIndex: 60,
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: -28,
									left: 14,
									backgroundColor: '#F59E0B',
									color: '#000000',
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: 11,
									fontWeight: 900,
									padding: '3px 8px',
									borderRadius: 4,
								}}
							>
								⚠️ CRAMPED 34px MULTI-FIELD SEARCH
							</div>
						</div>
					</>
				)}
			</div>

			{/* ── 3. BOTTOM SUCCESS DOCK METRIC PILL ── */}
			{frame >= 180 && (
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
						border: '1px solid rgba(0, 240, 255, 0.35)',
						boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 240, 255, 0.2)',
						padding: '10px 24px',
						borderRadius: 30,
						color: '#FFFFFF',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<span style={{ fontSize: 16 }}>🔒</span>
						<span style={{ fontSize: 13, fontWeight: 700, color: '#00F0FF' }}>
							STAGE Docking Complete
						</span>
					</div>
					<div style={{ width: 1, height: 16, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
					<div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12.5, color: 'rgba(255, 255, 255, 0.85)' }}>
						<span>📐 10% Shrink Back &amp; Lock-in</span>
						<span>•</span>
						<span>🛡️ box-shadow: 0 20px 40px rgba(0,0,0,0.5)</span>
						<span>•</span>
						<span>⚡ Ready for STAGE Pin</span>
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};
