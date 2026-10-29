import React from 'react';

interface StageBrowserFrameProps {
	children: React.ReactNode;
	url?: string;
	shadowOpacity?: number; // 0 to 1
	snapFlash?: number; // 0 to 1
	isDocked?: boolean;
}

export const StageBrowserFrame: React.FC<StageBrowserFrameProps> = ({
	children,
	url = 'https://irctc.co.in/eticket/train-search',
	shadowOpacity = 1,
	snapFlash = 0,
	isDocked = true,
}) => {
	return (
		<div
			style={{
				width: 1440,
				height: 820,
				borderRadius: 18,
				backgroundColor: '#0E1117',
				border: '1.5px solid rgba(255, 255, 255, 0.12)',
				// EXACT REQUIREMENT: box-shadow: 0 20px 40px rgba(0,0,0,0.5) activates around the IRCTC site
				boxShadow: `
					0 20px 40px rgba(0, 0, 0, ${0.5 * shadowOpacity}),
					0 0 0 1px rgba(255, 255, 255, ${0.08 * shadowOpacity}),
					0 0 ${40 * shadowOpacity}px rgba(0, 102, 255, ${0.2 * shadowOpacity})
				`,
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',
			}}
		>
			{/* ── 1. TOP BROWSER CHASSIS BAR ── */}
			<div
				style={{
					height: 44,
					backgroundColor: '#161922',
					borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
					padding: '0 16px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					zIndex: 30,
					userSelect: 'none',
				}}
			>
				{/* Left: Window Traffic Lights + Nav Buttons */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					{/* Traffic Light Dots */}
					<div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
						<div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
						<div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
						<div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#27C93F' }} />
					</div>

					{/* Navigation Icons */}
					<div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748B', fontSize: 12 }}>
						<span style={{ cursor: 'pointer' }}>❮</span>
						<span style={{ cursor: 'pointer' }}>❯</span>
						<span style={{ cursor: 'pointer' }}>🔄</span>
					</div>
				</div>

				{/* Center: URL Omnibox */}
				<div
					style={{
						width: 520,
						height: 28,
						borderRadius: 8,
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
						border: '1px solid rgba(255, 255, 255, 0.08)',
						padding: '0 12px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						fontSize: 11.5,
						fontFamily: '"JetBrains Mono", monospace',
						color: '#94A3B8',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
						<span style={{ color: '#10B981', fontSize: 10 }}>🔒</span>
						<span style={{ color: '#E2E8F0', fontWeight: 500 }}>{url}</span>
					</div>

					{isDocked && (
						<div
							style={{
								fontSize: 9,
								fontWeight: 800,
								backgroundColor: 'rgba(0, 102, 255, 0.25)',
								border: '1px solid rgba(0, 240, 255, 0.4)',
								color: '#00F0FF',
								padding: '1px 6px',
								borderRadius: 4,
							}}
						>
							STAGE PROXY
						</div>
					)}
				</div>

				{/* Right: STAGE Tool Controls */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
					<div
						style={{
							fontSize: 11,
							fontWeight: 700,
							color: '#38BDF8',
							backgroundColor: 'rgba(56, 189, 248, 0.1)',
							border: '1px solid rgba(56, 189, 248, 0.25)',
							padding: '3px 8px',
							borderRadius: 6,
						}}
					>
						Live Ingest
					</div>
				</div>
			</div>

			{/* ── 2. BROWSER VIEWPORT (IRCTC SITE) ── */}
			<div
				style={{
					flex: 1,
					position: 'relative',
					overflow: 'hidden',
					backgroundColor: '#FFFFFF',
				}}
			>
				{children}
			</div>

			{/* ── 3. MECHANICAL SNAP CORNER BRACKETS (VISIBLE ON DOCK) ── */}
			{isDocked && (
				<>
					{/* Top Left Bracket */}
					<div
						style={{
							position: 'absolute',
							top: 8,
							left: 8,
							width: 14,
							height: 14,
							borderTop: '2.5px solid #00F0FF',
							borderLeft: '2.5px solid #00F0FF',
							pointerEvents: 'none',
							zIndex: 40,
						}}
					/>
					{/* Top Right Bracket */}
					<div
						style={{
							position: 'absolute',
							top: 8,
							right: 8,
							width: 14,
							height: 14,
							borderTop: '2.5px solid #00F0FF',
							borderRight: '2.5px solid #00F0FF',
							pointerEvents: 'none',
							zIndex: 40,
						}}
					/>
					{/* Bottom Left Bracket */}
					<div
						style={{
							position: 'absolute',
							bottom: 8,
							left: 8,
							width: 14,
							height: 14,
							borderBottom: '2.5px solid #00F0FF',
							borderLeft: '2.5px solid #00F0FF',
							pointerEvents: 'none',
							zIndex: 40,
						}}
					/>
					{/* Bottom Right Bracket */}
					<div
						style={{
							position: 'absolute',
							bottom: 8,
							right: 8,
							width: 14,
							height: 14,
							borderBottom: '2.5px solid #00F0FF',
							borderRight: '2.5px solid #00F0FF',
							pointerEvents: 'none',
							zIndex: 40,
						}}
					/>
				</>
			)}

			{/* ── 4. SNAP FLASH BURST ON DOCK ── */}
			{snapFlash > 0 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundColor: '#00F0FF',
						opacity: snapFlash * 0.4,
						zIndex: 50,
						pointerEvents: 'none',
					}}
				/>
			)}
		</div>
	);
};
