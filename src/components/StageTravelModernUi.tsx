import React from 'react';

export const StageTravelModernUi: React.FC = () => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#F8FAFC',
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
				overflow: 'hidden',
				userSelect: 'none',
			}}
		>
			{/* ── 1. MINIMAL MODERN HEADER ── */}
			<div
				style={{
					height: 64,
					backgroundColor: '#FFFFFF',
					borderBottom: '1px solid #E2E8F0',
					padding: '0 36px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				{/* Brand Lockup */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					<div
						style={{
							width: 38,
							height: 38,
							borderRadius: 10,
							background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#FFFFFF',
							boxShadow: '0 4px 12px rgba(0, 102, 255, 0.3)',
						}}
					>
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
							<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
							<line x1="4" y1="22" x2="4" y2="15" />
						</svg>
					</div>
					<div>
						<div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 8 }}>
							<span>RailPulse</span>
							<span
								style={{
									fontSize: 10,
									fontWeight: 700,
									backgroundColor: '#EFF6FF',
									color: '#0066FF',
									padding: '2px 7px',
									borderRadius: 6,
									letterSpacing: '0.04em',
								}}
							>
								STAGE REDESIGN
							</span>
						</div>
						<div style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>
							Next-Gen High-Speed Rail Search
						</div>
					</div>
				</div>

				{/* Modern Nav Tabs */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					{['Book Journey', 'Live Train Radar', 'PNR & Berth', 'Meal Ordering'].map((tab, idx) => (
						<div
							key={tab}
							style={{
								padding: '8px 16px',
								borderRadius: 8,
								fontSize: 13,
								fontWeight: idx === 0 ? 700 : 500,
								color: idx === 0 ? '#0066FF' : '#64748B',
								backgroundColor: idx === 0 ? '#EFF6FF' : 'transparent',
								cursor: 'pointer',
							}}
						>
							{tab}
						</div>
					))}
				</div>

				{/* Profile / Account */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<div
						style={{
							padding: '8px 18px',
							borderRadius: 20,
							backgroundColor: '#0F172A',
							color: '#FFFFFF',
							fontSize: 13,
							fontWeight: 700,
							boxShadow: '0 2px 8px rgba(15, 23, 42, 0.2)',
						}}
					>
						My Trips
					</div>
				</div>
			</div>

			{/* ── 2. HERO CONTEXT & SUBTITLE ── */}
			<div
				style={{
					padding: '28px 48px 14px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<div>
					<h1
						style={{
							fontSize: 34,
							fontWeight: 800,
							color: '#0F172A',
							margin: 0,
							letterSpacing: '-0.03em',
						}}
					>
						Where would you like to travel?
					</h1>
					<p style={{ margin: '6px 0 0', fontSize: 14, color: '#64748B', fontWeight: 500 }}>
						Search express trains across 8,000+ railway stations with real-time seat prediction.
					</p>
				</div>

				{/* Trust Badge Strip */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						backgroundColor: '#FFFFFF',
						padding: '8px 16px',
						borderRadius: 12,
						border: '1px solid #E2E8F0',
						fontSize: 12,
						fontWeight: 600,
						color: '#0F172A',
						boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
					}}
				>
					<span style={{ color: '#16A34A' }}>● IRCTC Authorized</span>
					<span style={{ color: '#64748B' }}>|</span>
					<span style={{ color: '#0066FF' }}>⚡ Zero Payment Surcharges</span>
				</div>
			</div>

			{/* ── 3. CLEAN, MODERN WHITE CARD (PRIMARY HIGHLIGHT) ── */}
			<div style={{ padding: '0 48px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
				<div
					style={{
						backgroundColor: '#FFFFFF',
						borderRadius: 20,
						border: '1px solid #E2E8F0',
						boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)',
						padding: 24,
						display: 'flex',
						flexDirection: 'column',
						gap: 20,
					}}
				>
					{/* Sub Tabs Inside Card */}
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: 14 }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
							<span style={{ fontSize: 14, fontWeight: 800, color: '#0066FF', borderBottom: '2px solid #0066FF', paddingBottom: 12, marginBottom: -15 }}>
								🚆 One Way Journey
							</span>
							<span style={{ fontSize: 14, fontWeight: 500, color: '#64748B', cursor: 'pointer' }}>
								🔄 Round Trip
							</span>
							<span style={{ fontSize: 14, fontWeight: 500, color: '#64748B', cursor: 'pointer' }}>
								🗺️ Multi-City Pass
							</span>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: '#64748B' }}>
							<span>Class: <strong style={{ color: '#0F172A' }}>All Classes (AC, Sleeper)</strong></span>
							<span>Quota: <strong style={{ color: '#0F172A' }}>General (GN)</strong></span>
						</div>
					</div>

					{/* ── INPUT FIELDS ROW: EXACT HEIGHT: 56PX WITH SOFT BORDERS ── */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1.3fr auto 1.3fr 1fr 1fr',
							alignItems: 'center',
							gap: 12,
						}}
					>
						{/* FROM INPUT FIELD (HEIGHT: 56PX) */}
						<div
							style={{
								height: 56,
								borderRadius: 14,
								border: '1.5px solid #E2E8F0',
								backgroundColor: '#FFFFFF',
								padding: '0 16px',
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
								position: 'relative',
							}}
						>
							<div
								style={{
									width: 32,
									height: 32,
									borderRadius: 8,
									backgroundColor: '#EFF6FF',
									color: '#0066FF',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 800,
									fontSize: 13,
									flexShrink: 0,
								}}
							>
								NDLS
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
								<span style={{ fontSize: 10, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
									From Station
								</span>
								<span style={{ fontSize: 14, color: '#0F172A', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
									New Delhi (NDLS)
								</span>
							</div>
						</div>

						{/* SWAP ICON BUTTON */}
						<div
							style={{
								width: 42,
								height: 42,
								borderRadius: '50%',
								backgroundColor: '#F1F5F9',
								border: '1px solid #E2E8F0',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#0066FF',
								cursor: 'pointer',
								boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
								flexShrink: 0,
							}}
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
								<path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" />
							</svg>
						</div>

						{/* TO INPUT FIELD (HEIGHT: 56PX) */}
						<div
							style={{
								height: 56,
								borderRadius: 14,
								border: '1.5px solid #E2E8F0',
								backgroundColor: '#FFFFFF',
								padding: '0 16px',
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
							}}
						>
							<div
								style={{
									width: 32,
									height: 32,
									borderRadius: 8,
									backgroundColor: '#FDF2F8',
									color: '#DB2777',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 800,
									fontSize: 13,
									flexShrink: 0,
								}}
							>
								BOM
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
								<span style={{ fontSize: 10, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
									To Station
								</span>
								<span style={{ fontSize: 14, color: '#0F172A', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
									Mumbai Central (MMCT)
								</span>
							</div>
						</div>

						{/* DATE INPUT FIELD (HEIGHT: 56PX) */}
						<div
							style={{
								height: 56,
								borderRadius: 14,
								border: '1.5px solid #E2E8F0',
								backgroundColor: '#FFFFFF',
								padding: '0 16px',
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
							}}
						>
							<div
								style={{
									width: 32,
									height: 32,
									borderRadius: 8,
									backgroundColor: '#F8FAFC',
									color: '#0F172A',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: 15,
									flexShrink: 0,
								}}
							>
								📅
							</div>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<span style={{ fontSize: 10, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
									Departure Date
								</span>
								<span style={{ fontSize: 13.5, color: '#0F172A', fontWeight: 700 }}>
									Wed, 07 Oct 2026
								</span>
							</div>
						</div>

						{/* SEARCH ACTION BUTTON (HEIGHT: 56PX) */}
						<div
							style={{
								height: 56,
								borderRadius: 14,
								background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
								color: '#FFFFFF',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 10,
								padding: '0 20px',
								boxShadow: '0 8px 20px rgba(0, 102, 255, 0.35)',
								cursor: 'pointer',
								fontWeight: 700,
								fontSize: 15,
								letterSpacing: '-0.01em',
							}}
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
								<circle cx="11" cy="11" r="8" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
							<span>Search Trains</span>
						</div>
					</div>

					{/* Bottom Micro Features & Clean Filters */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							paddingTop: 8,
							borderTop: '1px solid #F1F5F9',
							fontSize: 12.5,
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
							<label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#334155', fontWeight: 600 }}>
								<input type="checkbox" defaultChecked style={{ accentColor: '#0066FF' }} />
								<span>Direct Trains Only</span>
							</label>
							<label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#334155', fontWeight: 600 }}>
								<input type="checkbox" defaultChecked style={{ accentColor: '#0066FF' }} />
								<span>Available Berth Only</span>
							</label>
							<label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#334155', fontWeight: 600 }}>
								<input type="checkbox" style={{ accentColor: '#0066FF' }} />
								<span>Senior Citizen Concession</span>
							</label>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16A34A', fontWeight: 700 }}>
							<span>🛡️ 100% Free Cancellation Policy Included</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
