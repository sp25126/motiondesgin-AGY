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
import { MushroomClusterSvg, KaleLeafSvg } from './BotanicalEtchings';

export const Pin3DualCtaPath: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Modal Entrance Spring (Frame 10 to 40)
	// Triggers scale(0.95) to scale(1) spring animation and slide up
	const modalSpring = spring({
		frame: frame - 10,
		fps,
		config: { damping: 14, stiffness: 120 },
	});
	const modalScale = interpolate(modalSpring, [0, 1], [0.95, 1]);
	const modalY = interpolate(modalSpring, [0, 1], [240, 0]);
	const modalOpacity = interpolate(modalSpring, [0, 1], [0, 1]);

	// Background overlay fade
	const overlayOpacity = interpolate(frame, [0, 25], [0, 0.72], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Animated Cursor / Pointer demonstrating hover interactions
	// Frame 50 -> Moves to Card 1 (Hover Card 1 from frame 55 to 105)
	// Frame 105 -> Moves to Card 2 (Hover Card 2 from frame 115 to 165)
	const cursorX = interpolate(
		frame,
		[40, 60, 100, 120],
		[540, 360, 360, 720],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);
	const cursorY = interpolate(
		frame,
		[40, 60, 100, 120],
		[1350, 1100, 1100, 1100],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);
	const cursorOpacity = interpolate(frame, [35, 45, 170, 180], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Card 1 Hover active state (Frame 55 to 108)
	const isCard1Hovered = frame >= 55 && frame < 108;
	const card1HoverSpring = spring({
		frame: isCard1Hovered ? frame - 55 : frame - 108,
		fps,
		config: { damping: 15, stiffness: 150 },
	});
	const card1Lift = isCard1Hovered
		? interpolate(card1HoverSpring, [0, 1], [0, -6])
		: interpolate(card1HoverSpring, [0, 1], [-6, 0]);

	// Card 2 Hover active state (Frame 115 to 170)
	const isCard2Hovered = frame >= 115 && frame < 170;
	const card2HoverSpring = spring({
		frame: isCard2Hovered ? frame - 115 : frame - 170,
		fps,
		config: { damping: 15, stiffness: 150 },
	});
	const card2Lift = isCard2Hovered
		? interpolate(card2HoverSpring, [0, 1], [0, -6])
		: interpolate(card2HoverSpring, [0, 1], [-6, 0]);

	// Continuous ambient float
	const ambientDrift = Math.sin(frame / 40) * 3;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: THEME.midnight.base,
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{/* Ambient Midnight Background Scene with Cerulean & Emerald Lights */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `
						radial-gradient(circle at 25% 25%, rgba(2, 132, 199, 0.35) 0%, transparent 55%),
						radial-gradient(circle at 75% 75%, rgba(21, 128, 61, 0.28) 0%, transparent 60%),
						linear-gradient(180deg, ${THEME.midnight.base} 0%, ${THEME.midnight.navy} 100%)
					`,
				}}
			/>

			{/* Decorative Woodcut Botanical Watermarks in Backdrop (Images 1 & 2) */}
			<div style={{ position: 'absolute', top: 60, left: 40, opacity: 0.12, pointerEvents: 'none' }}>
				<KaleLeafSvg width={420} height={380} color="#FFFFFF" />
			</div>
			<div style={{ position: 'absolute', bottom: 40, right: 20, opacity: 0.12, pointerEvents: 'none' }}>
				<MushroomClusterSvg width={440} height={320} color="#FFFFFF" />
			</div>

			{/* Dimming Scrim Overlay */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: 'rgba(6, 13, 23, 0.72)',
					opacity: overlayOpacity,
					backdropFilter: 'blur(8px)',
					WebkitBackdropFilter: 'blur(8px)',
				}}
			/>

			{/* ── THE SLEEK UI MODAL CONTAINER ── */}
			<div
				style={{
					width: '90%',
					maxWidth: 840,
					background: '#FFFFFF',
					borderRadius: 24,
					boxShadow: '0 35px 80px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.2)',
					transform: `translateY(${modalY + ambientDrift}px) scale(${modalScale})`,
					opacity: modalOpacity,
					position: 'relative',
					zIndex: 50,
					overflow: 'hidden',
				}}
			>
				{/* Top Modal Header with Cerulean Banner Accent */}
				<div
					style={{
						padding: '30px 36px 22px 36px',
						background: THEME.cream.card,
						borderBottom: `1px solid ${THEME.cream.border}`,
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'space-between',
					}}
				>
					<div>
						<div
							style={{
								fontSize: 12,
								fontWeight: 800,
								color: THEME.blue.primary,
								letterSpacing: '0.1em',
								textTransform: 'uppercase',
								marginBottom: 6,
							}}
						>
							CHEF & BUYER ONBOARDING
						</div>
						<h2
							style={{
								margin: 0,
								fontFamily: 'Inter, sans-serif',
								fontWeight: 800,
								fontSize: 26,
								color: THEME.cream.inkNavy,
								letterSpacing: '-0.02em',
							}}
						>
							Choose Your Kitchen Supply Path
						</h2>
						<p style={{ margin: '6px 0 0 0', fontSize: 15, color: '#6B7280' }}>
							Select how your culinary team would like to review availability & pricing.
						</p>
					</div>

					<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
						<div
							style={{
								padding: '6px 14px',
								borderRadius: 999,
								background: THEME.blue.pale,
								border: `1px solid rgba(2, 132, 199, 0.3)`,
								fontSize: 12,
								fontWeight: 700,
								color: THEME.blue.primary,
							}}
						>
							394 SKUs • 6-Day Delivery
						</div>

						{/* Close Modal Cross Icon */}
						<div
							style={{
								width: 36,
								height: 36,
								borderRadius: '50%',
								background: '#F1F5F9',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#6B7280',
								cursor: 'pointer',
							}}
						>
							✕
						</div>
					</div>
				</div>

				{/* ── Developer CSS/DOM Specs: Layout: display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 32px; background: #FFFFFF; border-radius: 16px; ── */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: 24,
						padding: 32,
						background: '#FFFFFF',
						boxSizing: 'border-box',
					}}
				>
					{/* ── CARD 1 (Order Sheet): border: 2px solid #E5E7EB. Hover state: border-color: #15803D, box-shadow: 0 0 15px rgba(21, 128, 61, 0.1) ── */}
					<div
						style={{
							border: isCard1Hovered ? `2px solid ${THEME.green.fresh}` : '2px solid #E5E7EB',
							borderRadius: 16,
							padding: '28px 24px',
							background: isCard1Hovered ? THEME.green.pale : '#FAFAFA',
							boxShadow: isCard1Hovered
								? `0 0 25px ${THEME.green.glow}, 0 12px 24px -6px rgba(21, 128, 61, 0.15)`
								: 'none',
							transform: `translateY(${card1Lift}px)`,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							gap: 16,
							cursor: 'pointer',
							position: 'relative',
						}}
					>
						{/* Card 1 Badge */}
						<div
							style={{
								padding: '4px 10px',
								background: isCard1Hovered ? '#DCFCE7' : '#E5E7EB',
								color: isCard1Hovered ? THEME.green.fresh : '#374151',
								borderRadius: 6,
								fontSize: 11,
								fontWeight: 700,
								letterSpacing: '0.04em',
								textTransform: 'uppercase',
							}}
						>
							For Executive Chefs
						</div>

						{/* Card 1 Icon Container */}
						<div
							style={{
								width: 52,
								height: 52,
								borderRadius: 12,
								background: isCard1Hovered ? THEME.green.fresh : '#E5E7EB',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: isCard1Hovered ? '#FFFFFF' : '#374151',
							}}
						>
							<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
								<polyline points="14 2 14 8 20 8" />
								<line x1="16" y1="13" x2="8" y2="13" />
								<line x1="16" y1="17" x2="8" y2="17" />
								<polyline points="10 9 9 9 8 9" />
							</svg>
						</div>

						{/* Typography: Titles at 20px bold */}
						<div
							style={{
								fontSize: 20,
								fontWeight: 700,
								color: '#111827',
								lineHeight: 1.25,
								fontFamily: 'Inter, sans-serif',
							}}
						>
							Daily Order Sheet
						</div>

						{/* Subtext at 14px regular (#6B7280) */}
						<div
							style={{
								fontSize: 14,
								color: '#6B7280',
								lineHeight: 1.5,
								fontFamily: 'Inter, sans-serif',
								flex: 1,
							}}
						>
							Customizable Excel & CSV template with real-time morning par levels. Direct import into kitchen POS.
						</div>

						{/* Links styled as inline flex with align-items: center; gap: 4px; font-weight: 600; */}
						<div
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 6,
								fontWeight: 600,
								fontSize: 14,
								color: THEME.green.fresh,
								fontFamily: 'Inter, sans-serif',
								marginTop: 8,
							}}
						>
							<span>Download Sheet (.xlsx)</span>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</div>
					</div>

					{/* ── CARD 2 (Price List): border: 2px solid #E5E7EB. Hover state: border-color: #0284C7 (Cerulean Blue), box-shadow: 0 0 15px rgba(2, 132, 199, 0.1) ── */}
					<div
						style={{
							border: isCard2Hovered ? `2px solid ${THEME.blue.primary}` : '2px solid #E5E7EB',
							borderRadius: 16,
							padding: '28px 24px',
							background: isCard2Hovered ? THEME.blue.pale : '#FAFAFA',
							boxShadow: isCard2Hovered
								? `0 0 25px ${THEME.blue.glow}, 0 12px 24px -6px rgba(2, 132, 199, 0.15)`
								: 'none',
							transform: `translateY(${card2Lift}px)`,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							gap: 16,
							cursor: 'pointer',
							position: 'relative',
						}}
					>
						{/* Card 2 Badge */}
						<div
							style={{
								padding: '4px 10px',
								background: isCard2Hovered ? '#BAE6FD' : '#E5E7EB',
								color: isCard2Hovered ? THEME.blue.primary : '#374151',
								borderRadius: 6,
								fontSize: 11,
								fontWeight: 700,
								letterSpacing: '0.04em',
								textTransform: 'uppercase',
							}}
						>
							For F&B Directors
						</div>

						{/* Card 2 Icon Container */}
						<div
							style={{
								width: 52,
								height: 52,
								borderRadius: 12,
								background: isCard2Hovered ? THEME.blue.primary : '#E5E7EB',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: isCard2Hovered ? '#FFFFFF' : '#374151',
							}}
						>
							<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<line x1="18" y1="20" x2="18" y2="10" />
								<line x1="12" y1="20" x2="12" y2="4" />
								<line x1="6" y1="20" x2="6" y2="14" />
							</svg>
						</div>

						{/* Typography: Titles at 20px bold */}
						<div
							style={{
								fontSize: 20,
								fontWeight: 700,
								color: '#111827',
								lineHeight: 1.25,
								fontFamily: 'Inter, sans-serif',
							}}
						>
							Live Wholesale Price List
						</div>

						{/* Subtext at 14px regular (#6B7280) */}
						<div
							style={{
								fontSize: 14,
								color: '#6B7280',
								lineHeight: 1.5,
								fontFamily: 'Inter, sans-serif',
								flex: 1,
							}}
						>
							Tiered wholesale pricing locked for restaurant groups, hotels & catering. Transparent weekly contracts.
						</div>

						{/* Links styled as inline flex with align-items: center; gap: 4px; font-weight: 600; */}
						<div
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 6,
								fontWeight: 600,
								fontSize: 14,
								color: THEME.blue.primary,
								fontFamily: 'Inter, sans-serif',
								marginTop: 8,
							}}
						>
							<span>View Wholesale Rates (PDF)</span>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</div>
					</div>
				</div>

				{/* Modal Footer Note */}
				<div
					style={{
						padding: '16px 32px 24px 32px',
						background: THEME.cream.card,
						borderTop: `1px solid ${THEME.cream.border}`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						fontSize: 13,
						color: '#64748B',
					}}
				>
					<span>⚡ Instant PDF/Excel generation • No login needed</span>
					<span style={{ fontWeight: 700, color: THEME.cream.inkNavy }}>Need Custom Contract? Call (800) 555-FARM</span>
				</div>
			</div>

			{/* ── Virtual Mouse Pointer ── */}
			<div
				style={{
					position: 'absolute',
					left: cursorX,
					top: cursorY,
					transform: 'translate(-4px, -4px)',
					zIndex: 1000,
					opacity: cursorOpacity,
					pointerEvents: 'none',
					filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
				}}
			>
				<svg width="28" height="28" viewBox="0 0 24 24" fill={THEME.midnight.pill} stroke="#FFFFFF" strokeWidth="1.5">
					<path d="M3 3l7 18 3-7 7-3L3 3z" />
				</svg>
			</div>
		</AbsoluteFill>
	);
};
