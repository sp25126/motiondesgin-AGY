import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';
import { StageLogoRef } from './components/StageLogoRef';
import { Reddit3DInterface } from './components/Reddit3DInterface';
import { RedditRoastsOverlay } from './components/RedditRoastsOverlay';

export const StageRedditRoast: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── ACT I: STAGE LOGO BURST & SHOCKWAVE (Frames 0 - 90) ──
	const logoSpring = spring({
		frame: frame - 12,
		fps,
		config: { damping: 12, stiffness: 160 },
	});
	const logoScale = frame < 12 ? 0 : interpolate(logoSpring, [0, 1], [0, 1.15]);
	const logoSettleScale = interpolate(frame, [35, 60], [1.15, 1.0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const activeLogoScale = frame > 35 ? logoSettleScale : logoScale;

	// Shockwave ring distortion effect (Frames 15 - 55)
	const shockwaveProgress = interpolate(frame, [15, 55], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.1, 0.9, 0.2, 1),
	});
	const shockwaveSize = interpolate(shockwaveProgress, [0, 1], [40, 1400]);
	const shockwaveOpacity = interpolate(shockwaveProgress, [0, 0.2, 1], [0, 0.85, 0]);

	// Impact Camera Shake on logo burst (Frames 15 - 45)
	const shakeDecay = Math.max(0, 1 - (frame - 15) / 30);
	const shakeX = frame >= 15 && frame <= 45 ? Math.sin(frame * 2.2) * 12 * shakeDecay : 0;
	const shakeY = frame >= 15 && frame <= 45 ? Math.cos(frame * 2.6) * 10 * shakeDecay : 0;

	// STAGE Logo fadeout before DAY 02 slam (Frames 72 - 86)
	const logoOpacity = interpolate(frame, [72, 86], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── KINETIC TYPOGRAPHY: "DAY 02" (Frames 85 - 180) ──
	const day02Spring = spring({
		frame: frame - 86,
		fps,
		config: { damping: 14, stiffness: 220 }, // High-energy typography slam
	});
	const day02Scale = interpolate(day02Spring, [0, 1], [1.8, 1.0]);
	const day02Opacity = interpolate(frame, [85, 88], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Chromatic strobe on impact (Frames 86 - 98)
	const strobeFlash = interpolate(frame, [86, 92, 98], [0, 0.6, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Micro breathing drift
	const driftFloat = Math.sin(frame / 40) * 4;

	// ── ACT II: AGGRESSIVE CAMERA PUSH THROUGH "O" (Frames 180 - 240) ──
	// Exponential zoom straight through the center of the letter "O"
	const pushProgress = interpolate(frame, [180, 240], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.65, 0.0, 0.05, 1), // Aggressive exponential acceleration
	});

	// Camera scale zooms from 1.0 to 95.0x
	const pushZoom = interpolate(pushProgress, [0, 0.6, 1], [1.0, 7.5, 95.0]);

	// Fade out DAY 02 text as camera penetrates the aperture of the O
	const day02TextOpacity = interpolate(frame, [180, 222, 235], [1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Motion blur speed lines during aggressive push
	const speedLinesOpacity = interpolate(frame, [185, 215, 235], [0, 0.85, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── 3D REDDIT INTERFACE (Revealed through "O" from Frame 210 onwards) ──
	const redditEntrance = interpolate(frame, [210, 275], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const redditScale = interpolate(redditEntrance, [0, 1], [0.65, 1.0]);
	const redditOpacity = interpolate(redditEntrance, [0, 0.4, 1], [0, 0.7, 1]);

	// Global scene transition (Reddit stays active from 210 to 480)
	const isScene1Active = frame < 235;
	const isScene3Active = frame >= 300;

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
			{/* Precision Grid Background in pitch-black void */}
			<div
				style={{
					position: 'absolute',
					inset: -60,
					backgroundImage: `
						linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
					`,
					backgroundSize: '48px 48px',
					opacity: 0.6,
				}}
			/>

			{/* ── ACT I: GLOWING STAGE LOGO BURST & SHOCKWAVE ── */}
			{isScene1Active && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `translate(${shakeX}px, ${shakeY}px)`,
						opacity: logoOpacity,
					}}
				>
					{/* Expanding Shockwave Distortion Ring */}
					{shockwaveProgress > 0 && shockwaveProgress < 1 && (
						<div
							style={{
								position: 'absolute',
								width: shockwaveSize,
								height: shockwaveSize,
								borderRadius: '50%',
								border: '3px solid rgba(0, 229, 255, 0.85)',
								boxShadow: `
									0 0 30px rgba(0, 229, 255, 0.9),
									0 0 80px rgba(0, 119, 254, 0.6),
									0 0 140px rgba(10, 79, 213, 0.4) inset
								`,
								opacity: shockwaveOpacity,
								pointerEvents: 'none',
							}}
						/>
					)}

					{/* Centered Glowing STAGE Logo (Reference Image Design) */}
					<div
						style={{
							transform: `scale(${activeLogoScale})`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<StageLogoRef
							size={240}
							showWordmark={true}
							glowIntensity={1.4}
							textColor="#FFFFFF"
						/>
					</div>
				</div>
			)}

			{/* ── ACT I + II: KINETIC TYPOGRAPHY "DAY 02" WITH APERTURE IN "O" ── */}
			{frame >= 85 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transformOrigin: '53.8% 50%', // Centered on the inner hole of "0" in "02"
						transform: `scale(${day02Scale * pushZoom}) translateY(${driftFloat}px)`,
						opacity: day02TextOpacity,
						pointerEvents: 'none',
						zIndex: 40,
					}}
				>
					{/* Massive Bold White Inter Typography */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 40,
							fontFamily: '"Inter", -apple-system, sans-serif',
							fontWeight: 900,
							fontSize: 160,
							letterSpacing: '-0.05em',
							color: '#FFFFFF',
							lineHeight: 1,
							textShadow: `
								0 0 40px rgba(255, 255, 255, 0.35),
								0 0 90px rgba(0, 194, 255, 0.3),
								0 20px 40px rgba(0, 0, 0, 0.9)
							`,
							opacity: day02Opacity,
						}}
					>
						<span style={{ color: 'rgba(255, 255, 255, 0.95)' }}>DAY</span>

						{/* "02" Container */}
						<div style={{ display: 'flex', alignItems: 'center', letterSpacing: '-0.06em' }}>
							{/* Custom SVG "0" with a transparent inner aperture for camera pass-through */}
							<svg
								width={140}
								height={160}
								viewBox="0 0 140 160"
								fill="none"
								style={{ display: 'block', overflow: 'visible' }}
							>
								{/* Outer White Contour of the 0 */}
								<path
									d="M 70 8 C 108 8 136 38 136 80 C 136 122 108 152 70 152 C 32 152 4 122 4 80 C 4 38 32 8 70 8 Z M 70 42 C 54 42 40 58 40 80 C 40 102 54 118 70 118 C 86 118 100 102 100 80 C 100 58 86 42 70 42 Z"
									fill="#FFFFFF"
									fillRule="evenodd"
								/>
								{/* Glowing Cyan Edge Rim */}
								<path
									d="M 70 8 C 108 8 136 38 136 80 C 136 122 108 152 70 152 C 32 152 4 122 4 80 C 4 38 32 8 70 8 Z"
									stroke="rgba(0, 229, 255, 0.6)"
									strokeWidth="3"
									style={{ filter: 'drop-shadow(0 0 16px rgba(0, 229, 255, 0.8))' }}
								/>
							</svg>

							{/* Number "2" */}
							<span>2</span>
						</div>
					</div>
				</div>
			)}

			{/* Motion Blur Optical Speed Lines during Aggressive Push-In */}
			{speedLinesOpacity > 0 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundImage: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0, 194, 255, 0.3) 60%, rgba(255, 255, 255, 0.7) 100%)',
						mixBlendMode: 'screen',
						opacity: speedLinesOpacity,
						pointerEvents: 'none',
						zIndex: 45,
					}}
				/>
			)}

			{/* Strobe Flash on Typography Impact */}
			{strobeFlash > 0 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundColor: '#FFFFFF',
						opacity: strobeFlash,
						mixBlendMode: 'screen',
						pointerEvents: 'none',
						zIndex: 50,
					}}
				/>
			)}

			{/* ── ACT II + III: 3D STYLIZED REDDIT INTERFACE ── */}
			{frame >= 200 && (
				<Reddit3DInterface
					frame={frame}
					scale={redditScale}
					opacity={redditOpacity}
				/>
			)}

			{/* ── ACT III: REDDIT ROASTS OVERLAY, UPVOTE ARROWS & ZOOM INTO ORANGE LOGO ── */}
			{isScene3Active && (
				<RedditRoastsOverlay frame={frame} />
			)}
		</AbsoluteFill>
	);
};
