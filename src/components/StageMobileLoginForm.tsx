import React from 'react';

interface StageMobileLoginFormProps {
	progress: number; // 0 = legacy microscopic, 1 = modern 48px relaxed
}

export const StageMobileLoginForm: React.FC<StageMobileLoginFormProps> = ({ progress }) => {
	// ── DYNAMIC INTERPOLATIONS BASED ON ORGANIC RELAXATION PROGRESS ──
	
	// Input dimensions & styling
	const inputHeight = 24 + progress * (48 - 24); // 24px -> 48px
	const inputBorderRadius = 3 + progress * (12 - 3); // 3px -> 12px
	const inputFontSize = 10 + progress * (16 - 10); // 10px -> 16px Inter
	const labelFontSize = 9 + progress * (13 - 9); // 9px -> 13px
	const inputPaddingX = 8 + progress * (16 - 8); // 8px -> 16px
	const inputGap = 8 + progress * (16 - 8); // 8px -> 16px
	
	// Width of the form content (expands from cramped 230px to 100%)
	const formWidthPercent = 64 + progress * (100 - 64);
	const cardPadding = 12 + progress * (24 - 12);
	const cardBorderRadius = 6 + progress * (18 - 6);

	// CAPTCHA vs Toggle Switch cross-fade
	const captchaOpacity = Math.max(0, 1 - progress * 2.2);
	const captchaHeight = (1 - progress) * 62;
	const toggleOpacity = Math.min(1, Math.max(0, (progress - 0.35) * 1.6));
	const toggleScale = 0.85 + toggleOpacity * 0.15;

	// Submit button morph
	const btnHeight = 26 + progress * (48 - 26);
	const btnFontSize = 10 + progress * (16 - 10);
	const btnRadius = 4 + progress * (12 - 4);
	const btnBg = progress > 0.5 ? '#0066FF' : '#1E3A8A';
	const btnShadow = progress > 0.3
		? `0 ${8 * progress}px ${20 * progress}px rgba(0, 102, 255, ${0.35 * progress})`
		: 'none';

	// Header scale
	const logoSize = 32 + progress * (44 - 32);
	const titleFontSize = 12 + progress * (18 - 12);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#F8FAFC',
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
				display: 'flex',
				flexDirection: 'column',
				padding: '16px 20px',
				overflow: 'hidden',
				boxSizing: 'border-box',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{/* ── CARD CONTAINER THAT RELAXES / BREATHES ── */}
			<div
				style={{
					width: `${formWidthPercent}%`,
					backgroundColor: '#FFFFFF',
					borderRadius: cardBorderRadius,
					border: progress > 0.5 ? '1.5px solid #E5E7EB' : '1px solid #CBD5E1',
					padding: cardPadding,
					boxShadow: progress > 0.4
						? '0 16px 36px -8px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.03)'
						: '0 2px 6px rgba(0,0,0,0.06)',
					display: 'flex',
					flexDirection: 'column',
					gap: inputGap,
					boxSizing: 'border-box',
					transformOrigin: 'center center',
				}}
			>
				{/* ── 1. HEADER BRAND & TITLE ── */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						paddingBottom: 8,
						borderBottom: '1px solid #F1F5F9',
					}}
				>
					{/* Emblem Icon */}
					<div
						style={{
							width: logoSize,
							height: logoSize,
							borderRadius: 10,
							background: 'linear-gradient(135deg, #1E3A8A 0%, #0066FF 100%)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#FFFFFF',
							fontSize: logoSize * 0.45,
							flexShrink: 0,
							boxShadow: progress > 0.5 ? '0 4px 12px rgba(0, 102, 255, 0.25)' : 'none',
						}}
					>
						🏛️
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
						<div
							style={{
								fontSize: titleFontSize,
								fontWeight: 800,
								color: '#0F172A',
								letterSpacing: '-0.02em',
								lineHeight: 1.2,
								whiteSpace: 'nowrap',
							}}
						>
							{progress > 0.5 ? 'Member Portal' : 'EPFO e-Sewa UAN'}
						</div>
						<div
							style={{
								fontSize: Math.max(8, 9 + progress * 2),
								color: '#64748B',
								fontWeight: 500,
								whiteSpace: 'nowrap',
							}}
						>
							{progress > 0.5 ? 'Sign in to access EPF passbook & claims' : 'Universal Account Number Login'}
						</div>
					</div>
				</div>

				{/* ── 2. UAN / USERNAME FIELD (EXPANDS TO 100% WIDTH & 48PX HEIGHT) ── */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
					<label
						style={{
							fontSize: labelFontSize,
							fontWeight: 600,
							color: progress > 0.5 ? '#374151' : '#64748B',
						}}
					>
						Universal Account Number (UAN)
					</label>
					<div
						style={{
							width: '100%',
							height: inputHeight,
							borderRadius: inputBorderRadius,
							border: progress > 0.5 ? '1.5px solid #E5E7EB' : '1px solid #9CA3AF',
							backgroundColor: progress > 0.5 ? '#F8FAFC' : '#FFFFFF',
							padding: `0 ${inputPaddingX}px`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							boxSizing: 'border-box',
							boxShadow: progress > 0.5 ? '0 1px 2px rgba(0,0,0,0.02)' : 'none',
						}}
					>
						<span
							style={{
								fontSize: inputFontSize,
								color: '#0F172A',
								fontFamily: '"Inter", sans-serif',
								fontWeight: 500,
								letterSpacing: progress > 0.5 ? '0.04em' : 'normal',
							}}
						>
							1009 4821 9904
						</span>
						{progress > 0.5 && (
							<span style={{ fontSize: 13, color: '#16A34A', fontWeight: 700 }}>✓</span>
						)}
					</div>
				</div>

				{/* ── 3. PASSWORD FIELD (EXPANDS TO 100% WIDTH & 48PX HEIGHT) ── */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
					<label
						style={{
							fontSize: labelFontSize,
							fontWeight: 600,
							color: progress > 0.5 ? '#374151' : '#64748B',
						}}
					>
						Password
					</label>
					<div
						style={{
							width: '100%',
							height: inputHeight,
							borderRadius: inputBorderRadius,
							border: progress > 0.5 ? '1.5px solid #E5E7EB' : '1px solid #9CA3AF',
							backgroundColor: progress > 0.5 ? '#F8FAFC' : '#FFFFFF',
							padding: `0 ${inputPaddingX}px`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							boxSizing: 'border-box',
							boxShadow: progress > 0.5 ? '0 1px 2px rgba(0,0,0,0.02)' : 'none',
						}}
					>
						<span
							style={{
								fontSize: inputFontSize,
								color: '#0F172A',
								fontFamily: '"Inter", sans-serif',
								letterSpacing: 2,
								fontWeight: 700,
							}}
						>
							••••••••••••
						</span>
						<span style={{ fontSize: progress > 0.5 ? 14 : 10, color: '#64748B', cursor: 'pointer' }}>
							👁
						</span>
					</div>
				</div>

				{/* ── 4. MESSY CAPTCHA BOX (FADES OUT) ── */}
				{captchaOpacity > 0 && (
					<div
						style={{
							height: captchaHeight,
							opacity: captchaOpacity,
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
							overflow: 'hidden',
						}}
					>
						<span style={{ fontSize: 8, color: '#64748B', fontWeight: 600 }}>Enter Captcha text:</span>
						<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
							{/* Distorted Captcha Image Canvas Box */}
							<div
								style={{
									backgroundColor: '#E2E8F0',
									border: '1px solid #CBD5E1',
									padding: '2px 8px',
									borderRadius: 3,
									display: 'flex',
									alignItems: 'center',
									gap: 4,
									fontFamily: 'monospace',
									fontStyle: 'italic',
									letterSpacing: 3,
									fontSize: 12,
									color: '#334155',
									textDecoration: 'line-through',
									position: 'relative',
								}}
							>
								<span style={{ transform: 'rotate(-5deg)', display: 'inline-block' }}>W</span>
								<span style={{ transform: 'rotate(8deg)', display: 'inline-block', color: '#DC2626' }}>9</span>
								<span style={{ transform: 'rotate(-12deg)', display: 'inline-block' }}>g</span>
								<span style={{ transform: 'rotate(4deg)', display: 'inline-block' }}>8</span>
								<span style={{ transform: 'rotate(-6deg)', display: 'inline-block', color: '#2563EB' }}>K</span>
							</div>

							<div
								style={{
									width: 80,
									height: 22,
									border: '1px solid #9CA3AF',
									borderRadius: 3,
									fontSize: 9,
									padding: '0 4px',
									display: 'flex',
									alignItems: 'center',
									color: '#94A3B8',
								}}
							>
								Type letters
							</div>

							<span style={{ fontSize: 10, cursor: 'pointer' }}>🔄</span>
						</div>
					</div>
				)}

				{/* ── 5. MODERN TOGGLE SWITCH (FADES IN & REPLACES CAPTCHA) ── */}
				{toggleOpacity > 0 && (
					<div
						style={{
							opacity: toggleOpacity,
							transform: `scale(${toggleScale})`,
							transformOrigin: 'center center',
							backgroundColor: '#F0FDF4',
							border: '1.5px solid #BBF7D0',
							borderRadius: 12,
							padding: '10px 14px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							boxShadow: '0 2px 6px rgba(16, 185, 129, 0.08)',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
							<div
								style={{
									width: 24,
									height: 24,
									borderRadius: '50%',
									backgroundColor: '#16A34A',
									color: '#FFFFFF',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: 12,
									fontWeight: 800,
								}}
							>
								✓
							</div>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<span style={{ fontSize: 12.5, fontWeight: 700, color: '#166534' }}>
									Passkey &amp; Biometric Auth
								</span>
								<span style={{ fontSize: 10.5, color: '#15803D' }}>
									Frictionless 1-Tap Verification
								</span>
							</div>
						</div>

						{/* Clean iOS Style Active Toggle Switch */}
						<div
							style={{
								width: 42,
								height: 24,
								borderRadius: 12,
								backgroundColor: '#16A34A',
								padding: 2,
								boxSizing: 'border-box',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
								boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
							}}
						>
							<div
								style={{
									width: 20,
									height: 20,
									borderRadius: '50%',
									backgroundColor: '#FFFFFF',
									boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
								}}
							/>
						</div>
					</div>
				)}

				{/* ── 6. PRIMARY SIGN IN BUTTON (MORPHS TO 48PX HEIGHT & 16PX INTER) ── */}
				<div
					style={{
						width: '100%',
						height: btnHeight,
						borderRadius: btnRadius,
						backgroundColor: btnBg,
						color: '#FFFFFF',
						fontSize: btnFontSize,
						fontFamily: '"Inter", sans-serif',
						fontWeight: 700,
						letterSpacing: '-0.01em',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 8,
						boxShadow: btnShadow,
						cursor: 'pointer',
						marginTop: progress > 0.5 ? 4 : 0,
					}}
				>
					<span>Sign In to Portal</span>
					{progress > 0.5 && <span>→</span>}
				</div>

				{/* Bottom Helper Links */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						paddingTop: progress > 0.5 ? 8 : 2,
						fontSize: progress > 0.5 ? 11.5 : 8.5,
						color: '#64748B',
					}}
				>
					<span style={{ color: '#0066FF', fontWeight: 600, cursor: 'pointer' }}>Forgot Password?</span>
					<span style={{ cursor: 'pointer' }}>Activate UAN</span>
				</div>
			</div>
		</div>
	);
};
