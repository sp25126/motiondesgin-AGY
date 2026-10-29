import React from 'react';

interface EnergyScanBeamProps {
	beamPercent: number; // 0 to 100
	opacity: number;
	frame: number;
}

export const EnergyScanBeam: React.FC<EnergyScanBeamProps> = ({
	beamPercent,
	opacity,
	frame,
}) => {
	if (opacity <= 0.01) return null;

	const beamX = (beamPercent / 100) * 1920;

	// Particle sparks generating along the beam line
	const sparks = [
		{ y: 180, offset: Math.sin(frame * 0.4 + 1) * 30, size: 4 },
		{ y: 320, offset: Math.cos(frame * 0.35 + 2) * 45, size: 6 },
		{ y: 460, offset: Math.sin(frame * 0.5 + 3) * 25, size: 5 },
		{ y: 580, offset: Math.cos(frame * 0.45 + 4) * 40, size: 7 },
		{ y: 720, offset: Math.sin(frame * 0.3 + 5) * 35, size: 4 },
		{ y: 860, offset: Math.cos(frame * 0.4 + 6) * 50, size: 6 },
	];

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				pointerEvents: 'none',
				opacity,
				overflow: 'hidden',
			}}
		>
			{/* Volumetric Beam Ambient Sheen */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: beamX - 140,
					width: 280,
					background: `radial-gradient(ellipse at center, rgba(0, 240, 255, 0.3) 0%, rgba(59, 130, 246, 0.12) 45%, transparent 75%)`,
				}}
			/>

			{/* Anamorphic Horizontal Flare */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: beamX - 300,
					width: 600,
					height: 6,
					background:
						'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.8), #FFFFFF, rgba(0, 240, 255, 0.8), transparent)',
					boxShadow: '0 0 30px #00F0FF, 0 0 60px #3B82F6',
					transform: 'translateY(-50%)',
				}}
			/>

			{/* Laser Vertical Scan Line Core */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: beamX - 2,
					width: 4,
					background:
						'linear-gradient(180deg, rgba(0, 240, 255, 0.2) 0%, #FFFFFF 30%, #00F0FF 70%, rgba(0, 240, 255, 0.2) 100%)',
					boxShadow: `
						0 0 12px #FFFFFF,
						0 0 25px #00F0FF,
						0 0 50px #00F0FF,
						0 0 100px #3B82F6
					`,
				}}
			/>

			{/* Trailing Energy Wavefront Gradient */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: beamX - 80,
					width: 80,
					background:
						'linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.18) 100%)',
				}}
			/>

			{/* Leading Edge Ionization */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: beamX,
					width: 30,
					background:
						'linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%)',
				}}
			/>

			{/* Emitted Particle Sparks */}
			{sparks.map((spark, idx) => (
				<div
					key={idx}
					style={{
						position: 'absolute',
						top: spark.y,
						left: beamX + spark.offset,
						width: spark.size,
						height: spark.size,
						borderRadius: '50%',
						background: '#FFFFFF',
						boxShadow: '0 0 10px #00F0FF, 0 0 20px #00F0FF',
					}}
				/>
			))}

			{/* Floating AI Pipeline Telemetry Badge */}
			<div
				style={{
					position: 'absolute',
					top: 80,
					left: Math.max(40, Math.min(1560, beamX - 160)),
					background: 'rgba(5, 15, 25, 0.88)',
					border: '1px solid rgba(0, 240, 255, 0.8)',
					borderRadius: 8,
					padding: '6px 14px',
					display: 'flex',
					alignItems: 'center',
					gap: 8,
					boxShadow:
						'0 10px 25px rgba(0,0,0,0.8), 0 0 20px rgba(0, 240, 255, 0.4)',
					backdropFilter: 'blur(10px)',
				}}
			>
				<div
					style={{
						width: 8,
						height: 8,
						borderRadius: '50%',
						background: '#00F0FF',
						boxShadow: '0 0 10px #00F0FF',
					}}
				/>
				<span
					style={{
						fontFamily: 'monospace',
						fontSize: 11,
						fontWeight: 700,
						letterSpacing: '0.12em',
						color: '#E0F2FE',
					}}
				>
					ANTIGRAVITY AI PIPELINE // SYNTHESIZING {Math.round(beamPercent)}%
				</span>
			</div>
		</div>
	);
};
