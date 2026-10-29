import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';
import { IndiaCodeMap } from './components/IndiaCodeMap';
import { ChromaticGlitchText } from './components/ChromaticGlitchText';

export const Scene1ScaleDisclaimer: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── ACT I: MAP SCALE UP & SUDDEN MOTION BLUR WIPE (Frames 0 - 245) ──
	const isMapActive = frame < 250;
	
	// Sharp motion blur wipe snap at Frame 238 to 248
	const mapWipeProgress = interpolate(frame, [238, 248], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.8, 0, 0.2, 1),
	});
	const mapOpacity = interpolate(mapWipeProgress, [0, 0.8, 1], [1, 0.3, 0]);
	const mapMotionBlurScale = interpolate(mapWipeProgress, [0, 1], [1, 2.8]);
	const mapBlurPx = interpolate(mapWipeProgress, [0, 1], [0, 24]);

	// Strobe Flash on Impact (Frame 245)
	const strobeFlash = interpolate(frame, [244, 246, 258], [0, 0.9, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Camera Shake on Typography Slam
	const shakeDecay = Math.max(0, 1 - (frame - 246) / 25);
	const shakeX = frame >= 246 && frame <= 270 ? Math.sin(frame * 3.2) * 14 * shakeDecay : 0;
	const shakeY = frame >= 246 && frame <= 270 ? Math.cos(frame * 2.8) * 10 * shakeDecay : 0;

	// ── ACT II: KINETIC TYPOGRAPHY PUNCH (Aggressive 300% down to 100%) ──
	
	// "NOT CRITICIZING." (Frames 245 - 315)
	const notCritSpring = spring({
		frame: frame - 246,
		fps,
		config: { stiffness: 320, damping: 14, mass: 0.8 },
	});
	const notCritScale = interpolate(notCritSpring, [0, 1], [3.0, 1.0]);
	const notCritOpacity = interpolate(frame, [245, 248, 308, 314], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// "HELPING." (Frames 315 - 410)
	const helpingSpring = spring({
		frame: frame - 315,
		fps,
		config: { stiffness: 320, damping: 14, mass: 0.8 },
	});
	const helpingScale = interpolate(helpingSpring, [0, 1], [3.0, 1.0]);
	const helpingOpacity = interpolate(frame, [314, 318, 405, 412], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Shockwave ring on "HELPING" slam
	const helpingShockwave = interpolate(frame, [315, 350], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const helpingShockSize = interpolate(helpingShockwave, [0, 1], [20, 900]);
	const helpingShockOpacity = interpolate(helpingShockwave, [0, 0.2, 1], [0, 0.8, 0]);

	// ── ACT III: "HEAVY LIFTING UNDER MASSIVE CONSTRAINTS" (Frames 412 - 600) ──
	const constraintsEntrance = interpolate(frame, [412, 435], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const constraintsScale = interpolate(constraintsEntrance, [0, 1], [0.85, 1.0]);
	const constraintsOpacity = interpolate(constraintsEntrance, [0, 1], [0, 1]);

	// Glitch Intensity on "CONSTRAINTS" (15% Chromatic aberration)
	const glitchIntensity = frame >= 425 ? 0.15 : 0;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0A0D14', // Pitch-black void
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* Precision Blueprint Grid */}
			<div
				style={{
					position: 'absolute',
					inset: -80,
					backgroundImage: `
						radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.1) 0%, transparent 70%),
						linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
					`,
					backgroundSize: '100% 100%, 54px 54px, 54px 54px',
					opacity: 0.75,
				}}
			/>

			{/* Strobe Flash Plane */}
			{strobeFlash > 0 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundColor: '#FFFFFF',
						opacity: strobeFlash,
						zIndex: 90,
						pointerEvents: 'none',
					}}
				/>
			)}

			{/* ── 1. ACT I: 3D GLOWING MAP OF INDIA COMPOSED OF CODE ── */}
			{isMapActive && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: mapOpacity,
						transform: `scale(${mapMotionBlurScale})`,
						filter: mapBlurPx > 0 ? `blur(${mapBlurPx}px)` : 'none',
					}}
				>
					<IndiaCodeMap />
				</div>
			)}

			{/* ── 2. ACT II: KINETIC TYPOGRAPHY PUNCH (NOT CRITICIZING. -> HELPING.) ── */}
			
			{/* Shockwave for "HELPING" */}
			{helpingShockwave > 0 && helpingShockwave < 1 && (
				<div
					style={{
						position: 'absolute',
						width: helpingShockSize,
						height: helpingShockSize,
						borderRadius: '50%',
						border: '3px solid #00F0FF',
						boxShadow: '0 0 40px #00F0FF, inset 0 0 30px rgba(0, 240, 255, 0.5)',
						opacity: helpingShockOpacity,
						pointerEvents: 'none',
						zIndex: 30,
					}}
				/>
			)}

			{/* "NOT CRITICIZING." */}
			{frame >= 245 && frame <= 315 && (
				<div
					style={{
						position: 'absolute',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `translate(${shakeX}px, ${shakeY}px) scale(${notCritScale})`,
						opacity: notCritOpacity,
						zIndex: 40,
					}}
				>
					<div
						style={{
							fontSize: 18,
							fontWeight: 800,
							letterSpacing: '0.25em',
							color: '#F43F5E',
							textTransform: 'uppercase',
							marginBottom: 8,
							fontFamily: '"JetBrains Mono", monospace',
						}}
					>
						[ INTENT DECLARATION ]
					</div>
					<h1
						style={{
							fontSize: 108,
							fontWeight: 900,
							fontFamily: '"Bricolage Grotesque", "Inter", sans-serif',
							color: '#FFFFFF',
							margin: 0,
							letterSpacing: '-0.04em',
							textShadow: '0 0 50px rgba(244, 63, 94, 0.6), 0 20px 40px rgba(0,0,0,0.8)',
							whiteSpace: 'nowrap',
						}}
					>
						NOT CRITICIZING.
					</h1>
				</div>
			)}

			{/* "HELPING." */}
			{frame >= 314 && frame <= 412 && (
				<div
					style={{
						position: 'absolute',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `scale(${helpingScale})`,
						opacity: helpingOpacity,
						zIndex: 40,
					}}
				>
					<div
						style={{
							fontSize: 18,
							fontWeight: 800,
							letterSpacing: '0.25em',
							color: '#00F0FF',
							textTransform: 'uppercase',
							marginBottom: 8,
							fontFamily: '"JetBrains Mono", monospace',
							display: 'flex',
							alignItems: 'center',
							gap: 8,
						}}
					>
						<span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }} />
						<span>MISSION GOAL</span>
					</div>
					<h1
						style={{
							fontSize: 128,
							fontWeight: 900,
							fontFamily: '"Bricolage Grotesque", "Inter", sans-serif',
							color: '#00F0FF',
							margin: 0,
							letterSpacing: '-0.04em',
							textShadow: '0 0 60px rgba(0, 240, 255, 0.8), 0 0 120px rgba(0, 102, 255, 0.6)',
							whiteSpace: 'nowrap',
						}}
					>
						HELPING.
					</h1>
				</div>
			)}

			{/* ── 3. ACT III: "HEAVY LIFTING UNDER MASSIVE CONSTRAINTS" WITH 15% GLITCH ── */}
			{frame >= 412 && (
				<div
					style={{
						position: 'absolute',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `scale(${constraintsScale})`,
						opacity: constraintsOpacity,
						zIndex: 40,
						textAlign: 'center',
						padding: '0 40px',
					}}
				>
					{/* Subhead */}
					<div
						style={{
							fontSize: 16,
							fontWeight: 700,
							letterSpacing: '0.15em',
							color: 'rgba(255, 255, 255, 0.6)',
							textTransform: 'uppercase',
							marginBottom: 16,
							fontFamily: '"JetBrains Mono", monospace',
						}}
					>
						RESPECTING GOVERNMENT ENGINEERS &bull; 1.4B CITIZENS
					</div>

					{/* Main Headline */}
					<div
						style={{
							fontSize: 52,
							fontWeight: 800,
							color: '#FFFFFF',
							lineHeight: 1.15,
							letterSpacing: '-0.03em',
							marginBottom: 12,
						}}
					>
						They are doing heavy lifting under
					</div>

					{/* 15% Chromatic Aberration Word "CONSTRAINTS." */}
					<div style={{ marginTop: 4 }}>
						<ChromaticGlitchText
							text="MASSIVE CONSTRAINTS."
							fontSize={88}
							glitchIntensity={glitchIntensity}
							color="#FFFFFF"
						/>
					</div>

					{/* System Stress Telemetry HUD Pill */}
					<div
						style={{
							marginTop: 36,
							display: 'flex',
							alignItems: 'center',
							gap: 16,
							backgroundColor: 'rgba(15, 23, 42, 0.8)',
							border: '1px solid rgba(255, 0, 85, 0.4)',
							padding: '8px 20px',
							borderRadius: 20,
							fontFamily: '"JetBrains Mono", monospace',
							fontSize: 12,
							color: '#FFFFFF',
							boxShadow: '0 0 24px rgba(255, 0, 85, 0.2)',
						}}
					>
						<span style={{ color: '#FF0055', fontWeight: 800 }}>⚡ SYS_LOAD: 99.8%</span>
						<span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
						<span style={{ color: '#38BDF8' }}>THROUGHPUT: 1.4B CITIZENS</span>
						<span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
						<span style={{ color: '#A7F3D0' }}>ZERO DOWNTIME MANDATE</span>
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};
