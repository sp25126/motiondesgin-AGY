import React from 'react';

export const StageGovHeaderCluttered: React.FC = () => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#FFFFFF',
				fontFamily: '"Segoe UI", -apple-system, Roboto, sans-serif',
				display: 'flex',
				flexDirection: 'column',
				userSelect: 'none',
			}}
		>
			{/* ── 1. TOP UTILITY STRIP & LOGO ROW ── */}
			<div
				style={{
					height: 68,
					padding: '0 40px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					borderBottom: '1px solid #E2E8F0',
					backgroundColor: '#FFFFFF',
				}}
			>
				{/* Official National Emblem & e-Filing Logo */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					<div
						style={{
							border: '1px solid #0056B3',
							padding: '4px 12px',
							borderRadius: 4,
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							backgroundColor: '#FFFFFF',
						}}
					>
						{/* Emblem Shield */}
						<div
							style={{
								width: 32,
								height: 32,
								borderRadius: '50%',
								backgroundColor: '#003366',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#EAB308',
								fontSize: 16,
								fontWeight: 900,
							}}
						>
							🏛️
						</div>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div style={{ fontSize: 16, fontWeight: 800, color: '#003366', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
								e-Filing <span style={{ color: '#DC2626', fontSize: 12, fontWeight: 600 }}>Anywhere Anytime</span>
							</div>
							<div style={{ fontSize: 9, color: '#475569', fontWeight: 600, letterSpacing: '0.02em' }}>
								Income Tax Department, Government of India
							</div>
						</div>
					</div>
				</div>

				{/* Top Right Utilities: Call Us, Language, Accessibility, Flat Buttons */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 11.5, color: '#334155' }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
						<span>📞</span>
						<span>Call Us</span>
						<span style={{ fontSize: 9 }}>▼</span>
					</div>

					<div style={{ width: 1, height: 16, backgroundColor: '#CBD5E1' }} />

					<div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
						<span>🌐</span>
						<span>English</span>
						<span style={{ fontSize: 9 }}>▼</span>
					</div>

					<div style={{ width: 1, height: 16, backgroundColor: '#CBD5E1' }} />

					{/* Accessibility Font Resizers */}
					<div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
						<span style={{ cursor: 'pointer' }}>A-</span>
						<span
							style={{
								backgroundColor: '#0066FF',
								color: '#FFF',
								padding: '2px 6px',
								borderRadius: 3,
								fontSize: 11,
							}}
						>
							A
						</span>
						<span style={{ cursor: 'pointer' }}>A+</span>
						<span style={{ fontSize: 13, cursor: 'pointer' }}>◐</span>
					</div>

					<div style={{ width: 1, height: 16, backgroundColor: '#CBD5E1' }} />

					{/* Flat, Blending-in Login & Register buttons */}
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<div
							style={{
								border: '1px solid #253375',
								color: '#253375',
								padding: '5px 16px',
								borderRadius: 4,
								fontSize: 12,
								fontWeight: 700,
								backgroundColor: '#FFFFFF',
							}}
						>
							Login
						</div>
						<div
							style={{
								backgroundColor: '#253375',
								color: '#FFFFFF',
								padding: '5px 16px',
								borderRadius: 4,
								fontSize: 12,
								fontWeight: 700,
							}}
						>
							Register
						</div>
					</div>
				</div>
			</div>

			{/* ── 2. HEAVY BLUE GOVERNMENT NAVBAR WITH CROWDED LINKS ── */}
			<div
				style={{
					height: 48,
					backgroundColor: '#253375', // Heavy blue government banner
					padding: '0 40px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					color: '#FFFFFF',
					boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
				}}
			>
				{/* Crowded Text Links */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 12.5, fontWeight: 600 }}>
					<span
						style={{
							color: '#FFFFFF',
							borderBottom: '2px solid #FFFFFF',
							paddingBottom: 2,
							fontWeight: 700,
						}}
					>
						Home
					</span>
					<div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: '#E2E8F0' }}>
						<span>Individual/HUF</span>
						<span style={{ fontSize: 9 }}>▼</span>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: '#E2E8F0' }}>
						<span>Company</span>
						<span style={{ fontSize: 9 }}>▼</span>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: '#E2E8F0' }}>
						<span>Non-Company</span>
						<span style={{ fontSize: 9 }}>▼</span>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: '#E2E8F0' }}>
						<span>Tax Professionals &amp; Others</span>
						<span style={{ fontSize: 9 }}>▼</span>
					</div>
					<span style={{ color: '#E2E8F0', cursor: 'pointer' }}>Downloads</span>
					<span style={{ color: '#E2E8F0', cursor: 'pointer' }}>Help</span>
				</div>

				{/* Search Icon button */}
				<div
					style={{
						width: 32,
						height: 32,
						backgroundColor: '#0066FF',
						borderRadius: 4,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#FFFFFF',
						cursor: 'pointer',
					}}
				>
					🔍
				</div>
			</div>

			{/* ── 3. NEWS TICKER STRIP ── */}
			<div
				style={{
					height: 34,
					backgroundColor: '#EFF6FF',
					borderBottom: '1px solid #DBEAFE',
					padding: '0 40px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					fontSize: 11,
					color: '#1E3A8A',
					fontWeight: 600,
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
					<span style={{ backgroundColor: '#DBEAFE', padding: '2px 8px', borderRadius: 4 }}>🔔 Updates</span>
					<span>Due date for filing of Income Tax Returns and Audit Reports for AY 2026-27 is extended for eligible taxpayers...</span>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#64748B' }}>
					<span>❚❚</span>
					<span>❮</span>
					<span>❯</span>
				</div>
			</div>

			{/* ── 4. HERO BANNER: ITR VERIFICATION ── */}
			<div
				style={{
					flex: 1,
					background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 45%, #0284C7 100%)',
					padding: '36px 60px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					color: '#FFFFFF',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Background Tech Nodes */}
				<div
					style={{
						position: 'absolute',
						left: 40,
						top: '50%',
						transform: 'translateY(-50%)',
						width: 300,
						height: 300,
						borderRadius: '50%',
						border: '2px dashed rgba(255, 255, 255, 0.2)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							width: 160,
							height: 160,
							borderRadius: '50%',
							backgroundColor: 'rgba(0, 102, 255, 0.4)',
							border: '2px solid #38BDF8',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
							boxShadow: '0 0 40px rgba(56, 189, 248, 0.5)',
						}}
					>
						<span style={{ fontSize: 28, fontWeight: 900, color: '#38BDF8' }}>ITR</span>
						<span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Verification</span>
					</div>
				</div>

				{/* Hero Typography */}
				<div style={{ marginLeft: 380, zIndex: 2 }}>
					<h2
						style={{
							fontSize: 42,
							fontWeight: 900,
							margin: 0,
							lineHeight: 1.15,
							letterSpacing: '-0.02em',
							color: '#FFFFFF',
						}}
					>
						YOUR <span style={{ color: '#FACC15' }}>ITR</span>
						<br />
						NEEDS ONE LAST CLICK.
						<br />
						<span style={{ color: '#38BDF8' }}>VERIFY TODAY.</span>
					</h2>
					<p
						style={{
							margin: '14px 0 0',
							fontSize: 14,
							color: 'rgba(255, 255, 255, 0.85)',
							maxWidth: 520,
							lineHeight: 1.5,
						}}
					>
						Verification is the final step in completing your income tax filing. Verify your ITR within 30 days via Aadhaar OTP, Net Banking, or Digital Signature.
					</p>
				</div>

				{/* Right Side Easy Filing Badge */}
				<div
					style={{
						backgroundColor: '#FFFFFF',
						borderRadius: 12,
						padding: 18,
						color: '#0F172A',
						boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 8,
						zIndex: 2,
					}}
				>
					<span style={{ fontSize: 28 }}>🛡️</span>
					<div style={{ fontSize: 13, fontWeight: 800, color: '#1E3A8A' }}>e-Filing Easy</div>
					<div style={{ fontSize: 10, color: '#16A34A', fontWeight: 700 }}>● Instant e-Verification</div>
				</div>
			</div>
		</div>
	);
};
