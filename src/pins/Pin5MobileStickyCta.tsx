import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	staticFile,
	Img,
} from 'remotion';
import { THEME } from './BrandTokens';
import { KaleLeafSvg } from './BotanicalEtchings';

export const Pin5MobileStickyCta: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Sticky bar slide-up entry (Frame 20 to 35: 0.5s)
	const barSpring = spring({
		frame: frame - 20,
		fps,
		config: { damping: 15, stiffness: 130 },
	});
	const barY = interpolate(barSpring, [0, 1], [140, 0]);
	const barOpacity = interpolate(barSpring, [0, 1], [0, 1]);

	// Background content slight blur & dimming (Frame 20 to 35)
	const contentBlur = interpolate(frame, [20, 35], [0, 3], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const contentDim = interpolate(frame, [20, 35], [1, 0.94], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Continuous WhatsApp Button Pulse (Cycle every 45 frames / 1.5s)
	// @keyframes pulse {
	//   0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
	//   70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
	//   100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
	// }
	const pulseCycle = (frame % 45) / 45; // 0 to 1
	let pulseSpread = 0;
	let pulseAlpha = 0;
	if (pulseCycle <= 0.7) {
		const norm = pulseCycle / 0.7; // 0 to 1
		pulseSpread = norm * 14;
		pulseAlpha = (1 - norm) * 0.45;
	} else {
		pulseSpread = 14;
		pulseAlpha = 0;
	}

	// Micro phone floating motion
	const phoneFloat = Math.sin(frame / 50) * 4;

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
			{/* Ambient Midnight Navy Backdrop with Cerulean & Emerald Glows (from Image 2 bottom) */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `
						radial-gradient(circle at 50% 25%, rgba(2, 132, 199, 0.28) 0%, transparent 55%),
						radial-gradient(circle at 80% 80%, rgba(37, 211, 102, 0.16) 0%, transparent 60%),
						linear-gradient(180deg, ${THEME.midnight.base} 0%, ${THEME.midnight.navy} 100%)
					`,
				}}
			/>

			{/* Background Studio Grid */}
			<div
				style={{
					position: 'absolute',
					inset: -50,
					backgroundImage: `
						linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
					`,
					backgroundSize: '48px 48px',
					opacity: 0.65,
				}}
			/>

			{/* Large Cerulean Orb at bottom right (matching Image 2 bottom right accent) */}
			<div
				style={{
					position: 'absolute',
					bottom: -100,
					right: -80,
					width: 420,
					height: 420,
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(2, 132, 199, 0.45) 0%, rgba(3, 105, 161, 0.2) 50%, transparent 70%)',
					filter: 'blur(50px)',
					pointerEvents: 'none',
				}}
			/>

			{/* Title Banner above phone */}
			<div
				style={{
					textAlign: 'center',
					marginBottom: 24,
					zIndex: 10,
				}}
			>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 8,
						padding: '6px 16px',
						background: 'rgba(2, 132, 199, 0.2)',
						border: '1px solid rgba(56, 189, 248, 0.4)',
						borderRadius: 999,
						color: THEME.blue.light,
						fontSize: 12,
						fontWeight: 800,
						letterSpacing: '0.1em',
						textTransform: 'uppercase',
						marginBottom: 8,
					}}
				>
					MOBILE ORDER CONVERSION PIN • 394 SKUS
				</div>
				<h2 style={{ margin: 0, color: '#FFFFFF', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>
					Frictionless WhatsApp Reordering
				</h2>
			</div>

			{/* ── IPHONE 15 PRO VIEWPORT MOCKUP ── */}
			<div
				style={{
					width: 480,
					height: 980,
					borderRadius: 54,
					background: '#1C1C1E',
					padding: 12,
					boxSizing: 'border-box',
					boxShadow: `
						0 35px 80px rgba(0, 0, 0, 0.85),
						0 0 0 2px #48484A,
						0 0 0 4px #2C2C2E,
						0 0 40px rgba(2, 132, 199, 0.25)
					`,
					transform: `translateY(${phoneFloat}px)`,
					position: 'relative',
					zIndex: 20,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* Inner Glass Screen */}
				<div
					style={{
						width: '100%',
						height: '100%',
						borderRadius: 44,
						background: THEME.cream.canvas,
						overflow: 'hidden',
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{/* Dynamic Island Pill */}
					<div
						style={{
							position: 'absolute',
							top: 10,
							left: '50%',
							transform: 'translateX(-50%)',
							width: 126,
							height: 34,
							borderRadius: 20,
							background: '#000000',
							zIndex: 10000,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '0 12px',
							boxSizing: 'border-box',
						}}
					>
						{/* Front Camera Lens */}
						<div
							style={{
								width: 11,
								height: 11,
								borderRadius: '50%',
								background: '#111827',
								border: '1px solid #1E293B',
							}}
						/>
						{/* Green active sensor indicator */}
						<div
							style={{
								width: 7,
								height: 7,
								borderRadius: '50%',
								background: THEME.green.neon,
								boxShadow: `0 0 6px ${THEME.green.neon}`,
							}}
						/>
					</div>

					{/* iOS Status Bar */}
					<div
						style={{
							height: 48,
							padding: '0 26px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							fontSize: 14,
							fontWeight: 700,
							color: '#FFFFFF',
							backgroundColor: THEME.blue.primary,
							zIndex: 999,
						}}
					>
						<span>9:41</span>
						<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
							{/* Signal Bars */}
							<svg width="16" height="12" viewBox="0 0 16 12" fill="#FFFFFF">
								<rect x="0" y="8" width="3" height="4" rx="1" />
								<rect x="4" y="6" width="3" height="6" rx="1" />
								<rect x="8" y="3" width="3" height="9" rx="1" />
								<rect x="12" y="0" width="3" height="12" rx="1" />
							</svg>
							<span style={{ fontSize: 11, fontWeight: 700 }}>5G</span>
							{/* Battery */}
							<div
								style={{
									width: 22,
									height: 11,
									borderRadius: 3,
									border: '1px solid #FFFFFF',
									padding: 1.5,
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<div style={{ width: '80%', height: '100%', background: '#FFFFFF', borderRadius: 1.5 }} />
							</div>
						</div>
					</div>

					{/* ── CERULEAN HEADER BANNER INSIDE PHONE (Exact Reference Image 2 Style) ── */}
					<div
						style={{
							background: THEME.blue.gradient,
							padding: '16px 18px 20px 18px',
							color: '#FFFFFF',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)',
						}}
					>
						{/* Woodcut Kale Leaf Engraving on Right Side (Matching Image 2) */}
						<div
							style={{
								position: 'absolute',
								right: -30,
								top: -10,
								opacity: 0.85,
								pointerEvents: 'none',
							}}
						>
							<KaleLeafSvg width={180} height={170} color="#FFFFFF" />
						</div>

						<div style={{ position: 'relative', zIndex: 2, maxWidth: 260 }}>
							<div
								style={{
									fontFamily: '"Cormorant Garamond", Georgia, serif',
									fontSize: 21,
									fontStyle: 'italic',
									fontWeight: 600,
									lineHeight: 1.25,
									color: '#FFFFFF',
									marginBottom: 12,
									textShadow: '0 1px 4px rgba(0,0,0,0.2)',
								}}
							>
								&ldquo;...pick of the day. Every day.&rdquo;
							</div>

							{/* Dark Navy Pill Button matching Image 2 "WhatsApp Us >" */}
							<div
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: 6,
									background: THEME.midnight.pill,
									color: '#FFFFFF',
									padding: '6px 14px',
									borderRadius: 999,
									fontSize: 12,
									fontWeight: 700,
									boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
								}}
							>
								<span>WhatsApp Us</span>
								<span style={{ fontSize: 13, color: THEME.blue.light }}>&gt;</span>
							</div>
						</div>
					</div>

					{/* ── Mobile Scrollable Content (Underneath Sticky Bar) ── */}
					<div
						style={{
							flex: 1,
							padding: '12px 16px 120px 16px',
							overflowY: 'hidden',
							filter: `blur(${contentBlur}px)`,
							opacity: contentDim,
							display: 'flex',
							flexDirection: 'column',
							gap: 12,
						}}
					>
						{/* App Subheader */}
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<div>
								<div style={{ fontSize: 11, fontWeight: 700, color: THEME.green.fresh }}>L&apos;ÉTOILE BISTRO • KITCHEN #2</div>
								<div style={{ fontSize: 17, fontWeight: 800, color: THEME.cream.inkNavy }}>Tomorrow&apos;s Harvest Order</div>
							</div>
							<div
								style={{
									width: 32,
									height: 32,
									borderRadius: '50%',
									background: '#FFFFFF',
									border: `1px solid ${THEME.cream.border}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: 13,
								}}
							>
								👨‍🍳
							</div>
						</div>

						{/* Quick Search */}
						<div
							style={{
								background: '#FFFFFF',
								border: `1px solid ${THEME.cream.border}`,
								borderRadius: 10,
								padding: '8px 12px',
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								fontSize: 12,
								color: '#94A3B8',
							}}
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
								<circle cx="11" cy="11" r="8" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
							Search 394 seasonal produce SKUs...
						</div>

						{/* Produce Item 1 */}
						<div
							style={{
								display: 'flex',
								gap: 12,
								padding: 10,
								background: '#FFFFFF',
								borderRadius: 10,
								border: `1px solid ${THEME.cream.border}`,
								boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
							}}
						>
							<Img
								src={staticFile('images/carrots.jpg')}
								alt="Carrots"
								style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }}
							/>
							<div style={{ flex: 1 }}>
								<div style={{ fontSize: 13, fontWeight: 700, color: THEME.cream.inkNavy }}>Heirloom Rainbow Carrots</div>
								<div style={{ fontSize: 11, color: '#64748B' }}>Salinas Organic • 24 Bunches</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
									<span style={{ fontSize: 14, fontWeight: 800, color: THEME.green.fresh }}>$24.50</span>
									<span style={{ fontSize: 11, background: THEME.green.pale, color: THEME.green.fresh, padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>
										Qty: 3 cases
									</span>
								</div>
							</div>
						</div>

						{/* Produce Item 2 */}
						<div
							style={{
								display: 'flex',
								gap: 12,
								padding: 10,
								background: '#FFFFFF',
								borderRadius: 10,
								border: `1px solid ${THEME.cream.border}`,
								boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
							}}
						>
							<Img
								src={staticFile('images/mushrooms.jpg')}
								alt="Mushrooms"
								style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }}
							/>
							<div style={{ flex: 1 }}>
								<div style={{ fontSize: 13, fontWeight: 700, color: THEME.cream.inkNavy }}>Wild Chanterelle Mix</div>
								<div style={{ fontSize: 11, color: '#64748B' }}>Foraged 5 lb Chef Flat</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
									<span style={{ fontSize: 14, fontWeight: 800, color: THEME.green.fresh }}>$48.00</span>
									<span style={{ fontSize: 11, background: THEME.green.pale, color: THEME.green.fresh, padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>
										Qty: 2 flats
									</span>
								</div>
							</div>
						</div>

						{/* Produce Item 3 */}
						<div
							style={{
								display: 'flex',
								gap: 12,
								padding: 10,
								background: '#FFFFFF',
								borderRadius: 10,
								border: `1px solid ${THEME.cream.border}`,
								boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
							}}
						>
							<Img
								src={staticFile('images/tomatoes.jpg')}
								alt="Tomatoes"
								style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }}
							/>
							<div style={{ flex: 1 }}>
								<div style={{ fontSize: 13, fontWeight: 700, color: THEME.cream.inkNavy }}>Heritage Multicolored Tomatoes</div>
								<div style={{ fontSize: 11, color: '#64748B' }}>10 lb Wooden Crate</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
									<span style={{ fontSize: 14, fontWeight: 800, color: THEME.green.fresh }}>$38.00</span>
									<span style={{ fontSize: 11, background: THEME.green.pale, color: THEME.green.fresh, padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>
										Qty: 1 crate
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* ── DEVELOPER SPEC: Mobile Sticky CTA Bottom Bar (For Pin #5) ── */}
					{/* Positioning: position: fixed; bottom: 0; left: 0; width: 100%; z-index: 9999; */}
					{/* Container Style: background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-top: 1px solid rgba(0,0,0,0.05); */}
					{/* Safe Area Padding: padding: 16px 16px env(safe-area-inset-bottom) 16px; display: flex; justify-content: space-between; align-items: center; */}
					<div
						style={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							width: '100%',
							zIndex: 9999,
							background: 'rgba(255, 255, 255, 0.92)',
							backdropFilter: 'blur(14px)',
							WebkitBackdropFilter: 'blur(14px)',
							borderTop: '1px solid rgba(0,0,0,0.08)',
							padding: '14px 16px 32px 16px', // simulating env(safe-area-inset-bottom)
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
							transform: `translateY(${barY}px)`,
							opacity: barOpacity,
						}}
					>
						{/* Subtle kitchen dispatch status row */}
						<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', fontWeight: 600 }}>
							<span>Order Value: $207.50 (6 items)</span>
							<span style={{ color: THEME.green.fresh }}>⚡ Dispatches 06:00 AM</span>
						</div>

						{/* ── Button UI: width: 100%; background: #25D366; (WhatsApp Green), color: #FFFFFF, font-weight: 700, border-radius: 999px, height: 48px; ── */}
						{/* Animation: continuous @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); } 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); } } */}
						<button
							type="button"
							style={{
								width: '100%',
								background: THEME.whatsapp.green,
								color: '#FFFFFF',
								fontWeight: 700,
								borderRadius: 999,
								height: 48,
								border: 'none',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 10,
								fontSize: 15,
								fontFamily: 'Inter, sans-serif',
								boxShadow: `0 0 0 ${pulseSpread}px rgba(37, 211, 102, ${pulseAlpha}), 0 4px 14px rgba(37, 211, 102, 0.35)`,
							}}
						>
							{/* Official WhatsApp SVG Icon */}
							<svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
								<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.204 8.204 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24h.02zm-3.6 4.31c-.2 0-.44.07-.67.33-.23.26-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.49-.3-.26-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.13-.17.26-.66.81-.81.98-.15.17-.3.19-.56.06-.26-.13-1.1-.41-2.1-1.3-.78-.69-1.3-1.55-1.45-1.81-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.42-.56-.43l-.48-.01z" />
							</svg>
							<span>Order via WhatsApp Direct</span>
						</button>

						{/* Safe area home indicator bar */}
						<div
							style={{
								width: 134,
								height: 4,
								background: '#0F172A',
								borderRadius: 3,
								margin: '6px auto 0 auto',
								opacity: 0.8,
							}}
						/>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
