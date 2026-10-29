import React from 'react';
import { interpolate, Easing } from 'remotion';

interface RedditRoastsOverlayProps {
	frame: number;
}

export const RedditRoastsOverlay: React.FC<RedditRoastsOverlayProps> = ({ frame }) => {
	// Frame is relative to 480 total frames (Scene 3 active from frame 300 to 480)
	// Active progress inside Scene 3: 0 to 180
	const sceneFrame = frame - 300;

	// Text Entrance: "REDDIT ROASTS" (Frame 300 to 360)
	const titleProgress = interpolate(sceneFrame, [0, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const titleScale = interpolate(titleProgress, [0, 1], [0.85, 1]);
	const titleY = interpolate(titleProgress, [0, 1], [60, 0]);
	const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
	const titleTracking = interpolate(sceneFrame, [0, 120], [0.08, 0.14], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Floating Glassmorphic Upvote Arrows (6 drifting particles)
	const upvotes = [
		{ x: 180, y: 220, z: 40, scale: 0.9, speed: 1.1, rot: 15 },
		{ x: 1480, y: 180, z: 80, scale: 1.3, speed: 0.8, rot: -20 },
		{ x: 320, y: 720, z: -20, scale: 0.75, speed: 1.3, rot: -10 },
		{ x: 1620, y: 740, z: 60, scale: 1.1, speed: 0.9, rot: 25 },
		{ x: 920, y: 140, z: 120, scale: 1.4, speed: 0.7, rot: -5 },
		{ x: 740, y: 840, z: 10, scale: 0.85, speed: 1.2, rot: 12 },
	];

	// Floating comment bubbles
	const comments = [
		{ text: '💬 Who let them cook? 🔥', x: 240, y: 380, rot: -4, speed: 1.0 },
		{ text: '💬 Bro built an entire OS 😭', x: 1360, y: 440, rot: 5, speed: 0.8 },
		{ text: '💬 Figma is shaking right now', x: 380, y: 880, rot: 3, speed: 1.2 },
		{ text: '💬 9.8/10 Roast score 💀', x: 1280, y: 820, rot: -3, speed: 0.9 },
	];

	// Reddit Logo Zoom Animation (Frame 380 to 475)
	const zoomProgress = interpolate(sceneFrame, [80, 172], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.25, 0.1, 0.25, 1),
	});

	// Fade out text overlay and floating particles as camera zooms deep into the logo
	const overlayElementsFade = interpolate(sceneFrame, [90, 130], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Exponential camera zoom into the Reddit logo center
	const logoScale = interpolate(zoomProgress, [0, 0.6, 1], [0.8, 2.2, 42]);
	const logoOpacity = interpolate(sceneFrame, [60, 90], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Flash bloom before snap to black (Frame 468 to 475)
	const flashOpacity = interpolate(sceneFrame, [168, 173, 175], [0, 0.95, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Snap to Pitch-Black Void at frame 475 (last 5 frames 475 to 480)
	const isSnappedToBlack = sceneFrame >= 175;

	if (isSnappedToBlack) {
		return (
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: '#0A0D14',
					zIndex: 9999,
				}}
			/>
		);
	}

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: 1200,
				transformStyle: 'preserve-3d',
				pointerEvents: 'none',
				zIndex: 50,
			}}
		>
			{/* ── Floating Glassmorphic Upvote Arrows ── */}
			{upvotes.map((u, i) => {
				const driftY = Math.sin((sceneFrame * u.speed + i * 40) / 25) * 22;
				const driftX = Math.cos((sceneFrame * u.speed + i * 35) / 30) * 16;
				const rotate = u.rot + Math.sin((sceneFrame + i * 15) / 30) * 8;

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: u.x + driftX,
							top: u.y + driftY,
							transform: `translateZ(${u.z}px) rotate(${rotate}deg) scale(${u.scale})`,
							width: 64,
							height: 64,
							borderRadius: 18,
							background: 'rgba(255, 69, 0, 0.15)',
							backdropFilter: 'blur(16px)',
							WebkitBackdropFilter: 'blur(16px)',
							border: '1.5px solid rgba(255, 69, 0, 0.5)',
							boxShadow: '0 15px 35px rgba(255, 69, 0, 0.35), 0 0 25px rgba(255, 87, 0, 0.4) inset',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#FF4500',
							filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
							opacity: overlayElementsFade,
						}}
					>
						<svg width="34" height="34" viewBox="0 0 24 24" fill="#FF4500">
							<path d="M12 4L3 15H9V20H15V15H21L12 4Z" />
						</svg>
					</div>
				);
			})}

			{/* ── Floating Glassmorphic Comment Bubbles ── */}
			{comments.map((c, i) => {
				const driftY = Math.sin((sceneFrame * c.speed + i * 50) / 28) * 18;
				const driftX = Math.cos((sceneFrame * c.speed + i * 45) / 32) * 14;

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: c.x + driftX,
							top: c.y + driftY,
							transform: `rotate(${c.rot}deg)`,
							background: 'rgba(18, 20, 24, 0.85)',
							backdropFilter: 'blur(20px)',
							WebkitBackdropFilter: 'blur(20px)',
							border: '1px solid rgba(255, 255, 255, 0.16)',
							borderRadius: 999,
							padding: '12px 24px',
							color: '#FFFFFF',
							fontFamily: 'Inter, sans-serif',
							fontSize: 15,
							fontWeight: 700,
							letterSpacing: '-0.01em',
							boxShadow: '0 20px 40px rgba(0,0,0,0.7), 0 0 20px rgba(0, 194, 255, 0.15)',
							whiteSpace: 'nowrap',
							opacity: overlayElementsFade,
						}}
					>
						{c.text}
					</div>
				);
			})}

			{/* ── BOLD TEXT OVERLAY: "REDDIT ROASTS" ── */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					transform: `translateY(${titleY}px) scale(${titleScale})`,
					opacity: titleOpacity * overlayElementsFade,
					zIndex: 80,
					marginBottom: 40,
				}}
			>
				{/* Top Tagline */}
				<div
					style={{
						fontSize: 16,
						fontWeight: 800,
						fontFamily: 'Inter, sans-serif',
						letterSpacing: '0.25em',
						color: '#FF4500',
						textTransform: 'uppercase',
						marginBottom: 12,
						textShadow: '0 0 20px rgba(255, 69, 0, 0.8)',
					}}
				>
					EPISODE 02 • THE COMMUNITY VERDICT
				</div>

				{/* Massive Headline */}
				<h1
					style={{
						margin: 0,
						fontFamily: 'Inter, -apple-system, sans-serif',
						fontSize: 110,
						fontWeight: 900,
						letterSpacing: `${titleTracking}em`,
						lineHeight: 0.95,
						textTransform: 'uppercase',
						textAlign: 'center',
						display: 'flex',
						gap: 24,
					}}
				>
					<span
						style={{
							color: '#FFFFFF',
							textShadow: '0 0 40px rgba(255, 255, 255, 0.5), 0 10px 30px rgba(0,0,0,0.8)',
						}}
					>
						REDDIT
					</span>
					<span
						style={{
							background: 'linear-gradient(135deg, #FF4500 0%, #FF8700 50%, #FFAA00 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							filter: 'drop-shadow(0 0 35px rgba(255, 69, 0, 0.8))',
						}}
					>
						ROASTS
					</span>
				</h1>
			</div>

			{/* ── GLOWING ORANGE REDDIT LOGO WITH ZOOM-IN ── */}
			<div
				style={{
					position: 'absolute',
					transform: `scale(${logoScale})`,
					opacity: logoOpacity,
					zIndex: 100,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* Outer Glowing Energy Halo */}
				<div
					style={{
						position: 'absolute',
						width: 260,
						height: 260,
						borderRadius: '50%',
						background: 'radial-gradient(circle, rgba(255, 69, 0, 0.8) 0%, rgba(255, 106, 0, 0.3) 50%, transparent 75%)',
						filter: 'blur(30px)',
					}}
				/>

				{/* Stylized Reddit Snoo Head & Antenna Icon */}
				<div
					style={{
						width: 140,
						height: 140,
						borderRadius: '50%',
						background: 'linear-gradient(145deg, #FF5700 0%, #FF4500 50%, #CC3700 100%)',
						boxShadow: '0 0 50px rgba(255, 69, 0, 0.9), 0 0 100px rgba(255, 87, 0, 0.6), 0 0 0 4px rgba(255, 255, 255, 0.3) inset',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<svg
						width="94"
						height="94"
						viewBox="0 0 100 100"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						{/* Snoo Face Outline */}
						<ellipse cx="50" cy="54" rx="30" ry="22" fill="#FFFFFF" />

						{/* Left Ear */}
						<circle cx="20" cy="46" r="8" fill="#FFFFFF" />
						{/* Right Ear */}
						<circle cx="80" cy="46" r="8" fill="#FFFFFF" />

						{/* Antenna Stalk & Knob */}
						<path
							d="M 50 32 L 56 18 L 70 23"
							stroke="#FFFFFF"
							strokeWidth="4"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<circle cx="72" cy="24" r="6" fill="#FFFFFF" />

						{/* Glowing Eyes */}
						<circle cx="39" cy="53" r="5" fill="#FF4500" />
						<circle cx="61" cy="53" r="5" fill="#FF4500" />

						{/* Smile */}
						<path
							d="M 40 63 C 45 68 55 68 60 63"
							stroke="#FF4500"
							strokeWidth="3.5"
							strokeLinecap="round"
						/>
					</svg>
				</div>
			</div>

			{/* White/Orange Optical Flash on Finale before snapping to black */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: '#FFFFFF',
					opacity: flashOpacity,
					mixBlendMode: 'screen',
					pointerEvents: 'none',
					zIndex: 9000,
				}}
			/>
		</div>
	);
};
