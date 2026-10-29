import React from 'react';

interface StageGovHeaderModernProps {
	collapseProgress?: number; // 0 = expanded links, 1 = fully collapsed to "☰ Menu"
	loginProminence?: number; // 0 = flat outline button, 1 = 1.1x scale + #15803D vibrant green + soft drop shadow
}

export const StageGovHeaderModern: React.FC<StageGovHeaderModernProps> = ({
	collapseProgress = 1,
	loginProminence = 1,
}) => {
	const menuButtonOpacity = Math.min(1, collapseProgress * 1.3);
	const menuButtonScale = 0.7 + collapseProgress * 0.3;

	// Login button transformation
	const loginScale = 1.0 + loginProminence * 0.10; // Scales up by 10% (1.10x)
	const loginBgColor = loginProminence > 0.5 ? '#15803D' : '#253375';
	const loginTextColor = '#FFFFFF';
	const loginShadow = loginProminence > 0.1
		? `0 ${8 * loginProminence}px ${24 * loginProminence}px rgba(21, 128, 61, ${0.45 * loginProminence}), 0 2px 6px rgba(0,0,0,0.15)`
		: 'none';

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#F8FAFC',
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
				display: 'flex',
				flexDirection: 'column',
				userSelect: 'none',
				position: 'relative',
			}}
		>
			{/* ── 1. MODERN SLEEK TOP HEADER ── */}
			<div
				style={{
					height: 72,
					padding: '0 48px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					borderBottom: '1px solid #E2E8F0',
					backgroundColor: '#FFFFFF',
					boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
					zIndex: 30,
				}}
			>
				{/* Modern Brand Logo */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					<div
						style={{
							width: 44,
							height: 44,
							borderRadius: 12,
							background: 'linear-gradient(135deg, #1E3A8A 0%, #0066FF 100%)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#FFFFFF',
							boxShadow: '0 4px 12px rgba(0, 102, 255, 0.25)',
							fontSize: 22,
						}}
					>
						🏛️
					</div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 8 }}>
							<span>Income Tax e-Filing</span>
							<span
								style={{
									fontSize: 10,
									fontWeight: 700,
									backgroundColor: '#ECFDF5',
									color: '#15803D',
									border: '1px solid #A7F3D0',
									padding: '2px 8px',
									borderRadius: 6,
								}}
							>
								OFFICIAL PORTAL
							</span>
						</div>
						<div style={{ fontSize: 11.5, color: '#64748B', fontWeight: 500 }}>
							Government of India • Ministry of Finance
						</div>
					</div>
				</div>

				{/* ── COLLAPSED ACCORDION MENU & SEARCH ── */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					
					{/* "☰ Menu" Pill Button (Fluid Accordion Target) */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							padding: '8px 18px',
							borderRadius: 10,
							backgroundColor: '#F1F5F9',
							border: '1.5px solid #CBD5E1',
							color: '#0F172A',
							fontSize: 13.5,
							fontWeight: 700,
							cursor: 'pointer',
							opacity: menuButtonOpacity,
							transform: `scale(${menuButtonScale})`,
							transformOrigin: 'right center',
							boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
						}}
					>
						<span style={{ fontSize: 16, lineHeight: 1 }}>☰</span>
						<span>Menu</span>
					</div>

					{/* Quick Search */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							padding: '8px 14px',
							borderRadius: 10,
							backgroundColor: '#F8FAFC',
							border: '1px solid #E2E8F0',
							color: '#64748B',
							fontSize: 13,
							fontWeight: 500,
						}}
					>
						<span>🔍</span>
						<span>Search forms, rules, PAN...</span>
						<span
							style={{
								fontSize: 10,
								fontWeight: 700,
								backgroundColor: '#E2E8F0',
								padding: '1px 5px',
								borderRadius: 4,
								color: '#475569',
							}}
						>
							⌘K
						</span>
					</div>

					{/* Language / Support Pill */}
					<div
						style={{
							fontSize: 12.5,
							color: '#475569',
							fontWeight: 600,
							display: 'flex',
							alignItems: 'center',
							gap: 4,
							padding: '6px 12px',
							borderRadius: 8,
							backgroundColor: '#F8FAFC',
						}}
					>
						<span>🌐</span>
						<span>English</span>
					</div>

					<div style={{ width: 1, height: 28, backgroundColor: '#E2E8F0' }} />

					{/* ── TRANSFORMED HIGH-CONTRAST LOGIN BUTTON (#15803D, 1.1x Scale) ── */}
					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
						<div
							style={{
								height: 44,
								padding: '0 24px',
								borderRadius: 12,
								backgroundColor: loginBgColor,
								color: loginTextColor,
								fontSize: 14,
								fontWeight: 700,
								letterSpacing: '-0.01em',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 8,
								cursor: 'pointer',
								transform: `scale(${loginScale})`,
								boxShadow: loginShadow,
								border: '1px solid rgba(255, 255, 255, 0.2)',
							}}
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
								<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
								<polyline points="10 17 15 12 10 7" />
								<line x1="15" y1="12" x2="3" y2="12" />
							</svg>
							<span>Login to e-File</span>
						</div>

						<div
							style={{
								height: 44,
								padding: '0 18px',
								borderRadius: 12,
								backgroundColor: '#FFFFFF',
								border: '1.5px solid #CBD5E1',
								color: '#0F172A',
								fontSize: 13.5,
								fontWeight: 700,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
							}}
						>
							Register
						</div>
					</div>
				</div>
			</div>

			{/* ── 2. STREAMLINED ACTION STRIP (NO CLUTTERED BLUE BAR) ── */}
			<div
				style={{
					height: 44,
					backgroundColor: '#0F172A',
					padding: '0 48px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					color: '#FFFFFF',
					fontSize: 12,
					fontWeight: 500,
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<span style={{ color: '#38BDF8', fontWeight: 700 }}>● AY 2026-27 Filing Active</span>
					<span style={{ color: '#94A3B8' }}>|</span>
					<span style={{ color: '#E2E8F0' }}>Instant Pre-filled ITR-1, ITR-2 &amp; AIS statements ready</span>
				</div>

				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					<span style={{ color: '#A7F3D0', fontWeight: 600, cursor: 'pointer' }}>⚡ Quick ITR Verification &gt;</span>
					<span style={{ color: '#E2E8F0', cursor: 'pointer' }}>Download Utilities</span>
					<span style={{ color: '#E2E8F0', cursor: 'pointer' }}>Helpdesk 24x7</span>
				</div>
			</div>

			{/* ── 3. HERO CONTENT CARD: VERIFICATION FOCUS ── */}
			<div
				style={{
					flex: 1,
					padding: '32px 48px',
					display: 'flex',
					alignItems: 'center',
					gap: 36,
				}}
			>
				{/* Left Focus Card */}
				<div
					style={{
						flex: 1.6,
						backgroundColor: '#FFFFFF',
						borderRadius: 20,
						border: '1px solid #E2E8F0',
						padding: 36,
						boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.08)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 8,
							backgroundColor: '#EFF6FF',
							border: '1px solid #BFDBFE',
							color: '#0066FF',
							padding: '6px 14px',
							borderRadius: 20,
							fontSize: 12,
							fontWeight: 700,
							width: 'fit-content',
							marginBottom: 16,
						}}
					>
						<span>✨ STEP 2 OF 2 • INSTANT VERIFICATION</span>
					</div>

					<h2
						style={{
							fontSize: 36,
							fontWeight: 800,
							color: '#0F172A',
							margin: 0,
							lineHeight: 1.2,
							letterSpacing: '-0.03em',
						}}
					>
						Your ITR Needs One Last Click.
						<br />
						<span style={{ color: '#15803D' }}>Verify Today.</span>
					</h2>

					<p
						style={{
							margin: '12px 0 24px',
							fontSize: 14.5,
							color: '#64748B',
							lineHeight: 1.6,
							maxWidth: 620,
						}}
					>
						Verification is the final mandatory step in completing your tax filing. Simply login to verify your submitted return in under 30 seconds via Aadhaar OTP or Net Banking.
					</p>

					{/* Action Row */}
					<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
						<div
							style={{
								height: 50,
								padding: '0 28px',
								borderRadius: 14,
								backgroundColor: '#15803D',
								color: '#FFFFFF',
								fontSize: 15,
								fontWeight: 700,
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								boxShadow: '0 10px 24px rgba(21, 128, 61, 0.35)',
								cursor: 'pointer',
							}}
						>
							<span>Start e-Verification</span>
							<span>→</span>
						</div>

						<div
							style={{
								height: 50,
								padding: '0 20px',
								borderRadius: 14,
								backgroundColor: '#F8FAFC',
								border: '1.5px solid #E2E8F0',
								color: '#334155',
								fontSize: 14,
								fontWeight: 600,
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							Check ITR-V Status
						</div>
					</div>
				</div>

				{/* Right Stats Card */}
				<div
					style={{
						flex: 0.9,
						backgroundColor: '#0F172A',
						borderRadius: 20,
						padding: 32,
						color: '#FFFFFF',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						height: '80%',
						boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
					}}
				>
					<div>
						<div style={{ fontSize: 13, color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
							Filing Progress Live
						</div>
						<div style={{ fontSize: 32, fontWeight: 900, marginTop: 8, color: '#FFFFFF' }}>
							7.28 Crore+
						</div>
						<div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>
							ITRs filed &amp; processed this assessment year
						</div>
					</div>

					<div style={{ paddingTop: 20, borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column', gap: 10 }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#A7F3D0' }}>
							<span>✓</span>
							<span>Instant Aadhaar OTP validation</span>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#A7F3D0' }}>
							<span>✓</span>
							<span>Direct Refund Credit via ECS</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
