import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { DashboardContent } from './DashboardContent';

const PROMPT_TEXT = "Analyze Q3 revenue trends & generate action plan...";

export const MorphContainer: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Container Entrance Spring (Frame 0-30)
	const containerSpring = spring({
		frame,
		fps,
		config: { stiffness: 140, damping: 14 },
	});

	// Morph Phase 1: Search Bar (580x66) -> Dashboard (1180x680) (Frame 90-130)
	const widthDashboard = interpolate(
		frame,
		[90, 130],
		[620, 1180],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const heightDashboard = interpolate(
		frame,
		[90, 130],
		[66, 680],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const radiusDashboard = interpolate(
		frame,
		[90, 130],
		[33, 24],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Morph Phase 2: Dashboard (1180x680) -> Logo Box (110x110) (Frame 300-340)
	const widthFinal = interpolate(
		frame,
		[300, 340],
		[widthDashboard, 110],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const heightFinal = interpolate(
		frame,
		[300, 340],
		[heightDashboard, 110],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const radiusFinal = interpolate(
		frame,
		[300, 340],
		[radiusDashboard, 30],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const currentWidth = widthFinal;
	const currentHeight = heightFinal;
	const currentRadius = radiusFinal;

	// Search Mode Content Opacity (Frame 0 to 95)
	const searchOpacity = interpolate(
		frame,
		[80, 95],
		[1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Continuous micro floating
	const floatY = Math.sin(frame / 15) * 6;

	// Search bar prompt typing simulation (Frame 20 to 80)
	const charCount = Math.floor(
		interpolate(
			frame,
			[20, 75],
			[0, PROMPT_TEXT.length],
			{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
		)
	);

	const typedText = PROMPT_TEXT.slice(0, charCount);

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: `${currentWidth}px`,
				height: `${currentHeight}px`,
				marginLeft: `-${currentWidth / 2}px`,
				marginTop: `-${currentHeight / 2}px`,
				borderRadius: `${currentRadius}px`,
				backgroundColor: 'rgba(15, 15, 23, 0.92)',
				backdropFilter: 'blur(30px)',
				border: '1px solid rgba(255, 255, 255, 0.15)',
				boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.7), 0 0 50px rgba(56, 189, 248, 0.25)',
				transform: `translateY(${floatY}px) scale(${containerSpring})`,
				zIndex: 20,
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transition: 'box-shadow 0.2s ease',
			}}
		>
			{/* Phase 1: Search Bar Content */}
			{frame < 100 && (
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						padding: '0 24px',
						justifyContent: 'space-between',
						opacity: searchOpacity,
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
						<span style={{ fontSize: '20px', color: '#38BDF8' }}>✨</span>
						<span style={{ fontSize: '16px', color: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
							{typedText}
						</span>
						{frame >= 20 && frame <= 85 && (
							<span
								style={{
									width: '2px',
									height: '20px',
									backgroundColor: '#38BDF8',
									display: 'inline-block',
									opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0.2,
								}}
							/>
						)}
					</div>

					<div
						style={{
							backgroundColor: '#38BDF8',
							color: '#0A0A0A',
							fontSize: '12px',
							fontWeight: 800,
							padding: '8px 18px',
							borderRadius: '20px',
							fontFamily: 'monospace',
						}}
					>
						RUN AI
					</div>
				</div>
			)}

			{/* Phase 2: Dashboard Content */}
			{frame >= 85 && frame < 310 && <DashboardContent />}
		</div>
	);
};
