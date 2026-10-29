import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';
import { THEME } from './BrandTokens';
import { MushroomClusterSvg, ProduceBotanicalBadge } from './BotanicalEtchings';

export const Pin1HeroPromise: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Full headline text to type
	const fullHeadline = 'Fresh produce that shows up when your kitchen needs it.';

	// Dynamic text typing (Frame 15 to 65)
	const typingProgress = interpolate(frame, [15, 65], [0, fullHeadline.length], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const displayedHeadline = fullHeadline.slice(0, Math.floor(typingProgress));
	const isTypingDone = frame >= 65;
	const cursorBlink = Math.floor(frame / 8) % 2 === 0;

	// Subtext counter & slide up (Frame 60 to 90)
	const subtextSpring = spring({
		frame: frame - 60,
		fps,
		config: { damping: 14, stiffness: 120 },
	});
	const subtextOpacity = interpolate(subtextSpring, [0, 1], [0, 1]);
	const subtextY = interpolate(subtextSpring, [0, 1], [25, 0]);

	// Counter animation from 0 to 394 SKUs
	const rawCount = interpolate(frame, [60, 95], [0, 394], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const skuCount = Math.floor(rawCount);

	// Primary Button Staggered Entry (Frame 85)
	const btn1Spring = spring({
		frame: frame - 85,
		fps,
		config: { damping: 13, stiffness: 140 },
	});
	const btn1Opacity = interpolate(btn1Spring, [0, 1], [0, 1]);
	const btn1Y = interpolate(btn1Spring, [0, 1], [20, 0]);

	// Secondary Button Staggered Entry (Frame 98)
	const btn2Spring = spring({
		frame: frame - 98,
		fps,
		config: { damping: 13, stiffness: 140 },
	});
	const btn2Opacity = interpolate(btn2Spring, [0, 1], [0, 1]);
	const btn2Y = interpolate(btn2Spring, [0, 1], [20, 0]);

	// Card Entrance Spring (Frame 5 to 30)
	const cardSpring = spring({
		frame: frame - 5,
		fps,
		config: { damping: 15, stiffness: 110 },
	});
	const cardScale = interpolate(cardSpring, [0, 1], [0.94, 1]);
	const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
	const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

	// Top Banner slide down entrance (Frame 0 to 25)
	const bannerSpring = spring({
		frame,
		fps,
		config: { damping: 16, stiffness: 120 },
	});
	const bannerY = interpolate(bannerSpring, [0, 1], [-80, 0]);
	const bannerOpacity = interpolate(bannerSpring, [0, 1], [0, 1]);

	// Continuous camera micro-drift for physical life
	const driftY = Math.sin(frame / 45) * 4;
	const driftX = Math.cos(frame / 60) * 3;

	// Background ambient glows
	const glowPulse = 1 + Math.sin(frame / 30) * 0.08;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: THEME.midnight.base,
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',
			}}
		>
			{/* Ambient Midnight Navy Canvas with Cerulean Azure Lights */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `
						radial-gradient(circle at 80% 20%, rgba(2, 132, 199, 0.28) 0%, transparent 55%),
						radial-gradient(circle at 20% 80%, rgba(21, 128, 61, 0.18) 0%, transparent 60%),
						linear-gradient(155deg, ${THEME.midnight.base} 0%, ${THEME.midnight.navy} 50%, #050A12 100%)
					`,
				}}
			/>

			{/* Subtle B2B Precision Grid Lines */}
			<div
				style={{
					position: 'absolute',
					inset: -60,
					backgroundImage: `
						linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
					`,
					backgroundSize: '48px 48px',
					transform: `translate(${driftX * 0.5}px, ${driftY * 0.5}px)`,
					opacity: 0.7,
				}}
			/>

			{/* Radial Cerulean Glow Orb */}
			<div
				style={{
					position: 'absolute',
					width: 580,
					height: 580,
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(2, 132, 199, 0.24) 0%, rgba(3, 105, 161, 0.1) 40%, transparent 70%)',
					filter: 'blur(70px)',
					transform: `scale(${glowPulse}) translate(${driftX}px, ${driftY}px)`,
					top: '20%',
					right: '12%',
					pointerEvents: 'none',
				}}
			/>

			{/* ── TOP REFERENCE BANNER: Cerulean Blue Header with Woodcut Mushrooms (Image 1) ── */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: 220,
					background: THEME.blue.gradient,
					borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 80px',
					boxSizing: 'border-box',
					overflow: 'hidden',
					zIndex: 5,
					transform: `translateY(${bannerY}px)`,
					opacity: bannerOpacity,
					boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
				}}
			>
				{/* Top Delivery & Range Stats from Reference Image 1 */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
					<div
						style={{
							fontSize: 12,
							fontWeight: 800,
							letterSpacing: '0.22em',
							color: 'rgba(255, 255, 255, 0.85)',
							textTransform: 'uppercase',
						}}
					>
						FRESHFLOW B2B COLD SUPPLY
					</div>
					<ProduceBotanicalBadge
						deliveryText="6 days / wk"
						rangeText="394 SKUs"
						color="#FFFFFF"
						accentColor="rgba(224, 242, 254, 0.9)"
					/>
				</div>

				{/* Woodcut Mushroom Illustration on Right Side (Matching Reference Image 1) */}
				<div
					style={{
						position: 'absolute',
						right: -20,
						top: 10,
						transform: `translate(${driftX * 0.4}px, ${driftY * 0.4}px)`,
						pointerEvents: 'none',
					}}
				>
					<MushroomClusterSvg width={360} height={260} color="#FFFFFF" opacity={0.88} />
				</div>
			</div>

			{/* ── Main Glassmorphism Card (Warm Cream Linen base from Image 1) ── */}
			<div
				style={{
					width: '90%',
					maxWidth: 640,
					marginTop: 110,
					background: THEME.cream.card,
					backdropFilter: 'blur(32px)',
					WebkitBackdropFilter: 'blur(32px)',
					borderRadius: 24,
					padding: '48px 44px',
					border: `1px solid ${THEME.cream.border}`,
					boxShadow: `
						0 35px 70px -15px rgba(0, 0, 0, 0.55),
						0 0 0 1px rgba(255, 255, 255, 0.9) inset,
						0 0 45px rgba(2, 132, 199, 0.15)
					`,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: 24,
					transform: `translateY(${cardY + driftY}px) scale(${cardScale})`,
					opacity: cardOpacity,
					position: 'relative',
					zIndex: 10,
				}}
			>
				{/* Top Status Pill inside Card */}
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 8,
						padding: '6px 14px',
						background: THEME.green.pale,
						border: `1px solid ${THEME.green.border}`,
						borderRadius: 999,
						fontSize: 13,
						fontWeight: 600,
						color: THEME.green.fresh,
						letterSpacing: '0.02em',
					}}
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={THEME.green.fresh} strokeWidth="2.5">
						<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
					</svg>
					Farm-to-Kitchen Direct Supply
				</div>

				{/* ── Headline: Font Inter, 700, 48px, line-height 1.1, #111827 ── */}
				<h1
					style={{
						margin: 0,
						fontFamily: 'Inter, sans-serif',
						fontWeight: 700,
						fontSize: 48,
						lineHeight: 1.1,
						color: '#111827',
						letterSpacing: '-0.03em',
						minHeight: 160,
					}}
				>
					{displayedHeadline}
					{!isTypingDone && (
						<span
							style={{
								display: 'inline-block',
								width: 4,
								height: 44,
								backgroundColor: THEME.green.fresh,
								marginLeft: 6,
								verticalAlign: 'text-bottom',
								opacity: cursorBlink ? 1 : 0,
								borderRadius: 2,
							}}
						/>
					)}
				</h1>

				{/* ── Subtext Counter: Font Inter, 500, 18px, #4B5563 ── */}
				<div
					style={{
						fontFamily: 'Inter, sans-serif',
						fontWeight: 500,
						fontSize: 18,
						lineHeight: 1.5,
						color: '#4B5563',
						display: 'flex',
						alignItems: 'center',
						gap: 6,
						transform: `translateY(${subtextY}px)`,
						opacity: subtextOpacity,
					}}
				>
					<span
						style={{
							color: THEME.green.fresh,
							fontWeight: 700,
							fontVariantNumeric: 'tabular-nums',
							fontSize: 20,
						}}
					>
						{skuCount}
					</span>
					<span>SKUs · 6-day delivery · Cold-chain handled.</span>
				</div>

				{/* ── Buttons Flex Row (gap: 16px) ── */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: 16,
						alignItems: 'center',
						marginTop: 8,
						width: '100%',
					}}
				>
					{/* Primary: background: #15803D, color: #FFFFFF, border-radius: 8px, padding: 12px 24px */}
					<div
						style={{
							background: THEME.green.fresh,
							color: '#FFFFFF',
							borderRadius: 8,
							padding: '12px 24px',
							fontFamily: 'Inter, sans-serif',
							fontWeight: 600,
							fontSize: 16,
							display: 'inline-flex',
							alignItems: 'center',
							gap: 8,
							cursor: 'pointer',
							transform: `translateY(${btn1Y}px)`,
							opacity: btn1Opacity,
							boxShadow: '0 4px 14px rgba(21, 128, 61, 0.35)',
						}}
					>
						<span>Explore Produce Catalog</span>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</div>

					{/* Secondary: background: transparent, border: 2px solid #E5E7EB, color: #111827 */}
					<div
						style={{
							background: 'transparent',
							border: '2px solid #E5E7EB',
							color: '#111827',
							borderRadius: 8,
							padding: '12px 24px',
							fontFamily: 'Inter, sans-serif',
							fontWeight: 600,
							fontSize: 16,
							display: 'inline-flex',
							alignItems: 'center',
							gap: 8,
							cursor: 'pointer',
							transform: `translateY(${btn2Y}px)`,
							opacity: btn2Opacity,
						}}
					>
						<span>Request Sample Pack</span>
					</div>
				</div>

				{/* Bottom Trust Stamp Bar */}
				<div
					style={{
						width: '100%',
						marginTop: 12,
						paddingTop: 16,
						borderTop: '1px solid #E5E7EB',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						fontSize: 13,
						color: '#6B7280',
						opacity: subtextOpacity,
					}}
				>
					<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill={THEME.green.fresh}>
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
						</svg>
						HACCP & USDA Certified
					</span>
					<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
						<svg width="14" height="14" viewBox="0 0 24 24" fill={THEME.blue.primary}>
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
						</svg>
						Direct Invoicing / Net 30
					</span>
				</div>
			</div>
		</AbsoluteFill>
	);
};
