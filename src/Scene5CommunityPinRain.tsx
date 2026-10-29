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
import { StageMobileLoginForm } from './components/StageMobileLoginForm';
import { IphoneFrame } from './components/IphoneFrame';
import { StageIsometricPinRain } from './components/StageIsometricPinRain';

export const Scene5CommunityPinRain: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── CUT 1: INCOME TAX PORTAL PIN DROP (Frames 0 - 24) ──
	const isCut1 = frame < 24;
	const pin1Spring = spring({
		frame,
		fps,
		config: { stiffness: 300, damping: 14, mass: 0.8 },
	});
	const pin1Y = interpolate(pin1Spring, [0, 1], [-140, 0]);
	const shake1 = frame >= 8 && frame <= 20 ? Math.sin(frame * 4) * 8 * (1 - (frame - 8) / 12) : 0;

	// ── CUT 2: EPFO MOBILE SITE PIN DROP (Frames 24 - 48) ──
	const isCut2 = frame >= 24 && frame < 48;
	const cut2Frame = frame - 24;
	const pin2Spring = spring({
		frame: cut2Frame,
		fps,
		config: { stiffness: 300, damping: 14, mass: 0.8 },
	});
	const pin2Y = interpolate(pin2Spring, [0, 1], [-140, 0]);
	const shake2 = cut2Frame >= 8 && cut2Frame <= 20 ? Math.cos(cut2Frame * 4) * 8 * (1 - (cut2Frame - 8) / 12) : 0;

	// ── CUT 3: MINIMALIST COUNTER RAPIDLY TICKING UP (Frames 48 - 80) ──
	const isCut3 = frame >= 48 && frame < 80;
	const counterProgress = interpolate(frame, [48, 76], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const counterValue = Math.round(interpolate(counterProgress, [0, 1], [140, 1402]));

	// ── ACT II: 3D ISOMETRIC PULLBACK & PIN RAIN (Frames 80 - 450) ──
	const isIsometricActive = frame >= 80;

	// Global Camera Shake for Pin Rain Impacts
	const rainShake = isIsometricActive && frame >= 95 && frame <= 280
		? Math.sin(frame * 2.8) * 2.5
		: 0;

	// Floating Public Community Header (Frames 85+)
	const headerSpring = spring({
		frame: frame - 85,
		fps,
		config: { stiffness: 180, damping: 16 },
	});
	const headerOpacity = interpolate(frame, [85, 100], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const headerY = interpolate(headerSpring, [0, 1], [-20, 0]);

	// Bottom Agency Dispatch Banner (Frames 180+)
	const bannerSpring = spring({
		frame: frame - 180,
		fps,
		config: { stiffness: 180, damping: 16 },
	});
	const bannerOpacity = interpolate(frame, [180, 195], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const bannerY = interpolate(bannerSpring, [0, 1], [30, 0]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#07090E',
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* ── 1. CUT 1: INCOME TAX PIN DROP ── */}
			{isCut1 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `translate(0, ${shake1}px)`,
					}}
				>
					<div style={{ width: 1400, height: 750, borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.15)' }}>
						<StageGovHeaderCluttered />
					</div>
					{/* Dropping Pin on Nav */}
					<div
						style={{
							position: 'absolute',
							left: '50%',
							top: '28%',
							transform: `translate(-50%, -100%) translateY(${pin1Y}px)`,
							zIndex: 60,
						}}
					>
						<div
							style={{
								width: 36,
								height: 36,
								borderRadius: '50% 50% 50% 2px',
								transform: 'rotate(-45deg)',
								backgroundColor: '#0066FF',
								boxShadow: '0 0 20px #0066FF',
								border: '2px solid #FFFFFF',
							}}
						/>
					</div>
				</div>
			)}

			{/* ── 2. CUT 2: EPFO MOBILE PIN DROP ── */}
			{isCut2 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `translate(0, ${shake2}px)`,
					}}
				>
					<IphoneFrame width={380} height={760}>
						<StageMobileLoginForm progress={0} />
					</IphoneFrame>
					{/* Dropping Pin on Mobile Form */}
					<div
						style={{
							position: 'absolute',
							left: '50%',
							top: '48%',
							transform: `translate(-50%, -100%) translateY(${pin2Y}px)`,
							zIndex: 60,
						}}
					>
						<div
							style={{
								width: 36,
								height: 36,
								borderRadius: '50% 50% 50% 2px',
								transform: 'rotate(-45deg)',
								backgroundColor: '#00F0FF',
								boxShadow: '0 0 20px #00F0FF',
								border: '2px solid #FFFFFF',
							}}
						/>
					</div>
				</div>
			)}

			{/* ── 3. CUT 3: MINIMALIST COUNTER RAPIDLY TICKING UP ── */}
			{isCut3 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#07090E',
					}}
				>
					<div
						style={{
							fontSize: 16,
							fontWeight: 800,
							letterSpacing: '0.25em',
							color: '#00F0FF',
							textTransform: 'uppercase',
							marginBottom: 12,
							fontFamily: '"JetBrains Mono", monospace',
						}}
					>
						[ LIVE COMMUNITY INTAKE ]
					</div>
					<div
						style={{
							fontSize: 32,
							fontWeight: 700,
							color: 'rgba(255, 255, 255, 0.7)',
							marginBottom: 14,
						}}
					>
						Community UX Proposals
					</div>
					<div
						style={{
							fontSize: 120,
							fontWeight: 900,
							fontFamily: '"JetBrains Mono", "Inter", sans-serif',
							color: '#FFFFFF',
							textShadow: '0 0 50px rgba(0, 240, 255, 0.8), 0 0 100px rgba(0, 102, 255, 0.6)',
							letterSpacing: '-0.03em',
						}}
					>
						{counterValue.toLocaleString()}
					</div>
				</div>
			)}

			{/* ── 4. ACT II: 3D ISOMETRIC PULLBACK & HUNDREDS OF GLOWING PINS RAINING DOWN ── */}
			{isIsometricActive && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						transform: `translate(0, ${rainShake}px)`,
					}}
				>
					{/* Precision Blueprint Grid */}
					<div
						style={{
							position: 'absolute',
							inset: -80,
							backgroundImage: `
								radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.18) 0%, transparent 65%),
								linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
								linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
							`,
							backgroundSize: '100% 100%, 48px 48px, 48px 48px',
							opacity: 0.9,
						}}
					/>

					{/* 3D Isometric Pin Rain */}
					<StageIsometricPinRain />

					{/* Floating Top Telemetry Bar */}
					<div
						style={{
							position: 'absolute',
							top: 32,
							left: 48,
							right: 48,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							zIndex: 100,
							transform: `translateY(${headerY}px)`,
							opacity: headerOpacity,
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
							<div
								style={{
									backgroundColor: 'rgba(0, 102, 255, 0.25)',
									border: '1.5px solid #00F0FF',
									padding: '6px 16px',
									borderRadius: 20,
									color: '#FFFFFF',
									fontSize: 13,
									fontWeight: 800,
									display: 'flex',
									alignItems: 'center',
									gap: 8,
									boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
								}}
							>
								<span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00F0FF', boxShadow: '0 0 10px #00F0FF' }} />
								<span>STAGE OPEN LINKS ACTIVE</span>
							</div>

							<span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 13, fontWeight: 500 }}>
								Public Collaborative Design Mesh
							</span>
						</div>

						{/* Live Count Badge */}
						<div
							style={{
								backgroundColor: 'rgba(15, 23, 42, 0.85)',
								border: '1px solid rgba(255, 255, 255, 0.15)',
								padding: '6px 18px',
								borderRadius: 12,
								color: '#00F0FF',
								fontFamily: '"JetBrains Mono", monospace',
								fontSize: 14,
								fontWeight: 800,
								boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
							}}
						>
							1,402+ PROPOSALS SUBMITTED
						</div>
					</div>

					{/* Bottom Agency Dispatch Banner */}
					{frame >= 180 && (
						<div
							style={{
								position: 'absolute',
								bottom: 36,
								zIndex: 110,
								transform: `translateY(${bannerY}px)`,
								opacity: bannerOpacity,
								display: 'flex',
								alignItems: 'center',
								gap: 20,
								backgroundColor: 'rgba(10, 15, 28, 0.92)',
								backdropFilter: 'blur(20px)',
								border: '1.5px solid rgba(0, 240, 255, 0.4)',
								boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 240, 255, 0.25)',
								padding: '14px 32px',
								borderRadius: 40,
								color: '#FFFFFF',
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
								<span style={{ fontSize: 20 }}>🚀</span>
								<span style={{ fontSize: 15, fontWeight: 800, color: '#00F0FF' }}>
									Direct Agency Dispatch
								</span>
							</div>
							<div style={{ width: 1, height: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
							<div style={{ fontSize: 13.5, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
								Highest-voted community layouts are exported directly to ministry frontend teams
							</div>
							<div
								style={{
									backgroundColor: '#0066FF',
									color: '#FFFFFF',
									fontSize: 12,
									fontWeight: 700,
									padding: '6px 14px',
									borderRadius: 20,
									boxShadow: '0 0 14px rgba(0, 102, 255, 0.6)',
								}}
							>
								View Open Blueprints →
							</div>
						</div>
					)}
				</div>
			)}
		</AbsoluteFill>
	);
};
