import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';
import { IphoneFrame } from './components/IphoneFrame';
import { StageMobileLoginForm } from './components/StageMobileLoginForm';
import { StageTravelPin } from './components/StageTravelPin';

export const StageMobileLoginRedesign: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── ACT I: CANVAS ENTRANCE (Frames 0 - 40) ──
	const canvasSpring = spring({
		frame,
		fps,
		config: { stiffness: 120, damping: 18 },
	});
	const canvasScale = interpolate(canvasSpring, [0, 1], [0.94, 1.0]);
	const canvasOpacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Subtle organic breathing float
	const phoneFloat = Math.sin(frame / 40) * 4;

	// ── ACT II: STAGE PIN DROP (Starts at Frame 60) ──
	const pinDropFrame = 60;

	// ── ACT III: ORGANIC BREATHING EXPANSION (Frames 140 - 270) ──
	// Exact easing requested: cubic-bezier(0.25, 1, 0.5, 1)
	const expansionStartFrame = 140;
	const expansionEndFrame = 270;

	const expandProgress = interpolate(frame, [expansionStartFrame, expansionEndFrame], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.25, 1, 0.5, 1), // cubic-bezier(0.25, 1, 0.5, 1)
	});

	// Camera Zoom-in towards the relaxed mobile UI
	const cameraZoomProgress = interpolate(frame, [260, 360], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const cameraZoom = interpolate(cameraZoomProgress, [0, 1], [1.0, 1.08]);
	const cameraPanY = interpolate(cameraZoomProgress, [0, 1], [0, -15]);

	// Success pill entrance (Frames 310+)
	const metricSpring = spring({
		frame: frame - 310,
		fps,
		config: { stiffness: 180, damping: 16 },
	});
	const metricOpacity = interpolate(frame, [310, 325], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const metricY = interpolate(metricSpring, [0, 1], [25, 0]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#07090E', // Dark STAGE canvas
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* STAGE Precision Grid */}
			<div
				style={{
					position: 'absolute',
					inset: -80,
					backgroundImage: `
						radial-gradient(circle at 50% 45%, rgba(0, 102, 255, 0.16) 0%, transparent 65%),
						linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
					`,
					backgroundSize: '100% 100%, 48px 48px, 48px 48px',
					opacity: 0.85,
				}}
			/>

			{/* STAGE Top Bar */}
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
							epfindia.gov.in / Mobile Login Viewport
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
						iPhone 16 Pro Viewport
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
					<div style={{ padding: '4px 10px', borderRadius: 6 }}>Zoom [Z]</div>
					<div
						style={{
							padding: '4px 10px',
							borderRadius: 6,
							backgroundColor: '#0066FF',
							color: '#FFF',
							fontWeight: 700,
						}}
					>
						Pin [P]
					</div>
					<div style={{ padding: '4px 10px', borderRadius: 6 }}>Relax [R]</div>
				</div>
			</div>

			{/* ── CENTER IPHONE CONTAINER WITH STAGE PIN ── */}
			<div
				style={{
					position: 'relative',
					transform: `scale(${canvasScale * cameraZoom}) translateY(${phoneFloat + cameraPanY}px)`,
					opacity: canvasOpacity,
					transformOrigin: 'center center',
				}}
			>
				{/* iPhone Mobile Chassis */}
				<IphoneFrame width={410} height={820}>
					<StageMobileLoginForm progress={expandProgress} />
				</IphoneFrame>

				{/* STAGE Pin & Tooltip Dropping on the Mobile Form */}
				<StageTravelPin
					targetX={340}
					targetY={360}
					dropStartFrame={pinDropFrame}
					authorName="Elena Rostova"
					authorRole="Lead Mobile Architect"
					commentText="Desktop form rendered at 0.5x zoom with microscopic 24px boxes & broken CAPTCHA. Expanding to 100% width, 48px touch inputs, and 16px Inter font."
					tagText="STAGE // MOBILE RELAX"
				/>
			</div>

			{/* ── 3. BOTTOM SUCCESS METRIC PILL ── */}
			{frame >= 310 && (
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
						<span style={{ fontSize: 16 }}>📱</span>
						<span style={{ fontSize: 13, fontWeight: 700, color: '#00F0FF' }}>
							Mobile Breathing Morph Complete
						</span>
					</div>
					<div style={{ width: 1, height: 16, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
					<div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12.5, color: 'rgba(255, 255, 255, 0.85)' }}>
						<span>📐 100% Width &amp; 48px Height</span>
						<span>•</span>
						<span>🔤 16px Inter Typography</span>
						<span>•</span>
						<span>✨ Frictionless Passkey Toggle</span>
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};
