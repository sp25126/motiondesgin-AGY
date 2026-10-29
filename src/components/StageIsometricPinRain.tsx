import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

interface PortalTile {
	id: string;
	name: string;
	category: string;
	badgeColor: string;
	x: number;
	y: number;
	icon: string;
	proposals: number;
}

const PORTAL_TILES: PortalTile[] = [
	{ id: '1', name: 'IRCTC Train Search', category: 'RAILWAYS', badgeColor: '#0066FF', x: -360, y: -260, icon: '🚆', proposals: 342 },
	{ id: '2', name: 'Income Tax e-Filing', category: 'FINANCE', badgeColor: '#15803D', x: 0, y: -260, icon: '🏛️', proposals: 288 },
	{ id: '3', name: 'EPFO Member Portal', category: 'LABOUR', badgeColor: '#00F0FF', x: 360, y: -260, icon: '📱', proposals: 195 },
	{ id: '4', name: 'Passport Seva Kendra', category: 'EXTERNAL AFFAIRS', badgeColor: '#7C3AED', x: -360, y: 0, icon: '🛂', proposals: 142 },
	{ id: '5', name: 'DigiLocker Citizen Hub', category: 'MEITY', badgeColor: '#0284C7', x: 0, y: 0, icon: '🗂️', proposals: 210 },
	{ id: '6', name: 'Parivahan Sarathi', category: 'TRANSPORT', badgeColor: '#EA580C', x: 360, y: 0, icon: '🚗', proposals: 98 },
	{ id: '7', name: 'UIDAI Aadhaar Portal', category: 'IDENTITY', badgeColor: '#DC2626', x: -360, y: 260, icon: '🆔', proposals: 164 },
	{ id: '8', name: 'National Scholarship', category: 'EDUCATION', badgeColor: '#10B981', x: 0, y: 260, icon: '🎓', proposals: 87 },
	{ id: '9', name: 'GST Common Portal', category: 'REVENUE', badgeColor: '#6366F1', x: 360, y: 260, icon: '📊', proposals: 125 },
];

