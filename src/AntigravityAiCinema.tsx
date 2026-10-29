import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { WireframeWorkspace } from './components/WireframeWorkspace';
import { PhotorealisticGlassUi } from './components/PhotorealisticGlassUi';
import { EnergyScanBeam } from './components/EnergyScanBeam';
import { GeometricOrbCollapse } from './components/GeometricOrbCollapse';

export const AntigravityAiCinema: React.FC = () => {
	const frame = useCurrentFrame();

	// ── ACT 1: Bare-Bones Neon-Green Wireframes (Frames 0 - 300) ──
	// ── ACT 2: Sweeping Cyan Energy Beam Morph (Frames 300 - 720) ──
	// Scan Beam horizontal percentage (0 to 100%)
	const beamPercent = interpolate(frame, [300, 560], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.4, 0.0, 0.2, 1),
	});

	// Beam visibility opacity
	const beamOpacity = interpolate(
		frame,
		[295, 305, 560, 580],
		[0, 1, 1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	// Wireframe opacity: fully visible in Act 1, masked in Act 2, hidden in Act 3 & 4
	const wireframeOpacity =
		frame < 300
			? 1
			: frame <= 560
				? 1
				: interpolate(frame, [560, 580], [1, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});

	// Photorealistic Glass reveal percentage: 0% in Act 1, revealed by beam in Act 2, 100% in Act 3
	const glassRevealPercent =
		frame < 300 ? 0 : frame <= 560 ? beamPercent : 100;

	// UI Collapse progress for Act 4 (Frames 1080 - 1140)
	const collapseProgress = interpolate(frame, [1080, 1140], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.6, 0.0, 0.2, 1),
	});

	const isUiVisible = frame < 1145;

	// ── ACT 3: Camera 3D Smooth Orbit (Frames 720 - 1080) ──
	// Smooth multi-axis orbit around fully rendered components
	let cameraOrbitY = -6;
	let cameraOrbitX = 8;
	let cameraDistanceZ = 20;

	if (frame >= 720 && frame < 1080) {
		const orbitT = (frame - 720) / 360; // 0 to 1
		cameraOrbitY =
			-6 +
			Math.sin(orbitT * Math.PI * 2) * 16 +
			Math.cos(orbitT * Math.PI) * 4;
		cameraOrbitX = 8 + Math.sin(orbitT * Math.PI * 2) * 8;
		cameraDistanceZ = 20 + Math.sin(orbitT * Math.PI) * 80; // macro push-in
	} else if (frame >= 1080) {
		cameraOrbitY = interpolate(frame, [1080, 1140], [-6, 0], {
			extrapolateRight: 'clamp',
		});
		cameraOrbitX = interpolate(frame, [1080, 1140], [8, 0], {
			extrapolateRight: 'clamp',
		});
		cameraDistanceZ = interpolate(frame, [1080, 1140], [20, -50], {
			extrapolateRight: 'clamp',
		});
	}

	const floatY = Math.sin(frame / 60) * 8;
	const floatX = Math.cos(frame / 75) * 6;

	const dynamicCameraTransform = `
		rotateX(${cameraOrbitX}deg)
		rotateY(${cameraOrbitY}deg)
		translateZ(${cameraDistanceZ}px)
		translateY(${floatY}px)
		translateX(${floatX}px)
		scale(${1 - collapseProgress * 0.96})
		rotateZ(${collapseProgress * 360}deg)
	`;

	// Background ambient fog pulse
	const fogPulse = 1 + Math.sin(frame * 0.03) * 0.06;

	return (
		<div
			style={{
				width: 1920,
				height: 1080,
				backgroundColor: '#07090E',
				position: 'relative',
				overflow: 'hidden',
				fontFamily: '"Plus Jakarta Sans", sans-serif',
			}}
		>
			{/* Octane Render Volumetric Background Lighting */}
			<div
				style={{
					position: 'absolute',
					top: '-20%',
					left: '15%',
					width: '70%',
					height: '140%',
					background: `
						radial-gradient(ellipse at 50% 40%, rgba(0, 240, 255, 0.09) 0%, rgba(99, 102, 241, 0.05) 30%, rgba(7, 9, 14, 0.8) 60%, transparent 80%)
					`,
					transform: `scale(${fogPulse})`,
					pointerEvents: 'none',
				}}
			/>

			{/* Studio Top Fill Light Rim */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: 350,
					background:
						'linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, transparent 100%)',
					pointerEvents: 'none',
				}}
			/>

			{/* ── ACT 1 & ACT 2: Bare-Bones Neon-Green Wireframes ── */}
			{isUiVisible && wireframeOpacity > 0.01 && (
				<WireframeWorkspace
					frame={frame}
					clipPercentage={glassRevealPercent}
					opacity={wireframeOpacity}
				/>
			)}

			{/* ── ACT 2 & ACT 3: Photorealistic Glassmorphism UI ── */}
			{isUiVisible && glassRevealPercent > 0.01 && (
				<PhotorealisticGlassUi
					frame={frame}
					clipPercentage={glassRevealPercent}
					opacity={1}
					cameraTransform={dynamicCameraTransform}
					collapseProgress={collapseProgress}
				/>
			)}

			{/* ── ACT 2: Sweeping Cyan Energy Beam Scan ── */}
			<EnergyScanBeam
				beamPercent={beamPercent}
				opacity={beamOpacity}
				frame={frame}
			/>

			{/* ── ACT 4: Glowing Geometric Orb Collapse & Metallic Kinetic Typography ── */}
			<GeometricOrbCollapse frame={frame} />

			{/* Cinematic Studio Vignette */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					boxShadow: 'inset 0 0 160px rgba(0, 0, 0, 0.85)',
					pointerEvents: 'none',
				}}
			/>
		</div>
	);
};
