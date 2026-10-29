import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';

export const Scene6OutroCallToAction: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── ACT I: BACKGROUND GRADIENT DISSOLVE & 3D TILT LOGO ENTRANCE (Frames 0 - 60) ──
	const bgProgress = interpolate(frame, [0, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	// Logo Spring Scale & 3D Tilt (rotateX: 10deg to 0deg)
	const logoSpring = spring({
		frame: frame - 10,
		fps,
		config: { stiffness: 170, damping: 15, mass: 0.9 },
	});

	const logoScale = interpolate(logoSpring, [0, 1], [0.75, 1.0]);
	const logoRotateX = interpolate(logoSpring, [0, 1], [10, 0]); // EXACT SPEC: rotateX: 10deg to 0deg
	const logoOpacity = interpolate(frame, [10, 26], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Logo Continuous Ambient Glow Breathing
	const glowPulse = 0.8 + Math.sin(frame / 20) * 0.2;

	// ── ACT II: HEADLINE & LINK WITH 15PX UPWARD DRIFT (Frames 45 - 95) ──
	const textSpring = spring({
		frame: frame - 45,
		fps,
		config: { stiffness: 180, damping: 16 },
	});

	const textOpacity = interpolate(frame, [45, 65], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// EXACT SPEC: 15px upward drift (translateY: 15 -> 0)
	const textTranslateY = interpolate(textSpring, [0, 1], [15, 0]);

	// Secondary Subtitle "Link in the comments" Drift
	const linkSpring = spring({
		frame: frame - 65,
		fps,
		config: { stiffness: 180, damping: 16 },
	});
	const linkOpacity = interpolate(frame, [65, 85], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const linkTranslateY = interpolate(linkSpring, [0, 1], [15, 0]);

	// Shockwave pulse behind logo on entry
	const shockwaveProgress = interpolate(frame, [20, 70], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const shockwaveSize = interpolate(shockwaveProgress, [0, 1], [40, 700]);
	const shockwaveOpacity = interpolate(shockwaveProgress, [0, 0.2, 1], [0, 0.7, 0]);

	return (
		<AbsoluteFill
			style={{
				// EXACT SPEC: Smooth, dark gradient (#0A0D14 to #001A33)
				background: `radial-gradient(ellipse 90% 70% at 50% 45%, #001A33 0%, #0A0D14 85%)`,
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: 1200,
			}}
		>
			{/* Subtle Precision Grid in Void */}
			<div
				style={{
					position: 'absolute',
					inset: -80,
					backgroundImage: `
						radial-gradient(circle at 50% 45%, rgba(0, 102, 255, 0.2) 0%, transparent 60%),
						linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
					`,
					backgroundSize: '100% 100%, 48px 48px, 48px 48px',
					opacity: bgProgress * 0.85,
				}}
			/>

			{/* Shockwave Radial Wave on Logo Land */}
			{shockwaveProgress > 0 && shockwaveProgress < 1 && (
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '38%',
						width: shockwaveSize,
						height: shockwaveSize,
						borderRadius: '50%',
						border: '2px solid #00F0FF',
						boxShadow: '0 0 30px #00F0FF, inset 0 0 20px rgba(0, 102, 255, 0.4)',
						transform: 'translate(-50%, -50%)',
						opacity: shockwaveOpacity,
						pointerEvents: 'none',
					}}
				/>
			)}

			{/* ── 1. STAGE CHECKMARK-SHIELD LOGO (3D TILT & VIBRANT BLUE GLOW) ── */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					transform: `scale(${logoScale}) rotateX(${logoRotateX}deg)`,
					opacity: logoOpacity,
					transformStyle: 'preserve-3d',
					zIndex: 20,
					marginBottom: 32,
				}}
			>
				{/* Glowing Shield-Checkmark Emblem */}
				<div
					style={{
						width: 110,
						height: 110,
						borderRadius: 28,
						background: 'linear-gradient(135deg, #0066FF 0%, #0044CC 50%, #00F0FF 100%)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: `
							0 0 ${40 * glowPulse}px rgba(0, 102, 255, 0.8),
							0 0 ${80 * glowPulse}px rgba(0, 240, 255, 0.4),
							0 20px 50px rgba(0, 0, 0, 0.8),
							inset 0 2px 4px rgba(255, 255, 255, 0.6)
						`,
						border: '2px solid rgba(255, 255, 255, 0.8)',
						position: 'relative',
					}}
				>
					{/* Checkmark-Shield SVG Graphic */}
					<svg width="60" height="60" viewBox="0 0 48 48" fill="none">
						<path
							d="M 24 4 L 40 10 V 22 C 40 33 24 44 24 44 C 24 44 8 33 8 22 V 10 L 24 4 Z"
							fill="rgba(0, 102, 255, 0.4)"
							stroke="#FFFFFF"
							strokeWidth="3"
							strokeLinejoin="round"
						/>
						<path
							d="M 16 22 L 22 28 L 33 16"
							stroke="#FFFFFF"
							strokeWidth="4"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>

				{/* STAGE Brand Wordmark */}
				<div
					style={{
						fontSize: 34,
						fontWeight: 900,
						letterSpacing: '0.12em',
						color: '#FFFFFF',
						fontFamily: '"Bricolage Grotesque", "Inter", sans-serif',
						marginTop: 18,
						textShadow: '0 0 24px rgba(0, 102, 255, 0.6)',
					}}
				>
					STAGE
				</div>
			</div>

			{/* ── 2. HEADLINE & CALL TO ACTION (15PX UPWARD DRIFT) ── */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					transform: `translateY(${textTranslateY}px)`,
					opacity: textOpacity,
					zIndex: 20,
				}}
			>
				<h1
					style={{
						fontSize: 48,
						fontWeight: 800,
						color: '#FFFFFF',
						margin: 0,
						lineHeight: 1.2,
						letterSpacing: '-0.03em',
						textShadow: '0 4px 20px rgba(0,0,0,0.8)',
					}}
				>
					Let's build a better web,{' '}
					<span
						style={{
							background: 'linear-gradient(135deg, #00F0FF 0%, #38BDF8 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						together.
					</span>
				</h1>
			</div>

			{/* ── 3. CLEAN WHITE INTER LINK PILL & SUBTITLE (15PX UPWARD DRIFT) ── */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 24,
					transform: `translateY(${linkTranslateY}px)`,
					opacity: linkOpacity,
					zIndex: 20,
					gap: 14,
				}}
			>
				{/* Link Glass Pill: stage.entrext.com/gov-initiative */}
				<div
					style={{
						backgroundColor: 'rgba(255, 255, 255, 0.08)',
						backdropFilter: 'blur(16px)',
						border: '1.5px solid rgba(0, 240, 255, 0.4)',
						borderRadius: 30,
						padding: '12px 32px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: `
							0 16px 36px rgba(0, 0, 0, 0.6),
							0 0 30px rgba(0, 102, 255, 0.3),
							inset 0 1px 1px rgba(255, 255, 255, 0.3)
						`,
						cursor: 'pointer',
					}}
				>
					<span style={{ fontSize: 16, color: '#00F0FF' }}>🔗</span>
					<span
						style={{
							fontSize: 20,
							fontWeight: 700,
							color: '#FFFFFF',
							fontFamily: '"Inter", sans-serif',
							letterSpacing: '-0.01em',
						}}
					>
						stage.entrext.com/gov-initiative
					</span>
					<span style={{ fontSize: 14, color: '#00F0FF', fontWeight: 800 }}>→</span>
				</div>

				{/* "Link in the comments" Subtitle */}
				<div
					style={{
						fontSize: 15,
						color: 'rgba(255, 255, 255, 0.65)',
						fontWeight: 500,
						letterSpacing: '0.01em',
						display: 'flex',
						alignItems: 'center',
						gap: 8,
					}}
				>
					<span>💬</span>
					<span>Link in the comments &amp; description</span>
				</div>
			</div>
		</AbsoluteFill>
	);
};
