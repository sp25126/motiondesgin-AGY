import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const StagePristineCanvas: React.FC = () => {
	const frame = useCurrentFrame();

	// Blueprint cards staggered lock-in animation
	const card1Progress = interpolate(frame, [120, 155], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const card2Progress = interpolate(frame, [135, 170], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const card3Progress = interpolate(frame, [150, 185], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#07090E', // Dark-mode STAGE proxy canvas
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				position: 'relative',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* Precision Blueprint Grid */}
			<div
				style={{
					position: 'absolute',
					inset: -80,
					backgroundImage: `
						radial-gradient(circle at 50% 40%, rgba(0, 102, 255, 0.18) 0%, transparent 65%),
						linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
					`,
					backgroundSize: '100% 100%, 48px 48px, 48px 48px',
					opacity: 0.9,
				}}
			/>

			{/* Top STAGE Toolbar */}
			<div
				style={{
					position: 'absolute',
					top: 28,
					left: 48,
					right: 48,
					height: 48,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					zIndex: 30,
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
							border: '1px solid rgba(255, 255, 255, 0.15)',
							borderRadius: 10,
							padding: '6px 14px',
							backdropFilter: 'blur(10px)',
						}}
					>
						<div
							style={{
								width: 20,
								height: 20,
								borderRadius: '50% 50% 50% 2px',
								transform: 'rotate(-45deg)',
								backgroundColor: '#0066FF',
								boxShadow: '0 0 12px #0066FF',
							}}
						/>
						<span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', color: '#FFFFFF' }}>
							STAGE
						</span>
						<span style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 12 }}>/</span>
						<span style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>
							Proxy Canvas // Visual Blueprint v1.0
						</span>
					</div>

					<div
						style={{
							backgroundColor: 'rgba(0, 240, 255, 0.15)',
							border: '1px solid rgba(0, 240, 255, 0.4)',
							borderRadius: 20,
							padding: '4px 12px',
							fontSize: 11,
							color: '#00F0FF',
							fontWeight: 700,
							display: 'flex',
							alignItems: 'center',
							gap: 6,
						}}
					>
						<span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }} />
						<span>Live Design Mesh</span>
					</div>
				</div>

				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<div
						style={{
							fontSize: 12,
							color: 'rgba(255, 255, 255, 0.6)',
							fontWeight: 600,
							backgroundColor: 'rgba(255, 255, 255, 0.05)',
							padding: '4px 10px',
							borderRadius: 6,
							border: '1px solid rgba(255, 255, 255, 0.1)',
						}}
					>
						STAGE ENGINE // 60FPS
					</div>
				</div>
			</div>

			{/* Center Typography Headline */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					marginBottom: 44,
					zIndex: 20,
				}}
			>
				<div
					style={{
						fontSize: 14,
						fontWeight: 800,
						letterSpacing: '0.2em',
						color: '#00F0FF',
						textTransform: 'uppercase',
						marginBottom: 10,
						fontFamily: '"JetBrains Mono", monospace',
					}}
				>
					[ THE FRONTEND SOLUTION ]
				</div>
				<h1
					style={{
						fontSize: 48,
						fontWeight: 900,
						fontFamily: '"Bricolage Grotesque", "Inter", sans-serif',
						color: '#FFFFFF',
						margin: 0,
						lineHeight: 1.15,
						letterSpacing: '-0.03em',
						maxWidth: 960,
					}}
				>
					What if we actually built the{' '}
					<span
						style={{
							background: 'linear-gradient(135deg, #00F0FF 0%, #0066FF 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						visual blueprint
					</span>{' '}
					to fix it?
				</h1>
			</div>

			{/* ── 3 BLUEPRINT CARDS DOCKED ON CANVAS ── */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 28,
					zIndex: 20,
				}}
			>
				{/* Blueprint Card 1: IRCTC Travel */}
				<div
					style={{
						width: 360,
						height: 220,
						backgroundColor: 'rgba(15, 23, 42, 0.75)',
						backdropFilter: 'blur(16px)',
						border: '1.5px solid rgba(0, 102, 255, 0.4)',
						borderRadius: 16,
						padding: 20,
						boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 102, 255, 0.15)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: card1Progress,
						transform: `translateY(${interpolate(card1Progress, [0, 1], [40, 0])}px) scale(${interpolate(card1Progress, [0, 1], [0.9, 1])})`,
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<span style={{ fontSize: 16 }}>🚆</span>
							<span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>IRCTC Search Card</span>
						</div>
						<span style={{ fontSize: 9, fontWeight: 800, color: '#00F0FF', backgroundColor: 'rgba(0, 240, 255, 0.15)', padding: '2px 6px', borderRadius: 4 }}>
							STAGE 01
						</span>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
						<div style={{ height: 28, borderRadius: 6, border: '1px dashed #60A5FA', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 11, color: '#93C5FD' }}>
							From: NDLS • To: BOM (56px Targets)
						</div>
						<div style={{ height: 28, borderRadius: 6, backgroundColor: '#0066FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#FFFFFF' }}>
							Zero-Ad High-Speed Search
						</div>
					</div>

					<div style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.5)', display: 'flex', justifyContent: 'space-between' }}>
						<span>Status: Ready for Implementation</span>
						<span style={{ color: '#00F0FF' }}>✓ Verified</span>
					</div>
				</div>

				{/* Blueprint Card 2: Income Tax e-Filing */}
				<div
					style={{
						width: 360,
						height: 220,
						backgroundColor: 'rgba(15, 23, 42, 0.75)',
						backdropFilter: 'blur(16px)',
						border: '1.5px solid rgba(21, 128, 61, 0.4)',
						borderRadius: 16,
						padding: 20,
						boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(21, 128, 61, 0.15)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: card2Progress,
						transform: `translateY(${interpolate(card2Progress, [0, 1], [40, 0])}px) scale(${interpolate(card2Progress, [0, 1], [0.9, 1])})`,
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<span style={{ fontSize: 16 }}>🏛️</span>
							<span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Income Tax Navbar</span>
						</div>
						<span style={{ fontSize: 9, fontWeight: 800, color: '#4ADE80', backgroundColor: 'rgba(34, 197, 94, 0.15)', padding: '2px 6px', borderRadius: 4 }}>
							STAGE 02
						</span>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
						<div style={{ height: 28, borderRadius: 6, border: '1px dashed #4ADE80', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 11, color: '#A7F3D0' }}>
							Accordion ☰ Menu Collapse
						</div>
						<div style={{ height: 28, borderRadius: 6, backgroundColor: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#FFFFFF' }}>
							Prominent #15803D Login (+10%)
						</div>
					</div>

					<div style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.5)', display: 'flex', justifyContent: 'space-between' }}>
						<span>Status: Ready for Implementation</span>
						<span style={{ color: '#4ADE80' }}>✓ Verified</span>
					</div>
				</div>

				{/* Blueprint Card 3: EPFO Mobile */}
				<div
					style={{
						width: 360,
						height: 220,
						backgroundColor: 'rgba(15, 23, 42, 0.75)',
						backdropFilter: 'blur(16px)',
						border: '1.5px solid rgba(0, 240, 255, 0.4)',
						borderRadius: 16,
						padding: 20,
						boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 240, 255, 0.15)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: card3Progress,
						transform: `translateY(${interpolate(card3Progress, [0, 1], [40, 0])}px) scale(${interpolate(card3Progress, [0, 1], [0.9, 1])})`,
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<span style={{ fontSize: 16 }}>📱</span>
							<span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>EPFO Mobile Viewport</span>
						</div>
						<span style={{ fontSize: 9, fontWeight: 800, color: '#00F0FF', backgroundColor: 'rgba(0, 240, 255, 0.15)', padding: '2px 6px', borderRadius: 4 }}>
							STAGE 03
						</span>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
						<div style={{ height: 28, borderRadius: 6, border: '1px dashed #38BDF8', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 11, color: '#7DD3FC' }}>
							48px Touch Targets &amp; 16px Inter
						</div>
						<div style={{ height: 28, borderRadius: 6, backgroundColor: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#FFFFFF' }}>
							Biometric &amp; Passkey Toggle
						</div>
					</div>

					<div style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.5)', display: 'flex', justifyContent: 'space-between' }}>
						<span>Status: Ready for Implementation</span>
						<span style={{ color: '#00F0FF' }}>✓ Verified</span>
					</div>
				</div>
			</div>
		</div>
	);
};
