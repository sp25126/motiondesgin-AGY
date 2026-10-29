import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';
import { StageGovHeaderCluttered } from './components/StageGovHeaderCluttered';
import { StageGovHeaderModern } from './components/StageGovHeaderModern';
import { StageTravelPin } from './components/StageTravelPin';

export const StageGovNavRedesign: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── ACT I: CANVAS ENTRANCE (Frames 0 - 40) ──
	const canvasSpring = spring({
		frame,
		fps,
		config: { stiffness: 120, damping: 18 },
	});
	const canvasScale = interpolate(canvasSpring, [0, 1], [0.95, 1.0]);
	const canvasOpacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Subtle organic camera float
	const cameraFloat = Math.sin(frame / 45) * 3;

	// ── ACT II: STAGE PIN DROP (Frame 50) ──
	const pinDropFrame = 50;

	// ── ACT III: HORIZONTAL WIPE & FLUID ACCORDION COLLAPSE (Frames 140 - 280) ──
	const wipeStartFrame = 140;
	const wipeEndFrame = 280;

	const wipeProgress = interpolate(frame, [wipeStartFrame, wipeEndFrame], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.65, 0, 0.35, 1),
	});

	const isWipeActive = frame >= wipeStartFrame && frame <= wipeEndFrame + 15;
	const wipePercent = wipeProgress * 100;

	// Accordion collapse progress of links into "☰ Menu"
	const collapseProgress = interpolate(frame, [wipeStartFrame + 20, wipeEndFrame], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	// Login button elevation & scale up to 1.10x + #15803D color transition
	const loginProminence = interpolate(frame, [wipeStartFrame + 30, wipeEndFrame + 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	// ── ACT IV: CAMERA DRAW TO THE PROMINENT LOGIN BUTTON (Frames 280 - 420) ──
	const focusProgress = interpolate(frame, [280, 360], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const focusZoom = interpolate(focusProgress, [0, 1], [1.0, 1.06]);
	const focusPanX = interpolate(focusProgress, [0, 1], [0, -40]);
	const focusPanY = interpolate(focusProgress, [0, 1], [0, 20]);

	// Success pill entrance
	const metricSpring = spring({
		frame: frame - 320,
		fps,
		config: { stiffness: 180, damping: 16 },
	});
	const metricOpacity = interpolate(frame, [320, 335], [0, 1], {
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
			{/* STAGE Precision Grid */}
			<div
				style={{
					position: 'absolute',
					inset: -80,
					backgroundImage: `
						radial-gradient(circle at 60% 35%, rgba(0, 102, 255, 0.14) 0%, transparent 70%),
						linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
					`,
					backgroundSize: '100% 100%, 48px 48px, 48px 48px',
					opacity: 0.85,
				}}
			/>

			{/* STAGE Top Nav & Context */}
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
							incometax.gov.in / Header Navigation Refactor
						</span>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 6,
							backgroundColor: 'rgba(21, 128, 61, 0.2)',
							border: '1px solid rgba(34, 197, 94, 0.4)',
							borderRadius: 20,
							padding: '4px 12px',
							fontSize: 11,
							color: '#4ADE80',
							fontWeight: 700,
						}}
					>
						<span
							style={{
								width: 6,
								height: 6,
								borderRadius: '50%',
								backgroundColor: '#22C55E',
								boxShadow: '0 0 8px #22C55E',
							}}
						/>
						Live Preview
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
					<div style={{ padding: '4px 10px', borderRadius: 6 }}>Inspect</div>
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
					<div style={{ padding: '4px 10px', borderRadius: 6 }}>Accordion [A]</div>
				</div>
			</div>

			{/* ── MAIN PORTAL ARTBOARD CANVAS ── */}
			<div
				style={{
					width: 1480,
					height: 780,
					borderRadius: 20,
					backgroundColor: '#FFFFFF',
					boxShadow: `
						0 30px 90px -15px rgba(0, 0, 0, 0.9),
						0 0 0 1px rgba(255, 255, 255, 0.1),
						0 0 50px rgba(0, 102, 255, 0.15)
					`,
					overflow: 'hidden',
					position: 'relative',
					transform: `scale(${canvasScale * focusZoom}) translate(${focusPanX}px, ${cameraFloat + focusPanY}px)`,
					opacity: canvasOpacity,
					transformOrigin: 'center center',
				}}
			>
				{/* LAYER A: BEFORE STATE (Cluttered Heavy Blue Navbar) */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						zIndex: 10,
					}}
				>
					<StageGovHeaderCluttered />
				</div>

				{/* LAYER B: AFTER STATE (Modern Streamlined Header + Accordion Menu + Prominent Green Login) */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						zIndex: 20,
						clipPath: `polygon(0 0, ${wipePercent}% 0, ${wipePercent}% 100%, 0 100%)`,
					}}
				>
					<StageGovHeaderModern
						collapseProgress={collapseProgress}
						loginProminence={loginProminence}
					/>
				</div>

				{/* LAYER C: HORIZONTAL VOLUMETRIC CYAN WIPE BEAM */}
				{isWipeActive && (
					<div
						style={{
							position: 'absolute',
							top: 0,
							bottom: 0,
							left: `${wipePercent}%`,
							transform: 'translateX(-50%)',
							width: 4,
							backgroundColor: '#FFFFFF',
							boxShadow: `
								0 0 10px #FFFFFF,
								0 0 25px #00F0FF,
								0 0 60px #0066FF,
								0 0 100px rgba(0, 240, 255, 0.8)
							`,
							zIndex: 40,
							pointerEvents: 'none',
						}}
					>
						{/* Vertical Laser Light Flare */}
						<div
							style={{
								position: 'absolute',
								top: '30%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: 12,
								height: 120,
								borderRadius: '50%',
								backgroundColor: '#FFFFFF',
								boxShadow: '0 0 30px #00F0FF',
								filter: 'blur(2px)',
							}}
						/>
						{/* Trailing Left Glow */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								right: 0,
								width: 80,
								background: 'linear-gradient(to left, rgba(0, 240, 255, 0.35) 0%, transparent 100%)',
								pointerEvents: 'none',
							}}
						/>
					</div>
				)}

				{/* LAYER D: STAGE PIN ON THE NAVIGATION BAR */}
				<StageTravelPin
					targetX={620}
					targetY={115}
					dropStartFrame={pinDropFrame}
					authorName="Marcus Vance"
					authorRole="Lead UX Strategist"
					commentText="Heavy blue bar with 7+ tiny links creates cognitive overload. Collapsing links into '☰ Menu' and elevating Login to #15803D draws immediate focus."
					tagText="STAGE // NAV REFACTOR"
				/>
			</div>

			{/* ── 3. BOTTOM RESULT METRIC PILL ── */}
			{frame >= 320 && (
				<div
					style={{
						position: 'absolute',
						bottom: 36,
						zIndex: 110,
						transform: `translateY(${metricY}px)`,
						opacity: metricOpacity,
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						backgroundColor: 'rgba(10, 15, 28, 0.88)',
						backdropFilter: 'blur(16px)',
						border: '1px solid rgba(34, 197, 94, 0.4)',
						boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 30px rgba(34, 197, 94, 0.2)',
						padding: '10px 24px',
						borderRadius: 30,
						color: '#FFFFFF',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<span style={{ fontSize: 16 }}>🎯</span>
						<span style={{ fontSize: 13, fontWeight: 700, color: '#4ADE80' }}>
							Fluid Accordion Collapse Active
						</span>
					</div>
					<div style={{ width: 1, height: 16, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
					<div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12.5, color: 'rgba(255, 255, 255, 0.85)' }}>
						<span>☰ Clean Menu Drawer</span>
						<span>•</span>
						<span>🟢 Login Scaled 1.10x (#15803D)</span>
						<span>•</span>
						<span>⚡ Eye Focus Directed to CTA</span>
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};
