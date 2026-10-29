import React from 'react';

interface StageTravelClutteredUiProps {
	adOpacity?: number;
}

export const StageTravelClutteredUi: React.FC<StageTravelClutteredUiProps> = ({ adOpacity = 1 }) => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#EFF6FF',
				fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
				overflow: 'hidden',
				userSelect: 'none',
			}}
		>
			{/* ── 1. TOP ORANGE ADVISORY BANNER ── */}
			<div
				style={{
					backgroundColor: '#FB923C',
					color: '#000000',
					fontSize: 12,
					fontWeight: 600,
					padding: '7px 24px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					borderBottom: '1px solid #F97316',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<span
						style={{
							backgroundColor: '#000',
							color: '#FB923C',
							borderRadius: '50%',
							width: 16,
							height: 16,
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 10,
							fontWeight: 800,
						}}
					>
						i
					</span>
					<span>
						Travel Advisory: Passengers are advised to check the latest train running status, platform information, and coach position before commencing their journey.
					</span>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, fontWeight: 700 }}>
					<span>06-10-2026 | 16:30:55</span>
					<span>A-</span>
					<span>A</span>
					<span>A+</span>
					<span style={{ fontSize: 13 }}>🌐</span>
				</div>
			</div>

			{/* ── 2. NAVY BLUE HEADER NAVBAR ── */}
			<div
				style={{
					backgroundColor: '#1E40AF',
					padding: '10px 28px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					color: '#FFFFFF',
					boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
				}}
			>
				{/* Logos */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					<div
						style={{
							border: '1px dashed #60A5FA',
							padding: '3px 8px',
							borderRadius: 4,
							fontSize: 11,
							fontWeight: 700,
							color: '#93C5FD',
							backgroundColor: '#1E3A8A',
						}}
					>
						BETA Version
					</div>
					{/* Indian Railways Crest Symbol */}
					<div
						style={{
							width: 34,
							height: 34,
							borderRadius: '50%',
							backgroundColor: '#DC2626',
							border: '2px solid #FFFFFF',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 18,
						}}
					>
						🚆
					</div>
					{/* IRCTC Logo Badge */}
					<div
						style={{
							width: 34,
							height: 34,
							borderRadius: '50%',
							backgroundColor: '#FFFFFF',
							color: '#1E40AF',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontWeight: 900,
							fontSize: 10,
							letterSpacing: '-0.02em',
						}}
					>
						IRCTC
					</div>
				</div>

				{/* Navigation Links */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>
					<span style={{ textDecoration: 'underline', color: '#93C5FD' }}>HOME</span>
					<span>TRAINS</span>
					<span>MEALS</span>
					<span>LOYALTY</span>
					<span>E-WALLET</span>
					<span>ALERTS</span>
					<span>CONTACT US</span>
				</div>

				{/* Login CTA */}
				<div
					style={{
						backgroundColor: '#FFFFFF',
						color: '#1E40AF',
						fontWeight: 800,
						fontSize: 13,
						padding: '6px 20px',
						borderRadius: 20,
						boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
					}}
				>
					LOGIN
				</div>
			</div>

			{/* ── 3. MAIN WORKSPACE WITH ADS & CLUTTERED HERO ── */}
			<div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
				
				{/* LEFT NOISY PLACEHOLDER AD */}
				<div
					style={{
						width: 170,
						backgroundColor: '#FEF3C7',
						borderRight: '1px solid #FDE68A',
						padding: 12,
						display: 'flex',
						flexDirection: 'column',
						gap: 12,
						opacity: adOpacity,
						flexShrink: 0,
					}}
				>
					<div style={{ fontSize: 9, fontWeight: 700, color: '#92400E', textTransform: 'uppercase', letterSpacing: 0.5 }}>
						[Ad] Sponsored
					</div>
					<div
						style={{
							backgroundColor: '#DC2626',
							color: '#FFFFFF',
							padding: 10,
							borderRadius: 6,
							textAlign: 'center',
							boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
						}}
					>
						<div style={{ fontSize: 14, fontWeight: 900 }}>50% OFF!</div>
						<div style={{ fontSize: 10, marginTop: 4 }}>FLIGHT DEALS</div>
						<div style={{ fontSize: 8, marginTop: 6, backgroundColor: '#FFFFFF', color: '#DC2626', padding: '2px 4px', borderRadius: 3, fontWeight: 800 }}>
							USE: FESTIVE50
						</div>
					</div>

					<div
						style={{
							backgroundColor: '#1E3A8A',
							color: '#FFFFFF',
							padding: 10,
							borderRadius: 6,
							textAlign: 'center',
							fontSize: 10,
						}}
					>
						<div style={{ fontWeight: 800 }}>💳 ZERO FEE CARD</div>
						<div style={{ fontSize: 8, marginTop: 4, color: '#93C5FD' }}>₹1,500 Amazon Gift Voucher</div>
					</div>

					<div
						style={{
							backgroundColor: '#059669',
							color: '#FFFFFF',
							padding: 8,
							borderRadius: 6,
							textAlign: 'center',
							fontSize: 9,
							fontWeight: 700,
						}}
					>
						🏨 Luxury Hotels from ₹799
					</div>
				</div>

				{/* CENTER CONTENT */}
				<div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
					
					{/* HERO BANNER SECTION WITH TRAIN */}
					<div
						style={{
							height: 180,
							position: 'relative',
							background: 'linear-gradient(100deg, #FFFFFF 0%, #E0F2FE 45%, #F0F9FF 100%)',
							padding: '24px 36px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							overflow: 'hidden',
						}}
					>
						<div style={{ zIndex: 2 }}>
							<h1 style={{ fontSize: 44, fontWeight: 800, margin: 0, color: '#1E3A8A', letterSpacing: '-0.03em' }}>
								Your Journey, <span style={{ color: '#EA580C' }}>Made Simple</span>
							</h1>
							<p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748B', fontWeight: 500 }}>
								Indian Railways Passenger Reservation Enquiry & Booking Portal
							</p>
						</div>

						{/* Vande Bharat Train Visual Vector Graphic */}
						<div
							style={{
								width: 480,
								height: 140,
								position: 'relative',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
							}}
						>
							<svg viewBox="0 0 500 160" width="100%" height="100%">
								<defs>
									<linearGradient id="trainOrange" x1="0" y1="0" x2="1" y2="0">
										<stop offset="0%" stopColor="#EA580C" />
										<stop offset="70%" stopColor="#F97316" />
										<stop offset="100%" stopColor="#1E293B" />
									</linearGradient>
									<linearGradient id="trackSpeed" x1="0" y1="0" x2="1" y2="0">
										<stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.2" />
										<stop offset="100%" stopColor="#94A3B8" stopOpacity="0.8" />
									</linearGradient>
								</defs>
								{/* Speed Rails */}
								<path d="M 10 135 L 500 135" stroke="url(#trackSpeed)" strokeWidth="6" strokeLinecap="round" />
								<path d="M 60 148 L 500 148" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
								<line x1="120" y1="135" x2="105" y2="155" stroke="#94A3B8" strokeWidth="3" />
								<line x1="200" y1="135" x2="185" y2="155" stroke="#94A3B8" strokeWidth="3" />
								<line x1="280" y1="135" x2="265" y2="155" stroke="#94A3B8" strokeWidth="3" />
								<line x1="360" y1="135" x2="345" y2="155" stroke="#94A3B8" strokeWidth="3" />

								{/* Train Aerodynamic Nose & Carriage */}
								<path
									d="M 50 120 C 150 120 220 115 320 115 L 420 115 C 470 115 490 85 470 50 C 450 25 410 30 350 30 L 50 30 Z"
									fill="url(#trainOrange)"
								/>
								<path
									d="M 380 40 Q 440 40 455 60 Q 430 75 370 75 Z"
									fill="#0F172A"
								/>
								{/* Headlight */}
								<circle cx="462" cy="70" r="6" fill="#FEF08A" />
								<polygon points="468,70 520,50 520,90" fill="rgba(254,240,138,0.25)" />
								{/* Side Black Band */}
								<rect x="50" y="55" width="300" height="28" fill="#1E293B" rx="4" />
								<rect x="70" y="60" width="40" height="18" fill="#60A5FA" opacity="0.8" rx="2" />
								<rect x="125" y="60" width="40" height="18" fill="#60A5FA" opacity="0.8" rx="2" />
								<rect x="180" y="60" width="40" height="18" fill="#60A5FA" opacity="0.8" rx="2" />
								<rect x="235" y="60" width="40" height="18" fill="#60A5FA" opacity="0.8" rx="2" />
							</svg>
						</div>
					</div>

					{/* ── CLUTTERED CRAMPED SEARCH BOX ── */}
					<div style={{ padding: '14px 32px', flex: 1, display: 'flex', gap: 16 }}>
						
						{/* Main Cramped Booking Form (Height 34px inputs) */}
						<div
							style={{
								flex: 2.2,
								backgroundColor: '#FFFFFF',
								borderRadius: 12,
								border: '1px solid #CBD5E1',
								padding: '16px 20px',
								boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
								display: 'flex',
								flexDirection: 'column',
								gap: 12,
							}}
						>
							{/* Form Row 1: Cramped From & To + Swap */}
							<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
								
								{/* Cramped "From" */}
								<div
									style={{
										flex: 1,
										height: 38,
										border: '1px solid #94A3B8',
										borderRadius: 6,
										padding: '0 10px',
										display: 'flex',
										alignItems: 'center',
										gap: 8,
										backgroundColor: '#F8FAFC',
									}}
								>
									<span style={{ fontSize: 13, color: '#64748B' }}>⭕</span>
									<div style={{ display: 'flex', flexDirection: 'column' }}>
										<span style={{ fontSize: 9, color: '#64748B', fontWeight: 600, lineHeight: 1 }}>From</span>
										<span style={{ fontSize: 12, color: '#334155', fontWeight: 500 }}>Select Source (NDLS)</span>
									</div>
								</div>

								{/* Swap Button */}
								<div
									style={{
										width: 28,
										height: 28,
										borderRadius: '50%',
										backgroundColor: '#2563EB',
										color: '#FFFFFF',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 12,
										cursor: 'pointer',
										flexShrink: 0,
									}}
								>
									⇄
								</div>

								{/* Cramped "To" */}
								<div
									style={{
										flex: 1,
										height: 38,
										border: '1px solid #94A3B8',
										borderRadius: 6,
										padding: '0 10px',
										display: 'flex',
										alignItems: 'center',
										gap: 8,
										backgroundColor: '#F8FAFC',
									}}
								>
									<span style={{ fontSize: 13, color: '#64748B' }}>📍</span>
									<div style={{ display: 'flex', flexDirection: 'column' }}>
										<span style={{ fontSize: 9, color: '#64748B', fontWeight: 600, lineHeight: 1 }}>To</span>
										<span style={{ fontSize: 12, color: '#334155', fontWeight: 500 }}>Select Destination (BOM)</span>
									</div>
								</div>

								{/* Date */}
								<div
									style={{
										flex: 0.9,
										height: 38,
										border: '1px solid #94A3B8',
										borderRadius: 6,
										padding: '0 10px',
										display: 'flex',
										alignItems: 'center',
										gap: 8,
										backgroundColor: '#F8FAFC',
									}}
								>
									<div style={{ display: 'flex', flexDirection: 'column' }}>
										<span style={{ fontSize: 9, color: '#64748B', fontWeight: 600, lineHeight: 1 }}>Date</span>
										<span style={{ fontSize: 11, color: '#0F172A', fontWeight: 700 }}>06 Oct 2026</span>
									</div>
									<span style={{ marginLeft: 'auto', fontSize: 12 }}>📅</span>
								</div>
							</div>

							{/* Form Row 2: Cramped Quota, Concession & Search */}
							<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
								<div
									style={{
										flex: 1,
										height: 36,
										border: '1px solid #94A3B8',
										borderRadius: 6,
										padding: '0 10px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										backgroundColor: '#F8FAFC',
										fontSize: 11,
										color: '#334155',
									}}
								>
									<span>Quota: <strong>General</strong></span>
									<span>▼</span>
								</div>

								<div
									style={{
										flex: 1,
										height: 36,
										border: '1px solid #94A3B8',
										borderRadius: 6,
										padding: '0 10px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										backgroundColor: '#F8FAFC',
										fontSize: 11,
										color: '#334155',
									}}
								>
									<span>Concession: <strong>None</strong></span>
									<span>▼</span>
								</div>

								<div
									style={{
										flex: 1,
										height: 36,
										backgroundColor: '#2563EB',
										color: '#FFFFFF',
										borderRadius: 6,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 6,
										fontWeight: 700,
										fontSize: 12,
									}}
								>
									<span>Search Trains</span>
									<span>🔍</span>
								</div>
							</div>

							{/* Cramped Checkbox Grid Clutter */}
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(2, 1fr)',
									gap: 6,
									fontSize: 10,
									color: '#475569',
									paddingTop: 4,
									borderTop: '1px dashed #E2E8F0',
								}}
							>
								<label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
									<input type="checkbox" defaultChecked={false} style={{ margin: 0 }} />
									<span>Person With Disability Concession</span>
								</label>
								<label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
									<input type="checkbox" defaultChecked={false} style={{ margin: 0 }} />
									<span>Flexible With Date</span>
								</label>
								<label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
									<input type="checkbox" defaultChecked={true} style={{ margin: 0 }} />
									<span>Train with Available Berth</span>
								</label>
								<label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
									<input type="checkbox" defaultChecked={false} style={{ margin: 0 }} />
									<span>Railway Pass Concession</span>
								</label>
							</div>
						</div>

						{/* Right Side IRCTC Quick Utilities */}
						<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
							<div
								style={{
									flex: 1,
									backgroundColor: '#F0FDF4',
									border: '1px solid #BBF7D0',
									borderRadius: 10,
									padding: '10px 14px',
									display: 'flex',
									alignItems: 'center',
									gap: 12,
								}}
							>
								<div
									style={{
										width: 34,
										height: 34,
										borderRadius: 8,
										backgroundColor: '#16A34A',
										color: '#FFF',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 16,
									}}
								>
									🎫
								</div>
								<div>
									<div style={{ fontSize: 12, fontWeight: 700, color: '#166534' }}>Check PNR Status</div>
									<div style={{ fontSize: 10, color: '#4ADE80' }}>10-digit number</div>
								</div>
							</div>

							<div
								style={{
									flex: 1,
									backgroundColor: '#EFF6FF',
									border: '1px solid #BFDBFE',
									borderRadius: 10,
									padding: '10px 14px',
									display: 'flex',
									alignItems: 'center',
									gap: 12,
								}}
							>
								<div
									style={{
										width: 34,
										height: 34,
										borderRadius: 8,
										backgroundColor: '#2563EB',
										color: '#FFF',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 16,
									}}
								>
									📍
								</div>
								<div>
									<div style={{ fontSize: 12, fontWeight: 700, color: '#1E40AF' }}>Track Your Train</div>
									<div style={{ fontSize: 10, color: '#60A5FA' }}>Live GPS Running Status</div>
								</div>
							</div>
						</div>
					</div>

					{/* BOTTOM SPAMMY PROMO BANNER */}
					<div
						style={{
							backgroundColor: '#FEF08A',
							borderTop: '1px solid #FDE047',
							padding: '6px 24px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							fontSize: 10.5,
							fontWeight: 700,
							color: '#854D0E',
							opacity: adOpacity,
						}}
					>
						<span>⚡ FLASH DEAL: Flat 25% Off on Bus Tickets & Airport Cabs when you pay via IRCTC iMudra!</span>
						<span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Claim Now &gt;</span>
					</div>
				</div>

				{/* RIGHT NOISY PLACEHOLDER AD */}
				<div
					style={{
						width: 170,
						backgroundColor: '#EFF6FF',
						borderLeft: '1px solid #DBEAFE',
						padding: 12,
						display: 'flex',
						flexDirection: 'column',
						gap: 10,
						opacity: adOpacity,
						flexShrink: 0,
					}}
				>
					<div style={{ fontSize: 9, fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: 0.5 }}>
						[Ad] Partner Offer
					</div>
					<div
						style={{
							backgroundColor: '#3B82F6',
							color: '#FFFFFF',
							padding: 10,
							borderRadius: 6,
							textAlign: 'center',
						}}
					>
						<div style={{ fontSize: 11, fontWeight: 800 }}>✈️ BOOK AIRLINE TICKETS</div>
						<div style={{ fontSize: 8, marginTop: 4, color: '#DBEAFE' }}>Zero convenience fees on your 1st booking</div>
					</div>

					<div
						style={{
							backgroundColor: '#7C3AED',
							color: '#FFFFFF',
							padding: 8,
							borderRadius: 6,
							textAlign: 'center',
							fontSize: 9,
							fontWeight: 700,
						}}
					>
						🥘 Order Food in Train (E-Catering)
					</div>

					<div
						style={{
							border: '1px dashed #93C5FD',
							borderRadius: 6,
							padding: 8,
							textAlign: 'center',
							fontSize: 8,
							color: '#64748B',
						}}
					>
						ADVERTISEMENT 160x600
					</div>
				</div>
			</div>
		</div>
	);
};
