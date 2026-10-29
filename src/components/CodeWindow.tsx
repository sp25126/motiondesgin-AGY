import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

const CODE_LINES = [
	{ text: 'import { spring, interpolate, useCurrentFrame } from "remotion";', color: '#A78BFA' },
	{ text: 'import { AntigravityCore } from "@antigravity/motion-engine";', color: '#60A5FA' },
	{ text: '', color: '#FFFFFF' },
	{ text: 'export const AntigravityLaunch: React.FC = () => {', color: '#F472B6' },
	{ text: '  const frame = useCurrentFrame();', color: '#34D399' },
	{ text: '  const scale = spring({ frame, config: { stiffness: 120, damping: 14 } });', color: '#FBBF24' },
	{ text: '', color: '#FFFFFF' },
	{ text: '  return (', color: '#F472B6' },
	{ text: '    <AntigravityCore physics={{ stiffness: 120, damping: 14 }}>', color: '#60A5FA' },
	{ text: '      <Orb scale={scale} color="gradient-ultra" />', color: '#A78BFA' },
	{ text: '      <Typography animation="staggered-mask">ANTIGRAVITY</Typography>', color: '#34D399' },
	{ text: '    </AntigravityCore>', color: '#60A5FA' },
	{ text: '  );', color: '#F472B6' },
	{ text: '};', color: '#F472B6' },
];

export const CodeWindow: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Window Entrance (Frame 130-170)
	const windowSpring = spring({
		frame: frame - 130,
		fps,
		config: { stiffness: 110, damping: 13 },
	});

	const windowOpacity = interpolate(
		frame,
		[130, 150, 310, 340],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Floating movement
	const floatY = Math.sin(frame / 11) * 8;

	// 3D Perspective Rotation for Climax (Frame 280-330)
	const rotateX = interpolate(
		frame,
		[280, 330],
		[0, 22],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const rotateY = interpolate(
		frame,
		[280, 330],
		[0, -18],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const translateZ = interpolate(
		frame,
		[280, 330],
		[0, 220],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	if (frame < 125) return null;

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '940px',
				height: '560px',
				marginLeft: '-470px',
				marginTop: '-265px',
				opacity: windowOpacity,
				transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) translateY(${floatY}px) scale(${windowSpring})`,
				zIndex: 20,
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					borderRadius: '20px',
					backgroundColor: 'rgba(15, 15, 22, 0.92)',
					backdropFilter: 'blur(30px)',
					border: '1px solid rgba(255, 255, 255, 0.15)',
					boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(96, 165, 250, 0.25)',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* Top Navigation Bar */}
				<div
					style={{
						height: '48px',
						backgroundColor: 'rgba(255, 255, 255, 0.04)',
						borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
						display: 'flex',
						alignItems: 'center',
						padding: '0 20px',
						justifyContent: 'space-between',
					}}
				>
					<div style={{ display: 'flex', gap: '9px' }}>
						<div style={{ width: '13px', height: '13px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
						<div style={{ width: '13px', height: '13px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
						<div style={{ width: '13px', height: '13px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
					</div>

					<div
						style={{
							fontSize: '13px',
							color: '#94A3B8',
							fontFamily: 'monospace',
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							backgroundColor: 'rgba(255, 255, 255, 0.05)',
							padding: '4px 14px',
							borderRadius: '8px',
						}}
					>
						<span style={{ color: '#60A5FA', fontWeight: 'bold' }}>⚛</span> AntigravityLaunch.tsx
					</div>

					<div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>
						60 FPS • Remotion Engine
					</div>
				</div>

				{/* Code Lines Container */}
				<div
					style={{
						padding: '28px 36px',
						flex: 1,
						fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
						fontSize: '15px',
						lineHeight: '1.65',
						color: '#F8FAFC',
						overflow: 'hidden',
						position: 'relative',
					}}
				>
					{CODE_LINES.map((line, index) => {
						const lineStartFrame = 145 + index * 7;
						const lineOpacity = interpolate(
							frame,
							[lineStartFrame, lineStartFrame + 6],
							[0, 1],
							{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
						);
						const lineX = interpolate(
							frame,
							[lineStartFrame, lineStartFrame + 8],
							[-24, 0],
							{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
						);

						const isCurrentTypingLine = frame >= lineStartFrame && frame < lineStartFrame + 7;

						return (
							<div
								key={index}
								style={{
									display: 'flex',
									alignItems: 'center',
									opacity: lineOpacity,
									transform: `translateX(${lineX}px)`,
									minHeight: '26px',
									backgroundColor: isCurrentTypingLine ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
									borderRadius: '4px',
									paddingRight: '8px',
								}}
							>
								<span
									style={{
										width: '40px',
										color: '#475569',
										userSelect: 'none',
										textAlign: 'right',
										paddingRight: '18px',
										fontSize: '13px',
									}}
								>
									{index + 1}
								</span>
								<span style={{ color: line.color }}>{line.text}</span>
								{isCurrentTypingLine && (
									<span
										style={{
											width: '8px',
											height: '18px',
											backgroundColor: '#60A5FA',
											marginLeft: '4px',
											display: 'inline-block',
										}}
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