export const StageIsometricPinRain: React.FC = () => {
	const frame = useCurrentFrame();

	// 3D Isometric Camera Tilt and Glide
	const isoProgress = interpolate(frame, [80, 240], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	const rotateX = interpolate(isoProgress, [0, 1], [30, 48]);
	const rotateZ = interpolate(isoProgress, [0, 1], [-15, -28]);
	const scale = interpolate(isoProgress, [0, 1], [0.75, 0.95]);

	// Generate 24 procedural falling STAGE pins
	const rainPins = useMemo(() => {
		return Array.from({ length: 24 }).map((_, i) => {
			const targetX = ((i * 145) % 900) - 450;
			const targetY = ((i * 110) % 650) - 325;
			const startFrame = 90 + (i * 7) % 160;
			const duration = 12;
			const color = i % 4 === 0 ? '#00F0FF' : i % 4 === 1 ? '#0066FF' : i % 4 === 2 ? '#38BDF8' : '#60A5FA';
			return { id: i, targetX, targetY, startFrame, duration, color };
		});
	}, []);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: 1600,
				overflow: 'hidden',
				pointerEvents: 'none',
			}}
		>
			{/* 3D Isometric Plane */}
			<div
				style={{
					width: 1400,
					height: 1000,
					position: 'relative',
					transform: `
						scale(${scale})
						rotateX(${rotateX}deg)
						rotateZ(${rotateZ}deg)
					`,
					transformStyle: 'preserve-3d',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* ── 1. PORTAL WEBSITES MATRIX TILES ── */}
				{PORTAL_TILES.map((tile) => (
					<div
						key={tile.id}
						style={{
							position: 'absolute',
							left: `calc(50% + ${tile.x}px)`,
							top: `calc(50% + ${tile.y}px)`,
							transform: 'translate(-50%, -50%)',
							width: 310,
							height: 200,
							backgroundColor: 'rgba(15, 23, 42, 0.85)',
							backdropFilter: 'blur(16px)',
							border: '1.5px solid rgba(255, 255, 255, 0.12)',
							borderRadius: 16,
							padding: 16,
							boxShadow: `
								0 20px 40px rgba(0, 0, 0, 0.7),
								0 0 0 1px rgba(255, 255, 255, 0.05),
								0 0 30px ${tile.badgeColor}22
							`,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							boxSizing: 'border-box',
						}}
					>
						{/* Card Header */}
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
								<span style={{ fontSize: 18 }}>{tile.icon}</span>
								<span style={{ fontSize: 12.5, fontWeight: 800, color: '#FFFFFF' }}>{tile.name}</span>
							</div>
							<span
								style={{
									fontSize: 8.5,
									fontWeight: 800,
									color: tile.badgeColor,
									backgroundColor: `${tile.badgeColor}22`,
									border: `1px solid ${tile.badgeColor}44`,
									padding: '2px 6px',
									borderRadius: 4,
								}}
							>
								{tile.category}
							</span>
						</div>

						{/* Mock Wireframe Grid lines inside tile */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
							<div style={{ height: 18, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px dashed rgba(255, 255, 255, 0.12)' }} />
							<div style={{ display: 'flex', gap: 6 }}>
								<div style={{ flex: 1, height: 26, borderRadius: 6, border: `1px solid ${tile.badgeColor}44`, backgroundColor: `${tile.badgeColor}15` }} />
								<div style={{ width: 60, height: 26, borderRadius: 6, backgroundColor: tile.badgeColor, opacity: 0.85 }} />
							</div>
						</div>

						{/* Card Footer: Proposals & Upvotes */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								fontSize: 10,
								color: 'rgba(255, 255, 255, 0.6)',
								borderTop: '1px solid rgba(255, 255, 255, 0.08)',
								paddingTop: 8,
							}}
						>
							<span>{tile.proposals} Community Fixes</span>
							<span style={{ color: '#00F0FF', fontWeight: 700 }}>● Top Voted</span>
						</div>
					</div>
				))}

				{/* ── 2. HUNDREDS OF GLOWING STAGE PINS RAINING DOWN ── */}
				{rainPins.map((pin) => {
					if (frame < pin.startFrame) return null;

					const pinFrame = frame - pin.startFrame;
					const dropProgress = Math.min(1, pinFrame / pin.duration);
					
					// Vertical drop in 3D Z-height
					const zAltitude = (1 - dropProgress) * 350;
					const pinOpacity = Math.min(1, pinFrame / 4);

					// Shockwave on landing
					const hasLanded = pinFrame >= pin.duration;
					const rippleFrame = pinFrame - pin.duration;
					const rippleProgress = interpolate(rippleFrame, [0, 24], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					const rippleSize = interpolate(rippleProgress, [0, 1], [6, 60]);
					const rippleOpacity = interpolate(rippleProgress, [0, 0.2, 1], [0, 0.9, 0]);

					return (
						<div
							key={pin.id}
							style={{
								position: 'absolute',
								left: `calc(50% + ${pin.targetX}px)`,
								top: `calc(50% + ${pin.targetY}px)`,
								transform: 'translate(-50%, -50%)',
								zIndex: 50,
							}}
						>
							{/* Shockwave Ripple on Impact */}
							{hasLanded && rippleProgress < 1 && (
								<div
									style={{
										position: 'absolute',
										left: 0,
										top: 0,
										width: rippleSize,
										height: rippleSize,
										borderRadius: '50%',
										border: `1.5px solid ${pin.color}`,
										boxShadow: `0 0 16px ${pin.color}`,
										transform: 'translate(-50%, -50%)',
										opacity: rippleOpacity,
									}}
								/>
							)}

							{/* Falling Pin Element */}
							<div
								style={{
									transform: `translate3d(0, ${-zAltitude}px, 0) scale(${hasLanded ? 1 : 1.3})`,
									opacity: pinOpacity,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								{/* Pin Head */}
								<div
									style={{
										width: 20,
										height: 20,
										borderRadius: '50% 50% 50% 2px',
										transform: 'rotate(-45deg)',
										backgroundColor: pin.color,
										boxShadow: `0 0 14px ${pin.color}, inset 0 1px 2px #FFFFFF`,
										border: '1px solid #FFFFFF',
									}}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
