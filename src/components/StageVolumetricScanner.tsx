import React from 'react';

interface StageVolumetricScannerProps {
	progress: number; // 0 to 1
	isActive: boolean;
	opacity?: number;
}

export const StageVolumetricScanner: React.FC<StageVolumetricScannerProps> = ({
	progress,
	isActive,
	opacity = 1,
}) => {
	if (!isActive || opacity <= 0) return null;

	const yPercent = progress * 100;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				pointerEvents: 'none',
				zIndex: 80,
				overflow: 'hidden',
				opacity,
			}}
		>
			{/* ── 1. VOLUMETRIC CYAN CONE / LIGHT SHEET (ABOVE SCANNER) ── */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					height: `${yPercent}%`,
					background: 'linear-gradient(to bottom, rgba(0, 240, 255, 0.0) 0%, rgba(0, 240, 255, 0.08) 70%, rgba(0, 240, 255, 0.28) 100%)',
					filter: 'blur(2px)',
				}}
			/>

			{/* ── 2. VOLUMETRIC DIFFUSE SHINE (Directly Around Laser) ── */}
			<div
				style={{
					position: 'absolute',
					left: -40,
					right: -40,
					top: `calc(${yPercent}% - 30px)`,
					height: 60,
					background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(0, 240, 255, 0.4) 0%, rgba(0, 102, 255, 0.2) 50%, transparent 100%)',
					filter: 'blur(6px)',
				}}
			/>

			{/* ── 3. INTENSE LASER CORE BEAM ── */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: `${yPercent}%`,
					transform: 'translateY(-50%)',
					height: 3,
					backgroundColor: '#FFFFFF',
					boxShadow: `
						0 0 8px #FFFFFF,
						0 0 20px #00F0FF,
						0 0 45px #00F0FF,
						0 0 80px #0066FF,
						0 0 120px rgba(0, 240, 255, 0.8)
					`,
				}}
			>
				{/* Side Light Bullets / Flare Beads */}
				<div
					style={{
						position: 'absolute',
						left: '10%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						width: 40,
						height: 8,
						borderRadius: '50%',
						backgroundColor: '#FFFFFF',
						boxShadow: '0 0 20px #00F0FF',
						filter: 'blur(1px)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						width: 120,
						height: 10,
						borderRadius: '50%',
						backgroundColor: '#FFFFFF',
						boxShadow: '0 0 30px #00F0FF, 0 0 60px #0066FF',
						filter: 'blur(1px)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: '88%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						width: 40,
						height: 8,
						borderRadius: '50%',
						backgroundColor: '#FFFFFF',
						boxShadow: '0 0 20px #00F0FF',
						filter: 'blur(1px)',
					}}
				/>
			</div>

			{/* ── 4. FLOATING ENERGY ION SPARKS ALONG SCAN LINE ── */}
			{[15, 32, 48, 67, 85].map((pos, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: `${pos}%`,
						top: `calc(${yPercent}% + ${(i % 2 === 0 ? -1 : 1) * (6 + (i * 3) % 10)}px)`,
						width: 3,
						height: 3,
						borderRadius: '50%',
						backgroundColor: '#00F0FF',
						boxShadow: '0 0 10px #00F0FF, 0 0 20px #FFFFFF',
					}}
				/>
			))}
		</div>
	);
};
