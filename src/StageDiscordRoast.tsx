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
import { Discord3DInterface } from './components/Discord3DInterface';
import { DiscordRoastsOverlay } from './components/DiscordRoastsOverlay';

export const StageDiscordRoast: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── ACT I: STAGE LOGO SCALE-BOUNCE SNAP & CHROMATIC ABERRATION GLITCH (Frames 0 - 86) ──
	const logoSpring = spring({
		frame: frame - 10,
		fps,
		config: { damping: 11, stiffness: 180 }, // Sharp scale-bounce snap
	});
	const logoScale = frame < 10 ? 0 : interpolate(logoSpring, [0, 1], [0, 1.18]);
	const logoSettleScale = interpolate(frame, [32, 58], [1.18, 1.0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const activeLogoScale = frame > 32 ? logoSettleScale : logoScale;

	// Chromatic Aberration Glitch (Frames 10 to 36)
	const glitchActive = frame >= 10 && frame <= 36;
	const glitchShift = glitchActive ? Math.sin(frame * 4.2) * 5 * Math.max(0, 1 - (frame - 10) / 26) : 0;
	const chromaticSplit = glitchActive ? Math.abs(Math.sin(frame * 3.5)) * 6 : 0;

	// Expanding shockwave distortion ring (Frames 14 - 52)
	const shockwaveProgress = interpolate(frame, [14, 52], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.1, 0.9, 0.2, 1),
	});
	const shockwaveSize = interpolate(shockwaveProgress, [0, 1], [40, 1400]);
	const shockwaveOpacity = interpolate(shockwaveProgress, [0, 0.2, 1], [0, 0.85, 0]);

	// Camera impact shake
	const shakeDecay = Math.max(0, 1 - (frame - 12) / 28);
	const shakeX = frame >= 12 && frame <= 40 ? Math.sin(frame * 2.4) * 10 * shakeDecay : 0;
	const shakeY = frame >= 12 && frame <= 40 ? Math.cos(frame * 2.8) * 8 * shakeDecay : 0;

	// STAGE Logo fadeout before DAY 03 typography slam (Frames 72 - 86)
	const logoOpacity = interpolate(frame, [72, 86], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── ACT I: KINETIC TYPOGRAPHY "DAY 03" (Frames 85 - 180) ──
	const day03Spring = spring({
		frame: frame - 86,
		fps,
		config: { damping: 14, stiffness: 220 }, // High-energy typography impact
	});
	const day03Scale = interpolate(day03Spring, [0, 1], [1.8, 1.0]);
	const day03Opacity = interpolate(frame, [85, 88], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Chromatic strobe on impact (Frames 86 - 98)
	const strobeFlash = interpolate(frame, [86, 92, 98], [0, 0.6, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Subtle breathing drift
	const driftFloat = Math.sin(frame / 40) * 4;

	// ── ACT II: AGGRESSIVE CAMERA PUSH THROUGH "O" (Frames 180 - 240) ──
	// Exponential acceleration straight through the center hole of the "0"
	const pushProgress = interpolate(frame, [180, 240], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.65, 0.0, 0.05, 1),
	});

	// Camera zoom from 1.0x to 95.0x
	const pushZoom = interpolate(pushProgress, [0, 0.6, 1], [1.0, 7.5, 95.0]);

	// Fade out DAY 03 text as camera pushes through aperture
	const day03TextOpacity = interpolate(frame, [180, 222, 235], [1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Motion blur optical speed lines during aggressive camera push
	const speedLinesOpacity = interpolate(frame, [185, 215, 235], [0, 0.85, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── ACT II + III: 3D DISCORD INTERFACE ENTRANCE (Revealed from Frame 210 onwards) ──
	const discordEntrance = interpolate(frame, [210, 275], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const discordScale = interpolate(discordEntrance, [0, 1], [0.65, 1.0]);
	const discordOpacity = interpolate(discordEntrance, [0, 0.4, 1], [0, 0.7, 1]);

	// Scene state boundaries
	const isScene1Active = frame < 235;
	const isScene3Active = frame >= 270;

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
			{/* High-tech precision grid background */}
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

			{/* ── ACT I: GLOWING STAGE LOGO BURST & CHROMATIC ABERRATION GLITCH ── */}
			{isScene1Active && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `translate(${shakeX + glitchShift}px, ${shakeY}px)`,
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

					{/* Chromatic Aberration Red Offset Layer */}
					{chromaticSplit > 0 && (
						<div
							style={{
								position: 'absolute',
								transform: `scale(${activeLogoScale}) translate(${chromaticSplit}px, 0)`,
								opacity: 0.7,
								filter: 'drop-shadow(0 0 20px rgba(255, 0, 80, 0.9))',
								mixBlendMode: 'screen',
							}}
						>
							<StageLogoRef
								size={240}
								showWordmark={true}
								glowIntensity={0.8}
								textColor="#FF3366"
							/>
						</div>
					)}

					{/* Chromatic Aberration Cyan Offset Layer */}
					{chromaticSplit > 0 && (
						<div
							style={{
								position: 'absolute',
								transform: `scale(${activeLogoScale}) translate(${-chromaticSplit}px, 0)`,
								opacity: 0.7,
								filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.9))',
								mixBlendMode: 'screen',
							}}
						>
							<StageLogoRef
								size={240}
								showWordmark={true}
								glowIntensity={0.8}
								textColor="#00E5FF"
							/>
						</div>
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

			{/* ── ACT I + II: KINETIC TYPOGRAPHY "DAY 03" WITH APERTURE IN "0" ── */}
			{frame >= 85 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transformOrigin: '53.8% 50%', // Centered exactly on the hole of "0" in "03"
						transform: `scale(${day03Scale * pushZoom}) translateY(${driftFloat}px)`,
						opacity: day03TextOpacity,
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
							opacity: day03Opacity,
						}}
					>
						<span style={{ color: 'rgba(255, 255, 255, 0.95)' }}>DAY</span>

						{/* "03" Container */}
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

							{/* Number "3" */}
							<span>3</span>
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

			{/* ── ACT II + III: 3D STYLIZED DISCORD INTERFACE ── */}
			{frame >= 200 && (
				<Discord3DInterface
					frame={frame}
					scale={discordScale}
					opacity={discordOpacity}
				/>
			)}

			{/* ── ACT III: DISCORD ROASTS OVERLAY, FLOATING CARDS & ZOOM INTO URL ── */}
			{isScene3Active && (
				<DiscordRoastsOverlay frame={frame} />
			)}
		</AbsoluteFill>
	);
};
