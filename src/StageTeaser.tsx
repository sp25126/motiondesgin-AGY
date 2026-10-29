import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { StagePaperCanvas } from './components/StagePaperCanvas';
import { StageFrictionOverlay } from './components/StageFrictionOverlay';
import { StageBrowserChassis } from './components/StageBrowserChassis';
import { StagePinAndCursor } from './components/StagePinAndCursor';
import { StageComposerCard } from './components/StageComposerCard';
import { StageHeaderLockup } from './components/StageHeaderLockup';
import { StageCausticLight } from './components/StageCausticLight';

export const StageTeaser: React.FC = () => {
	const frame = useCurrentFrame();

	// === Act IV Camera Dolly-Out (Frame 310–360) ===
	// Slow, confident pull-back revealing the full composition
	const dollyScale = interpolate(
		frame,
		[310, 360],
		[1.0, 0.88],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	// === Micro Push-In during Act II+III (breathing camera) ===
	// Scale increases from 1.0 to 1.03 over 300 frames, then holds
	const breathePushIn = interpolate(
		frame,
		[60, 300],
		[1.0, 1.03],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 1, 0.5, 1) }
	);

	// Combine: breathe in, then dolly out for the finale
	const cameraScale = frame < 310 ? breathePushIn : dollyScale;

	// === Subtle rotation drift (cinematic handheld feel) ===
	const cameraRotate = Math.sin(frame / 90) * 0.15; // max ±0.15deg

	// === Fade in from white (cold open) ===
	const globalOpacity = interpolate(
		frame,
		[0, 8],
		[0, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FAF8F5',
				overflow: 'hidden',
				transform: `scale(${cameraScale}) rotate(${cameraRotate}deg)`,
				opacity: globalOpacity,
			}}
		>
			{/* ── Layer 1: Background Paper Canvas (parallax base) ── */}
			<StagePaperCanvas />

			{/* ── Layer 2: Act I — Friction chaos (screenshots barrage) ── */}
			<StageFrictionOverlay />

			{/* ── Layer 3: Act II — Browser chassis floating midground ── */}
			<StageBrowserChassis />

			{/* ── Layer 3.5: Caustic light from pin impact ── */}
			<StageCausticLight x={530} y={635} />

			{/* ── Layer 4: Cursor + Pin marker (foreground interactive) ── */}
			<StagePinAndCursor />

			{/* ── Layer 5: Comment composer card (closest foreground) ── */}
			<StageComposerCard />

			{/* ── Layer 6: Final header lockup (Act IV, top-center) ── */}
			<StageHeaderLockup />
		</AbsoluteFill>
	);
};
