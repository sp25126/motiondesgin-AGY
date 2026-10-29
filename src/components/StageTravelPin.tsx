import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

interface StageTravelPinProps {
	targetX: number;
	targetY: number;
	dropStartFrame?: number;
	authorName?: string;
	authorRole?: string;
	commentText?: string;
	tagText?: string;
}

export const StageTravelPin: React.FC<StageTravelPinProps> = ({
	targetX,
	targetY,
	dropStartFrame = 70,
	authorName = 'Sarah Lin',
	authorRole = 'Principal Product Designer',
	commentText = 'Cramped 32px inputs & noisy banner ads hurt conversion. Elevating to frictionless 56px inputs with soft borders & clean hierarchy.',
	tagText = 'STAGE // UX REDESIGN',
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Pin Drop Spring Physics (Overshoot bounce)
	const dropSpring = spring({
		frame: frame - dropStartFrame,
		fps,
		config: {
			stiffness: 260,
			damping: 14,
			mass: 0.9,
		},
	});

	// Vertical drop trajectory from Y: -240 to targetY with overshoot
	const pinY = interpolate(dropSpring, [0, 1], [-180, 0]);
	const pinScale = interpolate(dropSpring, [0, 0.6, 1], [1.4, 0.92, 1]);
	const pinOpacity = interpolate(frame, [dropStartFrame, dropStartFrame + 6], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Shockwave pulse on landing (Frame = dropStartFrame + 14)
	const impactFrame = dropStartFrame + 14;
	const shockwaveProgress = interpolate(frame, [impactFrame, impactFrame + 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const shockwaveSize = interpolate(shockwaveProgress, [0, 1], [16, 120]);
	const shockwaveOpacity = interpolate(shockwaveProgress, [0, 0.2, 1], [0, 0.9, 0]);

	// Secondary echo wave
	const echoProgress = interpolate(frame, [impactFrame + 8, impactFrame + 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const echoSize = interpolate(echoProgress, [0, 1], [10, 80]);
	const echoOpacity = interpolate(echoProgress, [0, 0.3, 1], [0, 0.6, 0]);

	// Floating micro-hover after landing
	const hoverOffset = frame > impactFrame ? Math.sin((frame - impactFrame) / 22) * 3 : 0;

	// Tooltip Slide Out Physics
	const tooltipStartFrame = dropStartFrame + 22;
	const tooltipSpring = spring({
		frame: frame - tooltipStartFrame,
		fps,
		config: {
			stiffness: 190,
			damping: 16,
		},
	});

	const tooltipX = interpolate(tooltipSpring, [0, 1], [24, 46]);
	const tooltipOpacity = interpolate(frame, [tooltipStartFrame, tooltipStartFrame + 12], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const tooltipScale = interpolate(tooltipSpring, [0, 1], [0.85, 1]);

	// Pin glowing pulse animation
	const glowPulse = 0.75 + Math.sin(frame / 12) * 0.25;

	if (frame < dropStartFrame) return null;

	return (
		<div
			style={{
				position: 'absolute',
				left: targetX,
				top: targetY,
				zIndex: 90,
				pointerEvents: 'none',
				transform: `translate3d(0, ${hoverOffset}px, 0)`,
			}}
		>
			{/* Shockwave Rings on Impact */}
			{shockwaveProgress > 0 && shockwaveProgress < 1 && (
				<div
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: shockwaveSize,
						height: shockwaveSize,
						borderRadius: '50%',
						border: '2px solid #00F0FF',
						boxShadow: '0 0 20px rgba(0, 240, 255, 0.8), inset 0 0 15px rgba(0, 102, 255, 0.5)',
						transform: 'translate(-50%, -50%)',
						opacity: shockwaveOpacity,
					}}
				/>
			)}

			{echoProgress > 0 && echoProgress < 1 && (
				<div
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						width: echoSize,
						height: echoSize,
						borderRadius: '50%',
						border: '1.5px solid #0066FF',
						transform: 'translate(-50%, -50%)',
						opacity: echoOpacity,
					}}
				/>
			)}

			{/* Glowing Pin Body */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					transform: `translate(-50%, -100%) translateY(${pinY}px) scale(${pinScale})`,
					transformOrigin: 'bottom center',
					opacity: pinOpacity,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{/* Pin Head */}
				<div
					style={{
						width: 44,
						height: 44,
						borderRadius: '50% 50% 50% 4px',
						transform: 'rotate(-45deg)',
						backgroundColor: '#0066FF',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: `
							0 0 ${24 * glowPulse}px rgba(0, 102, 255, 0.9),
							0 0 ${48 * glowPulse}px rgba(0, 240, 255, 0.4),
							0 12px 24px rgba(0, 0, 0, 0.5),
							inset 0 2px 4px rgba(255, 255, 255, 0.6)
						`,
						border: '2px solid rgba(255, 255, 255, 0.9)',
						position: 'relative',
					}}
				>
					{/* Inner Target Core */}
					<div
						style={{
							transform: 'rotate(45deg)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#FFFFFF',
							fontWeight: 800,
							fontSize: 15,
							fontFamily: '"JetBrains Mono", monospace',
							letterSpacing: '-0.02em',
						}}
					>
						01
					</div>
				</div>

				{/* Needle Tip Contact Shadow */}
				<div
					style={{
						width: 8,
						height: 4,
						borderRadius: '50%',
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
						filter: 'blur(1px)',
						marginTop: 2,
					}}
				/>
			</div>

			{/* Frosted Glass Tooltip Card (rgba(255,255,255,0.1); backdrop-filter: blur(10px)) */}
			{frame >= tooltipStartFrame && (
				<div
					style={{
						position: 'absolute',
						left: 0,
						top: -70,
						transform: `translate3d(${tooltipX}px, 0, 0) scale(${tooltipScale})`,
						transformOrigin: 'left center',
						opacity: tooltipOpacity,
						width: 380,
						padding: '16px 18px',
						borderRadius: 16,
						backgroundColor: 'rgba(255, 255, 255, 0.1)',
						backdropFilter: 'blur(12px)',
						WebkitBackdropFilter: 'blur(12px)',
						border: '1px solid rgba(255, 255, 255, 0.22)',
						boxShadow: `
							0 24px 48px rgba(0, 0, 0, 0.6),
							0 4px 12px rgba(0, 0, 0, 0.3),
							inset 0 1px 1px rgba(255, 255, 255, 0.3),
							0 0 30px rgba(0, 102, 255, 0.18)
						`,
						color: '#FFFFFF',
						fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
					}}
				>
					{/* Card Top Pill Header */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: 10,
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
							{/* User Avatar */}
							<div
								style={{
									width: 26,
									height: 26,
									borderRadius: '50%',
									background: 'linear-gradient(135deg, #0066FF 0%, #00F0FF 100%)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: 12,
									fontWeight: 700,
									color: '#FFFFFF',
									boxShadow: '0 2px 6px rgba(0, 102, 255, 0.4)',
								}}
							>
								SL
							</div>
							<div>
								<div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2, color: '#FFFFFF' }}>
									{authorName}
								</div>
								<div style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>
									{authorRole}
								</div>
							</div>
						</div>

						{/* Tag Pill */}
						<div
							style={{
								fontSize: 9,
								fontWeight: 700,
								letterSpacing: '0.06em',
								textTransform: 'uppercase',
								padding: '4px 8px',
								borderRadius: 6,
								backgroundColor: 'rgba(0, 102, 255, 0.3)',
								border: '1px solid rgba(0, 240, 255, 0.4)',
								color: '#00F0FF',
								boxShadow: '0 0 12px rgba(0, 240, 255, 0.2)',
							}}
						>
							{tagText}
						</div>
					</div>

					{/* Comment Text */}
					<div
						style={{
							fontSize: 12.5,
							lineHeight: 1.45,
							color: 'rgba(255, 255, 255, 0.92)',
							fontWeight: 400,
							marginBottom: 12,
						}}
					>
						{commentText}
					</div>

					{/* Action Status Footer */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							paddingTop: 10,
							borderTop: '1px solid rgba(255, 255, 255, 0.12)',
							fontSize: 11,
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00F0FF' }}>
							<span
								style={{
									width: 7,
									height: 7,
									borderRadius: '50%',
									backgroundColor: '#00F0FF',
									boxShadow: '0 0 8px #00F0FF',
									display: 'inline-block',
								}}
							/>
							<span style={{ fontWeight: 600 }}>Executing STAGE Sweep</span>
						</div>
						<div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 10, fontWeight: 500 }}>
							Just now
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
