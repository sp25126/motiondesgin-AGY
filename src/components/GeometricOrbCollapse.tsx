import React from 'react';
import { interpolate, spring } from 'remotion';

interface GeometricOrbCollapseProps {
	frame: number; // local frame relative to master (1080 to 1500)
}

export const GeometricOrbCollapse: React.FC<GeometricOrbCollapseProps> = ({
	frame,
}) => {
	// Active window: frame 1080 to 1500 (Master time)
	if (frame < 1080) return null;

	const actFrame = frame - 1080; // 0 to 420

	// Phase 1: Orb Birth & Condensation (actFrame: 0 to 70 / frames 1080 to 1150)
	const orbEntrance = spring({
		frame: actFrame,
		fps: 60,
		config: { damping: 14, stiffness: 80 },
	});

	// Phase 2: Supernova burst at actFrame = 80 (frame 1160)
	const burstFrame = actFrame - 80;
	const isBurst = burstFrame >= 0;

	// Orb collapse & scale-down right at burst
	const orbScale =
		actFrame < 80
			? orbEntrance * (1 + Math.sin(actFrame * 0.25) * 0.12)
			: Math.max(0, 1 - burstFrame * 0.1);

	// Shockwave burst expansion
	const shockwaveScale = isBurst
		? interpolate(burstFrame, [0, 45], [0.2, 5], {
				extrapolateRight: 'clamp',
			})
		: 0;
	const shockwaveOpacity = isBurst
		? interpolate(burstFrame, [0, 10, 45], [1, 0.8, 0], {
				extrapolateRight: 'clamp',
			})
		: 0;

	// Flash bloom at burst
	const flashOpacity = isBurst
		? interpolate(burstFrame, [0, 6, 25], [0.95, 0.8, 0], {
				extrapolateRight: 'clamp',
			})
		: 0;

	// Phase 3: Metallic Kinetic Typography entrance (actFrame >= 85)
	const textSpring = spring({
		frame: Math.max(0, actFrame - 85),
		fps: 60,
		config: { damping: 15, stiffness: 90, mass: 1.1 },
	});

	// Studio Light Sweep across metallic typography (actFrame 120 to 300)
	const lightSweepProgress = interpolate(actFrame, [110, 290], [-40, 140], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Loop fade-out at the end (actFrame 360 to 420)
	const loopFade = interpolate(actFrame, [360, 419], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Gyro ring rotations
	const ringRot1 = actFrame * 4.5;
	const ringRot2 = -actFrame * 3.8;
	const ringRot3 = actFrame * 6.0;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: 'none',
				opacity: loopFade,
			}}
		>
			{/* Volumetric Octane Studio Lighting & Background Glow */}
			<div
				style={{
					position: 'absolute',
					width: 900,
					height: 600,
					borderRadius: '50%',
					background:
						'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.18) 0%, rgba(139, 92, 246, 0.12) 35%, rgba(15, 23, 42, 0.4) 60%, transparent 80%)',
					transform: `scale(${1 + Math.sin(actFrame * 0.04) * 0.1})`,
				}}
			/>

			{/* White/Cyan Supernova Flash Bloom */}
			{flashOpacity > 0.01 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(0, 240, 255, 0.6) 40%, transparent 80%)',
						opacity: flashOpacity,
						zIndex: 50,
					}}
				/>
			)}

			{/* Shockwave Rings */}
			{isBurst && shockwaveOpacity > 0.01 && (
				<div
					style={{
						position: 'absolute',
						width: 400,
						height: 400,
						borderRadius: '50%',
						border: '4px solid rgba(0, 240, 255, 0.9)',
						boxShadow:
							'0 0 40px #00F0FF, inset 0 0 30px rgba(0, 240, 255, 0.6)',
						transform: `scale(${shockwaveScale})`,
						opacity: shockwaveOpacity,
					}}
				/>
			)}

			{/* ── Geometric Glowing Orb (Pre-burst) ── */}
			{orbScale > 0.02 && (
				<div
					style={{
						position: 'relative',
						width: 220,
						height: 220,
						transform: `scale(${orbScale})`,
						transformStyle: 'preserve-3d',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{/* Radiant Core */}
					<div
						style={{
							position: 'absolute',
							width: 110,
							height: 110,
							borderRadius: '50%',
							background:
								'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #00F0FF 45%, #7C3AED 85%, #050B14 100%)',
							boxShadow: `
								0 0 50px #00F0FF,
								0 0 100px rgba(124, 58, 237, 0.8),
								inset 0 0 25px rgba(255, 255, 255, 0.9)
							`,
						}}
					/>

					{/* 3D Gyro Ring 1 */}
					<div
						style={{
							position: 'absolute',
							width: 170,
							height: 170,
							borderRadius: '50%',
							border: '2px solid rgba(0, 240, 255, 0.85)',
							boxShadow: '0 0 20px #00F0FF',
							transform: `rotateX(65deg) rotateY(${ringRot1}deg)`,
						}}
					/>

					{/* 3D Gyro Ring 2 */}
					<div
						style={{
							position: 'absolute',
							width: 210,
							height: 210,
							borderRadius: '50%',
							border: '1.5px solid rgba(168, 85, 247, 0.85)',
							boxShadow: '0 0 25px #A855F7',
							transform: `rotateX(-45deg) rotateY(${ringRot2}deg)`,
						}}
					/>

					{/* 3D Gyro Ring 3 */}
					<div
						style={{
							position: 'absolute',
							width: 250,
							height: 250,
							borderRadius: '50%',
							border: '1.5px dashed rgba(255, 255, 255, 0.7)',
							boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
							transform: `rotateX(20deg) rotateZ(${ringRot3}deg)`,
						}}
					/>
				</div>
			)}

			{/* ── Metallic Kinetic Typography (Post-burst) ── */}
			{isBurst && (
				<div
					style={{
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `scale(${textSpring}) translateZ(40px)`,
						opacity: Math.min(1, textSpring * 1.2),
						textAlign: 'center',
						zIndex: 40,
					}}
				>
					{/* High-tech Sub-badge */}
					<div
						style={{
							padding: '8px 22px',
							borderRadius: 999,
							background: 'rgba(15, 23, 42, 0.8)',
							border: '1px solid rgba(0, 240, 255, 0.5)',
							boxShadow: '0 0 25px rgba(0, 240, 255, 0.3)',
							fontFamily: 'monospace',
							fontSize: 13,
							fontWeight: 700,
							letterSpacing: '0.25em',
							color: '#38BDF8',
							marginBottom: 24,
							backdropFilter: 'blur(10px)',
						}}
					>
						AUTONOMOUS MOTION GRAPHICS PIPELINE
					</div>

					{/* Sleek Metallic Kinetic Typography */}
					{/* "GENERATED 100% BY ANTIGRAVITY AI" */}
					<div
						style={{
							position: 'relative',
							maxWidth: 1400,
							display: 'inline-block',
						}}
					>
						{/* Base Metallic Text with Chrome Reflections */}
						<h1
							style={{
								fontSize: 78,
								fontWeight: 950,
								fontFamily: '"Plus Jakarta Sans", sans-serif',
								letterSpacing: '-0.03em',
								lineHeight: 1.05,
								margin: 0,
								textTransform: 'uppercase',
								background: `
									linear-gradient(
										135deg,
										#FFFFFF 0%,
										#E2E8F0 18%,
										#94A3B8 32%,
										#FFFFFF 50%,
										#CBD5E1 68%,
										#64748B 85%,
										#FFFFFF 100%
									)
								`,
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								filter: `
									drop-shadow(0 15px 35px rgba(0, 0, 0, 0.9))
									drop-shadow(0 0 35px rgba(0, 240, 255, 0.35))
								`,
							}}
						>
							GENERATED 100% BY
							<br />
							<span
								style={{
									background: `
										linear-gradient(
											135deg,
											#00F0FF 0%,
											#60A5FA 35%,
											#FFFFFF 50%,
											#A855F7 75%,
											#00F0FF 100%
										)
									`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									textShadow: '0 0 50px rgba(0, 240, 255, 0.6)',
								}}
							>
								ANTIGRAVITY AI
							</span>
						</h1>

						{/* Passing Studio Light Specular Reflection Sweep */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								left: `${lightSweepProgress}%`,
								width: 140,
								transform: 'skewX(-25deg)',
								background:
									'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85), transparent)',
								mixBlendMode: 'overlay',
								filter: 'blur(8px)',
								pointerEvents: 'none',
							}}
						/>
					</div>

					{/* Studio Lighting Specs / Credential Bar */}
					<div
						style={{
							marginTop: 36,
							display: 'flex',
							alignItems: 'center',
							gap: 32,
							fontFamily: 'monospace',
							fontSize: 13,
							color: 'rgba(255, 255, 255, 0.6)',
							letterSpacing: '0.12em',
						}}
					>
						<span style={{ color: '#00F0FF' }}>● 60 FPS ULTRA-SMOOTH</span>
						<span>OCTANE LIGHTING SHADER</span>
						<span>ZERO MANUAL KEYFRAMES</span>
					</div>
				</div>
			)}
		</div>
	);
};
