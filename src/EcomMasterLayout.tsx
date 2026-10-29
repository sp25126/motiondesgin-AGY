import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { MohiniBottleVisual } from './components/MohiniBottleVisual';

export const EcomMasterLayout: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Remotion Spring Animations
	const heroSpring = spring({ frame, fps, config: { damping: 14 } });
	const productSpring = spring({ frame: frame - 15, fps, config: { damping: 14 } });
	const bentoSpring = spring({ frame: frame - 30, fps, config: { damping: 14 } });
	const ctaSpring = spring({ frame: frame - 45, fps, config: { damping: 14 } });

	// Interpolated opacities & translates
	const heroOpacity = interpolate(heroSpring, [0, 1], [0, 1]);
	const heroY = interpolate(heroSpring, [0, 1], [30, 0]);

	const productOpacity = interpolate(productSpring, [0, 1], [0, 1]);
	const productScale = interpolate(productSpring, [0, 1], [0.92, 1]);

	const bentoOpacity = interpolate(bentoSpring, [0, 1], [0, 1]);
	const bentoY = interpolate(bentoSpring, [0, 1], [40, 0]);

	const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1]);
	const ctaY = interpolate(ctaSpring, [0, 1], [30, 0]);

	return (
		<div
			style={{
				width: 1080,
				height: 1920,
				backgroundColor: '#0D0D0D',
				backgroundImage: `
					radial-gradient(ellipse at 50% 0%, rgba(10, 58, 42, 0.45) 0%, rgba(13, 13, 13, 1) 70%),
					radial-gradient(ellipse at 50% 100%, rgba(212, 175, 55, 0.15) 0%, rgba(13, 13, 13, 1) 70%)
				`,
				color: '#F9F6F0',
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
				boxSizing: 'border-box',
				position: 'relative',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '90px 118px 80px 118px', // 11% Outer Margin (118px left/right)
			}}
		>
			{/* Import Luxury Google Fonts inside standard inline style tag */}
			<style>
				{`
					@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Inter:wght@400;500;600;700;800&display=swap');
					
					.serif-heading {
						font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
						letter-spacing: -0.04em;
						text-transform: uppercase;
					}
					.gold-gradient-text {
						background: linear-gradient(135deg, #FFF5D0 0%, #D4AF37 50%, #AA7C11 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
					.emerald-card {
						background: linear-gradient(145deg, #0A3A2A 0%, #062319 100%);
						border: 1px solid rgba(212, 175, 55, 0.25);
						box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
					}
					.dark-card {
						background: linear-gradient(145deg, #16181C 0%, #0E1012 100%);
						border: 1px solid rgba(255, 255, 255, 0.08);
						box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
					}
				`}
			</style>

			{/* Background Noise & Fine Grid Overlay */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.06) 1px, transparent 0)`,
					backgroundSize: '36px 36px',
					pointerEvents: 'none',
					opacity: 0.8,
				}}
			/>

			{/* HEADER BRANDING (TOP MARGIN) */}
			<div
				style={{
					opacity: heroOpacity,
					transform: `translateY(${heroY}px)`,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
					paddingBottom: '24px',
					marginBottom: '36px',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
					<div
						style={{
							width: '12px',
							height: '12px',
							backgroundColor: '#D4AF37',
							transform: 'rotate(45deg)',
							boxShadow: '0 0 10px #D4AF37',
						}}
					/>
					<span
						style={{
							fontSize: '20px',
							fontWeight: 700,
							letterSpacing: '0.22em',
							color: '#F9F6F0',
							textTransform: 'uppercase',
						}}
					>
						THE CLEAR FORTRESS
					</span>
				</div>
				<span
					style={{
						fontSize: '14px',
						fontWeight: 600,
						letterSpacing: '0.15em',
						color: '#D4AF37',
						backgroundColor: 'rgba(212, 175, 55, 0.1)',
						padding: '6px 16px',
						borderRadius: '20px',
						border: '1px solid rgba(212, 175, 55, 0.3)',
					}}
				>
					PURE KANNAUJ EXTRACTION
				</span>
			</div>

			{/* PART 1: HERO HOOK (TOP MODULE) */}
			<div
				style={{
					opacity: heroOpacity,
					transform: `translateY(${heroY}px)`,
					marginBottom: '36px',
				}}
			>
				{/* Category Sub-badge */}
				<div
					style={{
						fontSize: '15px',
						fontWeight: 700,
						color: '#E06D53',
						letterSpacing: '0.2em',
						textTransform: 'uppercase',
						marginBottom: '12px',
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
					}}
				>
					<span style={{ display: 'inline-block', width: '24px', height: '2px', backgroundColor: '#E06D53' }} />
					ANCIENT INDIAN LOVE ATTAR
				</div>

				{/* Primary Headline */}
				<h1
					className="serif-heading"
					style={{
						fontSize: '66px',
						fontWeight: 700,
						lineHeight: '1.02',
						margin: '0 0 16px 0',
						color: '#F9F6F0',
					}}
				>
					COMMAND THE ROOM <br />
					<span className="gold-gradient-text">IN MINUTES.</span>
				</h1>

				{/* Subheadline Hook */}
				<h2
					className="serif-heading"
					style={{
						fontSize: '34px',
						fontWeight: 600,
						lineHeight: '1.2',
						margin: '0 0 20px 0',
						color: '#A0B0A8',
						letterSpacing: '-0.02em',
					}}
				>
					REAWAKEN THE DESIRE SIGNAL.
				</h2>

				{/* Body Copy - High Legibility (WCAG AA) */}
				<p
					style={{
						fontSize: '20px',
						lineHeight: '1.55',
						color: '#D0D5DD',
						margin: 0,
						maxWidth: '780px',
						fontWeight: 400,
					}}
				>
					Handcrafted in Kannauj using centuries-old hydro-distillation. Pure jasmine, saffron, oud & Mysore sandalwood—formulated to activate immediate subconscious intimacy.
				</p>
			</div>

			{/* PART 2: PRODUCT SHOWCASE & BENTO GRID (MIDDLE MODULE) */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '28px',
					marginBottom: '40px',
				}}
			>
				{/* Central Product Showcase Area */}
				<div
					className="emerald-card"
					style={{
						borderRadius: '24px',
						height: '420px',
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						overflow: 'hidden',
						opacity: productOpacity,
						transform: `scale(${productScale})`,
					}}
				>
					{/* Gold Frame Corners */}
					<div style={{ position: 'absolute', top: '16px', left: '20px', color: '#D4AF37', fontSize: '13px', letterSpacing: '0.15em', fontWeight: 600 }}>
						MOHINI ITR • 10ML ATTAR CONCENTRATE
					</div>
					<div style={{ position: 'absolute', top: '16px', right: '20px', color: '#D4AF37', fontSize: '13px', letterSpacing: '0.1em', fontWeight: 600 }}>
						[ 0% SYNTHETICS ]
					</div>

					{/* Product Visual Component */}
					<MohiniBottleVisual progress={productSpring} />
				</div>

				{/* Swiss Bento Grid Cards (3 Modular Validation Cards) */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gap: '20px',
						opacity: bentoOpacity,
						transform: `translateY(${bentoY}px)`,
					}}
				>
					{/* Card 1: Clinical Trial */}
					<div
						className="dark-card"
						style={{
							borderRadius: '20px',
							padding: '24px 20px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
								{/* Limbic Brain Wave Icon */}
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M12 2a10 10 0 1 0 10 10H12V2z" />
									<path d="M12 12L2.5 7.5" />
									<path d="M12 12v10" />
								</svg>
							</div>
							<div style={{ fontSize: '13px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
								CLINICAL TRIALS
							</div>
							<div style={{ fontSize: '19px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '8px' }}>
								VALIDATED BIOLOGICAL ATTRACTION
							</div>
						</div>
						<div style={{ fontSize: '14px', color: '#98A2B3', fontWeight: 500, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '10px' }}>
							N = 350 Double-Blind Study
						</div>
					</div>

					{/* Card 2: Botanical Purity */}
					<div
						className="dark-card"
						style={{
							borderRadius: '20px',
							padding: '24px 20px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(10, 58, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(10, 58, 42, 0.8)' }}>
								{/* Botanical Leaf Seal */}
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#52C41A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9a9 9 0 0 1-10 9Z" />
									<path d="M11 20v-5" />
								</svg>
							</div>
							<div style={{ fontSize: '13px', fontWeight: 700, color: '#52C41A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
								KANNAUJ HERITAGE
							</div>
							<div style={{ fontSize: '19px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '8px' }}>
								PURE BOTANICAL ATTAR
							</div>
						</div>
						<div style={{ fontSize: '14px', color: '#98A2B3', fontWeight: 500, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '10px' }}>
							0% Synthetics • 0% Alcohol
						</div>
					</div>

					{/* Card 3: Social Proof / Star Rating */}
					<div
						className="dark-card"
						style={{
							borderRadius: '20px',
							padding: '24px 20px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px', color: '#D4AF37', fontSize: '18px' }}>
								★★★★★
							</div>
							<div style={{ fontSize: '13px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
								VERIFIED PROOF
							</div>
							<div style={{ fontSize: '19px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '8px' }}>
								4.9 / 5.0 RATING
							</div>
						</div>
						<div style={{ fontSize: '13px', color: '#D0D5DD', fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '10px' }}>
							"First time in months he turned around."
						</div>
					</div>
				</div>
			</div>

			{/* PART 3: HIGH-CONTRAST CONVERSION CTA PANEL (BOTTOM MODULE) */}
			<div
				style={{
					opacity: ctaOpacity,
					transform: `translateY(${ctaY}px)`,
					display: 'flex',
					flexDirection: 'column',
					gap: '18px',
				}}
			>
				{/* High Impact Metallic Gold CTA Button */}
				<div
					style={{
						background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #B8860B 100%)',
						borderRadius: '20px',
						padding: '28px 36px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						boxShadow: '0 16px 40px rgba(212, 175, 55, 0.35)',
						cursor: 'pointer',
					}}
				>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<span
							style={{
								fontSize: '26px',
								fontWeight: 800,
								color: '#0D0D0D',
								letterSpacing: '0.04em',
								textTransform: 'uppercase',
							}}
						>
							DISCOVER THE RITUAL →
						</span>
						<span style={{ fontSize: '15px', fontWeight: 700, color: '#3A2E05', letterSpacing: '0.05em' }}>
							OFFICIAL STORE • theclearfortress.in
						</span>
					</div>

					<div
						style={{
							backgroundColor: '#0D0D0D',
							color: '#D4AF37',
							padding: '12px 24px',
							borderRadius: '12px',
							fontSize: '16px',
							fontWeight: 700,
							letterSpacing: '0.08em',
							whiteSpace: 'nowrap',
						}}
					>
						CLAIM YOUR BOTTLE
					</div>
				</div>

				{/* Trust & Guarantee Micro-Bar */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						backgroundColor: 'rgba(255, 255, 255, 0.03)',
						borderRadius: '14px',
						padding: '16px 24px',
						border: '1px solid rgba(255, 255, 255, 0.06)',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#A0AAB8', fontWeight: 600 }}>
						<span style={{ color: '#D4AF37' }}>🔒</span>
						<span>90-Day Risk-Free Intimacy Trial</span>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#A0AAB8', fontWeight: 600 }}>
						<span style={{ color: '#52C41A' }}>✓</span>
						<span>Verified Secure • Express Shipping</span>
					</div>
				</div>
			</div>
		</div>
	);
};
