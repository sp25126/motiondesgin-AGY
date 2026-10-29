import React from 'react';
import { spring } from 'remotion';

interface PhotorealisticGlassUiProps {
	frame: number;
	clipPercentage?: number; // 0 to 100%, for scanning beam reveal
	opacity?: number;
	cameraTransform?: string;
	collapseProgress?: number; // 0 to 1 for Act 4 orb collapse
}

export const PhotorealisticGlassUi: React.FC<PhotorealisticGlassUiProps> = ({
	frame,
	clipPercentage = 100,
	opacity = 1,
	cameraTransform = '',
	collapseProgress = 0,
}) => {
	// Floating idle motion
	const floatY = Math.sin(frame / 60) * 10;
	const floatX = Math.cos(frame / 75) * 8;
	const defaultTiltX = 8 + Math.sin(frame / 80) * 2;
	const defaultTiltY = -6 + Math.cos(frame / 90) * 2;

	// Self-animating CTA Button click cycles (e.g. at frame 780 and 900)
	// Zero cursor needed: the button presses itself with soft spring recoil
	const pressCycle1 = Math.max(0, Math.min(1, (frame - 760) / 40));
	const pressCycle2 = Math.max(0, Math.min(1, (frame - 880) / 40));
	const buttonPress1 =
		pressCycle1 > 0 && pressCycle1 < 1
			? Math.sin(pressCycle1 * Math.PI) * 0.08
			: 0;
	const buttonPress2 =
		pressCycle2 > 0 && pressCycle2 < 1
			? Math.sin(pressCycle2 * Math.PI) * 0.08
			: 0;
	const buttonScale = 1 - buttonPress1 - buttonPress2;
	const buttonGlow =
		buttonPress1 > 0.03 || buttonPress2 > 0.03
			? '0 0 35px #00F0FF, 0 0 70px rgba(59, 130, 246, 0.8)'
			: '0 0 20px rgba(0, 240, 255, 0.4), 0 10px 25px rgba(0, 0, 0, 0.5)';

	// Self-animating Badges with soft bounce physics
	const badge1Spring = spring({
		frame: Math.max(0, frame - 730),
		fps: 60,
		config: { damping: 11, stiffness: 100, mass: 0.8 },
	});

	const badge2Spring = spring({
		frame: Math.max(0, frame - 800),
		fps: 60,
		config: { damping: 11, stiffness: 100, mass: 0.8 },
	});

	// Fluid Graph dynamic wave formula
	// Zero manual keyframes: pure procedural trigonometry
	const pointsCount = 10;
	const graphWidth = 460;
	const graphHeight = 150;
	const wavePoints: [number, number][] = [];
	for (let i = 0; i < pointsCount; i++) {
		const px = (i / (pointsCount - 1)) * graphWidth;
		const baseCurve = 110 - (i / (pointsCount - 1)) * 75; // general upward trend
		const wave = Math.sin(frame * 0.05 + i * 0.8) * 14;
		const py = Math.max(20, Math.min(140, baseCurve + wave));
		wavePoints.push([px, py]);
	}

	// Build smooth SVG bezier path
	let splinePath = `M ${wavePoints[0][0]},${wavePoints[0][1]}`;
	for (let i = 0; i < wavePoints.length - 1; i++) {
		const p0 = wavePoints[i];
		const p1 = wavePoints[i + 1];
		const midX = (p0[0] + p1[0]) / 2;
		splinePath += ` Q ${p0[0]},${p0[1]} ${midX},${(p0[1] + p1[1]) / 2} T ${p1[0]},${p1[1]}`;
	}
	const areaPath = `${splinePath} L ${graphWidth},${graphHeight} L 0,${graphHeight} Z`;

	// Collapse transform (Act 4)
	const collapseScale = 1 - collapseProgress * 0.95;
	const collapseRotate = collapseProgress * 360;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: 1400,
				transformStyle: 'preserve-3d',
				clipPath: `polygon(0 0, ${clipPercentage}% 0, ${clipPercentage}% 100%, 0 100%)`,
				opacity,
				pointerEvents: 'none',
			}}
		>
			{/* Master UI 3D Container with Camera Orbit support */}
			<div
				style={{
					width: 1280,
					transform:
						cameraTransform ||
						`
						rotateX(${defaultTiltX}deg)
						rotateY(${defaultTiltY}deg)
						translateY(${floatY}px)
						translateX(${floatX}px)
						scale(${collapseScale})
						rotateZ(${collapseRotate}deg)
					`,
					transformStyle: 'preserve-3d',
					display: 'flex',
					gap: 36,
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					transition: 'none',
				}}
			>
				{/* ── High-Fidelity Glassmorphic Pricing Table ── */}
				<div
					style={{
						width: 440,
						borderRadius: 24,
						padding: '36px 32px',
						background:
							'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
						backdropFilter: 'blur(16px)',
						WebkitBackdropFilter: 'blur(16px)',
						border: '1px solid rgba(255, 255, 255, 0.16)',
						boxShadow: `
							0 30px 60px -12px rgba(0, 0, 0, 0.75),
							0 0 50px rgba(0, 240, 255, 0.12),
							inset 0 1px 1px rgba(255, 255, 255, 0.35),
							inset 0 -1px 1px rgba(0, 0, 0, 0.5)
						`,
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						gap: 22,
						transform: 'translateZ(30px)',
					}}
				>
					{/* Iridescent Header Bar */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<div>
							<div
								style={{
									fontSize: 12,
									fontWeight: 700,
									letterSpacing: '0.15em',
									color: '#00F0FF',
									textTransform: 'uppercase',
									marginBottom: 4,
								}}
							>
								Pipeline Tier
							</div>
							<div
								style={{
									fontSize: 22,
									fontWeight: 800,
									color: '#FFFFFF',
									fontFamily: '"Plus Jakarta Sans", sans-serif',
								}}
							>
								Autonomous Pro
							</div>
						</div>
						<div
							style={{
								padding: '6px 14px',
								background:
									'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(168, 85, 247, 0.2))',
								border: '1px solid rgba(0, 240, 255, 0.4)',
								borderRadius: 999,
								fontSize: 11,
								fontWeight: 700,
								color: '#E0F2FE',
								boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
							}}
						>
							ACTIVE AI
						</div>
					</div>

					{/* Pricing Counter */}
					<div
						style={{
							display: 'flex',
							alignItems: 'baseline',
							gap: 8,
							paddingBottom: 16,
							borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
						}}
					>
						<span
							style={{
								fontSize: 54,
								fontWeight: 900,
								color: '#FFFFFF',
								letterSpacing: '-0.03em',
								fontFamily: '"Plus Jakarta Sans", sans-serif',
								background:
									'linear-gradient(180deg, #FFFFFF 0%, #BAE6FD 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
							}}
						>
							$249
						</span>
						<span
							style={{
								fontSize: 16,
								fontWeight: 500,
								color: 'rgba(255, 255, 255, 0.5)',
							}}
						>
							/ seat / mo
						</span>
					</div>

					{/* Feature Items */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 14,
						}}
					>
						{[
							'Zero Manual Keyframing',
							'Sub-pixel Fluid Motion Graph',
							'Autonomous Neural UI Synthesis',
							'60 FPS Hardware Ray-Casting',
						].map((feature, i) => (
							<div
								key={i}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 12,
								}}
							>
								<div
									style={{
										width: 20,
										height: 20,
										borderRadius: '50%',
										background:
											'linear-gradient(135deg, #00F0FF, #3B82F6)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 11,
										fontWeight: 900,
										color: '#07090E',
										boxShadow: '0 0 10px rgba(0, 240, 255, 0.4)',
									}}
								>
									✓
								</div>
								<span
									style={{
										fontSize: 14,
										fontWeight: 500,
										color: 'rgba(255, 255, 255, 0.88)',
										letterSpacing: '-0.01em',
									}}
								>
									{feature}
								</span>
							</div>
						))}
					</div>

					{/* Self-Pressing Glowing Button */}
					<div
						style={{
							marginTop: 10,
							height: 52,
							background:
								'linear-gradient(135deg, #00F0FF 0%, #3B82F6 50%, #8B5CF6 100%)',
							borderRadius: 14,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#050B14',
							fontFamily: '"Plus Jakarta Sans", sans-serif',
							fontSize: 15,
							fontWeight: 800,
							letterSpacing: '0.04em',
							boxShadow: buttonGlow,
							transform: `scale(${buttonScale})`,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Subtle specular reflection pass */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								height: '50%',
								background:
									'linear-gradient(to bottom, rgba(255, 255, 255, 0.35), transparent)',
								borderRadius: '14px 14px 0 0',
							}}
						/>
						INITIALIZE PIPELINE
					</div>
				</div>

				{/* ── High-Fidelity Photorealistic Fluid Graph Card ── */}
				<div
					style={{
						width: 530,
						borderRadius: 24,
						padding: '34px 32px',
						background:
							'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
						backdropFilter: 'blur(32px)',
						WebkitBackdropFilter: 'blur(32px)',
						border: '1px solid rgba(255, 255, 255, 0.16)',
						boxShadow: `
							0 30px 60px -12px rgba(0, 0, 0, 0.75),
							0 0 50px rgba(168, 85, 247, 0.12),
							inset 0 1px 1px rgba(255, 255, 255, 0.35),
							inset 0 -1px 1px rgba(0, 0, 0, 0.5)
						`,
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						gap: 20,
						transform: 'translateZ(50px)',
					}}
				>
					{/* Metric Header */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
						}}
					>
						<div>
							<div
								style={{
									fontSize: 12,
									fontWeight: 700,
									letterSpacing: '0.12em',
									color: '#A855F7',
									textTransform: 'uppercase',
								}}
							>
								Autonomous Throughput
							</div>
							<div
								style={{
									fontSize: 34,
									fontWeight: 900,
									color: '#FFFFFF',
									fontFamily: '"Plus Jakarta Sans", sans-serif',
									marginTop: 4,
								}}
							>
								4,892.4{' '}
								<span
									style={{
										fontSize: 18,
										fontWeight: 600,
										color: '#00F0FF',
									}}
								>
									ops/sec
								</span>
							</div>
						</div>
						<div
							style={{
								padding: '6px 14px',
								background: 'rgba(34, 197, 94, 0.15)',
								border: '1px solid rgba(74, 222, 128, 0.4)',
								borderRadius: 999,
								fontSize: 12,
								fontWeight: 700,
								color: '#4ADE80',
								display: 'flex',
								alignItems: 'center',
								gap: 6,
							}}
						>
							<div
								style={{
									width: 6,
									height: 6,
									borderRadius: '50%',
									background: '#4ADE80',
									boxShadow: '0 0 8px #4ADE80',
								}}
							/>
							+412.8%
						</div>
					</div>

					{/* Fluid SVG Graph with Area Glow */}
					<div
						style={{
							height: 160,
							position: 'relative',
							overflow: 'hidden',
							borderRadius: 12,
							background: 'rgba(5, 12, 24, 0.45)',
							border: '1px solid rgba(255, 255, 255, 0.06)',
						}}
					>
						<svg
							width="100%"
							height="100%"
							viewBox={`0 0 ${graphWidth} ${graphHeight}`}
							preserveAspectRatio="none"
							fill="none"
						>
							<defs>
								<linearGradient
									id="graphAreaGradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="0%"
										stopColor="#00F0FF"
										stopOpacity="0.45"
									/>
									<stop
										offset="60%"
										stopColor="#8B5CF6"
										stopOpacity="0.15"
									/>
									<stop
										offset="100%"
										stopColor="#050B14"
										stopOpacity="0.0"
									/>
								</linearGradient>
								<linearGradient
									id="graphStrokeGradient"
									x1="0"
									y1="0"
									x2="1"
									y2="0"
								>
									<stop offset="0%" stopColor="#00F0FF" />
									<stop offset="50%" stopColor="#3B82F6" />
									<stop offset="100%" stopColor="#C084FC" />
								</linearGradient>
							</defs>

							{/* Area Glow */}
							<path d={areaPath} fill="url(#graphAreaGradient)" />

							{/* Fluid Stroke */}
							<path
								d={splinePath}
								stroke="url(#graphStrokeGradient)"
								strokeWidth="3.5"
								strokeLinecap="round"
								style={{
									filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.8))',
								}}
							/>

							{/* Glowing Wave Nodes */}
							{wavePoints.map(([px, py], i) => (
								<circle
									key={i}
									cx={px}
									cy={py}
									r={i % 2 === 0 ? 5 : 3.5}
									fill="#FFFFFF"
									stroke="#00F0FF"
									strokeWidth="2"
									style={{
										filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.9))',
									}}
								/>
							))}
						</svg>

						{/* Floating Live Tooltip */}
						<div
							style={{
								position: 'absolute',
								top: wavePoints[7][1] - 40,
								left: wavePoints[7][0] - 50,
								background: 'rgba(15, 23, 42, 0.9)',
								border: '1px solid rgba(0, 240, 255, 0.5)',
								borderRadius: 8,
								padding: '4px 10px',
								fontSize: 11,
								fontWeight: 700,
								color: '#38BDF8',
								boxShadow: '0 4px 14px rgba(0, 240, 255, 0.3)',
								fontFamily: '"Plus Jakarta Sans", monospace',
							}}
						>
							PEAK SYNTHESIS
						</div>
					</div>

					{/* Live Stat Badges */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							fontSize: 12,
							fontWeight: 600,
							color: 'rgba(255, 255, 255, 0.65)',
						}}
					>
						<span>LATENCY: 1.2ms</span>
						<span>SAMPLING: 60 FPS</span>
						<span style={{ color: '#00F0FF' }}>
							PIPELINE: AUTONOMOUS
						</span>
					</div>
				</div>

				{/* ── Soft Bounce Popping Notification Badges (Act 3) ── */}
				{/* Badge 1: Zero Keyframing */}
				<div
					style={{
						position: 'absolute',
						top: -60,
						left: 80,
						background:
							'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))',
						border: '1px solid rgba(0, 240, 255, 0.45)',
						borderRadius: 16,
						padding: '12px 20px',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						boxShadow:
							'0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(0, 240, 255, 0.3)',
						transform: `translateZ(100px) scale(${badge1Spring})`,
						opacity: badge1Spring > 0.05 ? 1 : 0,
					}}
				>
					<span style={{ fontSize: 18 }}>✨</span>
					<div>
						<div
							style={{
								fontSize: 11,
								fontWeight: 800,
								color: '#00F0FF',
								letterSpacing: '0.08em',
							}}
						>
							ZERO KEYFRAMES
						</div>
						<div
							style={{
								fontSize: 13,
								fontWeight: 700,
								color: '#FFFFFF',
							}}
						>
							Procedural Motion Engine
						</div>
					</div>
				</div>

				{/* Badge 2: 60 FPS Fluid Physics */}
				<div
					style={{
						position: 'absolute',
						bottom: -50,
						right: 70,
						background:
							'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))',
						border: '1px solid rgba(168, 85, 247, 0.45)',
						borderRadius: 16,
						padding: '12px 20px',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						boxShadow:
							'0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(168, 85, 247, 0.3)',
						transform: `translateZ(90px) scale(${badge2Spring})`,
						opacity: badge2Spring > 0.05 ? 1 : 0,
					}}
				>
					<span style={{ fontSize: 18 }}>⚡</span>
					<div>
						<div
							style={{
								fontSize: 11,
								fontWeight: 800,
								color: '#C084FC',
								letterSpacing: '0.08em',
							}}
						>
							OCTANE LIGHTING
						</div>
						<div
							style={{
								fontSize: 13,
								fontWeight: 700,
								color: '#FFFFFF',
							}}
						>
							60 FPS Photorealistic Glass
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
