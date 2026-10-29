import React from 'react';
import { interpolate, spring, useVideoConfig, Easing } from 'remotion';

interface DiscordRoastsOverlayProps {
	frame: number;
}

export const DiscordRoastsOverlay: React.FC<DiscordRoastsOverlayProps> = ({ frame }) => {
	const { fps } = useVideoConfig();

	// ── Text Overlay Entrance ("DISCORD ROASTS") - Frame 280 onwards ──
	const textSpring = spring({
		frame: frame - 280,
		fps,
		config: { damping: 13, stiffness: 220 },
	});
	const textScale = interpolate(textSpring, [0, 1], [1.6, 1.0]);
	const textOpacity = interpolate(frame, [280, 288], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Subtle drift on "DISCORD ROASTS"
	const textFloat = Math.sin(frame / 35) * 4;

	// ── Floating Elements Drift in Z-Space (Frames 270 to 480) ──
	const bubble1Z = interpolate(frame, [270, 480], [-80, 120]);
	const bubble2Z = interpolate(frame, [270, 480], [60, -90]);
	const bubble3Z = interpolate(frame, [270, 480], [-30, 80]);
	const hashtagZ = interpolate(frame, [270, 480], [40, -60]);

	// Fade out general overlay as camera rapidly zooms into the message
	const overlayElementsOpacity = interpolate(frame, [380, 420], [1, 0.15], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── Final Rapid Zoom into "healthysquirrel.vercel.app" (Frames 390 - 465) ──
	const zoomProgress = interpolate(frame, [390, 465], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.2, 0.0, 0.1, 1),
	});

	// Camera zoom scale into the glowing URL message: 1.0 to 18x
	const targetZoomScale = interpolate(zoomProgress, [0, 0.6, 1], [1.0, 4.2, 22.0]);
	const targetZoomOpacity = interpolate(frame, [350, 380], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Heavy motion blur streaks during final rapid push (Frames 415 to 465)
	const motionBlurStreaks = interpolate(frame, [415, 445, 465], [0, 0.85, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Snap to Pitch Black at end (Frames 465 to 475)
	const snapToBlackOpacity = interpolate(frame, [463, 470], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				pointerEvents: 'none',
				zIndex: 35,
				perspective: 1200,
			}}
		>
			{/* ── Floating Glassmorphic Discord Chat Bubbles in Z-space ── */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: overlayElementsOpacity,
					transformStyle: 'preserve-3d',
				}}
			>
				{/* Floating Bubble 1: Top-Left Glassmorphic Roast */}
				<div
					style={{
						position: 'absolute',
						top: 130,
						left: 80,
						padding: '16px 22px',
						backgroundColor: 'rgba(43, 45, 49, 0.75)',
						backdropFilter: 'blur(16px)',
						WebkitBackdropFilter: 'blur(16px)',
						borderRadius: 16,
						border: '1px solid rgba(88, 101, 242, 0.4)',
						boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(88, 101, 242, 0.25)',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						transform: `translateZ(${bubble1Z}px) rotateZ(-3deg)`,
						maxWidth: 380,
					}}
				>
					<div
						style={{
							width: 36,
							height: 36,
							borderRadius: '50%',
							backgroundColor: '#5865F2',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#FFFFFF',
							fontWeight: 800,
							fontSize: 14,
							flexShrink: 0,
						}}
					>
						#
					</div>
					<div>
						<div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>
							@critique_bot
						</div>
						<div style={{ fontSize: 13, color: '#DBDEE1', marginTop: 2 }}>
							"UI feels dangerously premium for a fitness webapp 🔥"
						</div>
					</div>
				</div>

				{/* Floating Bubble 2: Bottom-Right Reaction Bubble */}
				<div
					style={{
						position: 'absolute',
						bottom: 120,
						right: 90,
						padding: '16px 24px',
						backgroundColor: 'rgba(30, 31, 34, 0.8)',
						backdropFilter: 'blur(16px)',
						WebkitBackdropFilter: 'blur(16px)',
						borderRadius: 16,
						border: '1px solid rgba(255, 255, 255, 0.1)',
						boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						transform: `translateZ(${bubble2Z}px) rotateZ(2.5deg)`,
						maxWidth: 420,
					}}
				>
					<div
						style={{
							width: 38,
							height: 38,
							borderRadius: '50%',
							backgroundColor: '#2E8661',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#FFFFFF',
							fontWeight: 800,
							fontSize: 14,
							flexShrink: 0,
						}}
					>
						HS
					</div>
					<div>
						<div style={{ fontSize: 13, fontWeight: 700, color: '#57F287' }}>
							Zero Overkill Rule
						</div>
						<div style={{ fontSize: 13, color: '#DBDEE1', marginTop: 2 }}>
							Strictly NO bouncy overshoot exceeding 4% 💯
						</div>
					</div>
				</div>

				{/* Floating Element 3: Glowing Hashtag #design-feedback Pill */}
				<div
					style={{
						position: 'absolute',
						top: 150,
						right: 120,
						padding: '12px 24px',
						backgroundColor: 'rgba(88, 101, 242, 0.25)',
						backdropFilter: 'blur(14px)',
						borderRadius: 9999,
						border: '1.5px solid #5865F2',
						boxShadow: '0 0 35px rgba(88, 101, 242, 0.6), 0 10px 25px rgba(0, 0, 0, 0.5)',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						transform: `translateZ(${hashtagZ}px) rotateZ(1deg)`,
					}}
				>
					<span style={{ fontSize: 22, color: '#5865F2', fontWeight: 900 }}>#</span>
					<span style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
						design-feedback
					</span>
					<span
						style={{
							width: 8,
							height: 8,
							borderRadius: '50%',
							backgroundColor: '#57F287',
							boxShadow: '0 0 10px #57F287',
						}}
					/>
				</div>

				{/* Floating Element 4: Floating Server Icon (AGY AI) in Z-Space */}
				<div
					style={{
						position: 'absolute',
						bottom: 220,
						left: 140,
						width: 58,
						height: 58,
						borderRadius: 20,
						backgroundColor: '#1E1F22',
						border: '2px solid rgba(88, 101, 242, 0.6)',
						boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(88, 101, 242, 0.5)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `translateZ(${bubble3Z}px) rotateZ(-4deg)`,
					}}
				>
					<svg width="32" height="26" viewBox="0 0 28 22" fill="none">
						<path
							d="M23.02 1.9C21.28 1.1 19.42 0.5 17.48 0.15C17.22 0.6 16.92 1.25 16.71 1.76C14.65 1.45 12.61 1.45 10.58 1.76C10.37 1.25 10.07 0.6 9.81 0.15C7.87 0.5 6.01 1.1 4.27 1.9C0.77 7.07 -0.17 12.11 0.05 17.07C2.37 18.78 4.61 19.82 6.81 20.5C7.36 19.75 7.85 18.95 8.27 18.1C7.47 17.8 6.7 17.41 5.97 16.94C6.16 16.8 6.35 16.65 6.53 16.5C10.89 18.52 15.62 18.52 19.93 16.5C20.12 16.65 20.31 16.8 20.5 16.94C19.76 17.41 18.99 17.8 18.19 18.1C18.61 18.95 19.11 19.75 19.66 20.5C21.86 19.82 24.11 18.78 26.43 17.07C26.71 11.41 25.42 6.42 23.02 1.9ZM9.3 14.1C8 14.1 6.93 12.92 6.93 11.49C6.93 10.06 7.98 8.88 9.3 8.88C10.63 8.88 11.7 10.06 11.67 11.49C11.67 12.92 10.63 14.1 9.3 14.1ZM17.98 14.1C16.68 14.1 15.61 12.92 15.61 11.49C15.61 10.06 16.66 8.88 17.98 8.88C19.31 8.88 20.38 10.06 20.35 11.49C20.35 12.92 19.31 14.1 17.98 14.1Z"
							fill="#5865F2"
						/>
					</svg>
				</div>
			</div>

			{/* ── SLEEK TEXT OVERLAY: "DISCORD ROASTS" ── */}
			{frame >= 280 && frame < 420 && (
				<div
					style={{
						position: 'absolute',
						top: 70,
						left: 0,
						right: 0,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `scale(${textScale}) translateY(${textFloat}px)`,
						opacity: textOpacity * overlayElementsOpacity,
						zIndex: 50,
					}}
				>
					<div
						style={{
							fontFamily: '"Inter", -apple-system, sans-serif',
							fontWeight: 900,
							fontSize: 82,
							letterSpacing: '-0.04em',
							color: '#FFFFFF',
							textTransform: 'uppercase',
							lineHeight: 1,
							textAlign: 'center',
							textShadow: `
								0 0 30px rgba(88, 101, 242, 0.95),
								0 0 70px rgba(88, 101, 242, 0.65),
								0 20px 45px rgba(0, 0, 0, 0.9)
							`,
							filter: 'drop-shadow(0 8px 30px rgba(88, 101, 242, 0.85))',
						}}
					>
						DISCORD ROASTS
					</div>
					<div
						style={{
							marginTop: 10,
							fontSize: 16,
							fontWeight: 700,
							letterSpacing: '0.18em',
							textTransform: 'uppercase',
							color: 'rgba(255, 255, 255, 0.8)',
							textShadow: '0 0 20px rgba(88, 101, 242, 0.8)',
						}}
					>
						LIVE COMMUNITY CRITIQUE • ANTIGRAVITY ENGINE
					</div>
				</div>
			)}

			{/* ── FINAL RAPID CAMERA ZOOM INTO "healthysquirrel.vercel.app" ── */}
			{frame >= 350 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `scale(${targetZoomScale})`,
						transformOrigin: '50% 50%',
						opacity: targetZoomOpacity,
						zIndex: 60,
					}}
				>
					{/* Glowing Target Message Card */}
					<div
						style={{
							padding: '36px 54px',
							backgroundColor: 'rgba(43, 45, 49, 0.96)',
							backdropFilter: 'blur(24px)',
							borderRadius: 24,
							border: '2px solid #5865F2',
							boxShadow: `
								0 0 60px rgba(88, 101, 242, 0.9),
								0 0 140px rgba(0, 229, 255, 0.5),
								0 30px 80px rgba(0, 0, 0, 0.95)
							`,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
							<div
								style={{
									width: 32,
									height: 32,
									borderRadius: '50%',
									backgroundColor: '#2E8661',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#FFFFFF',
									fontWeight: 800,
									fontSize: 12,
								}}
							>
								HS
							</div>
							<span style={{ fontSize: 13, fontWeight: 700, color: '#57F287', letterSpacing: '0.04em' }}>
								STAGE PRODUCTION DEPLOYMENT
							</span>
							<span
								style={{
									fontSize: 11,
									fontWeight: 700,
									color: '#5865F2',
									backgroundColor: 'rgba(88, 101, 242, 0.25)',
									padding: '2px 8px',
									borderRadius: 6,
								}}
							>
								VERIFIED
							</span>
						</div>

						{/* The Glowing Message URL directly at center */}
						<div
							style={{
								fontSize: 38,
								fontWeight: 900,
								color: '#00E5FF',
								letterSpacing: '-0.02em',
								textShadow: `
									0 0 25px rgba(0, 229, 255, 0.9),
									0 0 60px rgba(0, 145, 255, 0.6)
								`,
								display: 'flex',
								alignItems: 'center',
								gap: 12,
							}}
						>
							<span>healthysquirrel.vercel.app</span>
							<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2.5">
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
								<polyline points="15 3 21 3 21 9" />
								<line x1="10" y1="14" x2="21" y2="3" />
							</svg>
						</div>
					</div>
				</div>
			)}

			{/* Heavy Motion Blur Optical Speed Lines during Final Push */}
			{motionBlurStreaks > 0 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundImage: 'radial-gradient(ellipse at 50% 56%, transparent 15%, rgba(88, 101, 242, 0.4) 60%, rgba(0, 229, 255, 0.7) 100%)',
						mixBlendMode: 'screen',
						opacity: motionBlurStreaks,
						pointerEvents: 'none',
						zIndex: 70,
					}}
				/>
			)}

			{/* ── Snap to Black Void (Frames 463 to 480) ── */}
			{snapToBlackOpacity > 0 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundColor: '#0A0D14',
						opacity: snapToBlackOpacity,
						zIndex: 90,
						pointerEvents: 'none',
					}}
				/>
			)}
		</div>
	);
};
